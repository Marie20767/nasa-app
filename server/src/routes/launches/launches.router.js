const express = require('express');
const { getUpcomingLaunchesRequest, addLaunchRequest, abortLaunchRequest, getHistoryLaunchesRequest } = require('./launches.controller');

const launchesRouter = express.Router();

launchesRouter.get('/upcoming/:currentPageNumber', getUpcomingLaunchesRequest);
launchesRouter.get('/history/:currentPageNumber', getHistoryLaunchesRequest);
launchesRouter.post('/', addLaunchRequest);
launchesRouter.delete('/:launchId', abortLaunchRequest);

module.exports = launchesRouter;
