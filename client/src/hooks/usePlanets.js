import { useCallback, useEffect, useState } from 'react';

import { getRequest } from './requests';

const usePlanets = () => {
  const [planets, setPlanets] = useState([]);
  const [planetsError, setPlanetsError] = useState('');

  const getPlanets = useCallback(async () => {
    setPlanetsError('');
    const fetchedPlanets = await getRequest('/planets', 'Failed to get Destination Exoplanets');

    if (fetchedPlanets.error || !fetchedPlanets.length) {
      setPlanetsError(fetchedPlanets.error);
    } else {
      setPlanets(fetchedPlanets);
    }
  }, []);

  useEffect(() => {
    getPlanets();
  }, [getPlanets]);

  return {
    planets,
    planetsError,
  };
};

export default usePlanets;
