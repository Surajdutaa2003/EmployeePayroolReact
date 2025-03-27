import React from "react";
import { Link, useNavigate } from "react-router-dom"; 
import logo from "../assets/logo.jpeg";
import styles from "../styles/Header.module.scss";

const Header = () => {
  const navigate = useNavigate(); 

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login"); 
  };

  return (
    <header className={styles.header}>
      <img src={logo} alt="Company Logo" className={styles.logo} />
      <Link to="/employees" className={styles.titleLink}>
        <h1 className={styles.title}>
          <span className={styles.employee}>Employee</span>
          <span className={styles.payroll}>Payroll</span>
        </h1>
      </Link>

      
      <button onClick={handleLogout} className={styles.logoutButton}>
        Logout
      </button>
    </header>
  );
};

export default Header;
