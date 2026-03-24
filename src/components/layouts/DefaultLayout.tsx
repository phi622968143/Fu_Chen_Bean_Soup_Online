import React from "react";
import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
  return (
    <div style={{ width: "100vw" }}>
      <Outlet />
    </div>
  );
};

export default DefaultLayout;
