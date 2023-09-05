/* eslint-disable jsx-a11y/control-has-associated-label */
import { Table } from 'arwes';

const CustomTable = ({
  entered = true,
  lastColumnTitle,
  children,
}) => {
  return (
    <Table animate show={entered}>
      <table style={{ tableLayout: 'fixed' }}>
        <thead>
          <tr>
            <th style={{ width: '3rem' }} />
            <th style={{ width: '3rem' }}>No.</th>
            <th style={{ width: '10rem' }}>Date</th>
            <th style={{ width: '11rem' }}>Mission</th>
            <th style={{ width: '11rem' }}>Rocket</th>
            <th>{lastColumnTitle}</th>
          </tr>
        </thead>
        <tbody>
          {children}
        </tbody>
      </table>
    </Table>
  );
};

export default CustomTable;
