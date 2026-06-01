import { useEffect, useState } from "react";
import { Phone, Menu, X, Truck } from "lucide-react";

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const onDark = !scrolled && !open;

  return (
    <header
      className={`fixed top-0 z-50 w-full border-b backdrop-blur-md transition-mh ${
        onDark
          ? "border-paper/15 bg-ink/18 text-paper"
          : "border-line bg-paper/95 text-ink shadow-sm"
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
                aria-current={activeId === item.id ? "true" : undefined}
                className={`text-[14.5px] font-medium transition-mh hover:-translate-y-px ${
                  activeId === item.id
                    ? onDark
                      ? "text-yellow"
                      : "text-navy"
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
            className={`hidden h-10 items-center gap-2 rounded-sm px-4 text-[13.5px] font-semibold transition-mh md:inline-flex ${
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
            className={`inline-flex h-10 w-10 items-center justify-center rounded-sm transition-colors md:hidden ${
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

      <div
        id="mobile-menu"
        aria-hidden={!open}
        className={`absolute left-0 top-full w-full overflow-hidden overscroll-contain bg-paper/95 shadow-[0_24px_64px_hsl(222_33%_9%/0.14)] backdrop-blur-md transition-[max-height,opacity,transform] duration-300 ease-out md:hidden ${
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
                onClick={() => setOpen(false)}
                className="flex min-h-11 items-center px-4 py-3 text-[15px] font-medium text-ink transition-colors hover:bg-cream/70"
              >
                {item.label}
              </a>
            ))}
          </div>
          <a
            href={PHONE_HREF}
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
