import React, { Component } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { Button, Typography, Container, Box } from "@mui/material";

import "../styles/Login.scss"; 
import Footer from "./Footer";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isLoading: false, 
    };
  }

  handleSuccess = (response) => {
    const token = response.credential;
    const decodedUser = jwtDecode(token);
    
    this.setState({ user: decodedUser, isLoading: true });

    localStorage.setItem("user", JSON.stringify(decodedUser));

    setTimeout(() => {
      this.props.navigate("/employees");
    }, 1000);
  };

  handleError = () => {
    alert("Login Failed! Please try again.");
  };

  handleLogout = () => {
    this.setState({ user: null });
    localStorage.removeItem("user");
  };

  renderAuthSection = () => {
    const { isLoading, user } = this.state;

    if (isLoading) {
      return <div className="spinner"></div>;
    }

    if (user) {
      return (
        <div className="welcome-section">
          <Typography variant="h6" className="welcome-text">
            Welcome, {user.name}!
          </Typography>
          <Button
            variant="outlined"
            onClick={this.handleLogout}
            className="logout-button"
          >
            Logout
          </Button>
        </div>
      );
    }

    return (
      <GoogleLogin
        onSuccess={this.handleSuccess}
        onError={this.handleError}
        className="google-login-button"
        data-testid="google-login"
      />
    );
  };

  render() {
    return (
      <GoogleOAuthProvider clientId={clientId}>
        <Container maxWidth="sm" className="login-container">
          <Box className="login-box">
            <Typography variant="h4" gutterBottom className="login-title">
              Employee Payroll
            </Typography>
            <Typography variant="subtitle1" className="login-subtitle">
              Sign in to manage your payroll
            </Typography>

            {this.renderAuthSection()}
          </Box> 
          <Footer/>

        </Container>
      </GoogleOAuthProvider>
    );

  }
}

export default Login;
