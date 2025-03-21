import React, { Component } from "react";
import logo from "../assets/logo.jpeg";
import styles from "./Header.module.scss"; // Ensure this file exists

class Header extends Component {
  render() {
    return (
      <header className={styles.header}>
        <img src={logo} alt="Company Logo" className={styles.logo} />
        <h1 className={styles.title}>Employee Payroll</h1>
      </header>
    );
  }
}

export default Header;
