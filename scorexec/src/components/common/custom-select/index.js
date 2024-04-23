import { Select } from "antd";

const CustomSelect = ({ options = [] }) => {
  const { Option } = Select;
  return (
    <Select>
      {options?.map((item, index) => (
        <Option key={index} value={item?.value}>
          {item?.label || item?.name}
        </Option>
      ))}
    </Select>
  );
};
export default CustomSelect;
