import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import EmployeeList from "./EmployeeList";
import axios from "axios";
import { vi } from "vitest";

vi.mock("axios");

describe("EmployeeList Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    axios.get.mockResolvedValue({
      data: [
        {
          id: 1,
          name: "Rajesh",
          department: "HR",
          salary: 50000,
          profileImage: "/assets/boy1.jpeg",
        },
      ],
    });
  });

  test("renders Add Employee button and navigates on click", async () => {
    render(
      <MemoryRouter>
        <EmployeeList />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Rajesh")).toBeInTheDocument();
    });

    const addButton = screen.getByRole("link", { name: "➕ Add User" });
    expect(addButton).toBeInTheDocument();
    expect(addButton).toHaveAttribute("href", "/add-employee");
  });

  test("Edit button stores token and navigates to edit page", async () => {
    render(
      <MemoryRouter>
        <EmployeeList />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Rajesh")).toBeInTheDocument();
    });

    const editButton = screen.getByRole("button", { name: /Edit/i });
    fireEvent.click(editButton);
    expect(localStorage.getItem("editEmployeeId")).toBe("1"); 
  });

  test("Delete button removes employee from UI", async () => {
    render(
      <MemoryRouter>
        <EmployeeList />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Rajesh")).toBeInTheDocument();
    });

   
    axios.delete.mockResolvedValue({ status: 200 });
    
    axios.get.mockResolvedValueOnce({ data: [] });

    const deleteButton = screen.getByRole("button", { name: /Delete/i });
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledWith("http://localhost:3000/employees/1");
      expect(screen.queryByText("Rajesh")).not.toBeInTheDocument();
    });
  });
});