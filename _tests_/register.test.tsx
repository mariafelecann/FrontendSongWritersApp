import { fireEvent, render, waitFor } from "@testing-library/react-native";
import React from "react";
import Register from "../app/register";

const mockRegister = jest.fn().mockResolvedValue(undefined);
jest.mock("../app/session", () => ({
  useSession: () => ({
    register: mockRegister,
  }),
}));

// Mock useRouter hook from expo-router
const mockReplace = jest.fn();
jest.mock("expo-router", () => ({
  useRouter: () => ({
    replace: mockReplace,
  }),
}));

describe("Register Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calls register and navigates to home on submit", async () => {
    const { getByPlaceholderText, getByText } = render(<Register />);

    fireEvent.changeText(getByPlaceholderText("Email"), "user@example.com");
    fireEvent.changeText(getByPlaceholderText("Password"), "securepass");
    fireEvent.press(getByText("Înregistrare"));

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith(
        "user@example.com",
        "securepass"
      );
      expect(mockReplace).toHaveBeenCalledWith("/");
    });
  });

  it('navigates to login when "Înapoi la Login" is pressed', async () => {
    const { getByText } = render(<Register />);

    fireEvent.press(getByText("Înapoi la Login"));

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith("/login");
    });
  });
});
