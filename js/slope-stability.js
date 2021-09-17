var urlParams = new URLSearchParams(window.location.search);
if ( urlParams.has("data_source") ) {
    var data_source = urlParams.get("data_source");
}
else {
    var data_source = 'cop30m';
}
if ( urlParams.has("top") ) {
    var initial_top_marker = urlParams.get("top").split(",");
}
else {
    var initial_top_marker = [-34.33606548328852,150.88733074376404];
}
if ( urlParams.has("bot") ) {
    var initial_bot_marker = urlParams.get("bot").split(",");
}
else {
    var initial_bot_marker = [-34.33680965830653,150.88973520047998];
}
window.proxy_server = '';
window.topo_server = 'https://data.scigem.com:5000/elevation?verbose&';//'/' + data_source + '?';
window.topo_server_region = 'https://data.scigem.com:5000/elevation?region='

var cividis=["#002051","#002153","#002255","#002356","#002358","#002459","#00255a","#00255c","#00265d","#00275e","#00275f","#002860","#002961","#002962","#002a63","#002b64","#012b65","#022c65","#032d66","#042d67","#052e67","#052f68","#063069","#073069","#08316a","#09326a","#0b326a","#0c336b","#0d346b","#0e346b","#0f356c","#10366c","#12376c","#13376d","#14386d","#15396d","#17396d","#183a6d","#193b6d","#1a3b6d","#1c3c6e","#1d3d6e","#1e3e6e","#203e6e","#213f6e","#23406e","#24406e","#25416e","#27426e","#28436e","#29436e","#2b446e","#2c456e","#2e456e","#2f466e","#30476e","#32486e","#33486e","#34496e","#364a6e","#374a6e","#394b6e","#3a4c6e","#3b4d6e","#3d4d6e","#3e4e6e","#3f4f6e","#414f6e","#42506e","#43516d","#44526d","#46526d","#47536d","#48546d","#4a546d","#4b556d","#4c566d","#4d576d","#4e576e","#50586e","#51596e","#52596e","#535a6e","#545b6e","#565c6e","#575c6e","#585d6e","#595e6e","#5a5e6e","#5b5f6e","#5c606e","#5d616e","#5e616e","#60626e","#61636f","#62646f","#63646f","#64656f","#65666f","#66666f","#67676f","#686870","#696970","#6a6970","#6b6a70","#6c6b70","#6d6c70","#6d6c71","#6e6d71","#6f6e71","#706f71","#716f71","#727071","#737172","#747172","#757272","#767372","#767472","#777473","#787573","#797673","#7a7773","#7b7774","#7b7874","#7c7974","#7d7a74","#7e7a74","#7f7b75","#807c75","#807d75","#817d75","#827e75","#837f76","#848076","#858076","#858176","#868276","#878376","#888477","#898477","#898577","#8a8677","#8b8777","#8c8777","#8d8877","#8e8978","#8e8a78","#8f8a78","#908b78","#918c78","#928d78","#938e78","#938e78","#948f78","#959078","#969178","#979278","#989278","#999378","#9a9478","#9b9578","#9b9678","#9c9678","#9d9778","#9e9878","#9f9978","#a09a78","#a19a78","#a29b78","#a39c78","#a49d78","#a59e77","#a69e77","#a79f77","#a8a077","#a9a177","#aaa276","#aba376","#aca376","#ada476","#aea575","#afa675","#b0a775","#b2a874","#b3a874","#b4a974","#b5aa73","#b6ab73","#b7ac72","#b8ad72","#baae72","#bbae71","#bcaf71","#bdb070","#beb170","#bfb26f","#c1b36f","#c2b46e","#c3b56d","#c4b56d","#c5b66c","#c7b76c","#c8b86b","#c9b96a","#caba6a","#ccbb69","#cdbc68","#cebc68","#cfbd67","#d1be66","#d2bf66","#d3c065","#d4c164","#d6c263","#d7c363","#d8c462","#d9c561","#dbc660","#dcc660","#ddc75f","#dec85e","#e0c95d","#e1ca5c","#e2cb5c","#e3cc5b","#e4cd5a","#e6ce59","#e7cf58","#e8d058","#e9d157","#ead256","#ebd355","#ecd454","#edd453","#eed553","#f0d652","#f1d751","#f1d850","#f2d950","#f3da4f","#f4db4e","#f5dc4d","#f6dd4d","#f7de4c","#f8df4b","#f8e04b","#f9e14a","#fae249","#fae349","#fbe448","#fbe548","#fce647","#fce746","#fde846","#fde946","#fdea45"]
var cividisrev = [...cividis].reverse();

var map = L.map('map', {
    // crs: L.CRS.EPSG4326,
});

L.control.scale({ position: "bottomright" }).addTo(map); // add scale bar

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a> | Brought together by <a href="https://www.benjymarks.com">Benjy Marks</a> and <a href="http://francoisguillard.com/">François Guillard</a>',
    maxZoom: 22,
    id: 'benjymarks/ckekrzken0dfj19nt7y93p671',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiYmVuanltYXJrcyIsImEiOiJjand1M3BhanowOGx1NDlzMWs0bG0zNnpyIn0.OLLoUOjLUhcKoAVX1JKVdw'
}).addTo(map);

/*L.tileLayer('http://localhost:5001/map/{z}/{x}/{y}.png', {
    maxZoom: 15,
    tileSize: 256,
    zoomOffset: 0,
    opacity:0.7
}).addTo(map);*/

// document.querySelector('#stability').addEventListener('change', (event) => {
  // redrawSection();
// });
// document.querySelector('.updater').addEventListener('change', (event) => {
//   redrawSection();
// });

document.getElementById('stability').addEventListener('change', (event) => {
    console.log(stability.value)
  if ( stability.value === 'infinite' )  {
      document.getElementById('rock-depth').hidden=false ;
      document.getElementById('rock-depth-slider').hidden=false ;
      var text = 'Rock depth d (m)';
      document.getElementById('watertable').hidden=false ;
      document.getElementById('watertable-slider').hidden=false ;
  }
  else if ( stability.value === 'cullman' )
  {
      document.getElementById('rock-depth').hidden=true ;
      document.getElementById('rock-depth-slider').hidden=true ;
      document.getElementById('watertable').hidden=true ;
      document.getElementById('watertable-slider').hidden=true ;
  }
  else { //TAYLOR
      document.getElementById('rock-depth').hidden=false ;
      document.getElementById('rock-depth-slider').hidden=false ;
      var text = 'Rock depth (from slope bottom) (m)';
      document.getElementById('watertable').hidden=true ;
      document.getElementById('watertable-slider').hidden=true ;
  }
  document.getElementById('rock-depth').innerHTML = text;
});


/*function assumptions()
{
  var model = document.getElementById("stability").value
  if (value=="infinite")
    {
      alert("Assumes: \n - Slope is calculated from the full length \n - Dry and water-saturated densities are the same") ;
    }
}*/


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

var top_marker = L.marker(initial_top_marker,{
    icon:top_icon
}).addTo(map);
var bottom_marker = L.marker(initial_bot_marker,{
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
var elements = document.getElementsByClassName("overlayupdater");
Array.from(elements).forEach(function(element) {
      element.addEventListener('change', update_overlay_info);
    });
var mapelements = document.getElementsByClassName("mapupdater");
Array.from(mapelements).forEach(function(mapelement) {
      mapelement.addEventListener('change', update_map);
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

function update_map ()
{
    var lat=document.getElementById("latitude").value ;
    var long=document.getElementById("longitude").value ;
    map.setView([lat, long])
}

function update_FoS() {
    import("./slope-models/"+stability.value+".js").then(module => {
        slope_stab_model = module;
        var n = elev.length ;
        var slope = Math.atan2(Math.abs(elev[0].y - elev[n-1].y), Math.abs(elev[0].x - elev[n-1].x)) ;
        var maxheight = elev[0].y ;
        var minheight = elev[0].y ;
        for (var i = 0 ; i<n ; i++)
        {
            if (maxheight < elev[i].y) maxheight = elev[i].y ;
            if (minheight > elev[i].y) minheight = elev[i].y ;
        }
        var height = maxheight-minheight ;
        fos = slope_stab_model.calculateFoS(slope, height);
        // console.log(fos)
        document.getElementById("FoS").innerHTML = fos.toFixed(2).toString();
        if (fos<1)
          document.getElementById("FoSIndicator").style.color='red'
        else if (fos>1 && fos<2)
          document.getElementById("FoSIndicator").style.color='yellow'
        else
          document.getElementById("FoSIndicator").style.color='green'
    }).then(update_overlay_info()) ;
}


var heatmaplayer ;
var s ;
var gradient=[] ;
var nx=100 ; var ny=75 ;
var elevation ;
var direction=[] ;
var slope=[] ;
var slopefs=[] ;
var height_slope ;
var bounds = map.getBounds() ;
var dy = (bounds._northEast.lat-bounds._southWest.lat)/ny ;
var dx = (bounds._northEast.lng-bounds._southWest.lng)/nx ;
$.ajax({
        type: "GET",
        url: "resources/InitElevation.csv",
        dataType: "text",
        success: function(data) {processData(data);}
     });
function processData(allText) {
    var tmp = allText.split(/,/);
    elevation = [] ;
    for (var i=0; i<tmp.length; i++)
        elevation.push(parseFloat(tmp[i])) ;
    console.log(bounds) ;
    compute_gradient(elevation, map.getCenter(), dx, dy) ;
    compute_height() ;
    console.log(height) ;
}

function update_overlay(array, colorscale)
{
    if (heatmaplayer) map.removeLayer(heatmaplayer) ;
    let p = {
        nCols: nx,
        nRows: ny,
        xllCorner: bounds._southWest.lng,
        yllCorner: bounds._southWest.lat,
        cellXSize: dx,
        cellYSize: dy,
    };
    p.zs = array ;
    var opac = document.getElementById('overlayopacity').value ;

    s = new L.ScalarField(p) ;
    const layvar = L.canvasLayer.scalarField(s, {
                color: colorscale,
                opacity: opac
            });
    heatmaplayer = layvar.addTo(map);
    console.log("done") ;
}

function update_overlay_info ()
{
    //document.getElementById("waitingwheel").hidden = false ;
    bounds = map.getBounds() ;
    var overlaytype = document.getElementById('overlay').value ;

    var CVD = document.getElementById('colourblind').checked ;
    if (overlaytype != "None") 
    {
        var overlaydata ;
        var colorscale ;
        console.log(overlaytype)
        if (overlaytype == "elevation")
        {
            var max_v = elevation.reduce(function(a, b) { return Math.max(a, b);}, 0);
            var min_v = elevation.reduce(function(a, b) { return Math.min(a, b);}, 0);
            if (CVD) {
                document.getElementById('colorbar').src = 'resources/Colorbar-Cividis.png' ; 
                colorscale = chroma.scale(cividis).domain([min_v, max_v]) 
                
            } else {
                document.getElementById('colorbar').src = 'resources/Colorbar-NavyYellow-lch.png' ; 
                colorscale = chroma.scale(['navy','yellow']).mode('lch').domain([min_v, max_v]).correctLightness()
            }
            document.getElementById('colorbar').hidden = false ; 
            document.getElementById('caxis_low').value = Math.round(min_v); document.getElementById('caxis_low').hidden = false ; 
            document.getElementById('caxis_high').value = Math.round(max_v) ; document.getElementById('caxis_high').hidden = false ; 
            console.log(document.getElementById('caxis_high').value)
            update_overlay(elevation, colorscale) ;
        }
        else if (overlaytype=="slpangle")
        {
            if (CVD) {   
                document.getElementById('colorbar').src = 'resources/Colorbar-Cividis.png' ; 
                colorscale = chroma.scale(cividis).domain([0, Math.PI/3.]) 
            } else {
                document.getElementById('colorbar').src = 'resources/Colorbar-NavyYellow-lch.png' ; 
                colorscale = chroma.scale(['navy','yellow']).mode('lch').domain([0, Math.PI/3.]).correctLightness()
            }
            document.getElementById('colorbar').hidden = false ; 
            document.getElementById('caxis_low').value = "0"; document.getElementById('caxis_low').hidden = false ; 
            document.getElementById('caxis_high').value = "60°" ; document.getElementById('caxis_high').hidden = false ; 
            update_overlay(slope, colorscale) ; 
        }
        else if (overlaytype=="slpdirection")
        {
            colorscale = chroma.scale('RdGy').domain([-Math.PI, 0, Math.PI])
            update_overlay(direction, colorscale) ;
        }
        else if (overlaytype=="slpheight")
        {
            console.log(height_slope) ;
            var max_v = height_slope.reduce(function(a, b) { return Math.max(a, b);}, 0);

            if (CVD) {
                document.getElementById('colorbar').src = 'resources/Colorbar-Cividis.png' ; 
                colorscale = chroma.scale(cividis).domain([0, max_v])
            } else {
                colorscale = chroma.scale(['navy','yellow']).mode('lch').domain([0, max_v]).correctLightness()
                document.getElementById('colorbar').src = 'resources/Colorbar-NavyYellow-lch.png' ; 
            }
            document.getElementById('colorbar').hidden = false ; 
            document.getElementById('caxis_low').value = 0; document.getElementById('caxis_low').hidden = false ; 
            document.getElementById('caxis_high').value = Math.round(max_v)+"m" ; document.getElementById('caxis_high').hidden = false ;
            update_overlay(height_slope, colorscale) ; 
        }
        else if (overlaytype == "slpFs")
        {
            //colorscale = chroma.scale(['navy','yellow']).mode('lch').domain([0, 10]).correctLightness()
            if (CVD) {
                document.getElementById('colorbar').src = 'resources/Colorbar-CividisFs.png' ; 
                colorscale = chroma.scale(cividisrev).domain([0., 1., 10.])
            } else {   
                colorscale = chroma.scale(['red','yellow', 'green']).domain([0., 1., 10.])
                document.getElementById('colorbar').src = 'resources/RdYlGr.png' ;
            }
            document.getElementById('colorbar').hidden = false ;  
            document.getElementById('caxis_low').value = "0"; document.getElementById('caxis_low').hidden = false ; 
            document.getElementById('caxis_high').value = "10" ; document.getElementById('caxis_high').hidden = false ; 
            compute_slopefs(colorscale); 
        }
    }
    else
    {
        document.getElementById('colorbar').hidden = true ; 
        document.getElementById('caxis_low').hidden = true ; 
        document.getElementById('caxis_high').hidden = true ; 
        if (heatmaplayer) map.removeLayer(heatmaplayer) ; 
    }
    //document.getElementById("waitingwheel").hidden = true ;
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
map.on('moveend',function(e){
  var location=map.getCenter() ;
  document.getElementById("latitude").value = location.lat.toFixed(5).toString() ;
  document.getElementById("longitude").value = location.lng.toFixed(5).toString() ;
  bounds = map.getBounds() ;
  console.log(map.getCenter()) ;
  //const response = fetch( proxy_server + topo_server_region + bounds._northEast.lat +','+ bounds._northEast.lng+ ';' + bounds._southWest.lat + ',' + bounds._southWest.lng + ';' + ny + ',' + nx + '&reorder' , {}) https://data.scigem.com:5000/
  //document.getElementById("waitingwheel").hidden = false ;
  const response = fetch ('https://data.scigem.com:5000/elevationfast?ne_lat=' + bounds._northEast.lat + '&ne_lng=' + bounds._northEast.lng + '&sw_lat='+ bounds._southWest.lat + '&sw_lng=' + bounds._southWest.lng +'&nx=' + nx + '&ny=' + ny , {})
    .then( r => r.json() )
    .then( data => {
     dy = (bounds._northEast.lat-bounds._southWest.lat)/ny ;
     dx = (bounds._northEast.lng-bounds._southWest.lng)/nx ;

     elevation = data.results[0].elevation ;
     compute_gradient(elevation, map.getCenter(), dx, dy) ;
     compute_height() ;
     console.log("Data loaded") ;
     update_overlay_info() ;
     //document.getElementById("waitingwheel").hidden = true ;
    }) ;
});



function transpose(a) {
    return a[0].map(function (_, c) { return a.map(function (r) { return r[c]; }); });
}

/*Legend specific*/
var legend = L.control({ position: "topright" });

legend.onAdd = function(map) {
  legend_div = L.DomUtil.create("div", "legend");

  legend_div.innerHTML += "<h4>Legend</h4>";
  legend_div.innerHTML += '<i style="background: ' + top_marker_color + '"></i><span>Top of slope (left click)</span><br>';
  legend_div.innerHTML += '<i style="background: ' + bottom_marker_color + '"></i><span>Bottom of slope (right click) </span><br>';
  return legend_div;
};

legend.addTo(map);




async function getElevationData(lats,lngs) {
    var locs = ''
    document.getElementById("waiting").hidden=false
    for ( var i=0; i<lats.length; i++ ) {
        locs = locs + String(lats[i]) + ',' + String(lngs[i]) + '|'
    }
    locs = locs.substring(0, locs.length - 1); // remove trailing |
    // fetch(topo_server + "locations="+locs )
    const response = fetch( proxy_server + topo_server + "locations=" + locs, {
        // headers: {
      // 'Content-Type': 'application/json'
    // },
    } )
    .then( r => r.json() )
    .then(data => {
      var l = data.results;
      updateElevationGraph(l);
      update_FoS() ;
      document.getElementById("waiting").hidden=true
      // console.log(l)
    })

}

function redrawSection() {
    var lats = linspace(top_marker._latlng.lat,bottom_marker._latlng.lat,n)
    var lngs = linspace(top_marker._latlng.lng,bottom_marker._latlng.lng,n)
    getElevationData(lats,lngs)
    .then( data => {
        if ( slope_stab_model !== undefined ) {document.getElementById("waitingwheel").hidden =
            fos = slope_stab_model.calculateFoS(elev);
            document.getElementById("FoS").innerHTML = fos.toFixed(2).toString();
        }

    });
}

function updateElevationGraph(l) {
    var t = d3.transition().duration(1000).ease(d3.easeLinear);
    // console.log(l)
    console.log(l)
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

    // updateElevationGraph();
}


function updateWindow(){
    // console.log('resizing d3 chart')
    width = document.getElementById("wrap").clientWidth - 40 - 40;
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

//=============================================================================
function compute_gradient (elevation, bounds, dx, dy)
{
var dxm=haversine(bounds.lat,bounds.lng, bounds.lat, bounds.lng+dx) ;
var dym=haversine(bounds.lat,bounds.lng, bounds.lat+dy, bounds.lng) ;
for (var i=1 ; i<ny-1 ; i++)
    for (var j=1 ; j<nx-1 ; j++)
    {
        gradient[i*nx*2 + j*2 + 0]=(-elevation[(i-1)*nx + j    ]+elevation[(i+1)*nx + j  ])/(2*dxm) ;
        gradient[i*nx*2 + j*2 + 1]=(-elevation[ i   *nx + (j-1)]+elevation[    i*nx + j+1])/(2*dym) ;
    }

i=0 ;
for (j=1 ; j<nx-1 ; j++)
{
    gradient[i*nx*2 + j*2 + 0]=( elevation[ (i+1)*nx + j ]-elevation[i*nx+j])/dxm ;
    gradient[i*nx*2 + j*2 + 1]=(-elevation[ i*nx + (j-1) ]+elevation[i*nx+(j+1)])/(2*dym) ;
}
i=ny-1 ;
for (j=1 ; j<nx-1 ; j++)
{
    gradient[i*nx*2 + j*2 + 0]=( elevation[i*nx+j]-elevation[(i-1)*nx+j])/dxm ;
    gradient[i*nx*2 + j*2 + 1]=(-elevation[i*nx+(j-1)]+elevation[i*nx+(j+1)])/(2*dym) ;
}
j=0 ;
for (i=1 ; i<ny-1 ; i++)
{
    gradient[i*nx*2 + j*2 + 0]=(-elevation[(i-1)*nx + j]+elevation[(i+1)*nx + j])/(2*dxm) ;
    gradient[i*nx*2 + j*2 + 1]=(elevation[ i*nx + (j+1)]-elevation[ i*nx + j])/(dym) ;
}
j=nx-1 ;
for (i=1 ; i<ny-1 ; i++)
{
    gradient[i*nx*2 + j*2 + 0]=(-elevation[(i-1)*nx+j]+elevation[(i+1)*nx+j])/(2*dxm) ;
    gradient[i*nx*2 + j*2 + 1]=(elevation[i*nx+j]-elevation[i*nx+(j-1)])/(dym) ;
}

// Corners
var x0=0 ; var x1 = ny ; var y0=0 ; var y1 = nx ;
gradient[x0*nx*2+y0*2+0]         = (elevation[(x0+1)*nx+(y0+0)] - elevation[x0*nx + y0]      )/dxm ;
gradient[x0*nx*2+y0*2+1]         = (elevation[(x0+0)*nx+(y0+1)] - elevation[x0*nx + y0]      )/dym ;
gradient[x0*nx*2+(y1-1)*2+0]     = (elevation[(x0+1)*nx+(y1-1)] - elevation[x0*nx + (y1-1)]  )/dxm ;
gradient[x0*nx*2+(y1-1)*2+1]     = (elevation[(x0+0)*nx+(y1-1)] - elevation[x0*nx + (y1-2)]  )/dym ;
gradient[(x1-1)*nx*2+y0*2+0]     = (elevation[(x1-1)*nx+(y0+0)] - elevation[(x1-2)*nx+y0]    )/dxm ;
gradient[(x1-1)*nx*2+y0*2+1]     = (elevation[(x1-1)*nx+(y0+1)] - elevation[(x1-1)*nx+y0]    )/dym ;
gradient[(x1-1)*nx*2+(y1-1)*2+0] = (elevation[(x1-1)*nx+(y1-1)] - elevation[(x1-2)*nx+(y1-1)])/dxm ;
gradient[(x1-1)*nx*2+(y1-1)*2+1] = (elevation[(x1-1)*nx+(y1-1)] - elevation[(x1-1)*nx+(y1-2)])/dym ;

for (i=0 ; i<ny ; i++)
    for (j=0 ; j<nx ; j++)
    {
        direction[i*nx+j]=Math.atan2(gradient[i*nx*2+j*2+1], gradient[i*nx*2+j*2+0]) ;
        //slope[i][j]=sqrt(gradient[i][j][1]*gradient[i][j][1]+gradient[i][j][0]*gradient[i][j][0]) ;
        slope[i*nx+j] = Math.atan ((gradient[i*nx*2+j*2+0] * Math.cos(direction[i*nx+j]) + gradient[i*nx*2+j*2+1]*Math.sin(direction[i*nx+j]))) ;
    }
}
//------------------------------------
function compute_height () // Lets try
{
var x0=0 ; var x1 = ny ; var y0=0 ; var y1 = nx ;
height_slope=[] ;
for (var i=x0 ; i<x1 ; i++)
    for (var j=y0 ; j<y1 ; j++)
    {
        var m=elevation[i*nx+j] ;
        var M=elevation[i*nx+j] ;
        var c=Math.cos(direction[i*nx+j]) ;
        var s=Math.sin(direction[i*nx+j]) ;
        var x=i ; var y=j ;
        for (var k=0 ; k<ny ; k++ )
        {
         x+=c ; y+=s ;
         var i2=Math.round(x) ;
         var j2=Math.round(y) ;
         if (i2<x0 || i2>=x1 || j2<y0 || j2>=y1) break ;
         if (M<elevation[i2*nx+j2]) M=elevation[i2*nx+j2] ;
         if (slope[i2*nx+j2]<10/180.*Math.PI) break ;
        }
        x=i ; y=j ;
        for (var k=0 ; k<ny ; k++ )
        {
         x-=c ; y-=s ;
         var i2=Math.round(x) ;
         var j2=Math.round(y) ;
         if (i2<x0 || i2>=x1 || j2<y0 || j2>=y1) break ;
         if (m>elevation[i2*nx+j2]) m=elevation[i2*nx+j2] ;
         if (slope[i2*nx+j2]<10/180.*Math.PI) break ;
        }
    //maxH[i*nx+j]=M ;
    //minH[i*nx+j]=m ;
    height_slope[i*nx+j]=M-m ;
    }
return (0) ;
}
//------------------------------
async function compute_slopefs(colorscale)
{
var x0=0 ; var x1 = ny ; var y0=0 ; var y1 = nx ;
slopefs=[] ;
import("./slope-models/"+stability.value+".js").then(module => {
slope_stab_model = module;
console.log("Blaa")
for (var i=x0 ; i<x1 ; i++)
    for (var j=y0 ; j<y1 ; j++)
    {
        slopefs[i*nx+j] = slope_stab_model.calculateFoS(slope[i*nx+j], height_slope[i*nx+j]);
    }
update_overlay(slopefs, colorscale) ;
}) ;
}

/* Load the initial elevation map and let us download it.
nx = 100 ; ny = 75 ;
var location=map.getCenter() ;
document.getElementById("latitude").value = location.lat.toFixed(5).toString() ;
document.getElementById("longitude").value = location.lng.toFixed(5).toString() ;
bounds = map.getBounds() ;
console.log(map.getCenter()) ;
const response = fetch( proxy_server + topo_server_region + bounds._northEast.lat +','+ bounds._northEast.lng+ ';' + bounds._southWest.lat + ',' + bounds._southWest.lng + ';' + ny + ',' + nx + '&reorder' , {})
.then( r => r.json() )
.then( data => {
    dy = (bounds._northEast.lat-bounds._southWest.lat)/ny ;
    dx = (bounds._northEast.lng-bounds._southWest.lng)/nx ;

    elevation = data.results[0].elevation ;
    compute_gradient(elevation, map.getCenter(), dx, dy) ;
    console.log("Data loaded") ;
    var csv = elevation.join(' ');
    var link = document.getElementById("tmp");
link.setAttribute("href", encodeURI("data:text/csv;charset=utf-8\n"+elevation));
console.log(link) ;
}) ; */
