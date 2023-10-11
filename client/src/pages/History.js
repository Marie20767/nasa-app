import { useMemo } from 'react';
import { Appear, Paragraph } from 'arwes';

import { HISTORY_TABLE_HEADERS } from '../constants/constants';

import useHistoryLaunches from '../hooks/useHistoryLaunches';

import CustomTable from '../components/CustomTable';
import MoreResultsButton from '../components/MoreResultsButton';
import Warning from '../components/Warning';

const History = ({ entered, classes }) => {
  const {
    launches,
    launchesError,
    isLastPage,
    onHandleMoreLaunchResults,
  } = useHistoryLaunches();

  const tableBody = useMemo(() => {
    return launches.map((launch) => {
      return (
        <tr key={String(launch.flightNumber)}>
          <td>
            <span style={{ color: launch.success ? 'greenyellow' : 'red' }}>
              █
            </span>
          </td>
          <td>{launch.flightNumber}</td>
          <td>{new Date(launch.launchDate).toDateString()}</td>
          <td>{launch.mission}</td>
          <td>{launch.rocket}</td>
          <td>{launch.customers?.join(', ')}</td>
        </tr>
      );
    });
  }, [launches]);

  return (
    <article id="history">
      <Appear animate show={entered}>

        {launchesError
          ? <Warning errorMessage={launchesError} />
          : null
      }

        <Paragraph>History of mission launches including SpaceX launches starting from the year 2006.</Paragraph>
        <CustomTable
          launches={launches}
          tableHeaders={HISTORY_TABLE_HEADERS}>
          {tableBody}
        </CustomTable>

        {!isLastPage && launches.length
          ? <MoreResultsButton classes={classes} onHandleMoreLaunchResults={onHandleMoreLaunchResults} />
          : null
        }

      </Appear>
    </article>
  );
};

export default History;
