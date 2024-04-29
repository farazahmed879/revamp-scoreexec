import React, { useState } from "react";
import { Form, Row, Col } from "antd";
import "./team.css";
import CustomInput from "../../components/common/custom-input";
import CustomSelect from "../../components/common/custom-select";
import CustomActionButton from "../../components/common/custom-action-buttons";
import CustomFileUploader from "../../components/common/custom-file-uploader";

const AddTeamForm = ({ showForm }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const handleChange = (info) => {
    let fileList = [...info.fileList];
    fileList = fileList.slice(-1);
    setFileList(fileList);
  };

  const onFinish = (values) => {
    console.log("Received values:", values);
    //  form  will be here
  };
  const clubTypes = [
    { id: 1, label: "Local", value: 1 },
    { id: 2, label: "Club", value: 2 },
    { id: 3, label: "International", value: 3 },
  ];

  return (
    <div>
      <h2>Add Team</h2>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Picture *"
          name="picture"
          rules={[{ required: true, message: "Please upload a picture!" }]}
        >
          <CustomFileUploader
            fileList={fileList}
            handleChange={handleChange}
            listType="picture-card"
          />
        </Form.Item>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Name *"
              name="name"
              placeholder="Enter your name"
              rules={[{ required: true, message: "Please enter the name!" }]}
            >
              <CustomInput value="" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Zone" name="zone">
              <CustomInput type="number" placeholder="Enter your number" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Yaad ni arha" name="name">
              <CustomSelect value="" placeholder="Enter your yaad ni aarha" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Role" name="zone">
              <CustomInput type="option" placeholder="Select your role" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="City" name="name">
              <CustomInput value="text" placeholder="Enter your city" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Area" name="zone">
              <CustomInput type="text" placeholder="Enter your Area" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <div className="form-buttons">
            <CustomActionButton />
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddTeamForm;

{
  /* <Select>
            <Option value="Local">Local</Option>
            <Option value="Club">Club</Option>
            <Option value="Multi-National">Multi-National</Option>
            <Option value="Departmental">Departmental</Option>
            <Option value="School">School</Option>
            <Option value="College">College</Option>
            <Option value="University">University</Option>
            <Option value="Office">Office</Option>
          </Select> */
}
