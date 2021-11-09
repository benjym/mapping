# mapping toolbox

This is a set of interactive tools which are designed to be used for educational purposes. They are not validated and rely on data that is not of a quality that can be used for design purposes.

The mapping toolbox currently contains:
  - pollution module, for modelling the spread of pollutants in the air using a gaussian plume model
  - slope stability module, for assessing slope stability using a few simple models
  - rockfall module, for assistance in designing protection structures to divert rockfalls

## Pollution module
Visualise the dispersion of a plume on top of a map. This implements a [gaussian plume model](https://en.wikipedia.org/wiki/Atmospheric_dispersion_modeling#Gaussian_air_pollutant_dispersion_equation) to represent the dispersion of contaminants in the air. There are two modes available, for both point sources (e.g. smoke stacks) and line sources (e.g. roads). You can try them out here:
  - [Point source](https://benjym.github.io/mapping/pollution.html?source=point).
  - [Line source](https://benjym.github.io/mapping/pollution.html?source=line).

To be able to see the concentration, you will need to pick a wind direction using the wind rose in the bottom left hand corner.

## Slope stability module
This implements three models for predicting slope stability, an infinite slope model, Cullman's model and Taylor charts. You can [try it out here](https://benjym.github.io/mapping/slope-stability.html).

## Rockfall module
Choose a location for your rockfall and the system will begin spawning particles at that location. The properties of the particles are adjustable. You can right click on the map to add rigid protection structures. [Try it out here](https://benjym.github.io/mapping/rockfall.html).

## Instructions for developers
1. Download this repository
2. Unzip
3. Open `index.html` in Chrome and play around!

## Authors
- [Benjy Marks](https://github.com/benjym/)
- [François Guillard](https://github.com/Franzzzzzzzz/)
