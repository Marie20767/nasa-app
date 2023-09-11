const express = require('express');
const { getAllLaunchesRequest, addLaunchRequest, abortLaunchRequest } = require('./launches.controller');

const launchesRouter = express.Router();

launchesRouter.get('/', getAllLaunchesRequest);
launchesRouter.post('/', addLaunchRequest);
launchesRouter.delete('/:launchId', abortLaunchRequest);

module.exports = launchesRouter;
