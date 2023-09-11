import { useMemo } from 'react';
import {
  withStyles,
  Appear,
  Paragraph,
  Words,
  Link,
} from 'arwes';

import Warning from '../components/Warning';
import CustomTable from '../components/CustomTable';
import Clickable from '../components/Clickable';

import { UPCOMING_TABLE_HEADERS } from '../constants/constants';

const styles = () => ({
  link: {
    color: 'red',
    textDecoration: 'none',
  },
});

const Upcoming = ({ entered, launches, error, classes, abortLaunch }) => {
  const tableBody = useMemo(() => {
    return launches?.filter((launch) => launch.upcoming)
      .map((launch) => {
        return (
          <tr key={String(launch.flightNumber)}>
            <td>
              <Clickable style={{ color: 'red' }}>
                <Link className={classes.link} onClick={() => abortLaunch(launch.flightNumber)}>
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
  }, [launches, abortLaunch, classes.link]);

  return (
    <Appear
      id="upcoming"
      animate
      show={entered}>

      {error
        ? <Warning errorMessage={error} />
        : null
      }

      <Paragraph>Upcoming missions including both SpaceX launches and newly scheduled rockets.</Paragraph>
      <Words animate>Warning! Clicking on the ✖ aborts the mission.</Words>

      <CustomTable
        entered={entered}
        tableHeaders={UPCOMING_TABLE_HEADERS}>
        {tableBody}
      </CustomTable>

    </Appear>
  );
};

export default withStyles(styles)(Upcoming);
