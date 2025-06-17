import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Dashboard from "./Dashboard";
import * as hooks from "@/hooks";

const mockUser = {
  name: "John Doe",
  created_at: "2021-01-01",
  email: "john.doe@example.com",
  id: "1",
};

vi.mock("@/components/people/PeopleTable", () => ({
  default: () => (
    <div data-testid="people-table">
      People Table Here, mocking children of dashboard
    </div>
  ),
}));

vi.mock("@/hooks");

describe("Dashboard", () => {
  beforeEach(() => {
    vi.mocked(hooks.useAuth).mockImplementation(() => ({
      handleLogout: vi.fn(),
      user: mockUser,
      isAuthenticated: true,
      authToken: "mock-token",
    }));
  });

  it("renders dashboard title", () => {
    render(<Dashboard />);
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });

  it("displays welcome message with user name", () => {
    render(<Dashboard />);
    expect(screen.getByText("Welcome back, John Doe")).toBeInTheDocument();
  });

  it("renders logout button", () => {
    render(<Dashboard />);
    expect(screen.getByRole("button", { name: "Logout" })).toBeInTheDocument();
  });

  it("renders people section with table", () => {
    render(<Dashboard />);
    expect(screen.getByText("People")).toBeInTheDocument();
    expect(screen.getByTestId("people-table")).toBeInTheDocument();
  });

  it("calls handleLogout when logout button is clicked", () => {
    const mockHandleLogout = vi.fn();
    vi.mocked(hooks.useAuth).mockImplementation(() => ({
      handleLogout: mockHandleLogout,
      user: mockUser,
      isAuthenticated: true,
      authToken: "mock-token",
    }));

    render(<Dashboard />);
    const logoutButton = screen.getByRole("button", { name: "Logout" });
    fireEvent.click(logoutButton);
    expect(mockHandleLogout).toHaveBeenCalled();
  });

  it("handles case when user is not logged in", () => {
    vi.mocked(hooks.useAuth).mockImplementation(() => ({
      handleLogout: vi.fn(),
      user: null,
      isAuthenticated: false,
      authToken: null,
    }));

    render(<Dashboard />);
    expect(screen.queryByText(/Welcome back/)).not.toBeInTheDocument();
  });
});
