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

const App = () => { 
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ConfigProvider theme={darkMode ? 'dark' : 'light'}>
      <>WQrokds</>
    </ConfigProvider>
  );
};

export default App;
