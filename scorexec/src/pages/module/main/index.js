import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { Route, Routes } from "react-router-dom";
import Team from "../../teams/create-edit-team/Team-Form";
import Players from "../../players";
import AddPlayerForm from "../../players/create-edit-player";
import DrawerSideBar from "../../../components/common/custom-sidebar/sidebar";
import AddOrEditTeamForm from "../../teams/create-edit-team";
import Matches from "../../matches";
import AddOrEditMatchForm from "../../matches/create-edit-match";
import AddOrEditTenantForm from "../../Tenants/Custom-Tenants/index-Form";
import Tenant from "../../Tenants/Custom-Tenants";
import Role from "../../Roles/Roles-Components";
import AddOrUpdateRoleForm from "../../Roles/Roles-Components/CreateorUpdateRole";
import AddUsers from "../../Users/Users-Components";
import AddOrUpdateUserForm from "../../Users/Users-Components/AddUsers";
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
            <Route path="create-team" element={<AddOrEditTeamForm />} />
            <Route path="player" element={<Players />} />
            <Route path="create-player" element={<AddPlayerForm />} />
            <Route path="match" element={<Matches/>}/>
            <Route path="create-match" element={<AddOrEditMatchForm/>} />
            <Route path="tenants" element={<Tenant/>}/>
            <Route path="create-tenant" element={<AddOrEditTenantForm/>} />
            <Route path="roles" element={<Role/>}/>
            <Route path="create-role" element={<AddOrUpdateRoleForm/>} />
            <Route path="users" element={<AddUsers/>}/>
            <Route path="create-users" element={<AddOrUpdateUserForm/>} />

          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;
