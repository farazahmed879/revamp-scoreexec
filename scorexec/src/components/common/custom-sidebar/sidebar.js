import React, { useState } from "react";
import { Layout, Menu, ConfigProvider } from "antd";
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
import CustomButton from "../custom-button";

const { Sider } = Layout;

const Sidebar = ({ collapsed = false }) => {
  const [visible, setVisible] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const toggleDarkMode = (checked) => {
    setDarkMode(checked);
  };

  return (
    <ConfigProvider theme={darkMode ? "dark" : "light"}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          overflow: "auto",
          height: "100vh",
          left: 0,
          top: 0,
          bottom: 0,
        }}
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
          // items={[
          //   {
          //     key: "1",
          //     // icon: <UserOutlined />,
          //     label: "Dashboard",
          //     path: '/dashboard'
          //   },
          //   {
          //     key: "2",
          //     icon: <UserOutlined />,
          //     label: "Player",
          //     path: '/player'
          //   },
          //   {
          //     key: "3",
          //     // icon: <UploadOutlined />,
          //     label: "Team",
          //     path: '/team'

          //   },
          //]}
        >
          <Menu.Item key="1" icon={<ProjectOutlined />}>
            <Link to="/Dashboard">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<TeamOutlined />}>
            <Link to="/team">Teams</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<UserOutlined />}>
            <Link to="/player">Players</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<TeamOutlined />}>
            <Link to="/Tenants">Tenants</Link>
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
      </Sider>
    </ConfigProvider>
  );
};

export default Sidebar;
