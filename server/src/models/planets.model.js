const { parse } = require('csv-parse');
const fs = require('fs');
const path = require('path');
const planets = require('./planets.mongo');

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

const getAllPlanets = async () => {
  // If you pass an empty object to find, Mongoose gives you all planets
  // Second argument is the projection
  // Exluding v and id
  return await planets.find({}, {
    _id: 0,
    __v: 0,
  });
};

const savePlanet = async (planet) => {
  // Use upsert with Mongoose to make sure planets are only added when they don't exist yet
  try {
    await planets.updateOne({
      kepler_name: planet.kepler_name,
    }, {
      kepler_name: planet.kepler_name,
    }, {
      upsert: true,
    });
  } catch (err) {
    console.error(`Could not save new planet ${err}`);
  }
};

const loadPlanetsData = () => {
  return new Promise((resolve, reject) => {
    fs.createReadStream(path.join(__dirname, '..', 'data', 'kepler_data.csv'))
    // connecting parse to fs
      .pipe(parse({
        comment: '#',
        columns: true,
      }))
      .on('data', async (data) => {
        if (isHabitablePlanet(data)) {
          savePlanet(data);
        }
      })
      .on('error', (error) => {
        console.log(error);
        reject(error);
      })
      .on('end', async () => {
        const habitablePlanetsCount = (await getAllPlanets()).length;

        console.log(`${habitablePlanetsCount} habitable planets found!`);
        resolve();
      });
  });
};

module.exports = {
  loadPlanetsData,
  getAllPlanets,
};
