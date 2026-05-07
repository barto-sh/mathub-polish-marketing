import { useEffect, useState } from "react";
import { Phone, Menu, X, Truck } from "lucide-react";

const PHONE_DISPLAY = "+48 730 857 710";
const PHONE_HREF = "tel:+48730857710";

const NAV = [
  { href: "#uslugi", label: "Usługi" },
  { href: "#wozek", label: "Wózek" },
  { href: "#proces", label: "Proces" },
  { href: "#zasieg", label: "Zasięg" },
  { href: "#kontakt", label: "Kontakt" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
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

  return (
    <header
      className={`sticky top-0 w-full z-50 transition-all duration-500 ease-in-out ${
        scrolled
          ? "bg-paper/95 backdrop-blur-md shadow-sm py-3 border-b border-line"
          : "bg-paper py-5 border-b border-transparent"
      }`}
    >
      <div className="container-mh flex items-center justify-between">
        {/* Logo Opcja B: Premium Minimalist */}
        <a
          href="#top"
          className="group flex items-center gap-2.5 transition-transform hover:-translate-y-0.5 duration-300"
          aria-label="Strona główna MatHub"
        >
          <span
            className="inline-flex h-8 w-8 items-center justify-center rounded-sm bg-yellow transition-transform duration-300 group-hover:translate-x-0.5"
            aria-hidden="true"
          >
            <Truck className="h-5 w-5 text-navy" strokeWidth={2.25} />
          </span>
          <span
            className="text-[22px] font-semibold text-ink"
            style={{ letterSpacing: "-0.01em" }}
          >
            MatHub
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav
          aria-label="Główna nawigacja"
          className="hidden md:flex items-center gap-8 lg:gap-12"
        >
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative text-[14.5px] font-medium text-ink/80 transition-colors duration-300 hover:text-ink group py-1"
            >
              {item.label}
              {/* Elegant centered animated underline */}
              <span className="absolute bottom-0 left-0 h-[2px] w-full bg-ink scale-x-0 origin-center transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block">
          <a
            href={PHONE_HREF}
            className="inline-flex items-center gap-2 rounded-sm bg-yellow px-5 h-11 text-[14.5px] font-semibold text-navy transition-all duration-300 hover:bg-[hsl(45_100%_56%)] hover:shadow-sm hover:-translate-y-0.5"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            <span>Zadzwoń</span>
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-sm text-ink transition-colors hover:bg-line/50"
          aria-label={open ? "Zamknij menu" : "Otwórz menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile panel */}
      <div
        aria-hidden={!open}
        className={`md:hidden absolute top-full left-0 w-full bg-paper/95 backdrop-blur-md shadow-[0_24px_64px_hsl(222_33%_9%/0.14)] transition-[max-height,opacity,transform] duration-300 ease-out overflow-hidden overscroll-contain ${
          open
            ? "max-h-[calc(100dvh-80px)] opacity-100 translate-y-0 border-t border-line"
            : "max-h-0 opacity-0 -translate-y-2 pointer-events-none border-t border-transparent"
        }`}
      >
        <div className="container-mh max-h-[calc(100dvh-80px)] py-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] flex flex-col">
          <div className="min-h-0 overflow-y-auto rounded-md border border-line bg-paper divide-y divide-line">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="group flex items-center justify-between px-4 py-2.5 text-[15px] font-medium text-ink transition-colors hover:bg-cream/70"
              >
                {item.label}
              </a>
            ))}
          </div>
          <a
            href={PHONE_HREF}
            onClick={() => setOpen(false)}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-md bg-yellow h-10 text-[15px] font-semibold text-navy shadow-sm transition-colors hover:bg-[hsl(45_100%_56%)]"
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
