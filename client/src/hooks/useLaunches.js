import { useCallback, useEffect, useState } from 'react';

import {
  getRequest,
  submitLaunchRequest,
  abortLaunchRequest,
} from './requests';

const useLaunches = (onSuccessSound, onAbortSound, onFailureSound) => {
  const [launches, saveLaunches] = useState([]);
  const [isPendingLaunch, setPendingLaunch] = useState(false);
  const [launchesError, setLaunchesError] = useState('');

  const getLaunches = useCallback(async () => {
    setLaunchesError('');
    const fetchedLaunches = await getRequest('/launches', 'Failed to get upcoming launches');

    if (fetchedLaunches.error || !fetchedLaunches.length) {
      setLaunchesError(fetchedLaunches.error);
    } else {
      saveLaunches(fetchedLaunches);
    }
  }, []);

  useEffect(() => {
    getLaunches();
  }, [getLaunches]);

  const submitLaunch = useCallback(async (e) => {
    e.preventDefault();
    // setPendingLaunch(true);
    const data = new FormData(e.target);
    const launchDate = new Date(data.get('launch-day'));
    const mission = data.get('mission-name');
    const rocket = data.get('rocket-name');
    const target = data.get('planets-selector');
    const response = await submitLaunchRequest({
      launchDate,
      mission,
      rocket,
      target,
    });

    // TODO: Set success based on response.
    const success = false;

    if (success) {
      getLaunches();
      setTimeout(() => {
        setPendingLaunch(false);
        onSuccessSound();
      }, 800);
    } else {
      onFailureSound();
    }
  }, [getLaunches, onSuccessSound, onFailureSound]);

  const abortLaunch = useCallback(async (id) => {
    const response = await abortLaunchRequest(id);

    // TODO: Set success based on response.
    const success = false;

    if (success) {
      getLaunches();
      onAbortSound();
    } else {
      onFailureSound();
    }
  }, [getLaunches, onAbortSound, onFailureSound]);

  return {
    launches,
    launchesError,
    isPendingLaunch,
    submitLaunch,
    abortLaunch,
  };
};

export default useLaunches;
