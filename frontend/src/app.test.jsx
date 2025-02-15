import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";
import "@testing-library/jest-dom";

describe("Contact slice actions", () => {
  test("Add contact to update state", async () => {
    render(<App />);

    const mock_data = {
      first_name: "Kelvin",
      surname: "Lai",
      email: "test@gmail.com",
      phone: "111111111",
      mobile: "000000000",
    };

    const addButton = screen.getByRole("button", { name: /Add Contact/i });
    fireEvent.click(addButton);

    await waitFor(() => screen.getByLabelText(/First Name/i));
    
    fireEvent.change(screen.getByLabelText(/First Name/i), {
      target: { value: mock_data.first_name },
    });
    fireEvent.change(screen.getByLabelText(/Surname/i), {
      target: { value: mock_data.surname },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: mock_data.email },
    });
    fireEvent.change(screen.getByLabelText(/Phone/i), {
      target: { value: mock_data.phone },
    });
    fireEvent.change(screen.getByLabelText(/Mobile/i), {
      target: { value: mock_data.mobile },
    });

    const submitButton = screen.getByRole("button", { name: /Submit/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(new RegExp(mock_data.first_name, 'i'))).toBeInTheDocument();
      expect(screen.getByText(new RegExp(mock_data.surname, 'i'))).toBeInTheDocument();
      expect(screen.getByText(new RegExp(mock_data.email, 'i'))).toBeInTheDocument();
    });
  });
});
