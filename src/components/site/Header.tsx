import { useEffect, useRef, useState } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import { Phone, Menu, X, Truck } from "lucide-react";
import { scrollToHash } from "@/lib/scrollToHash";

const PHONE_DISPLAY = "+48 730 857 710";
const PHONE_HREF = "tel:+48730857710";
const NAV_DESCRIPTOR = "Transport + atrakcje z dowozem";
const DESKTOP_NAV_QUERY = "(min-width: 768px)";

const NAV = [
  { href: "#uslugi", label: "Usługi", id: "uslugi" },
  { href: "#wozek", label: "Wózek", id: "wozek" },
  { href: "#proces", label: "Proces", id: "proces" },
  { href: "#zasieg", label: "Zasięg", id: "zasieg" },
  { href: "#kontakt", label: "Kontakt", id: "kontakt" },
];

const formatNavIndex = (index: number) => String(index + 1).padStart(2, "0");

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 4, active: false });

  // IntersectionObserver for active section highlighting
  useEffect(() => {
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(
      (el): el is HTMLElement => !!el
    );
    if (!sections.length || !("IntersectionObserver" in window)) return;

    const visible = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) visible.add(e.target.id);
          else visible.delete(e.target.id);
        });
        setActiveId(NAV.find((n) => visible.has(n.id))?.id ?? null);
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Scroll listener for styling transitions
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const desktopQuery = window.matchMedia(DESKTOP_NAV_QUERY);
    const closeOnDesktop = (event?: MediaQueryListEvent) => {
      if (event?.matches ?? desktopQuery.matches) setOpen(false);
    };

    closeOnDesktop();
    desktopQuery.addEventListener("change", closeOnDesktop);

    return () => desktopQuery.removeEventListener("change", closeOnDesktop);
  }, []);

  // Lock scroll when mobile menu is open without clobbering existing inline styles.
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  // Keep keyboard focus inside the open mobile menu and hide page content from AT.
  useEffect(() => {
    if (!open) return;

    const pageRegions = Array.from(document.querySelectorAll<HTMLElement>("main, footer"));
    const previousRegionState = pageRegions.map((el) => ({
      el,
      ariaHidden: el.getAttribute("aria-hidden"),
      inert: el.getAttribute("inert"),
    }));

    pageRegions.forEach((el) => {
      el.setAttribute("aria-hidden", "true");
      el.setAttribute("inert", "");
    });

    const getFocusableItems = () => {
      const menuItems = Array.from(
        mobileMenuRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        ) ?? []
      );

      return [menuButtonRef.current, ...menuItems].filter(
        (el): el is HTMLElement => !!el && !el.hasAttribute("disabled")
      );
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        window.setTimeout(() => menuButtonRef.current?.focus(), 0);
        return;
      }

      if (event.key !== "Tab") return;

      const focusableItems = getFocusableItems();
      if (focusableItems.length === 0) return;

      const currentIndex = focusableItems.indexOf(document.activeElement as HTMLElement);
      const nextIndex = event.shiftKey
        ? currentIndex <= 0
          ? focusableItems.length - 1
          : currentIndex - 1
        : currentIndex === focusableItems.length - 1
          ? 0
          : currentIndex + 1;

      event.preventDefault();
      focusableItems[nextIndex].focus();
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previousRegionState.forEach(({ el, ariaHidden, inert }) => {
        if (ariaHidden === null) {
          el.removeAttribute("aria-hidden");
        } else {
          el.setAttribute("aria-hidden", ariaHidden);
        }

        if (inert === null) {
          el.removeAttribute("inert");
        } else {
          el.setAttribute("inert", inert);
        }
      });
    };
  }, [open]);

  // Spline Node Animation Logic (Canvas-based Road Line)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || import.meta.env.MODE === "test") return;

    let ctx: CanvasRenderingContext2D | null = null;
    try {
      ctx = canvas.getContext("2d");
    } catch {
      return;
    }
    if (!ctx) return;

    let animFrameId = 0;
    const dpr = window.devicePixelRatio || 1;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = canvas.offsetWidth;
    let height = 8;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.resetTransform();
    ctx.scale(dpr, dpr);

    // Dynamic targets for spring physics
    let currentY = 4;
    let targetY = 4;
    const tension = 0.055;
    const friction = 0.82;
    let velocity = 0;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.offsetWidth;
      height = 8;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.resetTransform();
      ctx.scale(dpr, dpr);
      requestDraw();
    };
    window.addEventListener("resize", handleResize);

    const requestDraw = () => {
      if (animFrameId === 0) {
        animFrameId = requestAnimationFrame(draw);
      }
    };

    const handleMouseMove = (e: globalThis.MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.active = true;
      targetY = 5.8;
      requestDraw();
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      targetY = 4;
      requestDraw();
    };

    const hoverTarget = headerRef.current;
    if (hoverTarget && !reducedMotion) {
      hoverTarget.addEventListener("mousemove", handleMouseMove);
      hoverTarget.addEventListener("mouseleave", handleMouseLeave);
    }

    const draw = () => {
      animFrameId = 0;
      ctx.clearRect(0, 0, width, height);

      // Spring physics calculation for line bounce
      const force = targetY - currentY;
      velocity += force * tension;
      velocity *= friction;
      currentY += velocity;

      ctx.beginPath();
      ctx.moveTo(0, 4);

      if (mouseRef.current.active) {
        // Bend curve elastically toward the mouse
        ctx.quadraticCurveTo(mouseRef.current.x, currentY, width, 4);
      } else {
        // Stable flat line
        ctx.quadraticCurveTo(width / 2, currentY, width, 4);
      }

      const lineGradient = ctx.createLinearGradient(0, 0, width, 0);
      lineGradient.addColorStop(0, "rgba(255, 193, 7, 0.72)");
      lineGradient.addColorStop(0.5, "rgba(255, 193, 7, 1)");
      lineGradient.addColorStop(1, "rgba(255, 193, 7, 0.72)");

      ctx.strokeStyle = lineGradient;
      ctx.lineWidth = scrolled ? 2 : 1.75;
      ctx.shadowBlur = scrolled ? 5 : 3;
      ctx.shadowColor = "rgba(255, 193, 7, 0.28)";
      ctx.stroke();

      const shouldContinue = Math.abs(targetY - currentY) > 0.03 || Math.abs(velocity) > 0.03;
      if (shouldContinue) {
        requestDraw();
      }
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (hoverTarget && !reducedMotion) {
        hoverTarget.removeEventListener("mousemove", handleMouseMove);
        hoverTarget.removeEventListener("mouseleave", handleMouseLeave);
      }
      if (animFrameId !== 0) {
        cancelAnimationFrame(animFrameId);
      }
    };
  }, [scrolled]);

  const onDark = !scrolled && !open;
  const showMobileCall = scrolled && !open;

  const focusHashTarget = (href: string) => {
    if (!href.startsWith("#")) return;

    const target = document.getElementById(href.slice(1));
    if (!target) return;

    const previousTabIndex = target.getAttribute("tabindex");
    target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });

    target.addEventListener(
      "blur",
      () => {
        if (previousTabIndex === null) {
          target.removeAttribute("tabindex");
        } else {
          target.setAttribute("tabindex", previousTabIndex);
        }
      },
      { once: true }
    );
  };

  const scrollToSection = (href: string) => (event: ReactMouseEvent<HTMLAnchorElement>) => {
    if (!href.startsWith("#")) {
      setOpen(false);
      return;
    }

    event.preventDefault();
    const shouldMoveFocusToTarget = open;
    setOpen(false);
    scrollToHash(href, { delay: 0 });

    if (shouldMoveFocusToTarget) {
      menuButtonRef.current?.focus();
      window.setTimeout(() => focusHashTarget(href), 80);
    }
  };

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 z-50 w-full backdrop-blur-md transition-all duration-300 ${
        onDark
          ? "bg-ink/15 text-paper border-b border-paper/10"
          : "bg-paper/95 text-ink shadow-sm border-b border-line"
      }`}
    >
      <div className="container-mh py-3.5 md:py-4">
        <div className="flex min-h-10 items-center justify-between gap-4">
          <a
            href="#top"
            className="group flex min-w-0 items-center gap-2.5 transition-transform duration-300 hover:-translate-y-px"
            aria-label="Strona główna MatHub"
            onClick={(e) => {
              e.preventDefault();
              setOpen(false);
              scrollToHash("#top");
            }}
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-sm bg-yellow" aria-hidden="true">
              <Truck className="h-5 w-5 text-navy" strokeWidth={2.25} />
            </span>
            <span className="flex min-w-0 flex-col">
              <span className="text-[22px] font-semibold leading-none" style={{ letterSpacing: "-0.01em" }}>
                MatHub
              </span>
              <span
                className={`mt-1 hidden whitespace-nowrap font-mono text-[9px] font-semibold uppercase leading-none tracking-[0.08em] lg:block ${
                  onDark ? "text-paper/[0.58]" : "text-ink/50"
                }`}
              >
                {NAV_DESCRIPTOR}
              </span>
            </span>
          </a>

          <nav aria-label="Główna nawigacja" className="hidden items-center gap-6 md:flex lg:gap-8">
            {NAV.map((item) => {
              const active = activeId === item.id;

              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={scrollToSection(item.href)}
                  aria-current={active ? "location" : undefined}
                  className={`group/navitem relative inline-flex min-h-10 items-center px-0.5 text-[14px] font-medium transition-colors duration-200 ${
                    active
                      ? onDark
                        ? "text-yellow"
                        : "text-navy [text-shadow:0_0_0.55px_currentColor]"
                      : onDark
                        ? "text-paper/[0.72] hover:text-paper"
                        : "text-ink/[0.58] hover:text-ink"
                  }`}
                >
                  <span>{item.label}</span>
                  <span
                    aria-hidden="true"
                    className={`absolute bottom-[-15px] left-1/2 h-px w-9 -translate-x-1/2 bg-gradient-to-r from-transparent via-yellow to-transparent transition-opacity duration-300 ${
                      active ? "opacity-85" : "opacity-0"
                    }`}
                  />
                  <span
                    aria-hidden="true"
                    className={`absolute bottom-[-18px] left-1/2 h-2 w-2 -translate-x-1/2 rounded-full border transition-all duration-300 ${
                      active
                        ? "scale-100 border-yellow bg-yellow opacity-100 shadow-[0_0_0_5px_hsl(var(--yellow)/0.14)]"
                        : "scale-75 border-transparent bg-transparent opacity-0 group-hover/navitem:border-yellow/45 group-hover/navitem:bg-yellow/45 group-hover/navitem:opacity-60"
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          <a
            href={PHONE_HREF}
            className={`hidden h-10 items-center gap-2 rounded-sm px-4 text-[13.5px] font-semibold transition-all duration-[250ms] md:inline-flex ${
              onDark
                ? "border border-paper/[0.18] bg-paper/[0.06] text-paper hover:border-yellow hover:text-yellow"
                : "bg-yellow text-navy hover:bg-[hsl(45_100%_56%)]"
            }`}
          >
            <Phone className="h-[15px] w-[15px]" aria-hidden="true" />
            <span>730 857 710</span>
          </a>

          <div className="-mr-1 flex items-center gap-1.5 md:hidden">
            <a
              href={PHONE_HREF}
              tabIndex={showMobileCall ? 0 : -1}
              aria-hidden={!showMobileCall}
              aria-label="Zadzwoń do MatHub"
              onClick={() => setOpen(false)}
              className={`inline-flex h-10 shrink-0 items-center justify-center overflow-hidden rounded-sm bg-yellow text-navy shadow-sm transition-[width,opacity,transform] duration-300 ${
                showMobileCall
                  ? "w-10 translate-x-0 opacity-100"
                  : "pointer-events-none w-0 -translate-x-1 opacity-0"
              }`}
            >
              <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
            </a>

            <button
              ref={menuButtonRef}
              type="button"
              className={`inline-flex h-11 w-11 items-center justify-center rounded-sm transition-colors ${
                open
                  ? "bg-navy-deep text-paper hover:bg-navy"
                  : onDark
                    ? "text-paper hover:bg-paper/10"
                    : "text-ink hover:bg-line/50"
              }`}
              aria-label={open ? "Zamknij menu" : "Otwórz menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Elastic Canvas Spline Road Line */}
      <div className="absolute bottom-0 left-0 w-full h-[8px] overflow-hidden pointer-events-none">
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        id="mobile-menu"
        aria-hidden={!open}
        className={`absolute left-0 top-full z-10 w-full overflow-hidden overscroll-contain bg-paper shadow-[0_24px_64px_hsl(222_33%_9%/0.18)] transition-all duration-300 ease-out md:hidden ${
          open
            ? "h-[calc(100dvh-72px)] translate-y-0 border-t border-line opacity-100"
            : "pointer-events-none max-h-0 -translate-y-2 border-t border-transparent opacity-0"
        }`}
      >
        <div className="container-mh flex h-full flex-col py-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))]">
          <div className="min-h-0 divide-y divide-line overflow-y-auto rounded-md border border-line bg-paper">
            {NAV.map((item, idx) => {
              const active = activeId === item.id;

              return (
                <a
                  key={item.href}
                  href={item.href}
                  tabIndex={open ? 0 : -1}
                  aria-current={active ? "location" : undefined}
                  onClick={scrollToSection(item.href)}
                  className={`group flex min-h-[52px] items-center gap-3 px-4 py-3 text-[15px] font-medium transition-colors ${
                    active ? "bg-cream/80 text-navy" : "text-ink hover:bg-cream/70"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`font-mono text-[11px] font-semibold tracking-[0.12em] ${
                      active ? "text-yellow-ink" : "text-ink/[0.32] group-hover:text-yellow-ink/70"
                    }`}
                  >
                    {formatNavIndex(idx)}
                  </span>
                  <span>{item.label}</span>
                  <span
                    aria-hidden="true"
                    className={`ml-auto h-1.5 w-1.5 rounded-full transition-all duration-200 ${
                      active ? "bg-yellow shadow-[0_0_0_5px_hsl(var(--yellow)/0.16)]" : "bg-ink/[0.14]"
                    }`}
                  />
                </a>
              );
            })}
          </div>
          <a
            href={PHONE_HREF}
            tabIndex={open ? 0 : -1}
            onClick={() => setOpen(false)}
            className="mt-2 flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-yellow px-4 py-3 text-[15px] font-semibold text-navy shadow-sm transition-colors hover:bg-[hsl(45_100%_56%)]"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            Zadzwoń {PHONE_DISPLAY}
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
