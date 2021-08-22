#include <png++/png.hpp>
#include "Server.h"
#include <filesystem>
#include <gdal/gdal_priv.h>
#include <cmath>
#include <deque>

#define MAXBUFFER 100000
#define TILESETFILESMAXSIZE 15

std::deque <std::pair<std::string, GDALDataset *>> tileset_files ; 
std::mutex tileset_files_protect ; 

//----------------------------------
std::vector<double> num2deg (int x, int y, int z)
{
  int n = 1 << z ;
  double lon_deg = (double) x / (double) n * 360.0 - 180.0;
  double lat_rad = atan(sinh(M_PI * (1 - 2 * (double)y / (double)n))) ;
  double lat_deg = lat_rad/M_PI*180. ; 
  
  double lon2_deg = (double) (x+1) / (double) n * 360.0 - 180.0;
         lat_rad = atan(sinh(M_PI * (1 - 2 * (double)(y+1) / (double)n)));
  double lat2_deg = lat_rad/M_PI*180. ; 
  
  return {lat_deg, lon_deg, lat2_deg, lon2_deg} ; 
}
//----------------------------------
std::string tilename (double lat, double lon)
{
 char name[50] ; 
 sprintf(name, "/media/franz/Koala2/COP30M/extracted/%c%02d%c%02d.tif", ((lat<0)?'S':'N'), static_cast<int>(abs(floor(lat))),  ((lon<0)?'W':'E'), static_cast<int>(abs(floor(lon)))) ; 
 return (name) ;     
}
//---------------------------------

{
    
    
}

//===============================================
int main(int argc, char * argv[])
{
    using namespace httplib;
    
    Server svr;
    auto lastcompile = std::filesystem::last_write_time(argv[0]) ; 
    
    svr.set_base_dir(".");
    svr.Get("/hi", [](const Request& req, Response& res) {
        res.set_content("Hello World!", "text/plain");
    });
    //printf("[%s]", Texturing4.DirectorySave.c_str()) ; fflush(stdout);
    //svr.Get("/something", [](const Request& req, Response& res) {
    //});
    
    svr.Get("/map/.*",[lastcompile](const Request& req, Response& res) {
        int x, y, z ; 
        sscanf (req.path.c_str(), "/map/%d/%d/%d", &z, &x, &y) ;
        
        printf("Request:%d %d %d\n", x,y,z) ; 
        std::filesystem::path fic = std::string("cache/")+std::to_string(z) + "/"+std::to_string(x)+"/" ; 
        std::filesystem::create_directories(fic);
        
        fic += std::to_string(y)+".png" ; 
        
        auto make_empty_file = [](std::string fic) {
            png::image< png::rgba_pixel > image(256, 256);
            for (int i=0 ; i<256*256 ; i++)
                image[i/256][i%256] = png::rgba_pixel(1,1,1,0);
            image.write(fic.c_str());   
        } ; 
        
        if (1)//!std::filesystem::exists(fic) || 
            //std::filesystem::last_write_time(fic)<lastcompile)
        {
            float * pafScanline;
            int nx=256, ny=256 ; 
            auto bbox = num2deg(x,y,z) ; 
            if (floor(bbox[0])!=floor(bbox[2]) || floor(bbox[1])!=floor(bbox[3])) //NOT IMPLEMENTED YET
            {
                
            }
            else
            {
                GDALDataset  *poDataset;
                GDALAllRegister();
                pafScanline = (float *) CPLMalloc(sizeof(float)*nx*ny);
                auto filename = tilename(bbox[2], bbox[1]) ; // Lower left corner for COP30M DEM
                
                auto file = std::find_if (tileset_files.begin(), tileset_files.end(), [&](std::pair<std::string, GDALDataset  *> v){ return v.first==filename; });
                if (file == tileset_files.end()) ; 
                {
                    poDataset = (GDALDataset *) GDALOpen(filename.c_str(), GA_ReadOnly);
                    if (poDataset==nullptr)
                    {
                        printf("Cannot find the file requested.\n") ; 
                        make_empty_file(filename) ; 
                        goto returnfile ; 
                    }
                    printf("%s\n", filename.c_str()) ; fflush(stdout) ; 
                    const std::lock_guard<std::mutex> lock(tileset_files_protect);
                    if (tileset_files.size() > TILESETFILESMAXSIZE) 
                    {
                        GDALClose(tileset_files.front().second) ; 
                        tileset_files.pop_front() ; 
                    }
                    tileset_files.push_back(std::make_pair(filename, poDataset)) ; 
                }
                
                double adfGeoTransform[6] ; 
                poDataset->GetGeoTransform( adfGeoTransform );
                int nx_geotiff = (bbox[3]-bbox[1])/adfGeoTransform[1] ; 
                int ny_geotiff = (bbox[2]-bbox[0])/adfGeoTransform[5] ; 
                int nx_off = round((bbox[1]-floor(bbox[1]))/adfGeoTransform[1]) ; 
                int ny_off = round((bbox[0]-ceil(bbox[0]))/(adfGeoTransform[5])) ; 
                printf("%d %d %d %d %g %g\n", nx_geotiff, ny_geotiff, nx_off, ny_off, adfGeoTransform[1], adfGeoTransform[5]); fflush(stdout) ; 
                auto res = poDataset->RasterIO( GF_Read, nx_off, ny_off, nx_geotiff, ny_geotiff, (void *)pafScanline, nx, ny, GDT_Float32, 1, NULL, 0, 0, 0, NULL);
                
                png::image< png::rgb_pixel > image(256, 256);
                double min=10000000, max=-10000000 ; 
                for (int i=0 ; i<256*256 ; i++)
                {
                    if (pafScanline[i]>max) max=pafScanline[i] ; 
                    if (pafScanline[i]<min) min=pafScanline[i] ;
                }
                min = 100 ; max=500 ; 
                printf("%g %g | %g %g %g %g %g %g\n", min, max, bbox[0], bbox[1], bbox[2], bbox[3], ceil(bbox[0]), floor(bbox[1])) ; 
                for (int i=0 ; i<256*256 ; i++)
                    image[i/256][i%256] = png::rgb_pixel((pafScanline[i]-min)/(max-min)*255, (pafScanline[i]-min)/(max-min)*255, (pafScanline[i]-min)/(max-min)*255);
                image.write(fic.c_str());   
                free(pafScanline) ; 
            }
        }
        
        returnfile: // Label for GOTO: easy way to handle errors (yes, should probably use an error throw ...
        try {
            char buffer[MAXBUFFER] ;
            auto ficsize = std::filesystem::file_size(fic) ; 
            if ( MAXBUFFER < ficsize ) {printf("Filesize exceeds buffer\n") ; res.status=500 ; return ; }
            FILE * in ; in=fopen(fic.c_str(), "rb") ; 
            fread(buffer,1,ficsize,in) ; 
            fclose(in);
            res.set_content(buffer, ficsize, "image/png");
        } catch(...) {res.status=404 ; return; }
        return ;  
        
    });

    printf("Starting localhost:5001\n") ; fflush(stdout) ;
    svr.listen("localhost", 5001);
}
