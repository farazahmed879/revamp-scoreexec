import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "../pages/module/main/index";
import RegisterComponent from "../pages/module/Register/login";


const Routing = () => {
  return (
    <Routes>
      <Route path="/login" element={<RegisterComponent />} />
      <Route path="*" element={<MainLayout />} />
    </Routes>
  );
};

export default Routing;
