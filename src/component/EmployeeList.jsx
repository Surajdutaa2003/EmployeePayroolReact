import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./EmployeeList.module.scss";
import { MdSearch, MdDelete, MdEdit, MdAdd } from "react-icons/md";
import Header from "./Header";

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

  // Function to format the date as "DD MMM YYYY"
  formatDate = (dateString) => {
    if (!dateString) return "N/A"; // Handle cases where date is not provided
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid Date"; // Handle invalid dates
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }); // Formats as "29 Oct 2019"
  };

  // Helper function to highlight matching text
  highlightText = (text, query) => {
    if (!query || !text) return text; // If no query or text, return as is

    const lowerText = text.toLowerCase();
    const lowerQuery = query.toLowerCase();

    // If there's no match, return the original text
    if (!lowerText.includes(lowerQuery)) return text;

    // Find the start index of the match
    const startIndex = lowerText.indexOf(lowerQuery);
    const endIndex = startIndex + query.length;

    // Split the text into before, match, and after parts
    const before = text.substring(0, startIndex);
    const match = text.substring(startIndex, endIndex);
    const after = text.substring(endIndex);

    // Return the text with the matching part highlighted
    return (
      <>
        {before}
        <span className={styles.highlight}>{match}</span>
        {after}
      </>
    );
  };

  render() {
    const { employees, searchQuery } = this.state;

    // Filter employees based on search query across multiple fields
    const filteredEmployees = employees.filter((employee) => {
      const query = searchQuery.toLowerCase();

      // Check name
      const matchesName = employee.name.toLowerCase().includes(query);

      // Check gender
      const matchesGender = employee.gender.toLowerCase().includes(query);

      // Check department (array of departments)
      const matchesDepartment = Array.isArray(employee.department)
        ? employee.department.some((dept) =>
            dept.toLowerCase().includes(query)
          )
        : employee.department?.toLowerCase().includes(query) || false;

      // Check salary (convert to string for searching)
      const matchesSalary = employee.salary.toString().includes(query);

      // Check start date (format the date and search)
      const formattedDate = this.formatDate(employee.startDate).toLowerCase();
      const matchesFormattedDate = formattedDate.includes(query);

      // Check raw start date (e.g., "2023-10-29")
      const rawDate = employee.startDate?.toLowerCase() || "";
      const matchesRawDate = rawDate.includes(query);

      // Return true if any field matches the query
      return (
        matchesName ||
        matchesGender ||
        matchesDepartment ||
        matchesSalary ||
        matchesFormattedDate ||
        matchesRawDate
      );
    });

    return (
      <div className={styles.employeeListContainer}>
        <Header />

        <header className={styles.header}>
          <div className={styles.details}>
            <h2>Employee Details</h2>
          </div>

          <div className={styles.headerActions}>
            <div className={styles.searchContainer}>
              <input
                type="text"
                placeholder="Search by name, gender, department, salary, or date..."
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
                  <td>{this.highlightText(employee.name, searchQuery)}</td>
                  <td>{this.highlightText(employee.gender, searchQuery)}</td>
                  <td>
                    {Array.isArray(employee.department) ? (
                      employee.department.map((dept, index) => (
                        <span key={index} className={styles.departmentTag}>
                          {this.highlightText(dept, searchQuery)}
                        </span>
                      ))
                    ) : (
                      <span className={styles.departmentTag}>
                        {this.highlightText(
                          employee.department || "N/A",
                          searchQuery
                        )}
                      </span>
                    )}
                  </td>
                  <td>
                    ₹{" "}
                    {this.highlightText(employee.salary.toString(), searchQuery)}
                  </td>
                  <td>
                    {this.highlightText(
                      this.formatDate(employee.startDate),
                      searchQuery
                    )}
                  </td>
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