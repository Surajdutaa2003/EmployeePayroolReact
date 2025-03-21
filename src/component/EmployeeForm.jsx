import React, { Component } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import styles from "./EmployeeForm.module.scss";

// ✅ Import Images
import boy1 from "../assets/boy1.jpeg";
import boy2 from "../assets/boy2.jpeg";
import girl1 from "../assets/girl1.jpeg";

class EmployeeForm extends Component {
  state = {
    name: "",
    profileImage: "",
    gender: "",
    department: [],
    salary: "",
    startDate: "",
    redirect: false,
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleCheckboxChange = (e) => {
    const { department } = this.state;
    const value = e.target.value;

    if (e.target.checked) {
      this.setState({ department: [...department, value] });
    } else {
      this.setState({ department: department.filter((dep) => dep !== value) });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const newEmployee = { ...this.state };

    axios.post("http://localhost:3000/employees", newEmployee)
      .then(() => {
        this.setState({ redirect: true });
      })
      .catch((error) => {
        console.error("Error adding employee:", error);
      });
  };

  render() {
    if (this.state.redirect) {
      return <Navigate to="/" />;
    }

    // ✅ Profile Images List
    const images = [
      { src: boy1, name: "boy1.jpeg" },
      { src: boy2, name: "boy2.jpeg" },
      { src: girl1, name: "girl1.jpeg" },
    ];

    return (
      <div className={styles.container}>
        <h2>Employee Payroll Form</h2>
        <form onSubmit={this.handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter employee name"
            value={this.state.name}
            onChange={this.handleChange}
            required
          />

          <label>Profile Image</label>
          <div className={styles.profileImages}>
            {images.map((img, index) => (
              <label key={index}>
                <input
                  type="radio"
                  name="profileImage"
                  value={img.src}  // ✅ Use imported image path
                  onChange={this.handleChange}
                />
                <img src={img.src} alt={`Profile ${index + 1}`} />
              </label>
            ))}
          </div>

          <label>Gender</label>
          <input
            type="radio"
            name="gender"
            value="Male"
            onChange={this.handleChange}
          />
          Male
          <input
            type="radio"
            name="gender"
            value="Female"
            onChange={this.handleChange}
          />
          Female

          <label>Departments</label>
          <input
            type="checkbox"
            value="Sales"
            onChange={this.handleCheckboxChange}
          />
          Sales
          <input
            type="checkbox"
            value="HR"
            onChange={this.handleCheckboxChange}
          />
          HR
          <input
            type="checkbox"
            value="Finance"
            onChange={this.handleCheckboxChange}
          />
          Finance

          <label>Salary</label>
          <select name="salary" onChange={this.handleChange}>
            <option value="">Select Salary</option>
            <option value="50000">50,000</option>
            <option value="60000">60,000</option>
          </select>

          <label>Start Date</label>
          <input
            type="date"
            name="startDate"
            onChange={this.handleChange}
          />

          <button type="submit">Save</button>
          <button type="button" onClick={() => this.setState({ redirect: true })}>
            Cancel
          </button>
        </form>
      </div>
    );
  }
}

export default EmployeeForm;
