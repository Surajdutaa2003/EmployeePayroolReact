import { render, screen,within,fireEvent } from "@testing-library/react";
import Login from "../../component/Login";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Header from "../../component/Header"; // ✅ Import Header
import { MemoryRouter } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

jest.mock("jwt-decode", () => ({
  jwtDecode: jest.fn(),
}));

const clientId = "test-client-id";

describe("Login Component", () => {
  it("renders login button initially", () => {
    render(
      <GoogleOAuthProvider clientId={clientId}>
        <Login />
      </GoogleOAuthProvider>
    );

    expect(screen.getByText("Sign in to manage your payroll")).toBeInTheDocument();
  });

  // it("shows Logout button in the Header after user logs in", async () => {
  //   // Fake user login simulation
  //   const fakeUser = { name: "Test User" };
  //   localStorage.setItem("user", JSON.stringify(fakeUser));

  //   render(
  //     <GoogleOAuthProvider clientId={clientId}>
  //       <>
  //         <Header />  {/* ✅ Ensure Header is rendered */}
  //         <Login />
  //       </>
  //     </GoogleOAuthProvider>
  //   );

  //   // Wait for the Logout button inside the Header
  //   const header = screen.getByRole("banner"); // Header ka parent element dhundo
  //   const logoutButton = await within(header).findByText("Logout");

  //   expect(logoutButton).toBeInTheDocument();
  // });

  it("renders Header with logo, title, and logout button", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    // Logo check
    expect(screen.getByAltText("Company Logo")).toBeInTheDocument();

    // Title check
    expect(screen.getByText("Employee")).toBeInTheDocument();
    expect(screen.getByText("Payroll")).toBeInTheDocument();

    // Logout button check
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  it("logs out the user when logout button is clicked", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    // Click Logout Button
    const logoutButton = screen.getByText("Logout");
    fireEvent.click(logoutButton);

    // Check if user data is removed
    expect(localStorage.getItem("user")).toBeNull();
  });
  it("renders login page elements correctly", () => {
    render(
      <GoogleOAuthProvider clientId={clientId}>
        <Login />
      </GoogleOAuthProvider>
    );
  
    expect(screen.getByText("Employee Payroll")).toBeInTheDocument();
    expect(screen.getByText("Sign in to manage your payroll")).toBeInTheDocument();
  })
  
});
// ss