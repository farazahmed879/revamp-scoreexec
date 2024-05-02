import React,{useState} from "react";
import { Form,  Col, Checkbox } from "antd";
//import "./team.css";
import CustomInput from "../../../components/common/custom-input";
import CustomActionButton from "../../../components/common/custom-action-buttons";


  const AddOrUpdateUserForm = ({ form, onFinish }) => {
    const [showForm, setShowForm] = useState(true);
 
 
  return (
    <div>
      <h2>Users</h2>
      <CustomActionButton value="User" onClick={() => setShowForm(true)} />
      <CustomActionButton value="Role"onClick={() => setShowForm(false)}/>
      {showForm ? (
        <Form
          form={form}
          layout="horizontal"
          onFinish={onFinish}
          style={{ marginBottom: 5 }}
        >
          <Form.Item
            label="Name"
            name="roleName"
            rules={[{ required: true, message: "Please enter Role !" }]}
          >
            <CustomInput placeholder="Enter your  name" />
          </Form.Item>
          <Form.Item
            label="Surname"
            name="name"
            rules={[{ required: true, message: "Please enter  name!" }]}
          >
            <CustomInput placeholder="Enter name to display" />
          </Form.Item>
          <Col span={24}>
            <Form.Item label="Username" name="data"
            rules={[{ required: true, message: "Please enter username !" }]}>
              <CustomInput type="text" placeholder="Enter your user name" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Email" name="data"
            rules={[{ required: true, message: "Please enter email !" }]}>
              <CustomInput type="email" placeholder="Enter your Email " />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Password" name="data"
            rules={[{ required: true, message: "Please enter your Password !" }]}>
              <CustomInput type="password" placeholder="Enter your Password" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Confirm Password" name="data"
            rules={[{ required: true, message: "Please Confirm your Password !" }]}>
              <CustomInput type="password" placeholder="Confirm your Password" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Is Active" name="isActive">
              <Checkbox>Active</Checkbox>
            </Form.Item>
          </Col>
        </Form>
      ) : (
        <div>
          <Checkbox>Users</Checkbox>
        </div>
      )}
      <div className="form-buttons">
          <CustomActionButton value="Add"/>
          <CustomActionButton value="Cancel" />
          </div>
      </div>
  );
};

export default AddOrUpdateUserForm;
