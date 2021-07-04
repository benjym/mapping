import logging
import os

from flask import Flask, jsonify, request
from flask import render_template
from flask_caching import Cache
import polyline
import numpy as np

from opentopodata import backend, config


app = Flask(__name__)
app.config["JSONIFY_PRETTYPRINT_REGULAR"] = True

DEFAULT_INTERPOLATION_METHOD = "bilinear"
MEMCACHED_SOCKET = "/tmp/memcached.sock"
LAT_MIN = -90
LAT_MAX = 90
LON_MIN = -180
LON_MAX = 180

class InputError(ValueError):
    """Invalid input data.

    The error message should be safe to pass back to the client.
    """

    pass

# Memcache is used to store the latlon -> filename lookups, which can take a
# while to compute for datasets made up of many files. Memcache needs to be
# disabled for testing as it breaks tests which change the config. It can also
# be disabled if not installed for local development.
if os.environ.get("DISABLE_MEMCACHE"):
    cache = Cache(config={"CACHE_TYPE": "null", "CACHE_NO_NULL_WARNING": True})
else:
    cache = Cache(
        config={
            "CACHE_TYPE": "memcached",
            "CACHE_MEMCACHED_SERVERS": [MEMCACHED_SOCKET],
            "CACHE_DEFAULT_TIMEOUT": 0,
        }
    )
cache.init_app(app)


@cache.cached(key_prefix="_load_config")
def _load_config():
    """Config file as a dict.

    Returns:
        Config dict.
    """
    return config.load_config()


# Supporting CORSs enables browsers to make XHR requests.
@app.after_request
def apply_cors(response):
    try:
        if _load_config()["access_control_allow_origin"]:
            response.headers["access-control-allow-origin"] = _load_config()[
                "access_control_allow_origin"
            ]
    except config.ConfigError:
        # If the config isn't loading, allow the request to complete without
        # CORS so user can see error message.
        pass

    return response


class ClientError(ValueError):
    """Invalid input data.

    A 400 error should be raised. The error message should be safe to pass
    back to the client.
    """

    pass


def _validate_interpolation(method):
    """Check the interpolation method is supported.

    Args:
        method: Name of the interpolation method.

    Raises:
        ClientError: Method is not supported.
    """

    if method not in backend.INTERPOLATION_METHODS:
        msg = f"Invalid interpolation method '{method}' not recognized."
        msg += " Valid interpolation methods: "
        msg += ", ".join(backend.INTERPOLATION_METHODS.keys()) + "."
        raise ClientError(msg)
    return method


def _parse_locations(locations, max_n_locations):
    """Parse and validate the locations GET argument.

    The "locations" argument of the query should be "lat,lon" pairs delimited
    by "|" characters, or a string in Google polyline format.


    Args:
        locations: The location query string.
        max_n_locations: The max allowable number of locations, to keep query times reasonable.

    Returns:
        lats: List of latitude floats.
        lons: List of longitude floats.

    Raises:
        ClientError: If too many locations are given, or if the location string can't be parsed.
    """
    if not locations:
        msg = "No locations provided."
        msg += " Add locations in a query string: ?locations=lat1,lon1|lat2,lon2."
        raise ClientError(msg)

    if "," in locations:
        return _parse_latlon_locations(locations, max_n_locations)
    else:
        return _parse_polyline_locations(locations, max_n_locations)

def _parse_region (locations, max_n_locations):
    if not locations:
        msg = "No locations provided."
        msg += " Add region in a query string: ?region=lat1,lon1;lat2,lon2;nx,ny."
        raise ClientError(msg)
    locations = locations.strip(";").split(";")
    if (len(locations) != 3) : msg='Not an appropriate region command: region=lat1,lon1;lat2,lon2;nx,ny' ;

    #if n_locations > max_n_locations:
    #    msg = f"Too many locations provided ({n_locations}), the limit is {max_n_locations}."
    #    raise ClientError(msg)

    parts = locations[0].split(",", 1)
    try:
        lat1 = float(parts[0]) ;
        long1 = float(parts[1]) ;
    except ValueError:
        msg = f"Unable to parse location '{locations[0]}'."
        raise ClientError(msg)

    parts = locations[1].split(",", 1)
    try:
        lat2 = float(parts[0]) ;
        long2 = float(parts[1]) ;
    except ValueError:
        msg = f"Unable to parse location '{locations[0]}'."
        raise ClientError(msg)

    parts = locations[2].split(",", 1)
    try:
        nx = int(parts[0]) ;
        ny = int(parts[1]) ;
    except ValueError:
        msg = f"Unable to parse nx or ny '{locations[0]}'."
        raise ClientError(msg)

    # Check bounds.
    if not (LAT_MIN <= lat1 <= LAT_MAX):
        msg = f"Unable to parse location '{lat1}'."
        msg += f" Latitude must be between {LAT_MIN} and {LAT_MAX}."
        msg += " Provide locations in lat,lon order."
        raise ClientError(msg)
    if not (LAT_MIN <= lat2 <= LAT_MAX):
        msg = f"Unable to parse location '{lat2}'."
        msg += f" Latitude must be between {LAT_MIN} and {LAT_MAX}."
        msg += " Provide locations in lat,lon order."
        raise ClientError(msg)
    if not (LON_MIN <= long1 <= LON_MAX):
        msg = f"Unable to parse location '{long1}'."
        msg += f" Longitude must be between {LON_MIN} and {LON_MAX}."
        raise ClientError(msg)
    if not (LON_MIN <= long2 <= LON_MAX):
        msg = f"Unable to parse location '{long2}'."
        msg += f" Longitude must be between {LON_MIN} and {LON_MAX}."
        raise ClientError(msg)
    if nx<2:
        msg = f"Unable to parse location '{nx}'."
        msg += f" Longitude must be between {LON_MIN} and {LON_MAX}."
        raise ClientError(msg)
    if ny<2:
        msg = f"Unable to parse location '{ny}'."
        msg += f" Longitude must be between {LON_MIN} and {LON_MAX}."
        raise ClientError(msg)

    dx = (lat2-lat1)/(nx-1)
    dy = (long2-long1)/(ny-1)
    lats = []
    lons = []
    for j in range(ny):
        lats.extend([lat1 + i*dx for i in range(nx)])
        lons.extend([long1 + j*dy for i in range(nx)])

    if len(lats) > max_n_locations:
        msg = f"Too many locations provided ({len(lats)}), the limit is {max_n_locations}."
        raise ClientError(msg)

    return lats, lons


def _parse_polyline_locations(locations, max_n_locations):
    """Parse and validate locations in Google polyline format.

    The "locations" argument of the query should be a string of ascii characters above 63.


    Args:
        locations: The location query string.
        max_n_locations: The max allowable number of locations, to keep query times reasonable.

    Returns:
        lats: List of latitude floats.
        lons: List of longitude floats.

    Raises:
        ClientError: If too many locations are given, or if the location string can't be parsed.
    """

    # The Google maps API prefixes their polylines with 'enc:'.
    if locations and locations.startswith("enc:"):
        locations = locations[4:]

    try:
        latlons = polyline.decode(locations)
    except Exception as e:
        msg = "Unable to parse locations as polyline."
        raise ClientError(msg)

    # Polyline result in in list of (lat, lon) tuples.
    lats = [p[0] for p in latlons]
    lons = [p[1] for p in latlons]

    # Check number.
    n_locations = len(lats)
    if n_locations > max_n_locations:
        msg = f"Too many locations provided ({n_locations}), the limit is {max_n_locations}."
        raise ClientError(msg)

    return lats, lons


def _parse_latlon_locations(locations, max_n_locations):
    """Parse and validate "lat,lon" pairs delimited by "|" characters.


    Args:
        locations: The location query string.
        max_n_locations: The max allowable number of locations, to keep query times reasonable.

    Returns:
        lats: List of latitude floats.
        lons: List of longitude floats.

    Raises:
        ClientError: If too many locations are given, or if the location string can't be parsed.
    """

    # Check number of points.
    locations = locations.strip("|").split("|")
    n_locations = len(locations)
    if n_locations > max_n_locations:
        msg = f"Too many locations provided ({n_locations}), the limit is {max_n_locations}."
        raise ClientError(msg)

    # Parse each location.
    lats = []
    lons = []
    for i, loc in enumerate(locations):
        if "," not in loc:
            msg = f"Unable to parse location '{loc}' in position {i+1}."
            msg += " Add locations like lat1,lon1|lat2,lon2."
            raise ClientError(msg)

        # Separate lat & lon.
        parts = loc.split(",", 1)
        lat = parts[0]
        lon = parts[1]

        # Cast to numeric.
        try:
            lat = float(lat)
            lon = float(lon)
        except ValueError:
            msg = f"Unable to parse location '{loc}' in position {i+1}."
            raise ClientError(msg)

        # Check bounds.
        if not (LAT_MIN <= lat <= LAT_MAX):
            msg = f"Unable to parse location '{loc}' in position {i+1}."
            msg += f" Latitude must be between {LAT_MIN} and {LAT_MAX}."
            msg += " Provide locations in lat,lon order."
            raise ClientError(msg)
        if not (LON_MIN <= lon <= LON_MAX):
            msg = f"Unable to parse location '{loc}' in position {i+1}."
            msg += f" Longitude must be between {LON_MIN} and {LON_MAX}."
            raise ClientError(msg)

        lats.append(lat)
        lons.append(lon)

    return lats, lons

@cache.cached(key_prefix="_load_datasets")
def _load_datasets():
    """Load datasets defined in config

    Returns:
        Dict of {dataset_name: config.Dataset object} items.
    """
    return config.load_datasets()


def _get_dataset(name):
    """Retrieve a dataset with error handling.

    Args:
        name: Dataset name string (as used in request url and config file).

    Returns:
        config.Dataset object.

    Raises:
        ClientError: If the name isn't defined in the config.
    """
    datasets = _load_datasets()
    if name not in datasets:
        raise ClientError(f"Dataset '{name}' not in config.")
    return datasets[name]


@app.route("/")
@app.route("/v1/")
def get_help_message(methods=["GET", "OPTIONS", "HEAD"]):
    # msg = "No dataset name provided."
    # msg += " Try a url like '/v1/test-dataset?locations=-10,120' to get started,"
    # msg += " and see https://www.opentopodata.org for full documentation."
    # return jsonify({"status": "INVALID_REQUEST", "error": msg}), 404
    return render_template("index.html")


@app.route("/health")
def get_health_status(methods=["GET", "OPTIONS", "HEAD"]):
    """Status endpoint for e.g., uptime check or load balancing."""
    try:
        _load_config()
        data = {"status": "OK"}
        return jsonify(data)
    except Exception:
        data = {"status": "SERVER_ERROR"}
        return jsonify(data), 500



@app.route("/elevation", methods=["GET", "OPTIONS", "HEAD"])
def get_elevation_auto(status='OK'):
    """Calculate the elevation for the given locations.

    Args:
        dataset_name: String matching a dataset in the config file.

    Returns:
        Response.
    """

    try:
        # Parse inputs.
        interpolation = request.args.get("interpolation", DEFAULT_INTERPOLATION_METHOD)
        interpolation = _validate_interpolation(interpolation)
        locations = request.args.get("locations")
        if locations==None :
            locations = request.args.get("region")
            lats, lons = _parse_region (locations, _load_config()["max_locations_per_request"])
        else:
            lats, lons = _parse_locations(
                locations, _load_config()["max_locations_per_request"]
            )
            #data = {"status": "FAIL", "reason": "supports only region"}
            #return jsonify(data)

        # Get the z values.
        #dataset = _get_dataset(dataset_name)
        datasets = _load_datasets()
        numdatasets = len(list(datasets)) ;
        if 'maxres' in request.args:
            i=0
        else if 'dataset' in request.args:
            reqdataset = request.args.get("dataset")
            for i in range(0, numdatasets):
                if (datasets[list(datasets)[i]].name == reqdataset):
                    break;
            i=i-1 ; 
            if i<0: i=0 ; 
            
        else
            minres = min (abs(lats[1]-lats[0]), abs(np.unique(lons)[1]-np.unique(lons)[0])) * 3600 ; 
            for i in range(0, numdatasets):
                if (datasets[list(datasets)[i]].resolution > minres):
                    break;
            i=i-1 ; 
            if i<0: i=0 ; 
        
        keepgoing = True ; 
        while keepgoing:
            try: 
                elevations = backend.get_elevation(lats, lons, datasets[list(datasets)[i]], interpolation)
            except (ClientError, backend.InputError) : 
                i = i+1
                continue ;
            datasetused = list(datasets)[i]
            
            if [elevations[i]==elevations[i] for i in range(len(elevations))].count(False):
                i = i+1 ; 
            else :
                keepgoing = False ; 
            if i>=numdatasets : 
                status = 'MISSING DATA' ; 
                keepgoing = False ; 

            if i<numdatasets-1 and [elevations[i]==elevations[i] for i in range(len(elevations))].count(False): # of nans
                return(get_elevation('srtm30m', status='FALLBACK')) ;

        ## Build response.
        results = []
        if 'verbose' in request.args:
            for z, lat, lon in zip(elevations, lats, lons):
                results.append({"elevation": z, "location": {"lat": lat, "lng": lon}})
        else:
            results.append({"elevation": elevations})
                
        data = {"status": status, "dataset": datasetused, "results": results}
        return jsonify(data)

    except (ClientError, backend.InputError) as e:
        return jsonify({"status": "INVALID_REQUEST", "error": str(e)}), 400
    except config.ConfigError as e:
        return (
            jsonify({"status": "SERVER_ERROR", "error": "Config Error: {}".format(e)}),
            500,
        )
    except Exception as e:
        if app.debug:
            raise e
        app.logger.error(e)
        msg = "Server error, please retry request."
        return jsonify({"status": "SERVER_ERROR", "error": msg}), 500


@app.route("/v1/<dataset_name>", methods=["GET", "OPTIONS", "HEAD"])
def get_elevation(dataset_name, status='OK'):
    """Calculate the elevation for the given locations.

    Args:
        dataset_name: String matching a dataset in the config file.

    Returns:
        Response.
    """

    try:
        # Parse inputs.
        interpolation = request.args.get("interpolation", DEFAULT_INTERPOLATION_METHOD)
        interpolation = _validate_interpolation(interpolation)
        locations = request.args.get("locations")
        if locations==None :
            locations = request.args.get("region")
            lats, lons = _parse_region (locations, _load_config()["max_locations_per_request"])
        else:
            lats, lons = _parse_locations(
                locations, _load_config()["max_locations_per_request"]
            )

        # Get the z values.
        dataset = _get_dataset(dataset_name)
        elevations = backend.get_elevation(lats, lons, dataset, interpolation)

        if dataset_name != 'srtm30m' and [elevations[i]==elevations[i] for i in range(len(elevations))].count(False): # of nans
            return(get_elevation('srtm30m', status='FALLBACK')) ;

        # Build response.
        results = []
        if 'verbose' in request.args:
            for z, lat, lon in zip(elevations, lats, lons):
                results.append({"elevation": z, "location": {"lat": lat, "lng": lon}})
        else:
            results.append({"elevation": elevations})
        data = {"status": status, "results": results}
        return jsonify(data)

    except (ClientError, backend.InputError) as e:
        return jsonify({"status": "INVALID_REQUEST", "error": str(e)}), 400
    except config.ConfigError as e:
        return (
            jsonify({"status": "SERVER_ERROR", "error": "Config Error: {}".format(e)}),
            500,
        )
    except Exception as e:
        if app.debug:
            raise e
        app.logger.error(e)
        msg = "Server error, please retry request."
        return jsonify({"status": "SERVER_ERROR", "error": msg}), 500
