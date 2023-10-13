import { useMemo } from 'react';
import {
  withStyles,
  Appear,
  Paragraph,
  Words,
  Link,
} from 'arwes';

import { UPCOMING_TABLE_HEADERS } from '../constants/constants';
import useUpcomingLaunches from '../hooks/useUpcomingLaunches';

import Warning from '../components/Warning';
import CustomTable from '../components/CustomTable';
import Clickable from '../components/Clickable';
import MoreResultsButton from '../components/MoreResultsButton';

const styles = () => ({
  container: {
    display: 'block',
  },
  link: {
    color: 'red',
    textDecoration: 'none',
  },
});

const Upcoming = ({ entered, classes, onAbortSound, onFailureSound }) => {
  const {
    launches,
    isLastPage,
    abortLaunchError,
    launchesError,
    onHandleAbortLaunch,
    onHandleMoreLaunchResults,
  } = useUpcomingLaunches(onAbortSound, onFailureSound);

  const tableBody = useMemo(() => {
    return launches.map((launch) => {
      return (
        <tr key={String(launch.flightNumber)}>
          <td>
            <Clickable style={{ color: 'red' }}>
              <Link className={classes.link} onClick={() => onHandleAbortLaunch(launch.flightNumber)}>
                ✖
              </Link>
            </Clickable>
          </td>
          <td>{launch.flightNumber}</td>
          <td>{new Date(launch.launchDate).toDateString()}</td>
          <td>{launch.mission}</td>
          <td>{launch.rocket}</td>
          <td>{launch.destination}</td>
        </tr>
      );
    });
  }, [launches, onHandleAbortLaunch, classes.link]);

  return (
    <Appear
      id="upcoming"
      animate
      show={entered}
      className={classes.container}>

      {abortLaunchError || launchesError
        ? <Warning errorMessage={abortLaunchError || launchesError} />
        : null
      }

      <Paragraph>Upcoming missions including both SpaceX launches and newly scheduled rockets.</Paragraph>
      <Words animate>Warning! Clicking on the ✖ aborts the mission.</Words>

      <CustomTable
        entered={entered}
        tableHeaders={UPCOMING_TABLE_HEADERS}>
        {tableBody}
      </CustomTable>

      {!isLastPage
        ? <MoreResultsButton classes={classes} onHandleMoreLaunchResults={onHandleMoreLaunchResults} />
        : null
        }

    </Appear>
  );
};

export default withStyles(styles)(Upcoming);
