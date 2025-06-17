import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import LoginForm from "./LoginForm";
import * as reactRouter from "react-router-dom";
import * as reactRedux from "react-redux";
import * as authService from "@/store/services/auth";
import { toast } from "sonner";

vi.mock("react-router-dom");
vi.mock("react-redux");
vi.mock("@/store/services/auth");
vi.mock("sonner");

describe("LoginForm", () => {
  const mockNavigate = vi.fn();
  const mockDispatch = vi.fn();
  const mockLogin = vi.fn();
  const mockUnwrap = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(reactRouter.useNavigate).mockReturnValue(mockNavigate);

    vi.mocked(reactRedux.useDispatch).mockReturnValue(mockDispatch);

    vi.mocked(authService.useLoginMutation).mockReturnValue([
      mockLogin.mockReturnValue({ unwrap: mockUnwrap }),
      {
        isLoading: false,
        isSuccess: false,
        isError: false,
        reset: vi.fn(),
        status: "uninitialized",
        data: undefined,
        currentData: undefined,
        error: null,
        endpointName: "login",
        startedTimeStamp: undefined,
        fulfilledTimeStamp: undefined,
        originalArgs: undefined,
      },
    ]);
  });

  it("renders login form with email and password fields", () => {
    render(<LoginForm />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign in/i })
    ).toBeInTheDocument();
  });

  it("shows validation errors for empty fields", async () => {
    render(<LoginForm />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /sign in/i });

    fireEvent.focus(emailInput);
    fireEvent.blur(emailInput);
    fireEvent.focus(passwordInput);
    fireEvent.blur(passwordInput);

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Email is required")).toBeInTheDocument();
      expect(screen.getByText("Password is required")).toBeInTheDocument();
    });
  });

  it("shows validation error for invalid email", async () => {
    render(<LoginForm />);

    const emailInput = screen.getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: "invalid-email" } });
    fireEvent.blur(emailInput);

    await waitFor(() => {
      expect(screen.getByText(/invalid email address/i)).toBeInTheDocument();
    });
  });

  it("toggles password visibility", () => {
    render(<LoginForm />);

    const passwordInput = screen.getByLabelText(/password/i);
    expect(passwordInput).toHaveAttribute("type", "password");

    const toggleButton = screen.getByRole("button", { name: "" });
    fireEvent.click(toggleButton);

    expect(passwordInput).toHaveAttribute("type", "text");
  });

  it("handles successful login", async () => {
    const mockAuthToken = "mock-token";
    mockUnwrap.mockResolvedValueOnce({ authToken: mockAuthToken });

    render(<LoginForm />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      });

      expect(mockDispatch).toHaveBeenCalledWith({
        type: expect.any(String),
        payload: { authToken: mockAuthToken },
      });

      expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
    });
  });

  it("handles login failure", async () => {
    mockUnwrap.mockRejectedValueOnce(new Error("Login failed"));

    render(<LoginForm />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "wrongpassword" },
    });

    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        "Invalid email or password",
        expect.any(Object)
      );
    });
  });
});
