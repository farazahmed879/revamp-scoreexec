import React from "react";
import CustomButton from "../custom-button";
import CustomOutlinedIcon from "../custom-icons/custom-outlined";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Upload } from "antd";
const CustomFileUploader = ({
  fileList = [],
  handleChange = () => console.log("handleChange"),
  maxCount = 1,
  listType = "picture",
  multiple = false,
  buttontitle = "Upload",
  beforeUpload = () => false,
  loading = false,
}) => {
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  return (
    <Upload
      fileList={fileList}
      onChange={handleChange}
      beforeUpload={beforeUpload} //upload
      maxCount={maxCount}
      listType={listType}
      multiple={multiple}
    >
      {listType == "picture" ? (
        <CustomButton icon={<CustomOutlinedIcon />}>{buttontitle}</CustomButton>
      ) : (
        uploadButton
      )}
    </Upload>
  );
};
export default CustomFileUploader;
