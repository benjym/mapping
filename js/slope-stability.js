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

var slope_stab_model;
update_FoS();

function update_FoS() {
    import("./slope-models/"+stability.value+".js").then(module => {
        slope_stab_model = module;
        fos = slope_stab_model.calculateFoS(elev);
        console.log(fos)
        document.getElementById("FoS").innerHTML = fos.toFixed(2).toString();
    })
}
var elements = document.getElementsByClassName("updater");
Array.from(elements).forEach(function(element) {
      element.addEventListener('change', update_FoS);
    });

// var wmsLayer = L.tileLayer.wms('http://services.ga.gov.au/gis/services/DEM_LiDAR_5m/MapServer/WMSServer?', {
//     layers: 'Image',
//     opacity: 0.5,
//     transparency: 'true',
// }).addTo(map);
// var wmsLayer = L.tileLayer.wms('http://gaservices.ga.gov.au/site_9/services/DEM_SRTM_1Second_Hydro_Enforced/MapServer/WMSServer?request=GetCapabilities&service=WMS').addTo(map);
// var wmsLayer = L.tileLayer.wms('http://ows.mundialis.de/services/service?', {
//     layers: 'TOPO-WMS'
// }).addTo(map);

var size = 60;
var top_icon = L.icon({
    iconUrl: 'marker2.png',
    iconSize:     [size, size], // size of the icon
    iconAnchor:   [size/2, size], // point of the icon which will
});
var bottom_icon = L.icon({
    iconUrl: 'marker3.png',
    iconSize:     [size, size], // size of the icon
    iconAnchor:   [size/2, size], // point of the icon which will
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


var elev = new Array(50).fill(0).map(function(d, i) { return {"x": i, "y": d } });
var n = 50; // number of points on elevation graph
var margin = {top: 10, right: 30, bottom: 40, left: 45}
var width, height, svg, dataset;
var fos = 1;
width = document.getElementById("section").clientWidth - 40;
height = document.getElementById("section").clientHeight - 40;
updateWindow();
redrawSection(); // do it once


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

var line, xScale, yScale;

function initialiseElevationGraph() {
    updateWindow();
    // 5. X scale will use the index of our data
    xScale = d3.scaleLinear()
        .domain([0, 1]) // input
        .range([0, width-margin.left-margin.right]); // output

    // 6. Y scale will use the randomly generate number
    yScale = d3.scaleLinear()
        .domain([0, 1000]) // input
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
initialiseElevationGraph()


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
