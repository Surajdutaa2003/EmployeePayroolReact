import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./component/Header";
import EmployeeForm from "./component/EmployeeForm";
import EmployeeList from "./component/EmployeeList";
import "./styles/global.scss";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Header />
          <Routes>
            {/* ✅ Default Page - Employee List */}
            <Route path="/" element={<EmployeeList />} />

            {/* ✅ Add Employee Form Page */}
            <Route path="/add-employee" element={<EmployeeForm />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
