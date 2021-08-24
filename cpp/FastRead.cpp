#include <cstdlib>
#include <cstdio>
#include <filesystem>
#include <gdal/gdal_priv.h>
#include <cmath>
#include <vector>
#include <string>
#include <cassert>
#include <filesystem>
using namespace std ; 

std::string tilename (double lat, double lon)
{
 char name[50] ; 
 sprintf(name, "/media/franz/Koala2/COP30M/extracted/%c%02d%c%02d.tif", ((lat<0)?'S':'N'), static_cast<int>(abs(floor(lat))),  ((lon<0)?'W':'E'), static_cast<int>(abs(floor(lon)))) ; 
 //sprintf(name, "/mnt/Koala/COP_DEMGLO30/tifs/%c%02d%c%02d.tif", ((lat<0)?'S':'N'), static_cast<int>(abs(floor(lat))),  ((lon<0)?'W':'E'), static_cast<int>(abs(floor(lon)))) ; 
 return (name) ;     
}

int elevation (double ne_lat, double ne_lng, double sw_lat, double sw_lng, int ny, int nx, float * pafScanline)
{
    GDALRasterIOExtraArg extraargs ;
    INIT_RASTERIO_EXTRA_ARG(extraargs) ; 
    extraargs.eResampleAlg = GRIORA_Bilinear ; 
    
    for (int j=ceil(ne_lat), nnycum = 0 ; j>floor(sw_lat) ; j--)
    {
        int nny ; 
        for (int i = floor(sw_lng), nnxcum=0 ; i<ceil(ne_lng) ; i++)
        {
            GDALDataset  *poDataset;
            GDALAllRegister();
            auto filename = tilename(j-1, i) ; // Lower left corner for COP30M DEM
            if (!std::filesystem::exists(filename))
            {
                printf("Cannot find the required file %s. ", filename.c_str()) ;
                continue ; 
            }
            else
                poDataset = (GDALDataset *) GDALOpen(filename.c_str(), GA_ReadOnly);
            
            double adfGeoTransform[6] ;  
            poDataset->GetGeoTransform( adfGeoTransform );
    
            int startx = round((max(sw_lng,(double)(i))-i)/(adfGeoTransform[1])) ;
            int starty = round((min(ne_lat,(double)(j))-j)/(adfGeoTransform[5])) ;
            int stopx  = round((min(ne_lng,(double)(i+1))-i)/(adfGeoTransform[1])) ;
            int stopy  = round((max(sw_lat,(double)(j-1))-j)/(adfGeoTransform[5])) ;
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
    
    
    
    /*
    
    if (floor(ne_lat) != floor(sw_lat) || floor(ne_lng) != floor(sw_lng))
    {
        //printf("Not implemented yet") ; 
        return 0 ; 
    }
    else 
    {
        GDALDataset  *poDataset;
        GDALAllRegister();
        auto filename = tilename(sw_lat, sw_lng) ; // Lower left corner for COP30M DEM
        poDataset = (GDALDataset *) GDALOpen(filename.c_str(), GA_ReadOnly);
        if (poDataset == nullptr) { printf("Cannot find the required file. ") ; return 0 ; }
        
        double adfGeoTransform[6] ;  
        poDataset->GetGeoTransform( adfGeoTransform );
        int nx_geotiff = (ne_lng-sw_lng)/adfGeoTransform[1] ; 
        int ny_geotiff = (ne_lat-sw_lat)/(-adfGeoTransform[5]) ; 
        int nx_offset = round((sw_lng-floor(sw_lng))/adfGeoTransform[1]) ; 
        int ny_offset = round((ne_lat-ceil(ne_lat))/(adfGeoTransform[5])) ;
        
        assert((sizeof(GDT_Float32)==sizeof(float)));
        //printf("%d %d %d %d %g %g %s\n", nx_geotiff, ny_geotiff, nx_offset, ny_offset, adfGeoTransform[1], adfGeoTransform[5], filename.c_str()); fflush(stdout) ; 
        auto res = poDataset->RasterIO( GF_Read, nx_offset, ny_offset, nx_geotiff, ny_geotiff, (void *)pafScanline, nx, ny, GDT_Float32, 1, NULL, 0, 0, 0, &extraargs);
        //for (int i=0 ; i<nx*ny ; i++) printf("%g ", pafScanline[i]) ; 
        return 5 ; 
    } */
    return 0 ; 
}

int main (int argc, char * argv[])
{
int nx = 21 ;
int ny = 21 ; 
int nn = nx*ny ; 
float * elevationarray = (float *) malloc(sizeof(float)*nn); 
//elevation( -34.32507927447516, 150.91146469116214, -34.3477588987833, 150.86558818817142,  ny, nx, elevationarray) ;  
elevation(-34.25396567966451,150.97334105164282,-34.255764320335494,150.97116494835717,21,21, elevationarray) ;
printf("//") ; 
for (int i=0 ; i<nx*ny ; i++) printf("%f ", elevationarray[i]) ; 
}
