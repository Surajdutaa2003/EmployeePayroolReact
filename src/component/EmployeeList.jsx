import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./EmployeeList.module.scss";
import { MdSearch, MdDelete, MdEdit, MdAdd } from "react-icons/md"; // Use Material Icons
import Header from "./Header"; // ✅ Added Header

class EmployeeList extends Component {
  state = {
    employees: [],
    searchQuery: "",
  };

  componentDidMount() {
    this.fetchEmployees();
  }

  fetchEmployees = () => {
    axios
      .get("http://localhost:3000/employees")
      .then((response) => {
        this.setState({ employees: response.data });
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
      });
  };

  handleEdit = (id) => {
    localStorage.setItem("editEmployeeId", id);
  };

  handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/employees/${id}`)
      .then(() => this.fetchEmployees())
      .catch((error) => console.error("Error deleting employee:", error));
  };

  handleSearch = (e) => {
    this.setState({ searchQuery: e.target.value });
  };

  render() {
    const { employees, searchQuery } = this.state;

    // Filter employees based on search query
    const filteredEmployees = employees.filter((employee) =>
      employee.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div className={styles.employeeListContainer}>
        <Header /> {/* ✅ Added Header */}

        <header className={styles.header}>
          <h2>Employee Details</h2>
          <div className={styles.headerActions}>
            <div className={styles.searchContainer}>
              <input
                type="text"
                placeholder="Search by name..."
                value={searchQuery}
                onChange={this.handleSearch}
                className={styles.searchInput}
              />
              <MdSearch className={styles.searchIcon} />
            </div>
            <Link to="/add-employee" className={styles.addButton}>
              <MdAdd className={styles.addIcon} /> Add User
            </Link>
          </div>
        </header>

        <table className={styles.employeeTable}>
          <thead>
            <tr>
              <th></th> {/* Empty column for profile image */}
              <th>Name</th>
              <th>Gender</th>
              <th>Department</th>
              <th>Salary</th>
              <th>Start Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td>
                    <img
                      src={
                        employee.profileImage.startsWith("/")
                          ? employee.profileImage
                          : `/src/assets/${employee.profileImage}`
                      }
                      alt="Profile"
                      className={styles.profileImage}
                      onError={(e) => (e.target.src = "/src/assets/default.png")}
                    />
                  </td>
                  <td>{employee.name}</td>
                  <td>{employee.gender}</td>
                  <td>
                    {Array.isArray(employee.department) ? (
                      employee.department.map((dept, index) => (
                        <span key={index} className={styles.departmentTag}>
                          {dept}
                        </span>
                      ))
                    ) : (
                      <span className={styles.departmentTag}>
                        {employee.department || "N/A"}
                      </span>
                    )}
                  </td>
                  <td>₹ {employee.salary}</td>
                  <td>{employee.startDate}</td>
                  <td>
                    <button
                      onClick={() => this.handleDelete(employee.id)}
                      className={styles.deleteButton}
                    >
                      <MdDelete />
                    </button>
                    <Link to="/add-employee">
                      <button
                        onClick={() => this.handleEdit(employee.id)}
                        className={styles.editButton}
                      >
                        <MdEdit />
                      </button>
                    </Link>
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
