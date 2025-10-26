import React from "react";
import { Header } from "../../components";
import { Outlet } from "react-router-dom";
import styles from "./Layout.module.css";

const Layout = () => {
  return (
    <div className={styles.layout}>
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
