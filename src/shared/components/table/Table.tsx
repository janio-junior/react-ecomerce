import TableAntd, { TableProps } from "antd/es/table";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Table = <RecordType extends object = any>(
  props: TableProps<RecordType>,
) => {
  return <TableAntd {...props} />;
};

export default Table;
