import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpeg";
import styles from "../styles/Header.module.scss";

class Header extends Component {
  render() {
    return (
      <header className={styles.header}>
        <img src={logo} alt="Company Logo" className={styles.logo} />
        <Link to="/employees" className={styles.titleLink}>
          <h1 className={styles.title}>Employee Payroll</h1>
        </Link>
      </header>
    );
  }
}

export default Header;
