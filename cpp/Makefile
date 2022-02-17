CC=g++

SOURCES=FastRead.cpp
OBJECTS=$(SOURCES:.cpp=.o)
EXECUTABLE=FastReadTesting
SHAREDLIB=libfastread.so

test: CFLAGS=-std=c++17
test: LDFLAGS=
test: LIBS=-lgdal
test: $(SOURCES) $(EXECUTABLE)

sharedlib: CFLAGS=-std=c++17
sharedlib: LDFLAGS=-shared -Wl,-soname,libfastread.so
sharedlib: LIBS=-lgdal
sharedlib: $(SOURCES) $(SHAREDLIB)

$(EXECUTABLE): $(OBJECTS)
	$(CC) $(LDFLAGS) $(OBJECTS) -o $@ $(LIBS)

$(SHAREDLIB): $(OBJECTS)
	$(CC) $(LDFLAGS) $(OBJECTS) -o $@ $(LIBS)

.cpp.o:
	$(CC) $(CFLAGS) -c $< -o $@

clean : 
	rm *.o
