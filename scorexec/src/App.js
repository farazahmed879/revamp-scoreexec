import React, { useState } from "react";
//import { ConfigProvider } from 'antd';
import Routing from "./router";
import { BrowserRouter } from "react-router-dom";
//import Sidebar from './pages/Sidbar/sidebar';

const App = () => {
  //const [darkMode, setDarkMode] = useState(false);

  return (
    <BrowserRouter>
      <Routing />
    </BrowserRouter>

    // <ConfigProvider theme={darkMode ? 'dark' : 'light'}>
    //   <>WQrokds</>
    // </ConfigProvider>
    //<Sidebar/>
  );
};

export default App;
