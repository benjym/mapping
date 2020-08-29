// var map = L.map('map', {
//     center: [51.505, -0.09],
//     zoom: 13,
// });
var mymap = L.map('map').setView([-33.8913388,151.1939964], 17);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'benjymarks/ckedsq0fw08kg19pbpiuj5zmn',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiYmVuanltYXJrcyIsImEiOiJjand1M3BhanowOGx1NDlzMWs0bG0zNnpyIn0.OLLoUOjLUhcKoAVX1JKVdw'
}).addTo(mymap);

var marker = L.marker([-33.891,151.1935]).addTo(mymap);
var colors = ['#ff0000','#00ff00','#0000ff','#00ffff','#ff00ff','#ffff00','#ffffff','#000000'];
var legend_div;
var polygons = [];//.addTo(mymap);
var u = [1,0];
var Iy = [ -1.104, -1.634,-2.054 ,-2.555 ,-2.754 ,-3.143 ];
var Jy = [ 0.9878,  1.035,1.0231 ,1.0423 ,1.0106 ,1.0148 ];
var Ky = [-0.0076,-0.0096,-0.0076,-0.0087,-0.0064,-0.0070];
var Iz = [  4.679, -1.999,-2.341 ,-3.186 ,-3.783 ,-4.490 ];
var Jz = [-1.7172, 0.8752,0.9477 ,1.1737 ,1.3010 ,1.4024 ];
var Kz = [ 0.2770, 0.0136,-0.0020,-0.0316,-0.0450,-0.0540];



function onMapClick(e) {
    marker.setLatLng(e.latlng);
    redrawContours();
}

mymap.on('click', onMapClick);

function transpose(a) {
    return a[0].map(function (_, c) { return a.map(function (r) { return r[c]; }); });
}

// d3.json("result.geojson", function(error, json) {
// var polygons1 = [];
// json.features.map(function(poly,i){
//   if(poly.geometry.type=='MultiPolygon')
//     var polygon = L.multiPolygon(poly.geometry.coordinates.map(function(d){return mapPolygon(d)}), {color: '#f00', weight:'2px'}).addTo(map);
//   else if(poly.geometry.type=='Polygon')
//     var polygon = L.polygon(mapPolygon(poly.geometry.coordinates), {color: '#f00', weight:'2px'}).addTo(map);
//
//   //overlays["Polygon ("+poly.properties.GEN+")"] = polygon;
//   polygons1.push(polygon)
// })
//
// overlays["Original Polygons"]=polygons1;
//
// function mapPolygon(poly){
//   return poly.map(function(line){return mapLineString(line)})
// }
// function mapLineString(line){
//   return line.map(function(d){return [d[1],d[0]]})
// }
// });

// d3.json("result_smooth_0.1.geojson", function(error, json) {
// var polygons2 = [];
// json.features.map(function(poly,i){
//   if(poly.geometry.type=='MultiPolygon')
//     var polygon = L.multiPolygon(poly.geometry.coordinates.map(function(d){return mapPolygon(d)}), {color: '#0f0', weight:'1px'}).addTo(map);
//   else if(poly.geometry.type=='Polygon')
//     var polygon = L.polygon(mapPolygon(poly.geometry.coordinates), {color: '#0f0', weight:'1px'}).addTo(map);
//
//   //overlays["Polygon ("+poly.properties.GEN+")"] = polygon;
//   polygons2.push(polygon)
// })
// overlays["Smoothed Polygons"]=polygons2;
// L.control.layers(baseLayers, overlays).addTo(map);
//
// function mapPolygon(poly){
//   return poly.map(function(line){return mapLineString(line)})
// }
// function mapLineString(line){
//   return line.map(function(d){return [d[1],d[0]]})
// }
// });


function redrawContours() {
    // latlng = marker.
    console.log();
    if ( polygons !== undefined ) {
        for (var i=0; i<polygons.length; i++ ) {
            polygons[i].remove();
        }
        polygons = [];
    }
    var si = stability.selectedIndex;
    var dx = 1.0;
    var H = parseFloat(h.value);
    var z = parseFloat(delta.value);
    var U = Math.sqrt(u[0]*u[0] + u[1]*u[1]);
    var theta = -Math.atan2(u[1],u[0]);
    // var concs = [1e-2,1e1,1e0,1e1,1e2];
    // console.
    var concs = concentration_contours.value.split(';');

    for (var i=0; i<concs.length; i++ ) {
        var conc = parseFloat(concs[i]);
        var col = colors[i];
        var x_p_vertices = [];
        var x_m_vertices = [];
        var y_p_vertices = [];
        var y_m_vertices = [];
        var x = 0.0;
        var valid = true;
        while ( valid ) {
            var lnx = Math.log(x);
            var sigma_y = Math.exp(Iy[si] + Jy[si]*lnx + Ky[si]*lnx*lnx);
            var sigma_z = Math.exp(Iz[si] + Jz[si]*lnx + Kz[si]*lnx*lnx);
            x += dx;
            var RHS = conc/parseFloat(q.value)*2*Math.PI*U*sigma_y*sigma_z*(Math.exp(-(z-H)*(z-H)/2/sigma_z/sigma_z) + Math.exp(-(z+H)*(z+H)/2/sigma_z/sigma_z) );
            var y_plus = Math.sqrt(-sigma_y*sigma_y*Math.log(RHS))
            // console.log(y_plus)
            if ( isNaN(y_plus) && x > 1000 ) { // HACK: SHOULD CHECK FOR MAX VALUE AT GROUND LEVEL INSTEAD USING KNOWN FORMULA
                valid = false;
            }
            else if ( isFinite(y_plus) ) {
                lat_p = marker._latlng.lat + (-x*Math.sin(theta) + y_plus*Math.cos(theta))/111111.;
                lon_p = marker._latlng.lng + ( x*Math.cos(theta) + y_plus*Math.sin(theta))/(111111.*Math.cos(marker._latlng.lat*Math.PI/180.));

                lat_m = marker._latlng.lat + (-x*Math.sin(theta) - y_plus*Math.cos(theta))/111111.;
                lon_m = marker._latlng.lng + ( x*Math.cos(theta) - y_plus*Math.sin(theta))/(111111.*Math.cos(marker._latlng.lat*Math.PI/180.));
                // console.log(lat_p);
                // console.log(lat_m);
                // console.log(lon_p);
                // console.log(lon_m);
                // var lat = marker._latlng.lat + x/111111.; // approximate conversion factor
                // var lon_p = marker._latlng.lng + y_plus/(111111.*Math.cos(marker._latlng.lat)); // FIX THIS!!!!
                // var lon_m = marker._latlng.lng - y_plus/(111111.*Math.cos(marker._latlng.lat)); // FIX THIS!!!!

                x_p_vertices.push(lat_p);
                x_m_vertices.push(lat_m);
                y_p_vertices.push(lon_p);
                y_m_vertices.push(lon_m);
            }
        }
        // var x_rev =
        var x_all = x_p_vertices.concat(x_m_vertices.reverse());
        var y_all = y_p_vertices.concat(y_m_vertices.reverse());
        polygons.push(L.polygon(transpose([x_all,y_all]), {
            color: col,
        }).addTo(mymap));
        // console.log(transpose([x_all,y_all]))
    }
    legend_div.innerHTML = "<h4>Concentration</h4>";
    for (var i=0; i<concs.length; i++ ) {
        legend_div.innerHTML += '<i style="background: ' + colors[i] + '"></i><span>' + concs[i] + ' &micro;g/m<sup>3</sup></span><br>';
    }
}

/*Legend specific*/
var legend = L.control({ position: "topright" });

legend.onAdd = function(map) {
  legend_div = L.DomUtil.create("div", "legend");
  var concs = concentration_contours.value.split(';');

  legend_div.innerHTML += "<h4>Concentration</h4>";
  for (var i=0; i<concs.length; i++ ) {
      legend_div.innerHTML += '<i style="background: ' + colors[i] + '"></i><span>' + concs[i] + ' &micro;g/m<sup>3</sup></span><br>';
  }



  return legend_div;
};

legend.addTo(mymap);



// MAKE WIND ROSE ETC BELOW HERE


var c = document.getElementById("wind_rose");
var ctx = c.getContext("2d");
draw_bg();

function draw_bg() {

    for (i=0;i<5;i++) {
        ctx.beginPath();
        ctx.arc(c.width/2,c.height/2,i*c.width/8.5+1,0,2*Math.PI);
        ctx.stroke();
    }

    ctx.font = "30px Arial";
    ctx.fillStyle = 'black';
    ctx.fillText("N",c.width/2-10,25);
    ctx.fillText("S",c.width/2-10,c.height-5);
    ctx.fillText("W",0,c.height/2+5);
    ctx.fillText("E",c.height-20,c.height/2+5);

    ctx.font = "16px Arial";
    // ctx.fillText("40 km/h",410,c.height-410);
    // ctx.fillText("30",370,c.height-370);
    // ctx.fillText("20",330,c.height-330);
    var dx = 0.085;
    ctx.fillText("5",      1*dx*c.width + c.width/2.,-1*dx*c.height + c.height/2.);
    ctx.fillText("10",      2*dx*c.width + c.width/2.,-2*dx*c.height + c.height/2.);
    ctx.fillText("15",      3*dx*c.width + c.width/2.,-3*dx*c.height + c.height/2.);
    ctx.fillText("20 km/h", 4*dx*c.width + c.width/2.,-4*dx*c.height + c.height/2.);
}

function getCursorPosition(c, event) {
    var rect = c.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    return [x, y];
}

c.addEventListener('click', function(evt) {
    ctx.clearRect(0,0,c.width,c.height);
    draw_bg();
    xy = getCursorPosition(c, evt);
    ctx.beginPath();
    ctx.arc(xy[0],xy[1],10,0,2*Math.PI);
    var U = Math.sqrt(Math.pow(xy[0]-(c.width/2.),2)+Math.pow(xy[1]-(c.height/2.),2),0.5)/(c.width/2.);
    var alpha = U + 0.1;
    ctx.fillStyle = 'rgba(255,0,0,' + alpha + ')';
    // ctx.fillStyle = 'rgba(100,200,0,1)';
    if ( U <= 0.95 ) { ctx.fill(); }
    xy[0] = (xy[0]-c.width/2.0)/(c.width/2.0)*20.0*0.28 ; // in m/s
    xy[1] = -(xy[1]-c.height/2.0)/(c.height/2.0)*20.0*0.28 ; // in m/s
    // var ux = document.getElementById("ux");
    // var uy = document.getElementById("uy");
    // ux.value = xy[0];
    // uy.value = xy[1];
    u = xy;
    redrawContours();
    // console.log("ux: " + ux + " uy: " + uy + ' ' + U/40.);
    }, false);

// At z=0 (ground surface),
// c(x,y) = Q*exp( -y^2/(2*sigma_y^2) - H^2/(2*sigma_z^2) )/(pi*sigma_y*sigma_z*u)
// need parameters Q, u, sigma_y, sigma_z
// Q from user input
// u from wind rose
// sigma_y and sigma_z from here: http://dii.unipd.it/-paolo.canu/files/FdT/Point%20Source%20Dispersion%20Parameters.pdf
// need stability criteria from user input

// var d = document.getElementById("positional");
// var dtx = d.getContext("2d");
// draw_bg_d();

function draw_bg_d() {
    dtx.beginPath();
    dtx.fillStyle = "white";
    dtx.fillRect(20,20,d.width-20,d.height-20);
    dtx.rect(20,20,d.width-20,d.height-20);
    dtx.stroke();
}

function getCursorPosition_d(d, event) {
    var rect = d.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;

    return [x, y];
}

// d.addEventListener('click', function(evt) {
//     dtx.clearRect(0,0,d.width,d.height);
//     draw_bg_d();
//     xy = getCursorPosition(d, evt);
//     if ( (xy[0] > 20) && (xy[0] < d.width - 20) ) {
//         if ( (xy[1] > 20) && (xy[1] < d.height - 20) ) {
//             dtx.beginPath();
//             dtx.arc(xy[0],xy[1],10,0,2*Math.PI);
//             dtx.fillStyle = 'rgba(255,0,0,1)';
//             dtx.fill();
//             xy[0] = (xy[0] - 20)/(d.width - 40); // rescale to the range 0-1
//             xy[1] = 1.0 - (xy[1] - 20)/(d.height - 40); // rescale to the range 0-1 --- PROBABLY UPSIDE DOWN!
//             document.getElementById("xc").value = xy[0];
//             document.getElementById("yc").value = xy[1];
//             console.log("xc: " + xy[0] + " yc: " + xy[1]);
//             }
//         }
//     }, false);

// At z=0 (ground surface),
// c(x,y) = Q*exp( -y^2/(2*sigma_y^2) - H^2/(2*sigma_z^2) )/(pi*sigma_y*sigma_z*u)
// need parameters Q, u, sigma_y, sigma_z
// Q from user input
// u from wind rose
// sigma_y and sigma_z from here: http://dii.unipd.it/-paolo.canu/files/FdT/Point%20Source%20Dispersion%20Parameters.pdf
// need stability criteria from user input
