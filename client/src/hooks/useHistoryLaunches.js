import { useEffect, useState } from 'react';

import {
  getRequest,
} from './requests';

const useHistoryLaunches = () => {
  const [launches, setLaunches] = useState([]);
  const [launchesError, setLaunchesError] = useState('');
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [isLastPage, setIsLastPage] = useState(true);

  const getHistoryLaunches = async (pageNumber = 1) => {
    setLaunchesError('');

    const fetchedLaunches = await getRequest({
      endpoint: `/launches/history/${pageNumber}`,
      errorMessage: 'Failed to get past launches',
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
    getHistoryLaunches(1);
  }, []);

  const onHandleMoreLaunchResults = () => {
    const newCurrentPageNumber = currentPageNumber + 1;

    setCurrentPageNumber(newCurrentPageNumber);

    getHistoryLaunches(newCurrentPageNumber);
  };

  return {
    launches,
    launchesError,
    isLastPage,
    onHandleMoreLaunchResults,
  };
};

export default useHistoryLaunches;
