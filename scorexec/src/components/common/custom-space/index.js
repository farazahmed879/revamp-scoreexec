import { Space } from "antd";

const CustomSpace = ({props,children}) => {
  return <Space {...props}>{children}</Space>;
};
export default CustomSpace;
