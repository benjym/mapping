var TAYLOR=20 ;
var TaylorTSA = {
  'gridx': [7.5000,9.8947,12.2895,14.6842,17.0789,19.4737,21.8684,24.2632,26.6579,29.0526,31.4474,33.8421,36.2368,38.6316,41.0263,43.4211,45.8158,48.2105,50.6053,53.0000],
  'gridy': [1.0000,1.1842,1.3684,1.5526,1.7368,1.9211,2.1053,2.2895,2.4737,2.6579,2.8421,3.0263,3.2105,3.3947,3.5789,3.7632,3.9474,4.1316,4.3158,4.5000],
  'value': [0.0500,0.0611,0.0723,0.0830,0.0935,0.1031,0.1117,0.1191,0.1260,0.1321,0.1372,0.1415,0.1450,0.1484,0.1513,0.1538,0.1560,0.1581,0.1602,0.1620,0.0574, 0.0750,0.0864,0.0989,0.1089,0.1175,0.1251,0.1316,0.1373,0.1421,0.1466,0.1503,0.1532,0.1557,0.1581,0.1601,0.1619,0.1635,0.1649,0.1664,0.0648,0.0888,0.1022, 0.1148,0.1243,0.1320,0.1386,0.1440,0.1486,0.1526,0.1560,0.1589,0.1614,0.1631,0.1649,0.1663,0.1677,0.1689,0.1698,0.1708,0.0722,0.1022,0.1180,0.1308,0.1397, 0.1465,0.1521,0.1564,0.1600,0.1631,0.1655,0.1676,0.1693,0.1706,0.1717,0.1725,0.1735,0.1742,0.1748,0.1754,0.0796,0.1122,0.1277,0.1391,0.1470,0.1529,0.1578, 0.1615,0.1645,0.1670,0.1691,0.1707,0.1720,0.1733,0.1740,0.1747,0.1754,0.1760,0.1765,0.1768,0.0870,0.1216,0.1364,0.1463,0.1531,0.1582,0.1622,0.1654,0.1680, 0.1699,0.1717,0.1731,0.1741,0.1751,0.1756,0.1762,0.1766,0.1772,0.1775,0.1778,0.0944,0.1310,0.1452,0.1536,0.1592,0.1635,0.1666,0.1693,0.1714,0.1730,0.1743,  0.1754,0.1762,0.1769,0.1773,0.1777,0.1779,0.1783,0.1786,0.1787,0.1019,0.1383,0.1509,0.1578,0.1626,0.1663,0.1691,0.1713,0.1732,0.1746,0.1756,0.1765,0.1772, 0.1779,0.1782,0.1785,0.1788,0.1791,0.1793,0.1795,0.1093,0.1448,0.1550,0.1610,0.1651,0.1683,0.1709,0.1728,0.1744,0.1756,0.1765,0.1773,0.1779,0.1785,0.1788, 0.1792,0.1795,0.1797,0.1799,0.1801,0.1167,0.1508,0.1590,0.1642,0.1676,0.1703,0.1725,0.1742,0.1756,0.1767,0.1774,0.1781,0.1787,0.1791,0.1794,0.1799,0.1801, 0.1803,0.1805,0.1807,0.1241,0.1545,0.1618,0.1662,0.1694,0.1718,0.1737,0.1753,0.1764,0.1774,0.1781,0.1786,0.1791,0.1796,0.1797,0.1801,0.1803,0.1806,0.1808, 0.1810,0.1315,0.1567,0.1638,0.1677,0.1706,0.1729,0.1746,0.1761,0.1770,0.1779,0.1786,0.1791,0.1796,0.1798,0.1799,0.1800,0.1803,0.1806,0.1808,0.1810,0.1389, 0.1584,0.1657,0.1691,0.1718,0.1739,0.1755,0.1769,0.1776,0.1785,0.1791,0.1795,0.1798,0.1799,0.1800,0.1801,0.1802,0.1806,0.1808,0.1810,0.1463,0.1606,0.1677, 0.1706,0.1730,0.1749,0.1764,0.1776,0.1782,0.1790,0.1796,0.1799,0.1800,0.1801,0.1802,0.1803,0.1803,0.1805,0.1808,0.1810,0.1537,0.1640,0.1695,0.1721,0.1742, 0.1759,0.1772,0.1782,0.1788,0.1795,0.1799,0.1800,0.1801,0.1802,0.1803,0.1804,0.1805,0.1806,0.1808,0.1810,0.1611,0.1673,0.1714,0.1737,0.1754,0.1769,0.1781, 0.1789,0.1794,0.1799,0.1801,0.1802,0.1803,0.1804,0.1804,0.1805,0.1806,0.1807,0.1808,0.1810,0.1672,0.1707,0.1734,0.1756,0.1768,0.1779,0.1788,0.1796,0.1799, 0.1802,0.1802,0.1803,0.1804,0.1805,0.1806,0.1807,0.1808,0.1809,0.1810,0.1810,0.1708,0.1742,0.1759,0.1775,0.1783,0.1789,0.1795,0.1802,0.1803,0.1803,0.1805, 0.1805,0.1806,0.1807,0.1808,0.1809,0.1810,0.1811,0.1810,0.1810,0.1744,0.1777,0.1784,0.1793,0.1799,0.1800,0.1804,0.1807,0.1807,0.1805,0.1808,0.1808,0.1808, 0.1809,0.1810,0.1811,0.1811,0.1810,0.1811,0.1810,0.1780,0.1811,0.1811,0.1811,0.1811,0.1812,0.1812,0.1811,0.1811,0.1808,0.1809,0.1811,0.1812,0.1811,0.1811,0.1811,0.1811,0.1810,0.1811,0.1810]} ;
  
  
// Graphs not requiring iteration from Rock Slope Engineering : Civil Applications, Fifth Edition 
var TaylorDrained = {
  'anglelength': 36,
  'theta' : [0, 0.01,0.02, 0.03, 0.04, 0.05, 0.06, 0.07, 0.08, 0.09, 0.10, 0.11, 0.12, 0.13, 0.14, 0.15,
             0.16, 0.17, 0.18, 0.19, 0.20, 0.25, 0.30, 0.35, 0.40, 0.45, 0.50, 0.60, 0.70, 0.80, 0.90, 1.00,
             1.50, 2.00, 4.00, 8.00],
  'angles': [1.5699, 1.5145, 1.4590, 1.4040,1.3477, 1.2942, 1.2431, 1.1912, 1.1454, 1.0993, 1.0522, 1.0120, 0.9738, 0.9334, 0.8977,
             0.8647, 0.8340, 0.8008, 0.7735, 0.7467, 0.7231,0.6125, 0.5299, 0.4668, 0.4148, 0.3729, 0.3394, 0.2853, 0.2473, 0.2165, 
             0.1926, 0.1750, 0.1200, 0.0903, 0.0469, 0],
  'rho': [[0, 0.0963621624360339, 0.184136393575518, 0.289218219587577, 0.412843897248822, 0.585919845974565, 0.831934944520444, 1.10000000000000, 1.40000000000000, 2],
[0, 0.0949536247377837, 0.174566026170900, 0.265959200567046, 0.365359790875876, 0.478570071199907, 0.626915329094212, 0.834129900308952, 1.40000000000000, 2],
[0, 0.0927278470686777, 0.164190538042170, 0.243190578052096, 0.328804431161801, 0.421174101557971, 0.542537239133409, 0.696877405132584, 0.94474037311277, 2],
[0, 0.0905249368568451, 0.156384309841815, 0.230891507042382, 0.301522319484586, 0.390801613166934, 0.488219269952832, 0.617773193860953, 0.809058062610391, 2],
[0, 0.0882715908158519, 0.153264283294039, 0.219893100799879, 0.287376066003050, 0.359833832334221, 0.457205968050775, 0.563653619064105, 0.726451716520194, 2],
[0, 0.0867333849333227, 0.150292634851282, 0.209417742246715, 0.274796104435894, 0.346026749653010, 0.434196683371281, 0.528498825095601, 0.675513743847364, 2],
[0, 0.0863490903407355, 0.147457700274753, 0.206350101226034, 0.262794897461006, 0.332854876583921, 0.412245965453058, 0.505621132561246, 0.628838884276734, 2],
[0, 0.0859592261208835, 0.144581678654025, 0.203244581831915, 0.258147316099263, 0.321092112726141, 0.392633417451776, 0.482411870906343, 0.602717494010312, 0.979732477404737],
[0, 0.0856144486486836, 0.142242251934539, 0.200498207396788, 0.254202339161142, 0.314696846086513, 0.383748043170881, 0.464706097666717, 0.579616972218844, 0.932552520693257],
[0, 0.0852682601382030, 0.142499040733527, 0.197740593133733, 0.250241216987544, 0.308275406141577, 0.374826304555715, 0.455241768529628, 0.561846479127146, 0.896349763005242],
[0, 0.0849140951198725, 0.142761746187195, 0.195416911701336, 0.246932908092462, 0.301706010199900, 0.365699000718295, 0.445559372375955, 0.544428565630215, 0.865573596985152],
[0, 0.0846112408379901, 0.142986391387595, 0.195389815063389, 0.245857281491656, 0.297721650562409, 0.357894042842345, 0.437279742874869, 0.534619603517830, 0.839775410618031],
[0, 0.0848394581518814, 0.143199414369666, 0.195364120293995, 0.244837303385331, 0.295962791580037, 0.350492881372102, 0.429428467336259, 0.525318116744536, 0.825307478637616],
[0, 0.0862027367192201, 0.143424499646994, 0.195336970574098, 0.243759569646469, 0.294104338290256, 0.349205765945749, 0.421132618152247, 0.518831027353092, 0.810020347882650],
[0, 0.0874078625876268, 0.145466875174196, 0.195312970468359, 0.242806862812316, 0.292461482465776, 0.348336621830963, 0.417743338665913, 0.514594979955966, 0.797189128726042],
[0, 0.0885237445386821, 0.147598321905236, 0.195290747657016, 0.241924707355572, 0.291798195437895, 0.347531840972812, 0.417049172100484, 0.510672627147692, 0.791343954302418],
[0, 0.0895601915436597, 0.149578039901899, 0.195270106794212, 0.242719128763412, 0.292032353741681, 0.346784349081484, 0.416404420335288, 0.507362233686509, 0.785914873278922],
[0, 0.0906821393184225, 0.151721072966152, 0.197131638251797, 0.244061741057168, 0.292285828725557, 0.345975193514339, 0.415706480349199, 0.506646387456759, 0.780037925066360],
[0, 0.0916051951540879, 0.153484202427683, 0.199303125885969, 0.245166343375265, 0.292494369237268, 0.345722991555429, 0.415132266832674, 0.506057442004330, 0.775202805762651],
[0, 0.0925106812610150, 0.155213771940647, 0.201433280756491, 0.246249920353028, 0.292698940324726, 0.348007594726519, 0.414568983072870, 0.505479706720821, 0.773795234359700],
[0, 0.0933062541899170, 0.156733396231557, 0.203304865020889, 0.247201966445502, 0.292878679381981, 0.350014879457116, 0.414074073976902, 0.504972100311275, 0.772586164069694],
[0, 0.101351353836013, 0.163871148514721, 0.212095791130882, 0.257756095431821, 0.302455969469904, 0.359443197531842, 0.419667737337658, 0.510430941758310, 0.778801997481322],
[0, 0.109922699278270, 0.171301832579603, 0.223178363582460, 0.268285247746841, 0.311759954180288, 0.366483911520249, 0.431452555529697, 0.524032549764360, 0.791045004655467],
[0, 0.116470856509548, 0.182141554358452, 0.233176275082898, 0.276518982233844, 0.320299918490179, 0.379762900104003, 0.440455674466319, 0.535168938216277, 0.810481756532742],
[0, 0.121869564090391, 0.191078494336339, 0.241419174375570, 0.287444256745445, 0.333664637105185, 0.391730622561900, 0.455056665900741, 0.552774915043775, 0.827163135659455],
[0, 0.131326410267720, 0.198276444476119, 0.250612595029790, 0.296243642373243, 0.344428788868655, 0.401369611942137, 0.466986922285654, 0.568004052702230, 0.849310790258594],
[0, 0.140826036190709, 0.204025866777609, 0.260026757132648, 0.303516425302014, 0.353026744259246, 0.410390361971096, 0.477666372421218, 0.583294029225887, 0.867001412839358],
[0, 0.158179513239405, 0.219523839149331, 0.275249560699080, 0.323355302859041, 0.371394488615797, 0.432822483611770, 0.504063517571905, 0.609417884136988, 0.907828330185430],
[0, 0.171689653413925, 0.234557867381863, 0.285938123412439, 0.337285002865059, 0.386957166675431, 0.448573008007866, 0.522598049674712, 0.632263338345514, 0.944971769750758],
[0, 0.182645790564081, 0.246749811588747, 0.297210345078900, 0.348805065332232, 0.399577822941207, 0.461345999497322, 0.537628750548957, 0.650790009892438, 0.977939949973210],
[0, 0.191122173245061, 0.256182295255788, 0.310313429159462, 0.360479233621782, 0.411277694677823, 0.475740949116199, 0.553308102402394, 0.665123452024852, 1.57140000000000],
[0, 0.197375439675098, 0.266098734111383, 0.319979943626156, 0.369091596632180, 0.421917024775804, 0.487882550132366, 0.565528234401655, 0.680789375520954, 1.57140000000000],
[0, 0.234920454431631, 0.300835992123604, 0.353694507581578, 0.396031390028364, 0.455197246982810, 0.525861931921028, 0.608224086859674, 0.735899482915665, 1.57140000000000],
[0, 0.257589058214339, 0.323501207684733, 0.377596774646389, 0.420648554011487, 0.480521378992015, 0.548757468176163, 0.638819588433840, 0.771772455486765, 1.57140000000000],
[0, 0.314001145675750, 0.373792018742205, 0.420590832102491, 0.462513267823640, 0.521811208058748, 0.591645457701990, 0.689166013795371, 0.833008196394741, 1.57140000000000],
[0, 0.414300000000000, 0.442900000000000, 0.471400000000000, 0.514300000000000, 0.571400000000000, 0.657100000000000, 0.742900000000000, 0.914300000000000, 1.57140000000000]]
}


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
      fos=interpDrained(slope, height, cohesion, gamma, phi) ; 
    }
    return fos
}

export { calculateFoS }

//==================================================
function interpDrained (slope, height, cohesion, gamma, phi)
{
var targettheta = cohesion/(gamma*height*Math.tan(phi/180*Math.PI)) ; 
var beta = slope/Math.PI*180;

if (targettheta > 8) targettheta=8 ; 
if (targettheta < 0) targettheta=0 ; 
if (beta>90) beta=90 ; 
if (beta<0) beta=0 ;

var idx = -1 ;
var targetang ;
for (var i=0 ; i< TaylorDrained.anglelength-1 ; i++)
{
    if (TaylorDrained.theta[i]<targettheta && TaylorDrained.theta[i+1]>=targettheta)
    {
        targetang = (TaylorDrained.angles[i]   * (TaylorDrained.theta[i+1]-targettheta) + 
                     TaylorDrained.angles[i+1] * (targettheta-TaylorDrained.theta[i]))
                    /(TaylorDrained.theta[i+1]-TaylorDrained.theta[i]) ;
        idx=i ; 
        break ; 
    }
}
if (idx==-1)
{
    if (targettheta<TaylorDrained.theta[0]) 
    {
        targettheta = TaylorDrained.theta[0]
        idx=0 ; 
    }
    else if (targettheta>TaylorDrained.theta[TaylorDrained.anglelength-1])
    {
        targettheta=TaylorDrained.theta[TaylorDrained.anglelength-1] ;
        idx=TaylorDrained.anglelength-2 ;
    }
    else
    {
        return 0 ; 
        console.log("Should never get there ...") ; 
    }
}

//console.log(targetang) ;
var Q1 = (TaylorDrained.rho[idx  ][Math.floor(beta/10)] * (Math.ceil(beta/10)*10-beta) + TaylorDrained.rho[idx  ][Math.ceil(beta/10)] * (beta - Math.floor(beta/10)*10))/10 ; 
var Q2 = (TaylorDrained.rho[idx+1][Math.floor(beta/10)] * (Math.ceil(beta/10)*10-beta) + TaylorDrained.rho[idx+1][Math.ceil(beta/10)] * (beta - Math.floor(beta/10)*10))/10 ; 
var targetrho = (Q1 * (TaylorDrained.theta[idx+1]-targettheta) + Q2*(targettheta-TaylorDrained.theta[idx]))/(TaylorDrained.theta[idx+1]-TaylorDrained.theta[idx]) ;

var Fs1 = cohesion/(gamma * height * Math.cos(targetang)*0.35*targetrho) ; 
var Fs2 = Math.tan(phi/180*Math.PI)/(Math.sin(targetang)*2.*targetrho) ; 
return ((Fs1+Fs2)/2) ; 
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