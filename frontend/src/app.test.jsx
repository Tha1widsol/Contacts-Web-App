import { fireEvent, screen, render, waitFor } from "@testing-library/react";
import App from "./App"; 
import axios from "axios";
import { Provider } from "react-redux";
import "@testing-library/jest-dom";
import { store } from "./redux/store";

jest.mock("axios");
const mockedAxios = axios;

const mockData = {
  id: 0,
  first_name: "John",
  surname: "Doe",
  email: "test@gmail.com",
  phone: "0123456789012",
  mobile: "0123456789012",
};

const createContact = async () => {
  mockedAxios.post.mockResolvedValue({ data: mockData });

  fireEvent.click(screen.getByText(/Add Contact/i));

  fireEvent.change(screen.getByLabelText(/First Name/i), {
    target: { value: mockData.first_name}
  });
  fireEvent.change(screen.getByLabelText(/Surname/i), {
    target: { value: mockData.surname },
  });
  fireEvent.change(screen.getByLabelText(/Email/i), {
    target: { value: mockData.email },
  });
  fireEvent.change(screen.getByLabelText(/Phone/i), {
    target: { value: mockData.phone },
  });
  fireEvent.change(screen.getByLabelText(/Mobile/i), {
    target: { value: mockData.mobile },
  });
  fireEvent.click(screen.getByText(/Submit/i));

  await waitFor(() => {
    expect(screen.getByText(new RegExp(mockData.first_name, "i"))).toBeInTheDocument();
  });
};

beforeEach(() => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
});

describe("This should test managing contacts", () => {
  test("should add a contact via UI and handle the API call", async () => {

    await createContact();
  
    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledTimes(1);
      expect(mockedAxios.post).toHaveBeenCalledWith(`/api/contacts`, expect.any(Object));
      expect(screen.getByText(new RegExp(mockData.first_name, "i"))).toBeInTheDocument();
      expect(screen.getByText(new RegExp(mockData.surname, "i"))).toBeInTheDocument();
      expect(screen.getByText(new RegExp(mockData.email, "i"))).toBeInTheDocument();
    });
  });

  test("Should edit a contact via the name", async () => {
    const edited_mock_data = {
      ...mockData,
      first_name: "Test"
    }

    mockedAxios.put.mockResolvedValue({ data: edited_mock_data});

    const editButton = screen.getByText(/Edit/i);
    fireEvent.click(editButton);
    fireEvent.click(screen.getByText(/Submit/i));

    await waitFor(() => {
      expect(mockedAxios.put).toHaveBeenCalledTimes(1);
      expect(mockedAxios.put).toHaveBeenCalledWith(`/api/contacts/${mockData.id}`, expect.any(Object));
    });

    await waitFor(() => {
      expect(screen.queryByText(new RegExp(mockData.first_name, "i"))).not.toBeInTheDocument();
      expect(screen.queryByText(new RegExp(edited_mock_data.first_name))).toBeInTheDocument();
    });


  })

  test("should delete a contact and handle the API call", async () => {
    mockedAxios.delete.mockResolvedValue({ data: mockData.id });
    const deleteButton = screen.getByText(/Delete/i);
    fireEvent.click(deleteButton);
    fireEvent.click(screen.getByText(/Confirm/i));

    await waitFor(() => {
      expect(mockedAxios.delete).toHaveBeenCalledTimes(1);
      expect(mockedAxios.delete).toHaveBeenCalledWith(`/api/contacts/${mockData.id}`);
    });

    await waitFor(() => {
      expect(screen.queryByText(new RegExp(mockData.first_name, "i"))).not.toBeInTheDocument();
      expect(screen.queryByText(new RegExp(mockData.surname, "i"))).not.toBeInTheDocument();
      expect(screen.queryByText(new RegExp(mockData.email, "i"))).not.toBeInTheDocument();
    });
  });
});

describe("Test validate form" , () => {
  test("Fields required error", async () => {
    fireEvent.click(screen.getByText(/Add Contact/i));
    fireEvent.click(screen.getByText(/Submit/i));

    expect(await screen.findByText("First name is required.")).toBeInTheDocument();
    expect(await screen.findByText("Surname is required.")).toBeInTheDocument();
    expect(await screen.findByText("Email is required.")).toBeInTheDocument();
    expect(await screen.findByText("Phone number is required.")).toBeInTheDocument();
  });

  test("Invalid email", async () => {
    fireEvent.click(screen.getByText(/Add Contact/i));

    fireEvent.change(screen.getByLabelText(/First Name/i), {
      target: { value: mockData.first_name },
    });
    fireEvent.change(screen.getByLabelText(/Surname/i), {
      target: { value: mockData.surname },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "testgmail.com" },
    });
    fireEvent.change(screen.getByLabelText(/Phone/i), {
      target: { value: mockData.phone },
    });
    fireEvent.change(screen.getByLabelText(/Mobile/i), {
      target: { value: mockData.mobile },
    });
    fireEvent.click(screen.getByText(/Submit/i));

    expect(await screen.findByText("Invalid email format.")).toBeInTheDocument();
  });

  test("Invalid first name", async () => {
    fireEvent.click(screen.getByText(/Add Contact/i));

    fireEvent.change(screen.getByLabelText(/First Name/i), {
      target: { value: "sfjsf44" },
    });
    fireEvent.change(screen.getByLabelText(/Surname/i), {
      target: { value: mockData.surname },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: mockData.email },
    });
    fireEvent.change(screen.getByLabelText(/Phone/i), {
      target: { value: mockData.phone },
    });
    fireEvent.change(screen.getByLabelText(/Mobile/i), {
      target: { value: mockData.mobile },
    });
    fireEvent.click(screen.getByText(/Submit/i));

    expect(await screen.findByText("First name must contain only letters.")).toBeInTheDocument();
  });

  test("Invalid surname", async () => {
    fireEvent.click(screen.getByText(/Add Contact/i));

    fireEvent.change(screen.getByLabelText(/First Name/i), {
      target: { value: mockData.first_name },
    });
    fireEvent.change(screen.getByLabelText(/Surname/i), {
      target: { value: "wsfrw4" }, 
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: mockData.email },
    });
    fireEvent.change(screen.getByLabelText(/Phone/i), {
      target: { value: mockData.phone },
    });
    fireEvent.change(screen.getByLabelText(/Mobile/i), {
      target: { value: mockData.mobile },
    });
    fireEvent.click(screen.getByText(/Submit/i));

    expect(await screen.findByText("Surname must contain only letters.")).toBeInTheDocument();
  });

  test("Invalid phone number", async () => {
    fireEvent.click(screen.getByText(/Add Contact/i));

    fireEvent.change(screen.getByLabelText(/First Name/i), {
      target: { value: mockData.first_name },
    });
    fireEvent.change(screen.getByLabelText(/Surname/i), {
      target: { value: mockData.surname },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: mockData.email },
    });
    fireEvent.change(screen.getByLabelText(/Phone/i), {
      target: { value: "23424jre" },
    });
    fireEvent.change(screen.getByLabelText(/Mobile/i), {
      target: { value: mockData.mobile },
    });
    fireEvent.click(screen.getByText(/Submit/i));

    expect(await screen.findByText("Phone number must contain only digits.")).toBeInTheDocument();
  });

  test("Invalid phone number length", async () => {
    fireEvent.click(screen.getByText(/Add Contact/i));

    fireEvent.change(screen.getByLabelText(/First Name/i), {
      target: { value: mockData.first_name },
    });
    fireEvent.change(screen.getByLabelText(/Surname/i), {
      target: { value: mockData.surname },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: mockData.email },
    });
    fireEvent.change(screen.getByLabelText(/Phone/i), {
      target: { value: "2344" }, 
    });
    fireEvent.change(screen.getByLabelText(/Mobile/i), {
      target: { value: mockData.mobile },
    });
    fireEvent.click(screen.getByText(/Submit/i));

    expect(await screen.findByText("Phone number must be between 7 and 15 digits.")).toBeInTheDocument();
  });

  test("Invalid mobile", async () => {
    fireEvent.click(screen.getByText(/Add Contact/i));

    fireEvent.change(screen.getByLabelText(/First Name/i), {
      target: { value: mockData.first_name },
    });
    fireEvent.change(screen.getByLabelText(/Surname/i), {
      target: { value: mockData.surname },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: mockData.email },
    });
    fireEvent.change(screen.getByLabelText(/Phone/i), {
      target: { value: mockData.phone },
    });
    fireEvent.change(screen.getByLabelText(/Mobile/i), {
      target: { value: "44343j34" }, 
    });
    fireEvent.click(screen.getByText(/Submit/i));

    expect(await screen.findByText("Mobile number must contain only digits and be between 7 and 15 digits.")).toBeInTheDocument();
  });

  test("Invalid mobile length", async () => {
    fireEvent.click(screen.getByText(/Add Contact/i));

    fireEvent.change(screen.getByLabelText(/First Name/i), {
      target: { value: mockData.first_name },
    });
    fireEvent.change(screen.getByLabelText(/Surname/i), {
      target: { value: mockData.surname },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: mockData.email },
    });
    fireEvent.change(screen.getByLabelText(/Phone/i), {
      target: { value: mockData.phone },
    });
    fireEvent.change(screen.getByLabelText(/Mobile/i), {
      target: { value: "4434" }, 
    });
    fireEvent.click(screen.getByText(/Submit/i));

    expect(await screen.findByText("Mobile number must contain only digits and be between 7 and 15 digits.")).toBeInTheDocument();
  });
})
