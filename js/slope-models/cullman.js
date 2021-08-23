function calculateFoS(slope, height) {

  var phi = parseFloat(phi_out.value);
  var gamma = parseFloat(Gs_out.value);
  var cohesion   = parseFloat(c_out.value);

  var fprime, fprimeprime ;

  var niter=5 ;     // Number of iteration of the NR algo
  var fos=1 ;

  // Running a Newton-Raphson algorithm to find the zero of Fs' and the failure angle
  var a=(2*cohesion)/(gamma*height*Math.sin(slope)) ;
  var b=Math.tan(phi/180.*Math.PI);
  var failureangle=slope/3. ;
  var fos = 1;
  for (var k=0; k<niter ; k++)
  {
    fprime=-1/(Math.pow(Math.sin(failureangle),2))*(a*Math.sin(slope-2*failureangle)/(Math.pow(Math.sin(slope-failureangle),2)) + b) ;
    fprimeprime=2*1/(Math.pow(Math.sin(failureangle),2))*((a*Math.sin(slope-2*failureangle)/(Math.pow(Math.sin(slope-failureangle),2)) + b)/Math.tan(failureangle) + a*Math.sin(failureangle)*1/(Math.pow(Math.sin(slope-failureangle),3))) ;
    failureangle=failureangle-fprime/fprimeprime ;
  }
  fos=a/(Math.sin(failureangle)*Math.sin(slope-failureangle))+b/Math.tan(failureangle) ;

  if (isNaN(fos) || fos<0) fos = 0 ;
  return (fos) ;
}

export { calculateFoS }
