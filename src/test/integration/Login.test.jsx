import { render, screen, within, fireEvent } from "@testing-library/react";
import Login from "../../component/Login";
import Header from "../../component/Header"; 
import { MemoryRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

jest.mock("jwt-decode", () => ({
  jwtDecode: jest.fn(),
}));

const clientId = "test-client-id";

// ✅ Mock GoogleLogin to ensure it renders correctly
jest.mock("@react-oauth/google", () => ({
  GoogleLogin: ({ onSuccess }) => (
    <button data-testid="google-login" onClick={() => onSuccess({ credential: "mockToken" })}>
      Google Login
    </button>
  ),
  GoogleOAuthProvider: ({ children }) => <div>{children}</div>,
}));

describe("Login Component", () => {
  it("renders login page elements correctly", () => {
    render(
      <GoogleOAuthProvider clientId={clientId}>
        <Login />
      </GoogleOAuthProvider>
    );

    expect(screen.getByText("Employee Payroll")).toBeInTheDocument();
    expect(screen.getByText("Sign in to manage your payroll")).toBeInTheDocument();
  });

  
  

  it("renders Header with logo, title, and logout button", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByAltText("Company Logo")).toBeInTheDocument();
    expect(screen.getByText("Employee")).toBeInTheDocument();
    expect(screen.getByText("Payroll")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  it("logs out the user when logout button is clicked", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const logoutButton = screen.getByText("Logout");
    fireEvent.click(logoutButton);

    expect(localStorage.getItem("user")).toBeNull();
  });
});
