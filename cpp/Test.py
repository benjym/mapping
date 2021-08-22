from ctypes import *

libfastread = CDLL("./libfastread.so")
libfastread._Z9elevationddddiiPf.argtypes = [c_double, c_double, c_double, c_double, c_int, c_int, POINTER(c_float)] ; 
nx = 10 
ny = 5 ; 
nn = nx*ny
elevationarray = (c_float*nn)(); 
a=libfastread._Z9elevationddddiiPf( -34.32507927447516, 150.91146469116214, -34.3477588987833, 150.86558818817142,  ny, nx, cast(elevationarray, POINTER(c_float))) ;
#a=libfastread._Z9elevationddddiiPf( -36.5, 150.5, -36.8, 150.2,  ny, nx, cast(elevationarray, POINTER(c_float))) ; 
print(a) ; 
for i in range(0, nn):
    print(elevationarray[i]) ; 
