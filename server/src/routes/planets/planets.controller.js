const { getAllPlanets } = require('../../models/planets.model');

const getAllPlanetsRequest = async (_, res) => {
  return res.status(200).json(await getAllPlanets());
};

module.exports = {
  getAllPlanetsRequest,
};
