import React from "react";
import {render,screen,waitFor} from "@testing-library/react";
import EmployeeList from "./EmployeeList";
import axios from "axios";
import {vi} from "vitest";

vi.mock("axios");
test("render employee list after fetching data",async()=>{
    axios.get.mockResolvedValue({
        data:[
            {id:1,name:"rajesh",department:"HR"},
            {id:2,name:"suresh",department:"Finance"}
        ]
    });
    render(<EmployeeList/>);
    expect(screen.getByText("Employee List")).toBeInTheDocument();

    await waitFor(()=>{
        expect(screen.getByText("rajesh - HR")).toBeInTheDocument();
        expect(screen.getByText("suresh - Finance")).toBeInTheDocument();
    })
})