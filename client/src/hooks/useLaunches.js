import { useCallback, useEffect, useState } from 'react';

import {
  getRequest,
  submitLaunchRequest,
  abortLaunchRequest,
} from './requests';

const useLaunches = (onSuccessSound, onAbortSound, onFailureSound) => {
  const [launches, setLaunches] = useState([]);
  const [isPendingLaunch, setIsPendingLaunch] = useState(false);
  const [getLaunchesError, setGetLaunchesError] = useState('');
  const [submitLaunchError, setSubmitLaunchError] = useState('');
  const [abortLaunchError, setAbortLaunchError] = useState('');
  const [launchesSuccess, setLaunchesSuccess] = useState('');
  const [missionInput, setMissionInput] = useState('');

  // TODO: reset rocket input?

  const getLaunches = useCallback(async () => {
    setGetLaunchesError('');
    const fetchedLaunches = await getRequest('/launches', 'Failed to get upcoming launches');

    if (fetchedLaunches.error || !Array.isArray(fetchedLaunches)) {
      setGetLaunchesError(fetchedLaunches.error);
    } else {
      const sortedLaunches = fetchedLaunches.sort((a, b) => a.flightNumber - b.flightNumber);

      setLaunches(sortedLaunches);
    }
  }, []);

  useEffect(() => {
    getLaunches();
  }, [getLaunches]);

  const submitLaunch = useCallback(async (e) => {
    e.preventDefault();
    setSubmitLaunchError('');
    setIsPendingLaunch(true);

    const data = new FormData(e.target);
    const launchDate = new Date(data.get('launch-day'));
    const mission = data.get('mission-name');
    const rocket = data.get('rocket-name');
    const destination = data.get('planets-selector');

    if (launchDate && mission && rocket && destination) {
      const result = await submitLaunchRequest({
        launchDate,
        mission,
        rocket,
        destination,
      });

      if (result.error) {
        setIsPendingLaunch(false);
        onFailureSound();
        setSubmitLaunchError(result.error);
      } else {
        getLaunches();

        setTimeout(() => {
          setIsPendingLaunch(false);
          onSuccessSound();
          setLaunchesSuccess('Successfully launched mission!');
          setMissionInput('');
        }, 800);

        setTimeout(() => {
          setLaunchesSuccess('');
        }, 3000);
      }
    } else {
      setIsPendingLaunch(false);
      onFailureSound();
      setSubmitLaunchError('Please fill in all fields to launch the mission');
    }
  }, [onSuccessSound, onFailureSound]);

  const abortLaunch = useCallback(async (launchId) => {
    setAbortLaunchError('');
    const result = await abortLaunchRequest(launchId);

    if (result.error) {
      onFailureSound();
      setAbortLaunchError(result.error);
    } else {
      getLaunches();
      onAbortSound();
    }
  }, [getLaunches, onAbortSound, onFailureSound]);

  return {
    launches,
    getLaunchesError,
    submitLaunchError,
    abortLaunchError,
    launchesSuccess,
    isPendingLaunch,
    submitLaunch,
    abortLaunch,
    missionInput,
    setMissionInput,
  };
};

export default useLaunches;
