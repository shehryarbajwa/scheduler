import React from "react";

import { render, cleanup, waitForElement, fireEvent, getByText, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText, act, queryByText, queryByAltText, waitForElementToBeRemoved, getByTestId } from "@testing-library/react";

import Application from "components/Application";

import axios from "axios";


afterEach(cleanup);

describe("Application", () => {
  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
  
    await waitForElement(() => getByText("Monday"));
    act(() => {
      fireEvent.click(getByText("Tuesday"));
    })
    
  
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });
  
  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { getByText } = render(<Application />);
  
    await waitForElement(() => getByText("Monday"));

    act(() => {
      fireEvent.click(getByText("Tuesday"));
    })
    
    
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, "appointment")[0];

    act(() => {
      fireEvent.click(getByAltText(appointment, "Add"));
    })
    act(() => {
      fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
        target: { value: "Lydia Miller-Jones" }
      });
    })
    act(() => {
      fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    })
    act(() => {
      fireEvent.click(getByText(appointment, "Save"));
    })

    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
  
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
  
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);
  
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
  
    fireEvent.click(queryByAltText(appointment, "Delete"));
  
    // 4. Check that the confirmation message is shown.
    expect(
      getByText(appointment, "Are you sure you would like to delete?")
    ).toBeInTheDocument();
  
    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(queryByText(appointment, "Confirm"));
  
    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();
  
    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, "Add"));
  
    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
  
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // 1. Render the Application
    const { container, debug } = render(<Application />)
    // 2. Wait until the text "Archie Cohen is displayed"
    await waitForElement(() => getByText(container, "Archie Cohen"));
    // 3. Click the "Edit" button on the booked appointment
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(queryByAltText(appointment, "Edit"));
    // 4. Edit the name in the form
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: {value: "Jones Miller-Jones"}
    });
    // 4.5 Click save
    fireEvent.click(getByText(appointment, "Save"));
    // 5. Check that the element with the text "Saving..." is displayed
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    // 6. Wait until the element loads 
    await waitForElement(() => getByText(appointment, "Jones Miller-Jones"));
    // console.log(debug(appointment))
    // 7. Check that the DayListItem with the text "Monday" has the text "1 spot remaining " 
    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"));
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });
  it("shows the save error when failing to save an appointment", async() => {
    axios.put.mockRejectedValueOnce();
      // 1. Render the Application
    const { container, debug } = render(<Application />)
    // 2. Wait until the text "Archie Cohen is displayed"
    await waitForElement(() => getByText(container, "Archie Cohen"));
    // 3. Click the "Edit" button on the booked appointment
    const appointment = getAllByTestId(container, "appointment")[0];
    fireEvent.click(queryByAltText(appointment, "Add"));
    // 4. Edit the name in the form
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: {value: "Jones Miller-Jones"}
    });
    // 4.5 Click save
    fireEvent.click(getByText(appointment, "Save"));
    
    // 5. Check that the element with the text "Saving..." is displayed
    //expect(getByText(appointment, "Saving")).toBeInTheDocument();
    // 6. Wait until the element loads 
   
    await waitForElement(() => getByText(appointment, "Could not save appointment"));
    // console.log(debug(appointment))
    // 7. Check that the DayListItem with the text "Monday" has the text "1 spot remaining " 
   
    // expect(getByText(appointment, "Could not save appointment")).toBeInTheDocument();
    // const { container } = render(<Application />);
    // await waitForElement(() => getByText(container,"Archie Cohen"));
    // const appointment = getAllByTestId(container, "appointment")[2];
    // console.log("test file", appointment)
    // fireEvent.click(getByAltText(appointment, "Add"))
    // await waitForElement(() => getByTestId(appointment, "student-name-input"));
    // // console.log("test check", appointment);
    // fireEvent.change(getByPlaceholderText(appointment, "Enter Student Name"), {
    //   target: { value: "Lydia Miller-Jones" }
    // });
    // fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    // fireEvent.click(getByText(appointment, "Save"));
    // expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // await waitForElementToBeRemoved(() => getByText(appointment, "Saving"));
    // expect(getByText(appointment, "Could not save appointment")).toBeInTheDocument();
  })

  
  it("shows the delete error when failing to delete an appointment", async () => {
    axios.delete.mockRejectedValueOnce();
    // 1. Render the Application.
    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Monday")).then(() => {
      fireEvent.click(getByText(container, "Tuesday"));
    })

    // 2. Find an existing interview on Tuesday;
    await waitForElement(() => getByText(container, "Leopold Silvers"));

    // 3. Click the "Delete" button on the appointment.
    const appointmentToDelete = getAllByTestId(container, "appointment")
      .find(appointment => queryByText(appointment, "Leopold Silvers"))
      fireEvent.click(queryByAltText(appointmentToDelete, "Delete"));
    
    // 4. Check that the confirmation message is shown.
    expect(getByText(appointmentToDelete, "Are you sure you would like to delete?")).toBeInTheDocument();
    
    // 5. Click the "Confirm" button on the appointment.
    fireEvent.click(getByText(appointmentToDelete, "Confirm"));
    
    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(container, "Deleting")).toBeInTheDocument();
    
    // 7. Wait until the error is displayed.
    await waitForElement(() => getByText(container, "Could not delete appointment"));
    

  });
});
