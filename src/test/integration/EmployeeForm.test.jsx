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

    // Add assertion based on form submission behavior (e.g., API call or UI change)
  });
});
