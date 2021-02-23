import { reset_physics, updateGroundPlane } from './rockfall-physics.js';

// var topo_server = 'https://api.opentopodata.org/v1/srtm30m?';
// var topo_server = 'http://localhost:5000/v1/srtm30m/?'
// var proxy_server = 'https://cors-anywhere.herokuapp.com/';
window.proxy_server = '';
window.topo_server = 'http://202.161.83.242:5000/v1/srtm30m?';

var map = L.map('map', {
    // crs: L.CRS.EPSG4326,
});

L.control.scale({ position: "bottomright" }).addTo(map); // add scale bar

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a> | Brought together by <a href="https://www.benjymarks.com">Benjy Marks</a>',
    maxZoom: 22,
    id: 'benjymarks/cklg5u46k5wga17nolopgxzsk',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiYmVuanltYXJrcyIsImEiOiJjand1M3BhanowOGx1NDlzMWs0bG0zNnpyIn0.OLLoUOjLUhcKoAVX1JKVdw'
}).addTo(map);

var marker_size = 60;
var top_icon = L.icon({
    iconUrl: 'marker.png',
    iconSize:     [marker_size, marker_size], // size of the icon
    iconAnchor:   [marker_size/2, marker_size], // point of the icon which will
});

var top_marker_color = '#FFFFFF';
var wall_color = '#E903CD';
window.top_marker = L.marker([-34.33706548328852,150.88733074376404],{
    icon:top_icon
}).addTo(map);

// window.polyline = L.polyline([[-34.33206548328852,150.88733074376404],[-34.33906548328852,150.88733074376404]], {color: wall_color}).addTo(map); // FOR TESTING ONLY
window.polyline = L.polyline([], {color: wall_color}).addTo(map);

map.setView([top_marker._latlng.lat,top_marker._latlng.lng], 16) // zoom the map to the polygon


var colors = ['#1f77b4','#ff7f0e','#2ca02c','#d62728','#9467bd','#8c564b','#e377c2','#7f7f7f','#bcbd22','#17becf','#1f77b4','#ff7f0e','#2ca02c','#d62728','#9467bd','#8c564b','#e377c2','#7f7f7f','#bcbd22','#17becf','#1f77b4','#ff7f0e','#2ca02c','#d62728','#9467bd','#8c564b','#e377c2','#7f7f7f','#bcbd22','#17becf']; // lots of colours :)
var legend_div;
var line, xScale, yScale;
var elev = new Array(50).map(function(d, i) { return {"x": d, "y": y_initial[i] } });

var n = 50; // number of points on elevation graph
var margin = {top: 10, right: 30, bottom: 40, left: 45}
var svg, dataset;
var fos = 1;
// var width = document.getElementById("section").clientWidth - 40;
// var height = document.getElementById("section").clientHeight - 40;

var elements = document.getElementsByClassName("updater");
Array.from(elements).forEach(function(element) {
      element.addEventListener('change', reset_physics);
    });


async function init() {
    // updateWindow();
    // redrawSection();
    // initialiseElevationGraph();
    // getElevationData();
    // return await "initialised";
}

window.onload = function() {
    init().then(e => {
        // console.log(e)
        // update_FoS();
    });
}






// var wmsLayer = L.tileLayer.wms('http://services.ga.gov.au/gis/services/DEM_LiDAR_5m/MapServer/WMSServer?', {
//     layers: 'Image',
//     opacity: 0.5,
//     transparency: 'true',
// }).addTo(map);
// var wmsLayer = L.tileLayer.wms('http://gaservices.ga.gov.au/site_9/services/DEM_SRTM_1Second_Hydro_Enforced/MapServer/WMSServer?request=GetCapabilities&service=WMS').addTo(map);
// var wmsLayer = L.tileLayer.wms('http://ows.mundialis.de/services/service?', {
//     layers: 'TOPO-WMS'
// }).addTo(map);



function onLeftMapClick(e) {
    top_marker.setLatLng(e.latlng);
    // redrawSection();
    reset_physics();
    updateGroundPlane(e.latlng.lat,
                      e.latlng.lng);
}

function onRightMapClick(e) {
    polyline.addLatLng(e.latlng);
    reset_physics();
}

document.addEventListener('keydown', escapeKey);

function escapeKey(e) {
  if (e.key === 'Escape') { // wipe the polyline
      polyline.setLatLngs([]);
      reset_physics();
  };
}

map.on('click', onLeftMapClick);
map.on('contextmenu', onRightMapClick);




function transpose(a) {
    return a[0].map(function (_, c) { return a.map(function (r) { return r[c]; }); });
}

/*Legend specific*/
var legend = L.control({ position: "topright" });

legend.onAdd = function(map) {
  legend_div = L.DomUtil.create("div", "legend");

  // legend_div.innerHTML += "<h4>Legend</h4>";
  legend_div.innerHTML += '<i style="background: ' + top_marker_color + '"></i><span>Rockfall source. Left click to move.</span><br>';
  legend_div.innerHTML += '<i style="background: ' + wall_color + '"></i><span>Barrier. Right click to add. Escape to reset.</span><br>';
  return legend_div;
};

legend.addTo(map);




async function getElevationData(lats,lngs) {
    var locs = ''
    for ( var i=0; i<lats.length; i++ ) {
        locs = locs + String(lats[i]) + ',' + String(lngs[i]) + '|'
    }
    locs = locs.substring(0, locs.length - 1); // remove trailing |
    // fetch(topo_server + "locations="+locs )
    const response = fetch( proxy_server + topo_server + "locations=" + locs, {
        headers: {
      'Content-Type': 'application/json'
    },
    } )
    .then( r => r.json() )
    .then(data => {
      var l = data.results;
      updateElevationGraph(l);
      // console.log(l)
    })

}

function redrawSection() {
    // var lats = linspace(top_marker._latlng.lat,bottom_marker._latlng.lat,n)
    // var lngs = linspace(top_marker._latlng.lng,bottom_marker._latlng.lng,n)
    // getElevationData(lats,lngs)
    // .then( data => {
        // if ( slope_stab_model !== undefined ) {
            // fos = slope_stab_model.calculateFoS(elev);
            // document.getElementById("FoS").innerHTML = fos.toFixed(2).toString();
        // }

    // });
}



function linspace(startValue, stopValue, cardinality) {
  var arr = [];
  var step = (stopValue - startValue) / (cardinality - 1);
  for (var i = 0; i < cardinality; i++) {
    arr.push(startValue + (step * i));
  }
  return arr;
}

function getMinX(data) {
  return data.reduce((min, p) => p.x < min ? p.x : min, data[0].x);
}
function getMaxX(data) {
  return data.reduce((max, p) => p.x > max ? p.x : max, data[0].x);
}
function getMinY(data) {
  return data.reduce((min, p) => p.y < min ? p.y : min, data[0].y);
}
function getMaxY(data) {
  return data.reduce((max, p) => p.y > max ? p.y : max, data[0].y);
}
function haversine(lat1,lon1,lat2,lon2) {
    const R = 6371e3; // metres
    const φ1 = lat1 * Math.PI/180; // φ, λ in radians
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lon2-lon1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const d = R * c; // in metres
    return d
}
