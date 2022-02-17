#include <cstdlib>
#include <cstdio>
#include <filesystem>
#include <gdal/gdal_priv.h>
#include <cmath>
#include <vector>
#include <string>
#include <cassert>
#include <filesystem>
#include "Colormaps.h"

#include <png++/png.hpp>

using namespace std ; 

int generate_imgfile (std::string res, double width, double height, int dpi, double center_lat, double center_lng, double extent_lng, double * colormap, double smax=1, double smin=1) ; 

//--------------------------------------------------------
int flooring_lon (double lon, int ds) { return (floor((lon - (-180))/double(ds))*ds + (-180)) ; }
int ceiling_lon (double lon, int ds)  { return (ceil ((lon - (-180))/double(ds))*ds + (-180)) ; }
int flooring_lat (double lat, int ds) { return (floor((lat - (-90))/double(ds))*ds + (-90)) ; }
int ceiling_lat (double lat, int ds)  { return (ceil ((lat - (-90))/double(ds))*ds + (-90)) ; }

double clip (double v, double mmin, double mmax) { return (std::max(std::min(v,mmax),mmin)) ; }
//--------------------------------------------------------
std::string tilename (double lat, double lon, std::pair<int,std::string> ds)
{
 char name[50] ; 
 int ilat = flooring_lat(lat, ds.first) ; 
 int ilon = flooring_lon(lon, ds.first) ; 
 sprintf(name, "/media/franz/Koala2/COP30M/%s/%c%02d%c%03d.tif", ds.second.c_str(), ((ilat<0)?'S':'N'), abs(ilat),  ((ilon<0)?'W':'E'), abs(ilon)) ; 
 //sprintf(name, "/mnt/Koala/COP_DEMGLO30/%s/%c%02d%c%03d.tif", ds.second.c_str(), ((ilat<0)?'S':'N'), abs(ilat),  ((ilon<0)?'W':'E'), abs(ilon)) ; 
 return (name) ;     
}
//--------------------------------------------------------
int elevation (double ne_lat, double ne_lng, double sw_lat, double sw_lng, int ny, int nx, float * pafScanline, int tilefallback=8, GDALRIOResampleAlg resamplingalgo=GRIORA_Bilinear)
{
    GDALRasterIOExtraArg extraargs ;
    INIT_RASTERIO_EXTRA_ARG(extraargs) ; 
    extraargs.eResampleAlg = resamplingalgo ; 
    
    std::vector <std::pair<int,std::string>> downsampling = {{1,"extracted"}, {4, "quarter"}, {16, "sixteenth"}, {64, "sixtyfourth"}} ; 
    
    ne_lat=clip(ne_lat, -90, 90) ;
    ne_lng=clip(ne_lng, -180, 180) ;
    sw_lat=clip(sw_lat, -90, 90) ;
    sw_lng=clip(sw_lng, -180, 180) ;
    
    int ntiles = 0 ; int idx = -1 ; 
    int beglat, beglon, endlat, endlon ;
    do {
        idx++ ; 
        beglat = ceiling_lat (ne_lat, downsampling[idx].first) ; 
        beglon = flooring_lon(sw_lng, downsampling[idx].first) ; 
        endlat = flooring_lat(sw_lat, downsampling[idx].first) ; 
        endlon = ceiling_lon (ne_lng, downsampling[idx].first) ; 
        ntiles = (beglat-endlat)/downsampling[idx].first * (endlon-beglon)/downsampling[idx].first ; 
    } while (ntiles > tilefallback && idx<downsampling.size()) ; 
    
    printf("[%d %d %d %d %d %d]\n", beglat, endlat, beglon, endlon, ntiles, idx) ; 
    for (int j=beglat, nnycum = 0 ; j>endlat ; j -= downsampling[idx].first)
    {
        int nny ; 
        for (int i = beglon, nnxcum=0 ; i<endlon ; i += downsampling[idx].first)
        {
            GDALDataset  *poDataset;
            GDALAllRegister();
            auto filename = tilename(j-downsampling[idx].first, i, downsampling[idx]) ; // Lower left corner for COP30M DEM
            FILE * out = fopen(filename.c_str(), "r") ; 
            if (out == nullptr)
            {
                printf("Cannot find the required file %s. \n", filename.c_str()) ;
                filename = "/media/franz/Koala2/COP30M/"+downsampling[idx].second+"/empty.tif" ; 
                poDataset = (GDALDataset *) GDALOpen(filename.c_str(), GA_ReadOnly);
            }
            else
            {
                fclose(out) ; 
                poDataset = (GDALDataset *) GDALOpen(filename.c_str(), GA_ReadOnly);
            }
            
            double adfGeoTransform[6] ;  
            poDataset->GetGeoTransform( adfGeoTransform );
    
            int startx = round((max(sw_lng,(double)(i))-i)/(adfGeoTransform[1])) ;
            int starty = round((min(ne_lat,(double)(j))-j)/(adfGeoTransform[5])) ;
            int stopx  = round((min(ne_lng,(double)(i + downsampling[idx].first ))-i)/(adfGeoTransform[1])) ;
            int stopy  = round((max(sw_lat,(double)(j - downsampling[idx].first ))-j)/(adfGeoTransform[5])) ;
            int nx_geotiff = stopx-startx ; 
            int ny_geotiff = stopy-starty ; 
            
            int nnx = nx_geotiff*adfGeoTransform[1]*nx/(ne_lng-sw_lng) ;
                nny = ny_geotiff*adfGeoTransform[5]*ny/(sw_lat-ne_lat) ; //adfGeoTransform[5]<0)
            
            if (nnx > nx) nnx = nx ; 
            if (nny > ny) nny = ny ; 
            if (nnx < 0 ) nnx = 0 ; 
            if (nny < 0 ) nny = 0 ;
            
            int bufferoffset = (nnycum * nx + nnxcum) ;   
            nnxcum += nnx ; 
            
            
            printf("%d %d %d %d %g %g | %d %d %d %d %s\n", nx_geotiff, ny_geotiff, startx, starty, adfGeoTransform[1], adfGeoTransform[5], nnx, nny, nnxcum, nnycum, filename.c_str());
            auto res = poDataset->RasterIO( GF_Read, startx, starty, nx_geotiff, ny_geotiff, (void *)(pafScanline+bufferoffset), nnx, nny, GDT_Float32, 1, NULL, 0, nx * sizeof(GDT_Float32), 0, &extraargs);
            
            GDALClose(poDataset) ; 
        }
        nnycum += nny ; 
    }
    return 0 ; 
}

int main (int argc, char * argv[])
{
    /*
int nx = 10 ;
int ny = 10 ; 
int nn = nx*ny ; 
float * elevationarray = (float *) malloc(sizeof(float)*nn); 
elevation( -34.32507927447516, 150.91146469116214, -34.3477588987833, 150.86558818817142,  ny, nx, elevationarray) ;  
//elevation(-34.25396567966451,150.97334105164282,-34.255764320335494,150.97116494835717,21,21, elevationarray) ;
printf("//") ; 

elevation( -34, 160, -36, 150,  ny, nx, elevationarray) ;  


elevation( 60, 116, 35, 100,  ny, nx, elevationarray) ;  */
//for (int i=0 ; i<nx*ny ; i++) printf("%f ", elevationarray[i]) ; 

//printf("%d %d %d |", flooring (150.91146469116214, 1), flooring (150.91146469116214, 4), flooring (150.91146469116214, 16)) ; 
//printf(" %d %d %d ", flooring (-150.91146469116214, 1), flooring (-150.91146469116214, 4), flooring (-150.91146469116214, 16)) ; 

//generate_imgfile (148,105, 300, -9.0882278, 168.2249543, -55.3228175, 72.2460938) ; 

//generate_imgfile (148, 105, 600, -27.5, 133, 47, inferno, 0.8) ; //AUS not too bad
double w = 6*25.4 ; 
double h = 4*25.4 ;

// FR 
// generate_imgfile ("France.png", w, h, 600, 46.1, (9.8678344+-5.4534286)/2, (9.8678344+5.4534286), inferno, 4.) ;
// //AU
generate_imgfile ("Result2.5.png", w, h, 600, -27.5, 133, 48.5, inferno, 2.5) ;
// 
// generate_imgfile ("SouthAmerica.png", w, h, 600, -7, -58, 48, inferno, 3.5) ; 
// generate_imgfile ("WestUS.png", w, h, 600, 40, -114, 23, inferno, 1.5) ;
// generate_imgfile ("Alps.png", w, h, 600, 45, 10.5, 12, inferno, 2.5) ;
// generate_imgfile ("UK.png", h, w, 600, 54, -2.5, 8.5, inferno, 3) ;
// generate_imgfile ("Scandinavia.png", w, h, 600, 61, 10, 10.5, inferno, 2) ;
// 
// generate_imgfile ("Poitiers.png", w, h, 600, 46.5, 0.5, 2, inferno, 1.5) ;
// generate_imgfile ("Provence.png", w, h, 600, 43.7, 6, 2, inferno, 2) ;
// 
// 
// generate_imgfile ("Himalaya.png", w, h, 600, 30, 87, 45, inferno, 2) ;
//generate_imgfile ("Japan.png", w, h, 600, 38, 136, 21, inferno, 2) ;
//generate_imgfile ("NewZealand.png", w, h, 600, -42, 172.5, 16, inferno, 2) ;
//generate_imgfile ("Indonesia.png", w, h, 600, -5, 141.5, 20, inferno, 2) ;

//generate_imgfile (148, 105, 300, -33, 130, 20, inferno) ; 
//generate_imgfile (148, 105, 300, (-31.41012107729496+-43.89806875124803)/2, (161.27929687500003+131.19873046875003)/2, 30, inferno) ; 
}





int generate_imgfile (std::string res, double width, double height, int dpi, double center_lat, double center_lng, double extent_lng, double * colormap, double smax, double smin) //width & height in mm
{
 int nx = round(width/25.4*dpi) ; 
 int ny = round(height/25.4*dpi) ; 
 if (nx%2==1) nx-- ; 
 if (ny%2==1) ny-- ; // I don't want odd number, not sure why.
 
 float * elevationarray = (float *) malloc(sizeof(float)*nx*ny); 
 
 double ratio = height/width ; 
 double ne_lng = center_lng + extent_lng/2. ;
 double sw_lng = center_lng - extent_lng/2. ; 
 double ne_lat = center_lat + extent_lng*ratio/2.0 ; 
 double sw_lat = center_lat - extent_lng*ratio/2.0 ; 
 
 elevation (ne_lat, ne_lng, sw_lat, sw_lng, ny, nx, elevationarray, 1000, GRIORA_Average) ; 
 
 double min=10000000, max=-10000000 ; 
 
 for (int i=0 ; i<nx*ny ; i++)
 {
   if (elevationarray[i]>max) max=elevationarray[i] ; 
   if (elevationarray[i]<min) min=elevationarray[i] ;
 }
 //min*=smin ; 
 //max*=smax ; 
 printf("Max: %g | Min:%g", min, max) ; 
 min=0 ; 
 for (int i=0 ; i<nx*ny ; i++)
 {
    elevationarray[i]=elevationarray[i]<0?0:elevationarray[i] ; 
    elevationarray[i]=(elevationarray[i]-min)/(max-min) ; 
    elevationarray[i] = 1-pow((1-elevationarray[i]), smax) ; 
 }
 png::image< png::rgb_pixel > image(nx, ny);
 for (int i=0 ; i<nx*ny ; i++)
 {
    int coloridx = clip(round(elevationarray[i]*256), 0, 255) ; 
    image[i/nx][i%nx] = png::rgb_pixel(colormap[3*coloridx]*256,colormap[3*coloridx+1]*256,colormap[3*coloridx+2]*256);
 }
 image.write(res.c_str());
 
 free (elevationarray) ;
 return 0 ; 
}





