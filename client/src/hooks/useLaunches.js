import { useCallback, useState } from 'react';

import { submitLaunchRequest } from './requests';

const useLaunches = (onSuccessSound, onFailureSound) => {
  const [isPendingLaunch, setIsPendingLaunch] = useState(false);
  const [submitLaunchError, setSubmitLaunchError] = useState('');
  const [launchSuccess, setLaunchSuccess] = useState('');
  const [missionInput, setMissionInput] = useState('');

  const onHandleSubmitLaunch = useCallback(async (e) => {
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
        setTimeout(() => {
          setIsPendingLaunch(false);
          onSuccessSound();
          setLaunchSuccess('Successfully launched mission!');
          setMissionInput('');
        }, 800);

        setTimeout(() => {
          setLaunchSuccess('');
        }, 3000);
      }
    } else {
      setIsPendingLaunch(false);
      onFailureSound();
      setSubmitLaunchError('Please fill in all fields to launch the mission');
    }
  }, [onSuccessSound, onFailureSound]);

  return {
    submitLaunchError,
    launchSuccess,
    isPendingLaunch,
    missionInput,
    setMissionInput,
    onHandleSubmitLaunch,
  };
};

export default useLaunches;
