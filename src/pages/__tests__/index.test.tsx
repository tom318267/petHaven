/// <reference types="jest" />

import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../index";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/router";

// Mock the Next.js router
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

// Mock the Urbanist font (Correct import path for Next.js 13)
jest.mock("next/font/google", () => ({
  Urbanist: jest.fn().mockReturnValue({
    className: "mocked-urbanist",
    style: { fontFamily: "mocked-urbanist" },
  }),
}));

// Mock the components
jest.mock("@/components/ProductSuggestions", () => () => (
  <div data-testid="product-suggestions">Product Suggestions</div>
));
jest.mock("@/components/WhoChooseUs", () => () => (
  <div data-testid="why-choose-us">Why Choose Us</div>
));
jest.mock("@/components/Newsletter", () => () => (
  <div data-testid="newsletter">Newsletter</div>
));

describe("Home component", () => {
  it("renders without crashing", () => {
    render(<Home />);
    expect(
      screen.getByText("Everything Your Pet Needs, All in One Place")
    ).toBeInTheDocument();
  });

  it("renders all major sections", () => {
    render(<Home />);
    expect(screen.getByTestId("product-suggestions")).toBeInTheDocument();
    expect(screen.getByTestId("why-choose-us")).toBeInTheDocument();
    expect(screen.getByTestId("newsletter")).toBeInTheDocument();
  });

  it("navigates to /products when Shop Now is clicked", async () => {
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });

    render(<Home />);
    await userEvent.click(screen.getByText("Shop Now"));
    expect(pushMock).toHaveBeenCalledWith("/products");
  });

  it("navigates to /about when Learn More is clicked", async () => {
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });

    render(<Home />);
    await userEvent.click(screen.getByText("Learn More"));
    expect(pushMock).toHaveBeenCalledWith("/about");
  });
});
