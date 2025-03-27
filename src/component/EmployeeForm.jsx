import React, { Component } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import styles from "../styles/EmployeeForm.module.scss";

import boy1 from "../assets/boy1.jpeg";
import boy2 from "../assets/boy2.jpeg";
import girl1 from "../assets/girl1.jpeg";

import Header from "./Header";

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
    startDate: "",
    notes: "",
    redirect: false,
    errors: {}, 
  };

  async componentDidMount() {
    const editEmployeeId = localStorage.getItem("editEmployeeId");

    if (editEmployeeId) {
      try {
        const response = await axios.get(
          `http://localhost:3000/employees/${editEmployeeId}`
        );
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
      } catch (error) {
        // Removed console.error
      }
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      errors: { ...this.state.errors, [e.target.name]: "" }, 
    });
  };

  handleReset = () => {
    this.setState({
      id: null,
      name: "",
      profileImage: "",
      gender: "",
      department: [],
      salary: "",
      startDateDay: "",
      startDateMonth: "",
      startDateYear: "",
      startDate: "",
      notes: "",
      errors: {},
    });
  };

  handleCheckboxChange = (e) => {
    const { department } = this.state;
    const value = e.target.value;

    if (e.target.checked) {
      this.setState({
        department: [...department, value],
        errors: { ...this.state.errors, department: "" },
      });
    } else {
      this.setState({
        department: department.filter((dep) => dep !== value),
      });
    }
  };

  validateForm = () => {
    const errors = {};
    const {
      name,
      profileImage,
      gender,
      department,
      salary,
      startDateDay,
      startDateMonth,
      startDateYear,
    } = this.state;

    if (!name.trim()) errors.name = "Employee name is required";
    if (!profileImage) errors.profileImage = "Please select a profile image";
    if (!gender) errors.gender = "Please select a gender";
    if (department.length === 0)
      errors.department = "Please select at least one department";
    if (!salary) errors.salary = "Please select a salary";
    if (!startDateDay) errors.startDateDay = "Please select a start day";
    if (!startDateMonth) errors.startDateMonth = "Please select a start month";
    if (!startDateYear) errors.startDateYear = "Please select a start year";

    this.setState({ errors });
    return Object.keys(errors).length === 0;
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    if (!this.validateForm()) {
      return;
    }

    const {
      id,
      startDateDay,
      startDateMonth,
      startDateYear,
      startDate,
      errors,
      ...employeeData
    } = this.state;
    const editEmployeeId = localStorage.getItem("editEmployeeId");

    if (startDateDay && startDateMonth && startDateYear) {
      const formattedDate = `${startDateYear}-${startDateMonth.padStart(
        2,
        "0"
      )}-${startDateDay.padStart(2, "0")}`;
      employeeData.startDate = formattedDate;
    }

    try {
      if (editEmployeeId) {
        await axios.patch(
          `http://localhost:3000/employees/${editEmployeeId}`,
          employeeData
        );
        localStorage.removeItem("editEmployeeId");
      } else {
        await axios.post("http://localhost:3000/employees", employeeData);
      }
      this.setState({ redirect: true });
    } catch (error) {
      // Removed console.error
    }
  };

  render() {
    if (this.state.redirect) {
      return <Navigate to="/employees" />;
    }

    const { errors } = this.state;

    return (
      <div className={styles.container}>
        <Header />
        <div className={styles.formContainer}>
          <form onSubmit={this.handleSubmit}>
            <h1>Employee Payroll Form</h1>

            <div className={styles.formGroup}>
              <label>Name</label>
              <div className={styles.inputWrapper}>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter employee name"
                  value={this.state.name||""}
                  onChange={this.handleChange}
                />
                {errors.name && <span className={styles.error}>{errors.name}</span>}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.pf}>Profile Image</label>
              <div className={styles.inputWrapper}>
                <div className={styles.profileImages}>
                  {[
                    { src: boy1, name: "boy1.jpeg" },
                    { src: boy2, name: "boy2.jpeg" },
                    { src: girl1, name: "girl1.jpeg" }
                  ].map((img) => (
                    <label key={img.name} className={styles.profileImageLabel}>
                      <input
                        type="radio"
                        name="profileImage"
                        value={img.name}
                        checked={this.state.profileImage === img.name}
                        onChange={this.handleChange}
                        data-testid="profile-image-option"
                      />
                      <img src={img.src} alt={`Profile ${img.name}`} />
                    </label>
                  ))}
                </div>
                {errors.profileImage && (
                  <span className={styles.error}>{errors.profileImage}</span>
                )}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>Gender</label>
              <div className={styles.inputWrapper}>
                <div className={styles.radioGroup}>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      checked={this.state.gender === "Male"}
                      onChange={this.handleChange}
                    />
                    Male
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      checked={this.state.gender === "Female"}
                      onChange={this.handleChange}
                    />
                    Female
                  </label>
                </div>
                {errors.gender && (
                  <span className={styles.error}>{errors.gender}</span>
                )}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>Department</label>
              <div className={styles.inputWrapper}>
                <div className={styles.checkboxGroup}>
                  {["HR", "Sales", "Finance", "Engineer", "Others"].map((dept) => (
                    <label key={dept}>
                      <input
                        type="checkbox"
                        value={dept}
                        checked={this.state.department.includes(dept)}
                        onChange={this.handleCheckboxChange}
                      />
                      {dept}
                    </label>
                  ))}
                </div>
                {errors.department && (
                  <span className={styles.error}>{errors.department}</span>
                )}
              </div>
            </div>

            <div className={styles.formGroup}>
            <label htmlFor="salary">Salary</label> 

              <div className={styles.inputWrapper}>
                <select
                  id="salary"
                  name="salary"
                  value={this.state.salary}
                  onChange={this.handleChange}
                >
                  <option value="">Select Salary</option>
                  <option value="50000">50,000</option>
                  <option value="60000">60,000</option>
                </select>
                {errors.salary && (
                  <span className={styles.error}>{errors.salary}</span>
                )}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>Start Date</label>
              <div className={styles.inputWrapper}>
                <div className={styles.startDate}>
                  <select
                    name="startDateDay"
                    value={this.state.startDateDay}
                    onChange={this.handleChange}
                  >
                    <option value="">Day</option>
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
                    <option value="">Month</option>
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
                    <option value="">Year</option>
                    {[...Array(50)].map((_, i) => (
                      <option key={i} value={2025 - i}>
                        {2025 - i}
                      </option>
                    ))}
                  </select>
                </div>
                {(errors.startDateDay ||
                  errors.startDateMonth ||
                  errors.startDateYear) && (
                  <span className={styles.error}>
                    {errors.startDateDay ||
                      errors.startDateMonth ||
                      errors.startDateYear}
                  </span>
                )}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>Notes</label>
              <div className={styles.inputWrapper}>
                <textarea
                  name="notes"
                  value={this.state.notes}
                  onChange={this.handleChange}
                  placeholder="Enter notes"
                />
              </div>
            </div>

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
                <button
                  type="button"
                  className={styles.resetButton}
                  onClick={this.handleReset}
                >
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