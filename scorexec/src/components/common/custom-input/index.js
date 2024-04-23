import React from "react";
import { Input } from "antd";
const CustomInput = ({
  value = "",
  name = "basic Input",
  handleChange = () => console.log(),
  placeholder = "",
  type = "text",
}) => {
  return (
    <Input
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      name={name}
      type={type}
    />
  );
};
export default CustomInput;
