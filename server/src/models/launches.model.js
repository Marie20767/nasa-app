const launches = require('./launches.mongo');

let latestLaunchNumber = 100;

let unsortedLaunches = [];

const defaultLaunch = {
  flightNumber: 100,
  mission: 'Kepler Exploration X',
  rocket: 'Explorer IS1',
  launchDate: new Date('December 27, 2030'),
  destination: 'Kepler-442 b',
  customers: ['Marie\'s Team', 'NASA'],
  upcoming: true,
  success: true,
};

const saveLaunch = async (launch) => {
  // If flightNumber already exists then we're updating the launch values otherwise we insert a new launch
  await launches.updateOne({
    flightNumber: launch.flightNumber,
  }, launch, {
    upsert: true,
  });
};

saveLaunch(defaultLaunch);

const addNewLaunch = (launch) => {
  const { mission, rocket, launchDate, destination } = launch;

  const newLaunch = {
    flightNumber: latestLaunchNumber++,
    mission,
    rocket,
    launchDate,
    destination,
    customers: ['Marie\'s Team', 'NASA'],
    upcoming: true,
    success: true,
  };

  unsortedLaunches.push(newLaunch);

  return newLaunch;
};

const launchWithIdExists = (launchId) => {
  return unsortedLaunches.some((launch) => launch.flightNumber === launchId);
};

const abortLaunch = (launchId) => {
  if (!launchWithIdExists(launchId)) {
    return { error: "Launch id doesn't exist" };
  }

  const updatedLaunches = unsortedLaunches.map((launch) => {
    if (launch.flightNumber === launchId) {
      return {
        ...launch,
        upcoming: false,
        success: false,
      };
    }

    return launch;
  });

  unsortedLaunches = updatedLaunches;

  return unsortedLaunches;
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
