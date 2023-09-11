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
            {tableHeaders.map((tableHeader) => {
              return <th style={tableHeader.style}>{tableHeader.label}</th>;
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
