import React, { useState } from "react";
import Navbarr from "../Navbar/Navbarr";
import { Outlet } from "react-router-dom";

const LayOut = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  return (
    <>
      <Navbarr toggleSidebar={toggleSidebar} />
      <div className=" pt-[55px] ">
        <Outlet context={{ isCollapsed }} />
      </div>
    </>
  );
};

export default LayOut;
