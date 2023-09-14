const express = require('express');
const { getAllPlanetsRequest } = require('./planets.controller');

const planetsRouter = express.Router();

planetsRouter.get('/', getAllPlanetsRequest);

module.exports = planetsRouter;
