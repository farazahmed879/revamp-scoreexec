import React, { useState } from "react";
import { Layout, Menu, Button, Drawer, Switch, ConfigProvider } from "antd";
import { Link } from "react-router-dom";
import {
  ProjectOutlined,
  UserOutlined,
  HomeOutlined,
  TeamOutlined,
  CrownOutlined,
  InfoCircleOutlined,
  MenuOutlined,
  CloseCircleOutlined,
  BulbOutlined,
} from "@ant-design/icons";
import "antd/dist/reset.css";
import "./sidebar.css"; 
import CustomButton from "../../components/common/custom-button";

const { Sider } = Layout;

const DrawerSideBar = ({ collapsed }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = (checked) => {
    setDarkMode(checked);
  };

  return (
    <ConfigProvider theme={darkMode ? "dark" : "light"}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ height: "100vh" }}
        title="Score XEC"
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div style={{ textAlign: "right" }}>
            <CustomButton onClick={""} type="primary">
              Log Out
            </CustomButton>
          </div>
        }
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              // icon: <UserOutlined />,
              label: "nav 1",
            },
            {
              key: "2",
              // icon: <VideoCameraOutlined />,
              label: "nav 2",
            },
            {
              key: "3",
              // icon: <UploadOutlined />,
              label: "nav 3",
            },
          ]}
        />
      </Sider>
      {/* <Drawer
        width={"200px"}
        title="Score XEC"
        placement="left"
        closable={false}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div style={{ textAlign: "right" }}>
            <Button onClick={onClose} type="primary">
              {<CloseCircleOutlined />}
            </Button>
          </div>
        }
      >
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          theme={darkMode ? "dark" : "light"}
        >
          <Menu.Item key="1" icon={<ProjectOutlined />}>
            <Link to="/Dashboard">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<ProjectOutlined />}>
            <Link to="/team">Teams</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<UserOutlined />}>
            <Link to="/player">Players</Link>
          </Menu.Item>

          <Menu.Item key="4" icon={<TeamOutlined />}>
            Tenants
            <Link to="/Tenants"></Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<UserOutlined />}>
            Users
            <Link to="/Users"></Link>
          </Menu.Item>
          <Menu.Item key="6" icon={<CrownOutlined />}>
            Roles
            <Link to="/Roles"></Link>
          </Menu.Item>
          <Menu.Item key="7" icon={<InfoCircleOutlined />}>
            About
            <Link to="/About"></Link>
          </Menu.Item>
        </Menu>
        <div className="dark-mode-toggle">
          <span className="toggle-label">
            <BulbOutlined /> Dark Mode:
          </span>
          <Switch checked={darkMode} onChange={toggleDarkMode} />
        </div>
      </Drawer> */}
    </ConfigProvider>
  );
};

export default DrawerSideBar;
