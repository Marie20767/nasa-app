import { useMemo } from 'react';
import { Appear, Paragraph } from 'arwes';

import CustomTable from '../components/CustomTable';

import { HISTORY_TABLE_HEADERS } from '../constants';

const History = ({ launches, entered }) => {
  const tableBody = useMemo(() => {
    return launches?.filter((launch) => !launch.upcoming)
      .map((launch) => {
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
        <Paragraph>History of mission launches including SpaceX launches starting from the year 2006.</Paragraph>
        <CustomTable
          launches={launches}
          tableHeaders={HISTORY_TABLE_HEADERS}>
          {tableBody}
        </CustomTable>
      </Appear>
    </article>
  );
};

export default History;
