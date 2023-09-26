/* eslint-disable radix */
const {
  addNewLaunch,
  abortLaunch,
  getLaunches,
} = require('../../models/launches.model');
const { getPageOffset } = require('../../utils/query');

const getRequestWithPagination = async (req, res, isUpcomingLaunch = false) => {
  const { currentPageNumber } = req.params;
  const skip = getPageOffset(currentPageNumber);

  try {
    const launches = await getLaunches(skip, currentPageNumber, isUpcomingLaunch);

    return res.status(200).json(launches);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

const getUpcomingLaunchesRequest = async (req, res) => {
  const isUpcomingLaunch = true;

  await getRequestWithPagination(req, res, isUpcomingLaunch);
};

const getHistoryLaunchesRequest = async (req, res) => {
  await getRequestWithPagination(req, res);
};

const addLaunchRequest = async (req, res) => {
  try {
    const launch = req.body;
    const launchDate = new Date(launch.launchDate);

    if (!launch.mission || !launch.rocket || !launch.launchDate || !launch.destination) {
      return res.status(400).json({ error: 'Missing required launch property' });
    }

    // checks whether the launchDate is an actual date object and not just an object
    if (launchDate instanceof Date && launchDate.toString() === 'Invalid Date') {
      return res.status(400).json({ error: 'Invalid launch date' });
    }

    const result = await addNewLaunch(launch);

    if (result?.error) {
      return res.status(404).json(result.error);
    }

    return res.status(201).json(launch);
  } catch (err) {
    console.error(err);

    return res.status(500).json('Could not save new launch');
  }
};

const abortLaunchRequest = async (req, res) => {
  const launchIdToAbort = parseInt(req.params.launchId);

  try {
    const aborted = await abortLaunch(launchIdToAbort);

    if (aborted.error) {
      return res.status(404).json({ error: aborted.error });
    }

    if (!aborted) {
      return res.status(400).json({ error: 'Launch not aborted' });
    }

    return res.status(200).json(`Launch with id ${launchIdToAbort} aborted`);
  } catch (err) {
    console.error(err);

    return res.status(500).json({ error: `Could not abort launch No.${launchIdToAbort}` });
  }
};

module.exports = {
  getUpcomingLaunchesRequest,
  getHistoryLaunchesRequest,
  addLaunchRequest,
  abortLaunchRequest,
};
