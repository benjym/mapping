var TAYLOR=20 ;
var TaylorESA = {
  'gridx' : [0,1.3158,2.6316,3.9474,5.2632,6.5789,7.8947,9.2105,10.5263,11.8421,13.1579,14.4737,15.7895,17.1053,18.4211,19.7368,21.0526,22.3684,23.6842,25.0000] ,
  'gridy' : [0,4.7368,9.4737,14.2105,18.9474,23.6842,28.4211,33.1579,37.8947,42.6316,47.3684,52.1053,56.8421,61.5789,66.3158,71.0526,75.7895,80.5263,85.2632,90.0000],
  'values' : [0.0941,0.1287,0.1378,0.1430,0.1460,0.1500,0.1536,0.1576,0.1615,0.1658,0.1716,0.1773,0.1834,0.1905,0.2001,0.2102,0.2205,0.2335,0.2462, 0.2607,0.0361,0.0876,0.1133,0.1227,0.1292,0.1362,0.1408,0.1462,0.1511,0.1569,0.1628,0.1691,0.1754,0.1836,0.1929,0.2033,0.2142,0.2272,0.2403,0.2556, 0,0.0486,0.0883,0.1027,0.1123,0.1225,0.1288,0.1349,0.1407,0.1481,0.1541,0.1611,0.1679,0.1766,0.1858,0.1964,0.2078,0.2210,0.2344,0.2505,0,0.0117, 0.0634,0.0826,0.0955,0.1080,0.1167,0.1237,0.1303,0.1388,0.1453,0.1532,0.1610,0.1696,0.1787,0.1896,0.2015,0.2147,0.2290,0.2454,0,0,0.0406,0.0642, 0.0809,0.0938,0.1053,0.1129,0.1210,0.1299,0.1369,0.1455,0.1543,0.1628,0.1721,0.1831,0.1954,0.2085,0.2233,0.2403,0,0,0.0265,0.0523,0.0696,0.0835, 0.0961,0.1042,0.1132,0.1223,0.1298,0.1388,0.1480,0.1566,0.1669,0.1779,0.1900,0.2019,0.2166,0.2352,0,0,0.0121,0.0402,0.0581,0.0732,0.0869,0.0961, 0.1055,0.1147,0.1228,0.1321,0.1416,0.1504,0.1617,0.1727,0.1844,0.1954,0.2100,0.2301,0,0,0,0.0279,0.0466,0.0629,0.0773,0.0879,0.0977,0.1071,0.1158, 0.1255,0.1353,0.1448,0.1564,0.1676,0.1788,0.1891,0.2034,0.2250,0,0,0,0.0181,0.0372,0.0538,0.0685,0.0800,0.0903,0.0999,0.1087,0.1189,0.1290,0.1392, 0.1507,0.1621,0.1731,0.1833,0.1975,0.2199,0,0,0,0.0122,0.0311,0.0466,0.0607,0.0725,0.0832,0.0935,0.1029,0.1126,0.1229,0.1335,0.1443,0.1558,0.1674, 0.1782,0.1927,0.2148,0,0,0,0.0058,0.0247,0.0394,0.0530,0.0651,0.0763,0.0870,0.0970,0.1064,0.1167,0.1277,0.1380,0.1498,0.1617,0.1733,0.1879,0.2096, 0,0,0,0,0.0183,0.0321,0.0452,0.0576,0.0694,0.0802,0.0911,0.1002,0.1106,0.1217,0.1317,0.1438,0.1556,0.1683,0.1833,0.2045,0,0,0,0,0.0130,0.0264,0.0389, 0.0512,0.0630,0.0741,0.0854,0.0944,0.1051,0.1163,0.1262,0.1386,0.1504,0.1636,0.1786,0.1994,0,0,0,0,0.0082,0.0214,0.0336,0.0454,0.0569,0.0684,0.0800, 0.0891,0.1001,0.1111,0.1215,0.1338,0.1458,0.1590,0.1739,0.1943,0,0,0,0,0.0029,0.0165,0.0281,0.0396,0.0509,0.0627,0.0743,0.0838,0.0951,0.1060,0.1167, 0.1291,0.1413,0.1545,0.1693,0.1892,0,0,0,0,0,0.0116,0.0226,0.0338,0.0449,0.0567,0.0680,0.0786,0.0900,0.1009,0.1120,0.1243,0.1367,0.1499,0.1647,0.1841, 0,0,0,0,0,0.0073,0.0184,0.0292,0.0403,0.0517,0.0632,0.0738,0.0849,0.0962,0.1076,0.1200,0.1324,0.1456,0.1601,0.1790,0,0,0,0,0,0.0031,0.0145,0.0250,0.0361, 0.0469,0.0587,0.0691,0.0800,0.0916,0.1034,0.1159,0.1281,0.1413,0.1557,0.1738,0,0,0,0,0,0,0.0106,0.0209,0.0319,0.0422,0.0542,0.0644,0.0751,0.0870,0.0993, 0.1118,0.1238,0.1370,0.1513,0.1687,0,0,0,0,0,0,0.0067,0.0167,0.0274,0.0374,0.0498,0.0598,0.0703,0.0824,0.0951,0.1078,0.1197,0.1327,0.1469,0.1636]} ;

var TaylorTSA = {
  'gridx': [7.5000,9.8947,12.2895,14.6842,17.0789,19.4737,21.8684,24.2632,26.6579,29.0526,31.4474,33.8421,36.2368,38.6316,41.0263,43.4211,45.8158,48.2105,50.6053,53.0000],
  'gridy': [1.0000,1.1842,1.3684,1.5526,1.7368,1.9211,2.1053,2.2895,2.4737,2.6579,2.8421,3.0263,3.2105,3.3947,3.5789,3.7632,3.9474,4.1316,4.3158,4.5000],
  'value': [0.0500,0.0611,0.0723,0.0830,0.0935,0.1031,0.1117,0.1191,0.1260,0.1321,0.1372,0.1415,0.1450,0.1484,0.1513,0.1538,0.1560,0.1581,0.1602,0.1620,0.0574, 0.0750,0.0864,0.0989,0.1089,0.1175,0.1251,0.1316,0.1373,0.1421,0.1466,0.1503,0.1532,0.1557,0.1581,0.1601,0.1619,0.1635,0.1649,0.1664,0.0648,0.0888,0.1022, 0.1148,0.1243,0.1320,0.1386,0.1440,0.1486,0.1526,0.1560,0.1589,0.1614,0.1631,0.1649,0.1663,0.1677,0.1689,0.1698,0.1708,0.0722,0.1022,0.1180,0.1308,0.1397, 0.1465,0.1521,0.1564,0.1600,0.1631,0.1655,0.1676,0.1693,0.1706,0.1717,0.1725,0.1735,0.1742,0.1748,0.1754,0.0796,0.1122,0.1277,0.1391,0.1470,0.1529,0.1578, 0.1615,0.1645,0.1670,0.1691,0.1707,0.1720,0.1733,0.1740,0.1747,0.1754,0.1760,0.1765,0.1768,0.0870,0.1216,0.1364,0.1463,0.1531,0.1582,0.1622,0.1654,0.1680, 0.1699,0.1717,0.1731,0.1741,0.1751,0.1756,0.1762,0.1766,0.1772,0.1775,0.1778,0.0944,0.1310,0.1452,0.1536,0.1592,0.1635,0.1666,0.1693,0.1714,0.1730,0.1743,  0.1754,0.1762,0.1769,0.1773,0.1777,0.1779,0.1783,0.1786,0.1787,0.1019,0.1383,0.1509,0.1578,0.1626,0.1663,0.1691,0.1713,0.1732,0.1746,0.1756,0.1765,0.1772, 0.1779,0.1782,0.1785,0.1788,0.1791,0.1793,0.1795,0.1093,0.1448,0.1550,0.1610,0.1651,0.1683,0.1709,0.1728,0.1744,0.1756,0.1765,0.1773,0.1779,0.1785,0.1788, 0.1792,0.1795,0.1797,0.1799,0.1801,0.1167,0.1508,0.1590,0.1642,0.1676,0.1703,0.1725,0.1742,0.1756,0.1767,0.1774,0.1781,0.1787,0.1791,0.1794,0.1799,0.1801, 0.1803,0.1805,0.1807,0.1241,0.1545,0.1618,0.1662,0.1694,0.1718,0.1737,0.1753,0.1764,0.1774,0.1781,0.1786,0.1791,0.1796,0.1797,0.1801,0.1803,0.1806,0.1808, 0.1810,0.1315,0.1567,0.1638,0.1677,0.1706,0.1729,0.1746,0.1761,0.1770,0.1779,0.1786,0.1791,0.1796,0.1798,0.1799,0.1800,0.1803,0.1806,0.1808,0.1810,0.1389, 0.1584,0.1657,0.1691,0.1718,0.1739,0.1755,0.1769,0.1776,0.1785,0.1791,0.1795,0.1798,0.1799,0.1800,0.1801,0.1802,0.1806,0.1808,0.1810,0.1463,0.1606,0.1677, 0.1706,0.1730,0.1749,0.1764,0.1776,0.1782,0.1790,0.1796,0.1799,0.1800,0.1801,0.1802,0.1803,0.1803,0.1805,0.1808,0.1810,0.1537,0.1640,0.1695,0.1721,0.1742, 0.1759,0.1772,0.1782,0.1788,0.1795,0.1799,0.1800,0.1801,0.1802,0.1803,0.1804,0.1805,0.1806,0.1808,0.1810,0.1611,0.1673,0.1714,0.1737,0.1754,0.1769,0.1781, 0.1789,0.1794,0.1799,0.1801,0.1802,0.1803,0.1804,0.1804,0.1805,0.1806,0.1807,0.1808,0.1810,0.1672,0.1707,0.1734,0.1756,0.1768,0.1779,0.1788,0.1796,0.1799, 0.1802,0.1802,0.1803,0.1804,0.1805,0.1806,0.1807,0.1808,0.1809,0.1810,0.1810,0.1708,0.1742,0.1759,0.1775,0.1783,0.1789,0.1795,0.1802,0.1803,0.1803,0.1805, 0.1805,0.1806,0.1807,0.1808,0.1809,0.1810,0.1811,0.1810,0.1810,0.1744,0.1777,0.1784,0.1793,0.1799,0.1800,0.1804,0.1807,0.1807,0.1805,0.1808,0.1808,0.1808, 0.1809,0.1810,0.1811,0.1811,0.1810,0.1811,0.1810,0.1780,0.1811,0.1811,0.1811,0.1811,0.1812,0.1812,0.1811,0.1811,0.1808,0.1809,0.1811,0.1812,0.1811,0.1811,0.1811,0.1811,0.1810,0.1811,0.1810]} ;

function calculateFoS(slope, height) {
    var gamma = parseFloat(Gs_out.value);
    var cohesion   = parseFloat(c_out.value);
    var phi = parseFloat(phi_out.value);
    var h   = parseFloat(H_out.value);
    var dw   = parseFloat(dw_out.value);
    var D = (h+height)/height ;

    var niter = 10 ;

    var fos = 1 ;
    if (phi<2.5/180.*Math.PI) // TSA
        fos=cohesion/(interpTSA(slope, D)*gamma*height) ;
    else  //ESA
    {
      var k = 0 ;
      for (k=0,fos=1 ; k<niter ; k++)
      {
        fos=cohesion/(interpESA(slope,fos, phi)*gamma*height) ;
        //console.log("FOS " + fos + ' Slope ' + slope/3.14*180 + ' Height ' + height)
        if (!isFinite(fos)) break ;
      }
    }
    console.log(fos)
    return fos
}

export { calculateFoS }

//===================================================
function interpESA (angle, fs, friction)
{
 angle=angle/Math.PI*180 ;
 var frc=Math.atan(Math.tan(friction/180*Math.PI)/fs)*180/Math.PI ;
 if (frc>=25) {frc=25 ; } // Let's use the curve at phi=25deg if phi>25deg

 //console.log("FRC " + frc) ;

 // If we are outside the chart, just return something kind of meaningful -- I have no idea what my old me was doing there, my new me is confused

 if (angle<=frc) return 0 ;

 var idx1, idx2, dstx1=1, dstx2=1, dsty1=1, dsty2=1 ;
 for (idx1=0 ; idx1<TAYLOR-1 ; idx1++)
   if (frc>=TaylorESA.gridx[idx1] && frc<TaylorESA.gridx[idx1+1])
   {
     dstx1=frc-TaylorESA.gridx[idx1] ;
     dstx2=TaylorESA.gridx[idx1+1]-frc ;
     break ;
   }
 for (idx2=0 ; idx2<TAYLOR-1 ; idx2++)
   if (angle>=TaylorESA.gridy[idx2] && angle<TaylorESA.gridy[idx2+1])
   {
     dsty1=angle-TaylorESA.gridy[idx2] ;
     dsty2=TaylorESA.gridy[idx2+1]-angle ;
     //printf("%g %g\n", dsty1, dsty2) ;
     break ;
   }
 //printf("%g %g %g %g\n", dstx1, dstx2, dsty1, dsty2) ;
 return ((1/((dstx1+dstx2)*(dsty1+dsty2)) * (
 TaylorESA.values[idx1*TAYLOR+idx2]*dstx2*dsty2+
 TaylorESA.values[(idx1+1)*TAYLOR+idx2]*dstx1*dsty2+
 TaylorESA.values[idx1*TAYLOR+(idx2+1)]*dstx2*dsty1+
 TaylorESA.values[(idx1+1)*TAYLOR+(idx2+1)]*dstx1*dsty1))) ;
}


//===================================================
function interpTSA (angle, depth)
{
 var idx1, idx2 ;
 var dstx1=1, dstx2=1, dsty1=1, dsty2=1 ;

 // Let's work in degree, it is easier there
 angle=angle/Math.PI*180 ;

 // If we are outside the chart, just return something kind of meaningful
 if (depth>4.4) return 0.181 ;
 if (angle<7.5) return 0 ;
 if (angle>53) return 0.181 ;
 if (depth<1.1) depth=1.1 ;  // Proceed

 for (idx1=0 ; idx1<TAYLOR-1 ; idx1++)
   if (angle>=TaylorTSA.gridx[idx1] && angle<TaylorTSA.gridx[idx1+1])
   {
     dstx1=angle-TaylorTSA.gridx[idx1] ;
     dstx2=TaylorTSA.gridx[idx1+1]-angle ;
     break ;
   }
 for (idx2=0 ; idx2<TAYLOR-1 ; idx2++)
   if (depth>=TaylorTSA.gridy[idx2] && depth<TaylorTSA.gridy[idx2+1])
   {
     dsty1=depth-TaylorTSA.gridy[idx2] ;
     dsty2=TaylorTSA.gridy[idx2+1]-depth ;
     break ;
   }
// printf("%g %g %g %g\n", dstx1, dstx2, dsty1, dsty2) ;
  return ((1/((dstx1+dstx2)*(dsty1+dsty2)) * (
  TaylorESA.values[idx1*TAYLOR+idx2]*dstx2*dsty2+
  TaylorESA.values[(idx1+1)*TAYLOR+idx2]*dstx1*dsty2+
  TaylorESA.values[idx1*TAYLOR+(idx2+1)]*dstx2*dsty1+
  TaylorESA.values[(idx1+1)*TAYLOR+(idx2+1)]*dstx1*dsty1))) ;
}




/*
TSA




int SlopeStab::model_taylor_iterative()
{
int i, j, k; int niter=5 ;

if (friction<2.5/180.*M_PI) // TSA
{
 for (i=x0 ; i<x1 ; i++)
  for (j=y0 ; j<y1 ; j++)
      Fs[i][j]=cohesion/(interpTSA(slope[i][j], depth/(Height[i][j]*PHYSCALE))*gamma*(Height[i][j]*PHYSCALE)) ;
}
else  //ESA
{
 for (i=x0 ; i<x1 ; i++)
  for (j=y0 ; j<y1 ; j++)
    for (k=0,Fs[i][j]=1 ; k<niter ; k++)
      Fs[i][j]=cohesion/(interpESA(slope[i][j],Fs[i][j])*gamma*(Height[i][j]*PHYSCALE)) ;
}
return 0 ;
}
int SlopeStab::model_taylor_load()
{
FILE *in ; int i,j ; int res ;
in=fopen("/home/arsandbox/USydBox/SlopeStability/Tools/TaylorESAinterp.txt", "r") ;
if (in==NULL) {printf("Taylor file not found\n") ; fflush(stdout);}
for (i=0 ; i<TAYLOR ; i++)
  res=fscanf(in, "%g", &(TaylorESA.gridx[i])) ;
res=fscanf(in, "%*c") ;
for (i=0 ; i<TAYLOR ; i++)
  res=fscanf(in, "%g", &(TaylorESA.gridy[i])) ;
res=fscanf(in, "%*c") ;
for (i=0 ; i<TAYLOR ; i++)
  for (j=0 ; j<TAYLOR ; j++)
    res=fscanf(in, "%g", &(TaylorESA.values[i][j])) ;
fclose(in) ;
in=fopen("/home/arsandbox/USydBox/SlopeStability/Tools/TaylorTSAinterp.txt", "r") ;
if (in==NULL) {printf("Taylor file 2 not found\n") ; fflush(stdout);}
for (i=0 ; i<TAYLOR ; i++)
  res=fscanf(in, "%g", &(TaylorTSA.gridx[i])) ;
res=fscanf(in, "%*c") ;
for (i=0 ; i<TAYLOR ; i++)
  res=fscanf(in, "%g", &(TaylorTSA.gridy[i])) ;
res=fscanf(in, "%*c") ;
for (i=0 ; i<TAYLOR ; i++)
  for (j=0 ; j<TAYLOR ; j++)
    res=fscanf(in, "%g", &(TaylorTSA.values[i][j])) ;
fclose(in) ;
return res;
}


float SlopeStab::interpTSA (float angle, float depth)
{
 int idx1, idx2 ;
 float dstx1=1, dstx2=1, dsty1=1, dsty2=1 ;

 // Let's work in degree, it is easier there
 angle=angle/M_PI*180 ;

 // If we are outside the chart, just return something kind of meaningful
 if (depth>4.4) return 0.181 ;
 if (angle<7.5) return 0 ;
 if (angle>53) return 0.181 ;
 if (depth<1.1) depth=1.1 ;  // Proceed

 for (idx1=0 ; idx1<TAYLOR-1 ; idx1++)
   if (angle>=TaylorTSA.gridx[idx1] && angle<TaylorTSA.gridx[idx1+1])
   {
     dstx1=angle-TaylorTSA.gridx[idx1] ;
     dstx2=TaylorTSA.gridx[idx1+1]-angle ;
     break ;
   }
 for (idx2=0 ; idx2<TAYLOR-1 ; idx2++)
   if (depth>=TaylorTSA.gridy[idx2] && depth<TaylorTSA.gridy[idx2+1])
   {
     dsty1=depth-TaylorTSA.gridy[idx2] ;
     dsty2=TaylorTSA.gridy[idx2+1]-depth ;
     break ;
   }
// printf("%g %g %g %g\n", dstx1, dstx2, dsty1, dsty2) ;
 return (1/((dstx1+dstx2)*(dsty1+dsty2)) * (
 TaylorTSA.values[idx1  ][idx2  ]*dstx2*dsty2+
 TaylorTSA.values[idx1+1][idx2  ]*dstx1*dsty2+
 TaylorTSA.values[idx1  ][idx2+1]*dstx2*dsty1+
 TaylorTSA.values[idx1+1][idx2+1]*dstx1*dsty1)) ;
}
//------------------------------------
float SlopeStab::interpESA (float angle)
{return (interpESA (angle,1)) ;}
float SlopeStab::interpESA (float angle, float fs)
{
 int idx1, idx2 ;
 float dstx1=1, dstx2=1, dsty1=1, dsty2=1 ;
 float frc ;

 frc=atan(tan(friction)/fs)*180/M_PI ;
 if (frc>25) frc=25 ;

 // Let's work in degree, it is easier here
 angle=angle/M_PI*180 ;

 // If we are outside the chart, just return something kind of meaningful
 if (angle<=frc) return 0 ;

 for (idx1=0 ; idx1<TAYLOR-1 ; idx1++)
   if (frc>=TaylorESA.gridx[idx1] && frc<TaylorESA.gridx[idx1+1])
   {
     dstx1=frc-TaylorESA.gridx[idx1] ;
     dstx2=TaylorESA.gridx[idx1+1]-frc ;
     break ;
   }
 for (idx2=0 ; idx2<TAYLOR-1 ; idx2++)
   if (angle>=TaylorESA.gridy[idx2] && angle<TaylorESA.gridy[idx2+1])
   {
     dsty1=angle-TaylorESA.gridy[idx2] ;
     dsty2=TaylorESA.gridy[idx2+1]-angle ;
     //printf("%g %g\n", dsty1, dsty2) ;
     break ;
   }
 //printf("%g %g %g %g\n", dstx1, dstx2, dsty1, dsty2) ;
 return (1/((dstx1+dstx2)*(dsty1+dsty2)) * (
 TaylorESA.values[idx1  ][idx2  ]*dstx2*dsty2+
 TaylorESA.values[idx1+1][idx2  ]*dstx1*dsty2+
 TaylorESA.values[idx1  ][idx2+1]*dstx2*dsty1+
 TaylorESA.values[idx1+1][idx2+1]*dstx1*dsty1)) ;
}
*/
