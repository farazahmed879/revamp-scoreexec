<<<<<<< Updated upstream:scorexec/src/pages/Sidbar/sidebar.js
import React, { useState } from 'react';
import { Layout, Menu, Button, Drawer, Switch, ConfigProvider } from 'antd';
=======
import React, { useState } from "react";
import { Layout, Menu, ConfigProvider } from "antd";
import { Link } from "react-router-dom";
>>>>>>> Stashed changes:scorexec/src/components/common/custom-sidebar/sidebar.js
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
<<<<<<< Updated upstream:scorexec/src/pages/Sidbar/sidebar.js
} from '@ant-design/icons';
import 'antd/dist/reset.css';
=======
} from "@ant-design/icons";
import "antd/dist/reset.css";
import "./sidebar.css";
import CustomButton from "../custom-button";
>>>>>>> Stashed changes:scorexec/src/components/common/custom-sidebar/sidebar.js

const { Sider } = Layout;

const Sidebar = () => {
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
<<<<<<< Updated upstream:scorexec/src/pages/Sidbar/sidebar.js
    <ConfigProvider theme={darkMode ? 'dark' : 'light'}>
      <div>
        <Button 
          onClick={showDrawer} 
          type="primary" 
          icon={<MenuOutlined />} 
          style={{ position: 'absolute', top: 20, left: 20 }}
=======
    <ConfigProvider theme={darkMode ? "dark" : "light"}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ overflow: 'auto',
        height: '100vh',
        left: 0,
        top: 0,
        bottom: 0, }}
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
>>>>>>> Stashed changes:scorexec/src/components/common/custom-sidebar/sidebar.js
        >
          Click Me 
        </Button>
        <Drawer
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
          <Sider>
            <Menu mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1" icon={<ProjectOutlined />}>
                Project Name
              </Menu.Item>
              <Menu.Item key="2" icon={<UserOutlined />}>
                Admin
              </Menu.Item>
              <Menu.Item key="3" icon={<HomeOutlined />}>
                Home Page
              </Menu.Item>
              <Menu.Item key="4" icon={<TeamOutlined />}>
                Tenants
              </Menu.Item>
              <Menu.Item key="5" icon={<UserOutlined />}>
                Users
              </Menu.Item>
              <Menu.Item key="6" icon={<CrownOutlined />}>
                Roles
              </Menu.Item>
              <Menu.Item key="7" icon={<InfoCircleOutlined />}>
                About
              </Menu.Item>
              <Menu.SubMenu key="sub1" title="Multi Level Menu" icon={<MenuOutlined />}>
                <Menu.Item key="8">Option 1</Menu.Item>
                <Menu.Item key="9">Option 2</Menu.Item>
              </Menu.SubMenu>
            </Menu>
          </Sider>
          <div style={{ padding: '20px', textAlign: 'left' }}>
            <span style={{ marginRight: '5px' }}>
              <BulbOutlined /> Dark Mode:
            </span>
            <Switch checked={darkMode} onChange={toggleDarkMode} />
          </div>
        </Drawer>
      </div>
    </ConfigProvider>
  );
};

export default Sidebar;
