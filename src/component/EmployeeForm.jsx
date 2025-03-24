import React, { Component } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import styles from "./EmployeeForm.module.scss";
import boy1 from "../assets/boy1.jpeg";
import boy2 from "../assets/boy2.jpeg";
import girl1 from "../assets/girl1.jpeg";
import Header from "./Header"; // Import the Header component

class EmployeeForm extends Component {
  state = {
    id: null,
    name: "",
    profileImage: "",
    gender: "",
    department: [],
    salary: "",
    startDateDay: "",
    startDateMonth: "",
    startDateYear: "",
    startDate: "", // Combined start date for submission
    notes: "",
    redirect: false,
  };

  componentDidMount() {
    const editEmployeeId = localStorage.getItem("editEmployeeId");

    if (editEmployeeId) {
      axios
        .get(`http://localhost:3000/employees/${editEmployeeId}`)
        .then((response) => {
          const { startDate } = response.data;
          let startDateDay = "",
            startDateMonth = "",
            startDateYear = "";
          if (startDate) {
            const date = new Date(startDate);
            startDateDay = date.getDate().toString();
            startDateMonth = (date.getMonth() + 1).toString();
            startDateYear = date.getFullYear().toString();
          }
          this.setState({
            ...response.data,
            startDateDay,
            startDateMonth,
            startDateYear,
          });
        })
        .catch((error) => console.error("Error fetching employee:", error));
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleCheckboxChange = (e) => {
    const { department } = this.state;
    const value = e.target.value;

    if (e.target.checked) {
      this.setState({ department: [...department, value] });
    } else {
      this.setState({
        department: department.filter((dep) => dep !== value),
      });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const {
      id,
      startDateDay,
      startDateMonth,
      startDateYear,
      startDate,
      ...employeeData
    } = this.state;
    const editEmployeeId = localStorage.getItem("editEmployeeId");

    // Combine the start date fields into a single date string
    if (startDateDay && startDateMonth && startDateYear) {
      const formattedDate = `${startDateYear}-${startDateMonth.padStart(
        2,
        "0"
      )}-${startDateDay.padStart(2, "0")}`;
      employeeData.startDate = formattedDate;
    }

    if (editEmployeeId) {
      axios
        .patch(`http://localhost:3000/employees/${editEmployeeId}`, employeeData)
        .then(() => {
          localStorage.removeItem("editEmployeeId");
          this.setState({ redirect: true });
        })
        .catch((error) => console.error("Error updating employee:", error));
    } else {
      axios
        .post("http://localhost:3000/employees", employeeData)
        .then(() => this.setState({ redirect: true }))
        .catch((error) => console.error("Error adding employee:", error));
    }
  };

  render() {
    if (this.state.redirect) {
      return <Navigate to="/employees" />;
    }

    return (
      <div className={styles.container}>
        <Header /> 
        <div className={styles.formContainer}>
          <form onSubmit={this.handleSubmit}>
          <h1>Employee Payroll Form</h1>

            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter employee name"
              value={this.state.name}
              onChange={this.handleChange}
              required
            />

            <div className={styles.profileSection}>
              <label>Profile Image</label>
              <div className={styles.profileImages}>
                {[
                  { src: boy1, name: "boy1.jpeg" },
                  { src: boy2, name: "boy2.jpeg" },
                  { src: girl1, name: "girl1.jpeg" },
                ].map((img, index) => (
                  <label key={index} className={styles.profileImageLabel}>
                    <input
                      type="radio"
                      name="profileImage"
                      value={img.name}
                      checked={this.state.profileImage === img.name}
                      onChange={this.handleChange}
                    />
                    <img src={img.src} alt={`Profile ${index + 1}`} />
                  </label>
                ))}
              </div>
            </div>

            <label>Gender</label>
            <div>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={this.state.gender === "Male"}
                  onChange={this.handleChange}
                />{" "}
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={this.state.gender === "Female"}
                  onChange={this.handleChange}
                />{" "}
                Female
              </label>
            </div>

            <label>Department</label>
            <div>
              {["HR", "Sales", "Finance", "Engineer", "Others"].map((dept) => (
                <label key={dept}>
                  <input
                    type="checkbox"
                    value={dept}
                    checked={this.state.department.includes(dept)}
                    onChange={this.handleCheckboxChange}
                  />{" "}
                  {dept}
                </label>
              ))}
            </div>

            <label>Salary</label>
            <select
              name="salary"
              value={this.state.salary}
              onChange={this.handleChange}
            >
              <option value="">Select Salary</option>
              <option value="50000">50,000</option>
              <option value="60000">60,000</option>
            </select>

            <label>Start Date</label>
            <div className={styles.startDate}>
              <select
                name="startDateDay"
                value={this.state.startDateDay}
                onChange={this.handleChange}
              >
                <option>Day</option>
                {[...Array(31)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              <select
                name="startDateMonth"
                value={this.state.startDateMonth}
                onChange={this.handleChange}
              >
                <option>Month</option>
                {[
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                ].map((month, i) => (
                  <option key={i + 1} value={i + 1}>
                    {month}
                  </option>
                ))}
              </select>
              <select
                name="startDateYear"
                value={this.state.startDateYear}
                onChange={this.handleChange}
              >
                <option>Year</option>
                {[...Array(50)].map((_, i) => (
                  <option key={i} value={2025 - i}>
                    {2025 - i}
                  </option>
                ))}
              </select>
            </div>

            <label>Notes</label>
            <textarea
              name="notes"
              value={this.state.notes}
              onChange={this.handleChange}
              placeholder="Enter notes"
            />

            <div className={styles.buttonContainer}>
              <button
                type="button"
                className={styles.cancelButton}
                onClick={() => this.setState({ redirect: true })}
              >
                Cancel
              </button>
              <div className={styles.rightButtons}>
                <button type="submit" className={styles.submitButton}>
                  {this.state.id ? "Update" : "Submit"}
                </button>
                <button type="reset" className={styles.resetButton}>
                  Reset
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default EmployeeForm;