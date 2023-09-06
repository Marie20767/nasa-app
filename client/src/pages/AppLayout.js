import {
  useState,
} from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import {
  Frame,
  withSounds,
  withStyles,
} from 'arwes';

import usePlanets from '../hooks/usePlanets';
import useLaunches from '../hooks/useLaunches';

import Centered from '../components/Centered';
import Header from '../components/Header';
import Footer from '../components/Footer';

import Launch from './Launch';
import History from './History';
import Upcoming from './Upcoming';

const styles = () => ({
  content: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    margin: 'auto',
  },
  centered: {
    flex: 1,
    paddingTop: '20px',
    paddingBottom: '10px',
  },
});

const AppLayout = ({ sounds, classes }) => {
  const [isFrameVisible, setIsFrameVisible] = useState(true);

  const animateFrame = () => {
    setIsFrameVisible(false);
    setTimeout(() => {
      setIsFrameVisible(true);
    }, 600);
  };

  const onSuccessSound = () => sounds.success && sounds.success.play();
  const onAbortSound = () => sounds.abort && sounds.abort.play();
  const onFailureSound = () => sounds.warning && sounds.warning.play();

  const {
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
  } = useLaunches(onSuccessSound, onAbortSound, onFailureSound);

  const { planets, planetsError } = usePlanets();

  return (
    <div className={classes.content}>
      <Header onNav={animateFrame} />
      <Centered className={classes.centered}>
        <Frame
          animate
          show={isFrameVisible}
          corners={4}
          style={{ visibility: isFrameVisible ? 'visible' : 'hidden' }}>
          {(animation) => (
            <div style={{ padding: '20px' }}>
              <Switch>
                <Route exact path="/">
                  <Launch
                    entered={animation.entered}
                    error={planetsError || submitLaunchError}
                    success={launchesSuccess}
                    planets={planets}
                    submitLaunch={submitLaunch}
                    isPendingLaunch={isPendingLaunch}
                    missionInput={missionInput}
                    setMissionInput={setMissionInput} />
                </Route>
                <Route exact path="/upcoming">
                  <Upcoming
                    entered={animation.entered}
                    launches={launches}
                    error={getLaunchesError || abortLaunchError}
                    abortLaunch={abortLaunch} />
                </Route>
                <Route exact path="/history">
                  <History entered={animation.entered} launches={launches} />
                </Route>
              </Switch>
            </div>
          )}
        </Frame>
      </Centered>
      <Footer />
    </div>
  );
};

export default withSounds()(withStyles(styles)(AppLayout));
