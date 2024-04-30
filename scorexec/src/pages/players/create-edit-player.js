import React, { useState } from "react";
import { Form, Row, Col, Select } from "antd";
import "./AddPlayerForm.css";
import CustomInput from "../../components/common/custom-input";
import CustomSelect from "../../components/common/custom-select";
import CustomActionButton from "../../components/common/custom-action-buttons";
import CustomFileUploader from "../../components/common/custom-file-uploader";
import { Gender, clubTypes, battingStyleOptions, bowlingStyleOptions, teamTypeOptions, playingRoleOptions} from "./enum";

const AddPlayerForm = ({ showForm }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const [galleryfileList, setGalleryFileList] = useState([]);

  const handleChange = (info) => {
    let fileList = [...info.fileList];
    fileList = fileList.slice(-1);
    setFileList(fileList);
  };

  const handleGalleryChange = ({ fileList: newFileList }) => {
    setGalleryFileList(newFileList);
  };

  const onFinish = (values) => {
    console.log("Received values:", values);
    //  form  will be here
  };

  return (
    <div>
      <h2>Add Player</h2>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Picture"
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
              label="Name"
              name="name"
              placeholder="Enter your name"
              rules={[{ required: true, message: "Please enter the name!" }]}
            >
              <CustomInput value="" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Gender" name="Gender">
            <Select
                options={Gender.map((type) => ({
                  label: type.label,
                  value: type.value,
                }))}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Team" name="team">
              <Select
                options={teamTypeOptions.map((type) => ({
                  label: type.name,
                  value: type.name,
                }))}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Player Role" name="Player Role">
            <Select
                options={battingStyleOptions.map((type) => ({
                  label: type.label,
                  value: type.value,
                }))}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Batting Style" name="Batting Style">
            <Select
                options={playingRoleOptions.map((type) => ({
                  label: type.label,
                  value: type.value,
                }))}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Bowling Style" name="Bowling Style">
            <Select
                options={bowlingStyleOptions.map((type) => ({
                  label: type.name,
                  value: type.name,
                }))}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Contact"
              name="name"
              rules={[{ required: true, message: "Contact must contain 11 numbers!" }]}
            >
              <CustomInput type="number" placeholder="Enter your Contact" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="CNIC" name="zone">
              <CustomInput type="number" placeholder="Enter your CNIC Number" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Birth" name="name">
              <CustomInput type="date" placeholder="Enter your Birhthdate" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Address" name="zone">
              <CustomInput type="text" placeholder="Enter your Address" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <CustomFileUploader
            fileList={galleryfileList}
            handleChange={handleGalleryChange}
            listType="picture-card"
            maxCount={25}
            multiple={true}
          />
        </Row>
        <Form.Item>
          <CustomActionButton />
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddPlayerForm;
