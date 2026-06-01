import { fireEvent, render, screen } from "@testing-library/react";
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
    expect(screen.getAllByText(/Ubezpieczenie towaru w cenie/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Wycena w 24 h/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Bez ukrytych kosztów/i).length).toBeGreaterThan(0);
  });

  it("locks page scroll while the mobile menu is open", () => {
    render(<Index />);

    fireEvent.click(screen.getByRole("button", { name: "Otwórz menu" }));
    expect(document.body.style.overflow).toBe("hidden");

    fireEvent.click(screen.getByRole("button", { name: "Zamknij menu" }));
    expect(document.body.style.overflow).toBe("");
  });
});
