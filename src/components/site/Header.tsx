import { useEffect, useState } from "react";
import { Phone, Menu, X } from "lucide-react";

const PHONE_DISPLAY = "+48 XXX XXX XXX";
const PHONE_HREF = "tel:+48000000000";

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
    const onScroll = () => setScrolled(window.scrollY > 4);
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
      className={`sticky top-0 z-50 bg-paper transition-mh ${
        scrolled ? "border-b border-line" : "border-b border-transparent"
      }`}
    >
      <div className="container-mh flex h-16 items-center justify-between">
        <a
          href="#top"
          className="text-[20px] font-semibold text-ink"
          style={{ letterSpacing: "-0.01em" }}
        >
          MatHub
        </a>

        <nav aria-label="Główna nawigacja" className="hidden md:flex items-center gap-8">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[14px] font-medium text-ink/80 hover:text-ink transition-mh"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <a
            href={PHONE_HREF}
            className="inline-flex items-center gap-2 rounded-sm bg-yellow px-4 h-10 text-[14px] font-semibold text-navy transition-mh hover:bg-[hsl(45_100%_56%)]"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            <span>Zadzwoń</span>
          </a>
        </div>

        <button
          type="button"
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-sm text-ink"
          aria-label={open ? "Zamknij menu" : "Otwórz menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile panel */}
      <div
        className={`md:hidden overflow-hidden bg-paper border-t border-line transition-mh ${
          open ? "max-h-96" : "max-h-0 border-t-transparent"
        }`}
      >
        <div className="container-mh py-4 flex flex-col gap-1">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="py-3 text-[15px] font-medium text-ink border-b border-line last:border-0"
            >
              {item.label}
            </a>
          ))}
          <a
            href={PHONE_HREF}
            onClick={() => setOpen(false)}
            className="mt-3 inline-flex items-center justify-center gap-2 rounded-sm bg-yellow h-12 text-[15px] font-semibold text-navy"
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
