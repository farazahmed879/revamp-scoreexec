import React,{useState} from "react";
import { Form,  Col, Checkbox } from "antd";
//import "./team.css";
import CustomInput from "../../../components/common/custom-input";
import CustomActionButton from "../../../components/common/custom-action-buttons";


  const AddOrUpdateRoleForm = ({ form, onFinish }) => {
    const [showForm, setShowForm] = useState(true);
 
 
  return (
    <div>
      <h2>Role</h2>
      <CustomActionButton value="RoleDetails" onClick={() => setShowForm(true)} />
      <CustomActionButton value="RolePermission"onClick={() => setShowForm(false)}/>
      {showForm ? (
        <Form
          form={form}
          layout="horizontal"
          onFinish={onFinish}
          style={{ marginBottom: 5 }}
        >
          <Form.Item
            label="Role Name *"
            name="roleName"
            rules={[{ required: true, message: "Please enter Role !" }]}
          >
            <CustomInput placeholder="Enter your Role name" />
          </Form.Item>
          <Form.Item
            label="Display Name *"
            name="name"
            rules={[{ required: true, message: "Please enter  name!" }]}
          >
            <CustomInput placeholder="Enter name to display" />
          </Form.Item>
          <Col span={24}>
            <Form.Item label="Description" name="data">
              <CustomInput type="text" placeholder="Enter Description you want to add" />
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
          <Checkbox>Roles</Checkbox>
          <Checkbox>Tenants</Checkbox>
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

export default AddOrUpdateRoleForm;
