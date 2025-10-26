import React from "react";
import styles from "./Header.module.css";
import moon from "../../assets/icons/moon.svg";

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <div className={`${styles.logoIconContainer} body-text`}>AI</div>
        <div className={`${styles.headerTitle} header`}>Internal AI Assistant</div>
      </div>
      <button className={styles.themeButton}>
        <img src={moon} alt="Activate dark mode" />
      </button>
    </div>
  );
};

export default Header;
