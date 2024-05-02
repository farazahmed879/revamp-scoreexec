import React, { useState } from "react";
import { Form, Row, Col, Select } from "antd";

import CustomInput from "../../../components/common/custom-input";
import CustomSelect from "../../../components/common/custom-select";
import CustomActionButton from "../../../components/common/custom-action-buttons";
import CustomFileUploader from "../../../components/common/custom-file-uploader";
import { Ground, matchTypes, team01 } from "../../../components/Enum/enum";

const AddOrEditMatchForm = ({ ShowForm }) => {
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
      <h2>Book your Match</h2>
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
            <Form.Item label="Match type" name="matchType">
            <CustomSelect options={matchTypes} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Team 01" name="team01">
            <CustomSelect options={team01} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Team 02" name="team02">
            <CustomSelect options={team01} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Ground" name="ground">
            <CustomSelect options={Ground} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Season" name="season ">
              <CustomInput
                type="number"
                placeholder="Enter season of your match"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Overs" name="name">
              <CustomInput type="number" placeholder="Overs in match?" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Birth" name="name">
              <CustomInput type="date" placeholder="Enter your Birhthdate" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24} size={20}>
            <Form.Item
              label="Description"
              name="zone"
            >
              <CustomInput
                type="text"
                placeholder="Details you want to add!"
                style={{ width: "100%" }}
              />
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
        <div className="form-buttons">
          <CustomActionButton />
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddOrEditMatchForm;
