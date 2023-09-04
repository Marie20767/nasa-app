import { useCallback, useEffect, useState } from 'react';

import { getPlanetsRequest } from './requests';

const usePlanets = () => {
  const [planets, savePlanets] = useState([]);

  const getPlanets = useCallback(async () => {
    const fetchedPlanets = await getPlanetsRequest();

    savePlanets(fetchedPlanets);
  }, []);

  useEffect(() => {
    getPlanets();
  }, [getPlanets]);

  return planets;
};

export default usePlanets;
