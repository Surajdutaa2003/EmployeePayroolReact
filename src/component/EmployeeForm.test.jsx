import React from 'react';
import {render,screen,fireEvent,wsitFor } from "@testing-library";
import EmployeeForm from "../component/EmployeeForm"
import axios from "axios";
import {BrowserRouter} from "react-router-dom"
import { expect } from 'vitest';

jest.mock("axios");
const renderComponent=()=>{
    return render(
    <BrowserRouter>
    <EmployeeForm/>
    </BrowserRouter>
    )
}

describe("EmployeeForm Component",()=>{
    test("renders the form fields correctly",()=>{
        renderComponent();
        expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Profile Image/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Gender/i)).toBeInTheDocument();
        expect(Screen.get)
    })
})