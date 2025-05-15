import { fireEvent, render, waitFor } from "@testing-library/react-native";
import React from "react";
import Login from "../app/login";

const mockReplace = jest.fn();
const mockPush = jest.fn();

jest.mock("expo-router", () => ({
  useRouter: () => ({
    replace: mockReplace,
    push: mockPush,
  }),
}));

const mockSignIn = jest.fn().mockResolvedValue(undefined);

jest.mock("../app/session", () => ({
  useSession: () => ({
    signIn: mockSignIn,
  }),
}));

describe("Login Page", () => {
  it("renders correctly", () => {
    const { getByPlaceholderText, getByText } = render(<Login />);
    expect(getByPlaceholderText("Email")).toBeTruthy();
    expect(getByPlaceholderText("Password")).toBeTruthy();
    expect(getByText("Login")).toBeTruthy();
    expect(getByText("Înregistrează-te aici")).toBeTruthy();
  });

  it("updates input values", () => {
    const { getByPlaceholderText } = render(<Login />);
    const email = getByPlaceholderText("Email");
    const password = getByPlaceholderText("Password");

    fireEvent.changeText(email, "test@email.com");
    fireEvent.changeText(password, "password123");

    expect(email.props.value).toBe("test@email.com");
    expect(password.props.value).toBe("password123");
  });

  it("calls signIn and navigates on login", async () => {
    const { getByText, getByPlaceholderText } = render(<Login />);
    fireEvent.changeText(getByPlaceholderText("Email"), "user@test.com");
    fireEvent.changeText(getByPlaceholderText("Password"), "mypassword");
    fireEvent.press(getByText("Login"));

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith("user@test.com", "mypassword");
      expect(mockReplace).toHaveBeenCalledWith("/");
    });
  });

  it("navigates to register on link press", () => {
    const { getByText } = render(<Login />);
    fireEvent.press(getByText("Înregistrează-te aici"));
    expect(mockPush).toHaveBeenCalledWith({ pathname: "/register" });
  });
});
