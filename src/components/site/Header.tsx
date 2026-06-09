import { useEffect, useRef, useState } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import { Phone, Menu, X, Truck } from "lucide-react";
import { scrollToHash } from "@/lib/scrollToHash";

const PHONE_DISPLAY = "+48 730 857 710";
const PHONE_HREF = "tel:+48730857710";

const NAV = [
  { href: "#uslugi", label: "Usługi", id: "uslugi" },
  { href: "#wozek", label: "Wózek", id: "wozek" },
  { href: "#proces", label: "Proces", id: "proces" },
  { href: "#zasieg", label: "Zasięg", id: "zasieg" },
  { href: "#kontakt", label: "Kontakt", id: "kontakt" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

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

  // Lock scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
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

    let animFrameId: number;
    const dpr = window.devicePixelRatio || 1;
    let width = canvas.offsetWidth;
    let height = 8;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Dynamic targets for spring physics
    let currentY = 4;
    let targetY = 4;
    const tension = 0.08;
    const friction = 0.85;
    let velocity = 0;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.offsetWidth;
      height = 8;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx!.scale(dpr, dpr);
    };
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: globalThis.MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.active = true;
      targetY = 7;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      targetY = 4;
    };

    const parent = canvas.parentElement;
    if (parent) {
      parent.addEventListener("mousemove", handleMouseMove);
      parent.addEventListener("mouseleave", handleMouseLeave);
    }

    const draw = () => {
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

      ctx.strokeStyle = "hsl(45 100% 51%)"; // MatHub Brand Yellow
      ctx.lineWidth = scrolled ? 2.5 : 2;
      ctx.shadowBlur = scrolled ? 8 : 4;
      ctx.shadowColor = "rgba(255, 193, 7, 0.4)";
      ctx.stroke();

      animFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (parent) {
        parent.removeEventListener("mousemove", handleMouseMove);
        parent.removeEventListener("mouseleave", handleMouseLeave);
      }
      cancelAnimationFrame(animFrameId);
    };
  }, [scrolled]);

  const onDark = !scrolled && !open;

  const scrollToSection = (href: string) => (event: ReactMouseEvent<HTMLAnchorElement>) => {
    if (!href.startsWith("#")) {
      setOpen(false);
      return;
    }

    event.preventDefault();
    setOpen(false);
    scrollToHash(href, { delay: 0 });
  };

  return (
    <header
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
            className="group flex items-center gap-2.5 transition-transform duration-300 hover:-translate-y-0.5"
            aria-label="Strona główna MatHub"
            onClick={() => setOpen(false)}
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-sm bg-yellow" aria-hidden="true">
              <Truck className="h-5 w-5 text-navy" strokeWidth={2.25} />
            </span>
            <span className="text-[22px] font-semibold" style={{ letterSpacing: "-0.01em" }}>
              MatHub
            </span>
          </a>

          <nav aria-label="Główna nawigacja" className="hidden items-center gap-8 md:flex lg:gap-10">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={scrollToSection(item.href)}
                aria-current={activeId === item.id ? "true" : undefined}
                className={`text-[14.5px] font-medium transition-all duration-200 hover:-translate-y-px ${
                  activeId === item.id
                    ? onDark
                      ? "text-yellow"
                      : "text-navy [text-shadow:0_0_0.6px_currentColor]"
                    : onDark
                      ? "text-paper/72 hover:text-paper"
                      : "text-ink/60 hover:text-ink"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href={PHONE_HREF}
            className={`hidden h-10 items-center gap-2 rounded-sm px-4 text-[13.5px] font-semibold transition-all duration-250 md:inline-flex ${
              onDark
                ? "border border-paper/18 bg-paper/6 text-paper hover:border-yellow hover:text-yellow"
                : "bg-yellow text-navy hover:bg-[hsl(45_100%_56%)]"
            }`}
          >
            <Phone className="h-[15px] w-[15px]" aria-hidden="true" />
            <span>730 857 710</span>
          </a>

          <button
            type="button"
            className={`-mr-1 inline-flex h-11 w-11 items-center justify-center rounded-sm transition-colors md:hidden ${
              onDark ? "text-paper hover:bg-paper/10" : "text-ink hover:bg-line/50"
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

      {/* Elastic Canvas Spline Road Line */}
      <div className="absolute bottom-0 left-0 w-full h-[8px] overflow-hidden pointer-events-none">
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>

      {/* Mobile Menu */}
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={`absolute left-0 top-full h-[calc(100dvh-72px)] w-full bg-ink/42 backdrop-blur-[2px] transition-opacity duration-300 md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <div
        id="mobile-menu"
        aria-hidden={!open}
        className={`absolute left-0 top-full z-10 w-full overflow-hidden overscroll-contain bg-paper/95 shadow-[0_24px_64px_hsl(222_33%_9%/0.18)] backdrop-blur-md transition-all duration-300 ease-out md:hidden ${
          open
            ? "max-h-[calc(100dvh-72px)] translate-y-0 border-t border-line opacity-100"
            : "pointer-events-none max-h-0 -translate-y-2 border-t border-transparent opacity-0"
        }`}
      >
        <div className="container-mh flex max-h-[calc(100dvh-72px)] flex-col py-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))]">
          <div className="min-h-0 divide-y divide-line overflow-y-auto rounded-md border border-line bg-paper">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                tabIndex={open ? 0 : -1}
                onClick={scrollToSection(item.href)}
                className="flex min-h-11 items-center px-4 py-3 text-[15px] font-medium text-ink transition-colors hover:bg-cream/70"
              >
                {item.label}
              </a>
            ))}
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
