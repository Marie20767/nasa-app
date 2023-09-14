const launches = require('./launches.mongo');
const planets = require('./planets.mongo');
const { DEFAULT_FLIGHT_NUMBER } = require('../constants/launches');

const saveLaunch = async (launch) => {
  const planet = await planets.findOne({ kepler_name: launch.destination });

  if (!planet) {
    return ({ error: 'No matching planet found' });
  }
  // If flightNumber already exists then we're updating the launch values otherwise we insert a new launch
  const newLaunch = await launches.updateOne({
    flightNumber: launch.flightNumber,
  }, launch, {
    upsert: true,
  });

  return newLaunch;
};

const getLatestFlightNumber = async () => {
  const latestLaunch = await launches
    .findOne()
    // sort in descending order
    .sort(('-flightNumber'));

  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUMBER;
  }

  return latestLaunch.flightNumber;
};

const addNewLaunch = async (launch) => {
  const { mission, rocket, launchDate, destination } = launch;

  const newFlightNumber = await getLatestFlightNumber() + 1;

  const newLaunch = {
    flightNumber: newFlightNumber,
    mission,
    rocket,
    launchDate,
    destination,
    customers: ['Marie\'s Team', 'NASA'],
    upcoming: true,
    success: true,
  };

  return await saveLaunch(newLaunch);
};

const launchWithIdExists = async (launchId) => {
  return await launches.findOne({ flightNumber: launchId });
};

const abortLaunch = async (launchId) => {
  const launchExists = await launchWithIdExists(launchId);

  if (!launchExists) {
    return { error: "Launch id doesn't exist" };
  }

  const aborted = await launches.updateOne({
    flightNumber: launchId,
  }, {
    upcoming: false,
    success: false,
  });

  return aborted.modifiedCount === 1;
};

const getAllLaunches = async () => {
  return await launches
    .find({}, { _id: 0, __v: 0 });
};

module.exports = {
  addNewLaunch,
  launchWithIdExists,
  abortLaunch,
  getAllLaunches,
};
