var topo_server = 'https://api.opentopodata.org/v1/srtm30m?';
// var topo_server = 'http://localhost:5000/v1/srtm30m/?'
var proxy_server = 'https://cors-anywhere.herokuapp.com/';

var map = L.map('map', {
    // crs: L.CRS.EPSG4326,
});

L.control.scale({ position: "bottomright" }).addTo(map); // add scale bar

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a> | Brought together by <a href="https://www.benjymarks.com">Benjy Marks</a>',
    maxZoom: 22,
    id: 'benjymarks/ckekrzken0dfj19nt7y93p671',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiYmVuanltYXJrcyIsImEiOiJjand1M3BhanowOGx1NDlzMWs0bG0zNnpyIn0.OLLoUOjLUhcKoAVX1JKVdw'
}).addTo(map);

// document.querySelector('#stability').addEventListener('change', (event) => {
  // redrawSection();
// });
// document.querySelector('.updater').addEventListener('change', (event) => {
//   redrawSection();
// });

document.getElementById('stability').addEventListener('change', (event) => {
    console.log(stability.value)
  if ( stability.value === 'infinite' )  {
      var text = 'Rock depth d (m)';
  }
  else {
      var text = 'DH (m)';
  }
  document.getElementById('rock-depth').innerHTML = text;
});

var slope_stab_model;
var marker_size = 60;
var top_icon = L.icon({
    iconUrl: 'marker2.png',
    iconSize:     [marker_size, marker_size], // size of the icon
    iconAnchor:   [marker_size/2, marker_size], // point of the icon which will
});
var bottom_icon = L.icon({
    iconUrl: 'marker3.png',
    iconSize:     [marker_size, marker_size], // size of the icon
    iconAnchor:   [marker_size/2, marker_size], // point of the icon which will
});

var top_marker_color = '#894dff';
var bottom_marker_color = '#ffcfff';

var top_marker = L.marker([-34.33606548328852,150.88733074376404],{
    icon:top_icon
}).addTo(map);
var bottom_marker = L.marker([-34.33680965830653,150.88973520047998],{
    icon:bottom_icon
}).addTo(map);

map.setView([(top_marker._latlng.lat + bottom_marker._latlng.lat)/2.,(top_marker._latlng.lng + bottom_marker._latlng.lng)/2.], 15)

var polyline = L.polyline([top_marker._latlng,bottom_marker._latlng], {
    color: '#363636',
    weight: 5,
    // stroke: true,
    // opacity: 1.0,
    // fill: true,
    // className: 'fake_class'
}).addTo(map);

var colors = ['#1f77b4','#ff7f0e','#2ca02c','#d62728','#9467bd','#8c564b','#e377c2','#7f7f7f','#bcbd22','#17becf','#1f77b4','#ff7f0e','#2ca02c','#d62728','#9467bd','#8c564b','#e377c2','#7f7f7f','#bcbd22','#17becf','#1f77b4','#ff7f0e','#2ca02c','#d62728','#9467bd','#8c564b','#e377c2','#7f7f7f','#bcbd22','#17becf']; // lots of colours :)
var legend_div;
var line, xScale, yScale;
var x_initial = [0,4.81166613515711,9.623331503700316,14.434996111070838,19.246659954547116,24.058323033851217,28.869985347093472,33.68164689888321,38.49330768677618,43.304967710494424,48.1166269681483,52.928285464347134,57.73994319636933,62.55160016476889,67.36325636682425,72.17491180714474,76.98656648384065,81.79822039419047,86.60987354280351,91.42152592779006,96.23317754887228,101.04482840360583,105.85647849660009,110.66812782596533,115.47977639142367,120.29142419025352,125.10307122789612,129.91471750162995,134.72636301117697,139.5380077546476,144.34965173665114,149.16129495474334,153.97293740864623,158.7845790964702,163.59622002282453,168.4078601849877,173.21949958107004,178.03113821568084,182.84277608609847,187.65441319287706,192.466049533295,197.27768511196155,202.08931992698712,206.90095397809364,211.712587262837,216.52421978582652,221.3358515451724,226.14748254059685,230.95911276937824,235.77074223695774];
var y_initial = [352,351,351,351,351,350,350,349,347,346,344,341,338,336,333,330,327,325,322,320,318,315,313,311,309,307,305,303,301,299,296,294,292,289,286,284,281,278,276,273,271,269,267,265,264,262,261,260,258,257];
var elev = x_initial.map(function(d, i) { return {"x": d, "y": y_initial[i] } });

var n = 50; // number of points on elevation graph
var margin = {top: 10, right: 30, bottom: 40, left: 45}
var svg, dataset;
var fos = 1;
var width = document.getElementById("section").clientWidth - 40;
var height = document.getElementById("section").clientHeight - 40;

var elements = document.getElementsByClassName("updater");
Array.from(elements).forEach(function(element) {
      element.addEventListener('change', update_FoS);
    });
document.getElementById("download").addEventListener('click', download_data);


function download_data() {
    var csv = elev.map(function(d){
                                return d.x.toString()+','+d.y.toString()
                            }).join('\n');
    console.log(csv);
    // var encodedUri =
    // window.open( encodeURI(csv) );
    var link = document.getElementById("download");
    link.setAttribute("href", encodeURI("data:text/csv;charset=utf-8,Distance (m),Elevation (m)\n"+csv));
    console.log(link) ;
    // link.setAttribute("download", "my_data.csv");
    // document.body.appendChild(link); // Required for FF
    // link.click(); // This will download the data file named "my_data.csv".

}

// console.log(link)


async function init() {
    updateWindow();
    redrawSection();
    initialiseElevationGraph();
    // getElevationData();
    // return await "initialised";
}

window.onload = function() {
    init().then(e => {
        // console.log(e)
        update_FoS();
    });
}


function update_FoS() {
    import("./slope-models/"+stability.value+".js").then(module => {
        slope_stab_model = module;
        fos = slope_stab_model.calculateFoS(elev);
        // console.log(fos)
        document.getElementById("FoS").innerHTML = fos.toFixed(2).toString();
    })
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
    polyline.setLatLngs([top_marker.getLatLng(),bottom_marker.getLatLng()]);
    // console.log(polyline);
    redrawSection();
}
function onRightMapClick(e) {
    bottom_marker.setLatLng(e.latlng);
    polyline.setLatLngs([top_marker.getLatLng(),bottom_marker.getLatLng()]);
    redrawSection();
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

  legend_div.innerHTML += "<h4>Legend</h4>";
  legend_div.innerHTML += '<i style="background: ' + top_marker_color + '"></i><span>Top of slope</span><br>';
  legend_div.innerHTML += '<i style="background: ' + bottom_marker_color + '"></i><span>Bottom of slope</span><br>';
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
    var lats = linspace(top_marker._latlng.lat,bottom_marker._latlng.lat,n)
    var lngs = linspace(top_marker._latlng.lng,bottom_marker._latlng.lng,n)
    getElevationData(lats,lngs)
    .then( data => {
        if ( slope_stab_model !== undefined ) {
            fos = slope_stab_model.calculateFoS(elev);
            document.getElementById("FoS").innerHTML = fos.toFixed(2).toString();
        }

    });
}

function updateElevationGraph(l) {
    var t = d3.transition().duration(1000).ease(d3.easeLinear);

    // console.log(l)
    elev = l.map(function(d) { return {"x": haversine(d.location.lat,d.location.lng,l[0].location.lat,l[0].location.lng) , "y": d.elevation } });
    // console.log(elev);
    // console.log(elev.map( function(d) {return d.y.toString() }).join())
    xScale.domain([getMinX(elev),getMaxX(elev)]).range([0, width-margin.left-margin.right]);
    yScale.domain([getMinY(elev),getMaxY(elev)]).range([height-margin.top-margin.bottom, 0]);

    d3.select(".x-axis")
    .transition(t)
    .call(d3.axisBottom(xScale))
    d3.select(".y-axis")
    .transition(t)
    .call(d3.axisLeft(yScale))

    d3.select(".line").transition(t).attr("d", line(elev));
}

function initialiseElevationGraph() {
    updateWindow();
    // 5. X scale will use the index of our data
    xScale = d3.scaleLinear()
        .domain([getMinX(elev),getMaxX(elev)]) // input
        .range([0, width-margin.left-margin.right]); // output

    // 6. Y scale will use the randomly generate number
    yScale = d3.scaleLinear()
        .domain([getMinY(elev),getMaxY(elev)]) // input
        .range([height-margin.top-margin.bottom, 0]); // output

    // 7. d3's line generator
    line = d3.line()
        .x(function(d) { return xScale(d.x); }) // set the x values for the line generator
        .y(function(d) { return yScale(d.y); }) // set the y values for the line generator
        // .curve(d3.curveMonotoneX) // apply smoothing to the line


    svg.select(".x-axis")
        .call(d3.axisBottom(xScale)) // Create an axis component with d3.axisBottom

    svg.select(".y-axis")
        .call(d3.axisLeft(yScale)) // Create an axis component with d3.axisLeft

    svg.select(".x-label")
        .style("text-anchor", "middle")
        .style("fill", "white")
        .style("font-size", "12px")

    svg.select(".y-label")
        .attr("transform", "rotate(-90)")
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .style("fill", "white")
        .style("font-size", "12px")
        .text("Elevation (m)");


    svg.select(".elevation-profile")
        .datum(elev) // 10. Binds data to the line
        .attr("class", "line") // Assign a class for styling
        .attr('fill', 'none')
        .attr('stroke','white')
        .attr('stroke-width','3px')
        // .attr("transform", "translate(0,"+-margin.top+")")
        .attr("d", line); // 11. Calls the line generator

}


function updateWindow(){
    width = document.getElementById("section").clientWidth - 40;
    height = document.getElementById("section").clientHeight - 40;

    svg = d3.select("svg.d3canvas").attr("width", width).attr("height", height);
    svg.select(".axes")
        .attr("transform", "translate("+margin.left+"," + margin.top + ")");
    svg.select(".x-axis")
        .attr("transform", "translate(0," + (height - margin.top - margin.bottom) + ")");
    svg.select(".x-label")
        .attr("transform",
                "translate(" + (width/2 - margin.right) + " ," +
                               (height - margin.top - 2) + ")")
    svg.select(".y-label")
        .attr("x",-height/2.+margin.bottom-margin.top)
        .attr("y",-margin.left)
}

d3.select(window).on('resize.updatesvg', updateWindow);

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
