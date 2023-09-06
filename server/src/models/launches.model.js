let latestLaunchNumber = 100;

let unsortedLaunches = [];

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

const abortLaunch = (launchId) => {
  if (!unsortedLaunches.some((launch) => launch.flightNumber === launchId)) {
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

const getSortedLaunches = () => {
  return unsortedLaunches.sort((a, b) => a.flightNumber - b.flightNumber);
};

module.exports = {
  addNewLaunch,
  abortLaunch,
  getSortedLaunches,
};
