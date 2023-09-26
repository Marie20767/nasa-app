import { useCallback, useEffect, useState } from 'react';

import {
  getRequest,
  abortLaunchRequest,
} from './requests';

const useUpcomingLaunches = (onAbortSound, onFailureSound) => {
  const [launches, setLaunches] = useState([]);
  const [launchesError, setLaunchesError] = useState('');
  const [abortLaunchError, setAbortLaunchError] = useState('');
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [isLastPage, setIsLastPage] = useState(true);

  const getUpcomingLaunches = async (pageNumber = 1) => {
    setLaunchesError('');

    const fetchedLaunches = await getRequest({
      endpoint: `/launches/upcoming/${pageNumber}`,
      errorMessage: 'Failed to get upcoming launches',
    });

    if (fetchedLaunches.error || !Array.isArray(fetchedLaunches.launches)) {
      setLaunchesError(fetchedLaunches.error);
    } else {
      const newLaunches = [
        ...launches,
        ...fetchedLaunches.launches,
      ];

      setLaunches(newLaunches);
      setIsLastPage(fetchedLaunches.isLastPage);
    }
  };

  useEffect(() => {
    getUpcomingLaunches(1);
  }, []);

  const onHandleAbortLaunch = useCallback(async (launchId) => {
    setAbortLaunchError('');
    const result = await abortLaunchRequest(launchId);

    if (result.error) {
      onFailureSound();
      setAbortLaunchError(result.error);
    } else {
      getUpcomingLaunches();
      onAbortSound();
    }
  }, [getUpcomingLaunches, onAbortSound, onFailureSound]);

  const onHandleMoreLaunchResults = () => {
    const newCurrentPage = currentPageNumber + 1;

    setCurrentPageNumber(newCurrentPage);

    getUpcomingLaunches(newCurrentPage);
  };

  return {
    launches,
    launchesError,
    abortLaunchError,
    isLastPage,
    onHandleAbortLaunch,
    onHandleMoreLaunchResults,
  };
};

export default useUpcomingLaunches;
