const { planets } = require('../../models/planets.model');

const getAllPlanets = (_, res) => {
  res.status(200).json(planets);
};

module.exports = {
  getAllPlanets,
};
