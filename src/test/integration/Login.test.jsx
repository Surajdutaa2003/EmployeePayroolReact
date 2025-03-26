import { render, screen } from "@testing-library/react";
import Login from "../../component/Login";
import { GoogleOAuthProvider } from "@react-oauth/google";

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
 
});
