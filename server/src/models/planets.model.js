const { parse } = require('csv-parse');
const fs = require('fs');
const path = require('path');

const habitablePlanets = [];

const isHabitablePlanet = (planet) => {
  // conditions:
  // should be at status confirmed
  // should get between 0.36 and 1.11x of light that Earth gets (insolation flux)
  // shouldn't be more than 1.6x the size of Earth (planetary radius)
  const isConfirmed = planet.koi_disposition === 'CONFIRMED';
  const getsEnoughLight = planet.koi_insol > 0.36 && planet.koi_insol < 1.11;
  const hasRightSize = planet.koi_prad < 1.6;

  return isConfirmed && getsEnoughLight && hasRightSize;
};

const loadPlanetsData = () => {
  return new Promise((resolve, reject) => {
    fs.createReadStream(path.join(__dirname, '..', 'data', 'kepler_data.csv'))
    // connecting parse to fs
      .pipe(parse({
        comment: '#',
        columns: true,
      }))
      .on('data', (data) => {
        if (isHabitablePlanet(data)) {
          habitablePlanets.push(data);
        }
      })
      .on('error', (error) => {
        console.log(error);
        reject(error);
      })
      .on('end', () => {
        console.log(`${habitablePlanets.length} habitable planets found!`);
        resolve();
      });
  });
};

module.exports = {
  loadPlanetsData,
  planets: habitablePlanets,
};
