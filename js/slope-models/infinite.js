function calculateFoS(elev) {
    console.log(elev)
    var G_s = parseFloat(Gs_out.value);
    var c   = parseFloat(c_out.value);
    var phi = parseFloat(phi_out.value);
    var h   = parseFloat(H_out.value);
    // var fos = 99;
    var n = elev.length;

    var slope = Math.abs((elev[0].y - elev[n-1].y)/(elev[0].x - elev[n-1].x));
    // console.log(slope)
    var fos = (G_s - 9.81)*Math.tan(phi*Math.PI/180.)/G_s/slope;
    // console.log(G_s,c,phi,h)
    // console.log(fos)
    return fos
}

export { calculateFoS }
