import { useMemo } from 'react';
import { Appear, Paragraph } from 'arwes';

import Warning from '../components/Warning';
import CustomForm from '../components/CustomForm';
import Success from '../components/Success';
import useLaunches from '../hooks/useLaunches';

const Launch = ({
  entered,
  planets,
  planetsError,
  onSuccessSound,
  onFailureSound,
}) => {
  const {
    launchSuccess,
    isPendingLaunch,
    submitLaunchError,
    missionInput,
    setMissionInput,
    onHandleSubmitLaunch,
  } = useLaunches(onSuccessSound, onFailureSound);

  const selectorBody = useMemo(() => {
    return planets?.map((planet) => {
      return (
        <option
          value={planet.kepler_name}
          key={planet.kepler_name}>{planet.kepler_name}
        </option>
      );
    });
  }, [planets]);

  return (
    <Appear
      id="launch"
      animate
      show={entered}>

      {planetsError || submitLaunchError
        ? <Warning errorMessage={planetsError || submitLaunchError} />
        : null
      }

      {launchSuccess
        ? <Success successMessage={launchSuccess} />
        : null
      }

      <Paragraph>Schedule a mission launch for interstellar travel to one of the Kepler Exoplanets.</Paragraph>
      <Paragraph>Only confirmed planets matching the following criteria are available for the earliest scheduled missions:</Paragraph>

      <ul>
        <li>Planetary radius &lt; 1.6 times Earth&apos;s radius</li>
        <li>Effective stellar flux &gt; 0.36 times Earth&apos;s value and &lt; 1.11 times Earth&apos;s value</li>
      </ul>

      <CustomForm
        submitLaunch={onHandleSubmitLaunch}
        selectorBody={selectorBody}
        entered={entered}
        isPendingLaunch={isPendingLaunch}
        missionInput={missionInput}
        setMissionInput={setMissionInput} />
    </Appear>
  );
};

export default Launch;
