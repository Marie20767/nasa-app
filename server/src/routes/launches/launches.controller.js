/* eslint-disable radix */
const { getAllLaunches, addNewLaunch, abortLaunch } = require('../../models/launches.model');

const getAllLaunchesRequest = async (_, res) => {
  return res.status(200).json(await getAllLaunches());
};

const addLaunchRequest = (req, res) => {
  const launch = req.body;

  if (!launch.mission || !launch.rocket || !launch.launchDate || !launch.destination) {
    return res.status(400).json({ error: 'Missing required launch property' });
  }

  const launchDate = new Date(launch.launchDate);

  // checks whether the launchDate is an actual date object and not just an object
  if (launchDate instanceof Date && launchDate.toString() === 'Invalid Date') {
    return res.status(400).json({ error: 'Invalid launch date' });
  }

  const { mission, rocket, destination } = launch;

  const newLaunch = addNewLaunch({ mission, rocket, launchDate, destination });

  return res.status(201).json(newLaunch);
};

const abortLaunchRequest = (req, res) => {
  const launchIdToAbort = parseInt(req.params.launchId);

  const result = abortLaunch(launchIdToAbort);

  if (result.error) {
    return res.status(400).json({ error: result.error });
  }

  return res.status(200).json({ launchId: launchIdToAbort });
};

module.exports = {
  getAllLaunchesRequest,
  addLaunchRequest,
  abortLaunchRequest,
};
