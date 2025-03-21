import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./EmployeeList.module.scss";

class EmployeeList extends Component {
  state = {
    employees: [],
  };

  componentDidMount() {
    axios
      .get("http://localhost:3000/employees")
      .then((response) => {
        this.setState({ employees: response.data });
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
      });
  }

  render() {
    return (
      <div className={styles.employeeListContainer}>
        <header className={styles.header}>
          <h2>Employee Details</h2>
          {/* ✅ Navigate to Add Employee Page */}
          <Link to="/add-employee" className={styles.addButton}>
            ➕ Add User
          </Link>
        </header>

        <table className={styles.employeeTable}>
          <thead>
            <tr>
              <th>Profile Image</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Department</th>
              <th>Salary</th>
              <th>Start Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.employees.length > 0 ? (
              this.state.employees.map((employee) => (
                <tr key={employee.id}>
                  <td>
                    <img
                      src={
                        employee.profileImage.startsWith("/assets/")
                          ? employee.profileImage
                          : `/assets/${employee.profileImage}`
                      }
                      alt="Profile"
                      className={styles.profileImage}
                    />
                  </td>

                  <td>{employee.name}</td>
                  <td>{employee.gender}</td>
                  <td>{employee.department}</td>
                  <td>{employee.salary}</td>
                  <td>{employee.startDate}</td>
                  <td>
                    <button>✏️ Edit</button>
                    <button>🗑️ Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No employees found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default EmployeeList;
