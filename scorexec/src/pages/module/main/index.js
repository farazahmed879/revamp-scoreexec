import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { Route, Routes } from "react-router-dom";
import Team from "../../teams";
import Players from "../../players";
import AddPlayerForm from "../../players/create-edit-player";
import DrawerSideBar from "../../../components/common/custom-sidebar/sidebar";
const { Header, Content } = Layout;
const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <DrawerSideBar collapsed={collapsed} />
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px" ,
              width: 64,
              height: 64,
              backgroundColor: "transparent",
              "&:hover": {
                backgroundColor: "initial",
              },
            }}
          />
        </Header>
        <Content
           style={{
            overflow: 'auto',
            height: '50vh',
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Routes>
            <Route path="team" element={<Team />} />
            <Route path="player" element={<Players />} />
            <Route path="create-player" element={<AddPlayerForm />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;
