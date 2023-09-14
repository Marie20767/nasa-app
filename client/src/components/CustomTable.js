/* eslint-disable react/no-array-index-key */
import { Table } from 'arwes';

const CustomTable = ({
  entered = true,
  tableHeaders,
  children,
}) => {
  return (
    <Table animate show={entered}>
      <table style={{ tableLayout: 'fixed' }}>
        <thead>
          <tr>
            {tableHeaders.map((tableHeader, index) => {
              return <th key={`${tableHeader.style}-${index}`} style={tableHeader.style}>{tableHeader.label}</th>;
            })}
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
