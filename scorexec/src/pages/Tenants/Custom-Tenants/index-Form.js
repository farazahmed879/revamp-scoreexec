import React from "react";
import { Form,  Col, Checkbox } from "antd";
//import "./team.css";
import CustomInput from "../../../components/common/custom-input";
import CustomActionButton from "../../../components/common/custom-action-buttons";

const AddOrEditTenantForm = ({ ShowForm }) => {
  const [form] = Form.useForm();


 
  const onFinish = (values) => {
    console.log("Received values:", values);
    //  form  will be here
  };

  return (
    <div>
      <h2>Add Tenant</h2>
      <Form
        form={form}
        layout="horizontal"
        onFinish={onFinish
        }
        style={{ marginBottom: 5 }}
      >
        <Form.Item
          label="Tenancy Name *"
          name="tenancyName"
          rules={[{ required: true, message: "Please enter the name!" }]}
        >
          <CustomInput placeholder="Enter your Tenancy name" />
        </Form.Item>
        <Form.Item
          label="Name *"
          name="name"
          rules={[{ required: true, message: "Please enter the name!" }]}
        >
          <CustomInput placeholder="Enter your name" />
        </Form.Item>
        <Col span={24}>
          <Form.Item label="Email Address" name="email">
            <CustomInput type="email" placeholder="Enter your Email Address" />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="Data Base Connection" name="data">
            <CustomInput type="text" placeholder="Enter Data's Connections" />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="Is Active" name="isActive">
            <Checkbox>Active</Checkbox>
          </Form.Item>
        </Col>
      </Form>
      <div className="form-buttons">
        <CustomActionButton />
      </div>
    </div>
  );
};

export default AddOrEditTenantForm;
