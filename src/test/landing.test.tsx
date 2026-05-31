import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Index from "@/pages/Index";

describe("landing page", () => {
  it("renders the core sections and contact details", () => {
    render(<Index />);

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Przeprowadzki bez problemów/i })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "Usługi" })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "Kontakt" })).toBeInTheDocument();
    expect(screen.getAllByText("+48 730 857 710").length).toBeGreaterThan(0);
  });
});
