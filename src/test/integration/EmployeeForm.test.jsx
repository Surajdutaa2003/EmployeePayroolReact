import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import EmployeeForm from "../../component/EmployeeForm";

describe("EmployeeForm Component", () => {
  test("should allow user to input Name", () => {
    render(
      <MemoryRouter>
        <EmployeeForm />
      </MemoryRouter>
    );

    const nameInput = screen.getByPlaceholderText("Enter employee name");
    fireEvent.change(nameInput, { target: { value: "Jane Doe" } });

    expect(nameInput.value).toBe("Jane Doe");
  });

  test("should allow user to submit form", () => {
    render(
      <MemoryRouter>
        <EmployeeForm />
      </MemoryRouter>
    );

    const nameInput = screen.getByPlaceholderText("Enter employee name");
    fireEvent.change(nameInput, { target: { value: "Jane Doe" } });

    const submitButton = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitButton);

    
  });
  test("should allow user to select a profile image", () => {
    render(
      <MemoryRouter>
        <EmployeeForm />
      </MemoryRouter>
    );
  
    const profileImage = screen.getByRole("radio", { name: /profile 1/i });
    fireEvent.click(profileImage);
  
    expect(profileImage.checked).toBe(true);
  });
  
  test("should allow user to select gender", () => {
    render(
      <MemoryRouter>
        <EmployeeForm />
      </MemoryRouter>
    );
  
    const maleRadio = screen.getByLabelText("Male");
    fireEvent.click(maleRadio);
  
    expect(maleRadio.checked).toBe(true);
  });
  test("should allow user to select department", () => {
    render(
      <MemoryRouter>
        <EmployeeForm />
      </MemoryRouter>
    );
  
    const departmentCheckbox = screen.getByLabelText("HR");
    fireEvent.click(departmentCheckbox);
  
    expect(departmentCheckbox.checked).toBe(true);
  });

  test("should allow user to select salary", () => {
    render(
      <MemoryRouter>
        <EmployeeForm />
      </MemoryRouter>
    );
  
    const salaryDropdown = screen.getByRole("combobox", { name: /salary/i });
    fireEvent.change(salaryDropdown, { target: { value: "50000" } });
  
    expect(salaryDropdown.value).toBe("50000");
  });
  
  test("should show error messages for empty fields on submit", async () => {
    render(
      <MemoryRouter>
        <EmployeeForm />
      </MemoryRouter>
    );
  
    const submitButton = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitButton);
  
    expect(screen.getByText("Employee name is required")).toBeInTheDocument();
    expect(screen.getByText("Please select a profile image")).toBeInTheDocument();
    expect(screen.getByText("Please select a gender")).toBeInTheDocument();
  });
  
  test("should clear the form when reset is clicked", () => {
    render(
      <MemoryRouter>
        <EmployeeForm />
      </MemoryRouter>
    );
  
    const nameInput = screen.getByPlaceholderText("Enter employee name");
    fireEvent.change(nameInput, { target: { value: "John Doe" } });
  
    const resetButton = screen.getByRole("button", { name: /reset/i });
    fireEvent.click(resetButton);
  
    expect(nameInput.value).toBe("");
  });
   
 
});
