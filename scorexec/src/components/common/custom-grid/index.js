import { Table } from "antd";

const CustomGrid = ({ columns = [], data = [], pagination = false }) => {
  return <Table columns={columns} dataSource={data} />;
};
export default CustomGrid;
