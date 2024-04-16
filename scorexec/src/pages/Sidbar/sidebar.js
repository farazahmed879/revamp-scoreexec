import React, { useState } from 'react';
import { Layout, Menu, Button, Drawer, Switch, ConfigProvider } from 'antd';
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
} from '@ant-design/icons';
import 'antd/dist/reset.css';

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
    <ConfigProvider theme={darkMode ? 'dark' : 'light'}>
      <div>
        <Button 
          onClick={showDrawer} 
          type="primary" 
          icon={<MenuOutlined />} 
          style={{ position: 'absolute', top: 20, left: 20 }}
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
