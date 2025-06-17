import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import TablePagination from "./TablePagination";

describe("TablePagination", () => {
  const defaultProps = {
    currentPage: 2,
    pageSize: 10,
    totalItems: 25,
    totalPages: 3,
    onPageChange: vi.fn(),
    onPageSizeChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders pagination information correctly", () => {
    render(<TablePagination {...defaultProps} />);

    expect(
      screen.getByText("Showing 11 to 20 of 25 entries")
    ).toBeInTheDocument();
    expect(screen.getByText("Rows per page:")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Previous" })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Next" })).toBeInTheDocument();
  });

  it("handles page navigation correctly", () => {
    render(<TablePagination {...defaultProps} />);

    const previousButton = screen.getByRole("button", { name: "Previous" });
    const nextButton = screen.getByRole("button", { name: "Next" });

    fireEvent.click(previousButton);
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(1);

    fireEvent.click(nextButton);
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(3);
  });

  it("disables navigation buttons appropriately", () => {
    render(<TablePagination {...defaultProps} currentPage={1} />);
    expect(screen.getByRole("button", { name: "Previous" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Next" })).not.toBeDisabled();
  });

  it("handles page size changes", () => {
    render(<TablePagination {...defaultProps} />);

    const pageSizeSelect = screen.getByRole("combobox");
    fireEvent.click(pageSizeSelect);

    const option = screen.getByRole("option", { name: "20" });
    fireEvent.click(option);

    expect(defaultProps.onPageSizeChange).toHaveBeenCalledWith("20");
  });
});
