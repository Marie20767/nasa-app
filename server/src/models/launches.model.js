/* eslint-disable radix */
/* eslint-disable consistent-return */
const axios = require('axios');
const launches = require('./launches.mongo');
const planets = require('./planets.mongo');
const { DEFAULT_FLIGHT_NUMBER, SPACEX_URL, DEFAULT_PAGE_LIMIT } = require('../constants/launches');

const saveLaunch = async (launch) => {
  // If flightNumber already exists then we're updating the launch values otherwise we insert a new launch
  const newLaunch = await launches.updateOne({
    flightNumber: launch.flightNumber,
  }, launch, {
    upsert: true,
  });

  return newLaunch;
};

const findLaunch = async (filter) => {
  return await launches.findOne(filter);
};

const populateLaunches = async () => {
  const response = await axios.post(SPACEX_URL, {
    query: {},
    options: {
      pagination: false,
      populate: [
        {
          path: 'rocket',
          select: {
            name: 1,
          },
        },
        {
          path: 'payloads',
          select: {
            customers: 1,
          },
        },
      ],
    },
  });

  if (response.status !== 200) {
    return { error: 'Error getting SpaceX launches' };
  }

  const spaceXLaunchDocs = response.data.docs;

  const spaceXLaunches = spaceXLaunchDocs.map((launch) => {
    const {
      flight_number,
      name,
      rocket,
      date_local,
      upcoming,
      success,
      payloads,
    } = launch;

    return {
      flightNumber: flight_number,
      mission: name,
      rocket: rocket.name,
      launchDate: date_local,
      upcoming,
      success,
      customers: payloads.flatMap((payload) => payload.customers),
    };
  });

  // TODO: make it so it executes this fully before moving on?
  spaceXLaunches.forEach(async (launch) => {
    await saveLaunch(launch);
  });
};

const loadSpaceXLaunchData = async () => {
  // Checking if we already have the data to make sure we don't get it again for no reason
  const firstLaunch = await findLaunch({
    flightNumber: 1,
    rocket: 'Falcon 1',
    mission: 'FalconSat',
  });

  if (firstLaunch) {
    console.log('Launch data already loaded!');
  } else {
    await populateLaunches();
  }
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

  const planet = await planets.findOne({ kepler_name: launch.destination });

  if (!planet) {
    return { error: 'No matching planet found' };
  }

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
  return await findLaunch({ flightNumber: launchId });
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

const getLaunches = async (skipValue, currentPage, isUpcomingLaunch) => {
  // TODO: use caching here instead
  const launchesTotalCount = await launches.countDocuments({ upcoming: !!isUpcomingLaunch });
  const totalPages = Math.ceil(launchesTotalCount / DEFAULT_PAGE_LIMIT);

  const launchResults = await launches
    .find({ upcoming: !!isUpcomingLaunch }, { _id: 0, __v: 0 })
    .sort({ flightNumber: 1 })
    .skip(skipValue)
    .limit(DEFAULT_PAGE_LIMIT);

  if (parseInt(currentPage) === totalPages) {
    return {
      launches: launchResults,
      isLastPage: true,
    };
  }

  return {
    launches: launchResults,
    isLastPage: false,
  };
};

module.exports = {
  addNewLaunch,
  loadSpaceXLaunchData,
  launchWithIdExists,
  abortLaunch,
  getLaunches,
};
