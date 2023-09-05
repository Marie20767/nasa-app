const { launches } = require('../../models/launches.model');

const getAllLaunches = (_, res) => {
  // TODO: sort by...?
  res.status(200).json(launches);
};

module.exports = {
  getAllLaunches,
};
