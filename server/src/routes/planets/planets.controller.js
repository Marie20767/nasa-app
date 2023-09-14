const { getAllPlanets } = require('../../models/planets.model');

const getAllPlanetsRequest = async (_, res) => {
  const allPlanets = await getAllPlanets();

  return res.status(200).json(allPlanets);
};

module.exports = {
  getAllPlanetsRequest,
};
