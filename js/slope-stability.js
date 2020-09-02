var map = L.map('map', {
    // crs: L.CRS.EPSG4326,
}).setView([-33.8913388,151.1939964], 13);

L.control.scale({ position: "bottomright" }).addTo(map); // add scale bar

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a> | Brought together by <a href="https://www.benjymarks.com">Benjy Marks</a>',
    maxZoom: 22,
    id: 'benjymarks/ckekrzken0dfj19nt7y93p671',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiYmVuanltYXJrcyIsImEiOiJjand1M3BhanowOGx1NDlzMWs0bG0zNnpyIn0.OLLoUOjLUhcKoAVX1JKVdw'
}).addTo(map);

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

var top_marker = L.marker([-33.891,151.1935],{
    icon:top_icon
}).addTo(map);
var bottom_marker = L.marker([-33.891,151.198],{
    icon:bottom_icon
}).addTo(map);

var polyline = L.polyline([[-33.891,151.1935],[-33.891,151.198]], {
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
    console.log(polyline);
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



// 2. Use the margin convention practice
var margin = {top: 10, right: 30, bottom: 20, left: 20}
var width = document.getElementById("section").clientWidth - margin.left - margin.right - 40;
var height = document.getElementById("section").clientHeight - margin.top - margin.bottom - 40;

var svg = d3.select("#section").append("svg").attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
redrawSection(); // do it once

function redrawSection() {
    d3.select('path.line').remove();
    d3.select('.xaxis').remove();
    d3.select('.yaxis').remove();
    // d3.select('g').remove();
    // The number of datapoints
    var n = Math.floor(Math.random()*50);
    var dataset = d3.range(n).map(function(d) { return {"y": d3.randomUniform(50)() } })

    // 5. X scale will use the index of our data
    var xScale = d3.scaleLinear()
        .domain([0, n-1]) // input
        .range([0, width]); // output

    // 6. Y scale will use the randomly generate number
    var yScale = d3.scaleLinear()
        // .domain([0, 1]) // input
        // .range([height, 0]); // output

    // 7. d3's line generator
    var line = d3.line()
        .x(function(d, i) { return xScale(i); }) // set the x values for the line generator
        .y(function(d) { return yScale(d.y); }) // set the y values for the line generator
        // .curve(d3.curveMonotoneX) // apply smoothing to the line




    // 3. Call the x axis in a group tag
    svg.append("g")
        .attr("class", "xaxis")
        .attr("transform", "translate("+margin.left+"," + height + ")")
        .call(d3.axisBottom(xScale)); // Create an axis component with d3.axisBottom

    svg.append("text")
        .attr("transform",
                "translate(" + (width/2 + margin.left) + " ," +
                               (height + margin.top + 20) + ")")
        .style("text-anchor", "middle")
        .style("fill", "white")
        .style("font-size", "12px")
        .text("Distance (m)");

    // 4. Call the y axis in a group tag
    svg.append("g")
        .attr("transform", "translate("+margin.left+",0)")
        .attr("class", "yaxis")
        .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft

    // text label for the y axis
    svg.append("text")
        .attr("x",-height/2.)
        .attr("y",-10)
        .attr("transform", "rotate(-90)")
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .style("fill", "white")
        .style("font-size", "12px")
        .text("Elevation (m)");
    // 9. Append the path, bind the data, and call the line generator
    svg.append("path")
        .datum(dataset) // 10. Binds data to the line
        .attr("class", "line") // Assign a class for styling
        .attr('fill', 'none')
        .attr('stroke','white')
        .attr('stroke-width','3px')
        .attr("transform", "translate("+margin.left+",0)")
        .attr("d", line); // 11. Calls the line generator

}

function updateWindow(){
    var x = document.getElementById("section").clientWidth - margin.left - margin.right - 40;
    var y = document.getElementById("section").clientHeight - margin.top - margin.bottom - 40;

    svg.attr("width", x).attr("height", y);
}
d3.select(window).on('resize.updatesvg', updateWindow);
