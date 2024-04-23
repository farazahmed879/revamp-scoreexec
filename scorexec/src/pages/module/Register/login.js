import React, { useState } from "react";
import { Card, Button, Form, Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import CustomButton from "../../../components/common/custom-button";
import CustomActionButton from "../../../components/common/custom-action-buttons";
import { useNavigate } from "react-router-dom";

const RegisterComponent = () => {
  const [formType, setFormType] = useState(0);
  const navigate = useNavigate();

  const handleClick = (type) => {
    setFormType(type);
  };

  const handleLogin = (values) => {
    return navigate("main");

    // if (values?.username && values?.password) {
    //   // Navigate to DrawerSideBar upon successful login
    // } else {
    //   console.log("Invalid username or password");
    // }
  };

  return (
    <div className="container-sm 540px">
      <div className="row">
        <div
          style={{
            padding: "30px",
            background: "#ececec",
            width: "500px",
          }}
        >
          <Card
            title="Welcome to ScorEXEC"
            bordered={false}
            style={{ width: 500 }}
          >
            {formType === 0 && (
              <>
                <p>
                  Login to Stay Update: {"  "}
                  <CustomButton type="primary" onClick={() => handleClick(1)}>
                    Login
                  </CustomButton>{" "}
                  <CustomButton type="primary" onClick={() => handleClick(0)}>
                    Back
                  </CustomButton>{" "}
                </p>
                <p>
                  Not found?, Just signUp!{"  "}
                  <Button type="primary" danger onClick={() => handleClick(2)}>
                    SignUp
                  </Button>{" "}
                </p>
              </>
            )}
            {formType === 1 && (
              <Form layout="vertical">
                <Form.Item name="username" label="Username">
                  <Input
                    prefix={<UserOutlined />}
                    placeholder="Please enter username"
                  />
                </Form.Item>
                <Form.Item name="password" label="Password">
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="Please enter password"
                  />
                </Form.Item>
                <Form.Item>
                  <CustomActionButton
                    handleSubmit={() => handleLogin()}
                    handleClickBack1={() => handleClick(0)}
                    title1={"Login"}
                    title2={"Back"}
                  />
                </Form.Item>
              </Form>
            )}
            {formType === 2 && (
              <Form layout="vertical">
                <Form.Item name="name" label="Name">
                  <Input
                    prefix={<UserOutlined />}
                    placeholder="Please enter name"
                  />
                </Form.Item>
                <Form.Item name="username" label="Username">
                  <Input
                    prefix={<UserOutlined />}
                    placeholder="Please enter username"
                  />
                </Form.Item>
                <Form.Item name="password" label="Password">
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="Please enter password"
                  />
                </Form.Item>
                <Form.Item name="confirm" label="Confirm Password">
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="Please confirm password"
                  />
                </Form.Item>
                <Form.Item>
                  <CustomActionButton
                    handleSubmit={() => ""}
                    handleClickBack={() => handleClick(0)}
                    title1={"Submit"}
                    title2={"Back"}
                  />
                </Form.Item>
              </Form>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RegisterComponent;
