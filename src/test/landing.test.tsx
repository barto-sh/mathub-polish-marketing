import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import { scrollToHash } from "@/lib/scrollToHash";
import { getGoldenHighwayScene } from "@/components/site/goldenHighwayScene";

const DESKTOP_NAV_QUERY = "(min-width: 768px)";

const setReducedMotion = (matches: boolean) => {
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
};

afterEach(() => {
  cleanup();
  document.body.replaceChildren();
  document.body.style.overflow = "";
  document.title = "";
  vi.restoreAllMocks();
  setReducedMotion(false);
  window.history.pushState(null, "", "/");
});

describe("landing page", () => {
  it("renders the core sections and contact details", () => {
    render(<Index />);

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Przeprowadzki i atrakcje/i })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "Usługi" })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "Kontakt" })).toBeInTheDocument();
    expect(screen.getAllByText("+48 730 857 710").length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Ubezpieczenie towaru w cenie/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Wycena w 24 h/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Bez ukrytych kosztów/i).length).toBeGreaterThan(0);
  });

  it("locks page scroll while the mobile menu is open and restores the previous overflow", () => {
    document.body.style.overflow = "clip";
    render(<Index />);

    fireEvent.click(screen.getByRole("button", { name: "Otwórz menu" }));
    expect(document.body.style.overflow).toBe("hidden");

    fireEvent.click(screen.getByRole("button", { name: "Zamknij menu" }));
    expect(document.body.style.overflow).toBe("clip");
  });

  it("closes the mobile menu and restores page state at the desktop breakpoint", () => {
    type MediaListener = (event: MediaQueryListEvent) => void;

    const matchesByQuery = new Map<string, boolean>([
      [DESKTOP_NAV_QUERY, false],
      ["(prefers-reduced-motion: reduce)", false],
    ]);
    const listenersByQuery = new Map<string, Set<MediaListener>>();
    const getListeners = (query: string) => {
      const existing = listenersByQuery.get(query);
      if (existing) return existing;

      const listeners = new Set<MediaListener>();
      listenersByQuery.set(query, listeners);
      return listeners;
    };

    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: matchesByQuery.get(query) ?? false,
        media: query,
        onchange: null,
        addListener: (listener: MediaListener) => {
          getListeners(query).add(listener);
        },
        removeListener: (listener: MediaListener) => {
          getListeners(query).delete(listener);
        },
        addEventListener: (eventName: string, listener: EventListener) => {
          if (eventName === "change") {
            getListeners(query).add(listener as MediaListener);
          }
        },
        removeEventListener: (eventName: string, listener: EventListener) => {
          if (eventName === "change") {
            getListeners(query).delete(listener as MediaListener);
          }
        },
        dispatchEvent: vi.fn(),
      })),
    });

    render(<Index />);

    const main = document.querySelector("main") as HTMLElement;
    const footer = document.querySelector("footer") as HTMLElement;
    const menu = document.getElementById("mobile-menu");

    fireEvent.click(screen.getByRole("button", { name: "Otwórz menu" }));
    expect(document.body.style.overflow).toBe("hidden");
    expect(menu).toHaveAttribute("aria-hidden", "false");
    expect(main).toHaveAttribute("inert", "");
    expect(footer).toHaveAttribute("aria-hidden", "true");

    act(() => {
      matchesByQuery.set(DESKTOP_NAV_QUERY, true);
      const event = { matches: true, media: DESKTOP_NAV_QUERY } as MediaQueryListEvent;
      getListeners(DESKTOP_NAV_QUERY).forEach((listener) => listener(event));
    });

    expect(document.body.style.overflow).toBe("");
    expect(menu).toHaveAttribute("aria-hidden", "true");
    expect(main).not.toHaveAttribute("inert");
    expect(main).not.toHaveAttribute("aria-hidden");
    expect(footer).not.toHaveAttribute("inert");
    expect(footer).not.toHaveAttribute("aria-hidden");
  });

  it("removes hidden mobile menu links from the tab order", () => {
    render(<Index />);

    const hiddenMenu = document.getElementById("mobile-menu");
    expect(hiddenMenu).toHaveAttribute("aria-hidden", "true");
    hiddenMenu?.querySelectorAll("a").forEach((link) => {
      expect(link).toHaveAttribute("tabindex", "-1");
    });

    fireEvent.click(screen.getByRole("button", { name: "Otwórz menu" }));
    expect(hiddenMenu).toHaveAttribute("aria-hidden", "false");
    hiddenMenu?.querySelectorAll("a").forEach((link) => {
      expect(link).not.toHaveAttribute("tabindex", "-1");
    });
  });

  it("keeps keyboard focus inside the open mobile menu and closes it with Escape", () => {
    render(<Index />);

    const menuButton = screen.getByRole("button", { name: "Otwórz menu" });
    fireEvent.click(menuButton);

    const openMenu = document.getElementById("mobile-menu");
    const menuLinks = Array.from(openMenu?.querySelectorAll<HTMLAnchorElement>("a") ?? []);
    expect(menuLinks.length).toBeGreaterThan(0);

    const lastMenuLink = menuLinks[menuLinks.length - 1];
    lastMenuLink.focus();
    fireEvent.keyDown(document, { key: "Tab" });
    expect(screen.getByRole("button", { name: "Zamknij menu" })).toHaveFocus();

    fireEvent.keyDown(document, { key: "Escape" });
    expect(openMenu).toHaveAttribute("aria-hidden", "true");
  });

  it("uses instant hash scrolling for reduced-motion users", () => {
    setReducedMotion(true);
    const scrollToMock = vi.fn();
    Object.defineProperty(window, "scrollTo", {
      configurable: true,
      value: scrollToMock,
    });
    Object.defineProperty(window, "scrollY", {
      configurable: true,
      value: 50,
    });

    const target = document.createElement("section");
    target.id = "target";
    target.getBoundingClientRect = vi.fn(() => ({
      bottom: 0,
      height: 0,
      left: 0,
      right: 0,
      toJSON: () => ({}),
      top: 200,
      width: 0,
      x: 0,
      y: 200,
    }));
    document.body.appendChild(target);

    expect(scrollToHash("#target")).toBe(true);
    expect(scrollToMock).toHaveBeenCalledWith({ top: 178, behavior: "auto" });
  });

  it("sets and restores the 404 document title", () => {
    document.title = "MatHub";

    const { unmount } = render(
      <MemoryRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
        <NotFound />
      </MemoryRouter>
    );

    expect(document.title).toBe("404 — MatHub");
    unmount();
    expect(document.title).toBe("MatHub");
  });
});

describe("golden highway scene", () => {
  it("preserves the desktop road composition", () => {
    const scene = getGoldenHighwayScene(1200, 360);

    expect(scene.roadWidth).toBe(720);
    expect(scene.horizonYRatio).toBe(0.38);
    expect(scene.cameraY).toBe(110);
    expect(scene.vignetteHeight).toBe(260);
  });

  it("scales the road smoothly below the full desktop width", () => {
    const scene = getGoldenHighwayScene(900, 420);

    expect(scene.roadWidth).toBe(540);
    expect(scene.horizonYRatio).toBe(0.38);
  });

  it("normalizes the mobile road composition inside a tall footer", () => {
    const scene = getGoldenHighwayScene(390, 680);
    const nearRoadY = scene.horizonY + scene.cameraY * (scene.fov / scene.fogNear);

    expect(scene.roadWidth).toBeCloseTo(234);
    expect(scene.horizonYRatio).toBe(0.23);
    expect(scene.horizonY).toBeCloseTo(156.4);
    expect(nearRoadY).toBeGreaterThan(680);
    expect(scene.vignetteHeight).toBeGreaterThan(320);
  });
});
