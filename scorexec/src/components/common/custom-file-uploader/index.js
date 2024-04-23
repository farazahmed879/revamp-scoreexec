import React from "react";
import CustomButton from "../custom-button";
import CustomOutlinedIcon from "../icons/custom-outlined";
import { Upload } from "antd";
const CustomFileUploader = ({
  fileList = [],
  handleChange = () => console.log("handleChange"),
  maxCount = 1,
  listType = "picture",
  multiple = false,
  buttontitle = "Upload",
  beforeUpload = () => false,
}) => {
  return (
    <Upload
      fileList={fileList}
      onChange={handleChange}
      beforeUpload={beforeUpload} //upload
      maxCount={maxCount}
      listType={listType}
      multiple={multiple}
    >
      <CustomButton  icon={<CustomOutlinedIcon/>}  >{buttontitle}</CustomButton>
    </Upload>
  );
};
export default CustomFileUploader;
