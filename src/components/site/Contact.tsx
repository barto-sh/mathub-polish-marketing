import { useEffect, useRef, useState } from "react";
import { Phone, Clock, MapPin, ArrowRight } from "lucide-react";

const PHONE_DISPLAY = "+48 730 857 710";
const PHONE_HREF = "tel:+48730857710";
const EASE = "cubic-bezier(0.2,0.8,0.2,1)";

const Contact = () => {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const stop = (i: number) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "none" : "translateY(10px)",
    transition: `opacity 600ms ${EASE}, transform 600ms ${EASE}`,
    transitionDelay: `${120 + i * 130}ms`,
  });

  return (
    <section
      ref={ref}
      id="kontakt"
      aria-label="Kontakt"
      className="text-paper py-20 md:py-28"
      style={{ background: "radial-gradient(125% 90% at 100% 0%, hsl(217 48% 27%), hsl(var(--navy)) 58%)" }}
    >
      <div className="container-mh">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
          {/* Intro */}
          <div>
            <div className="font-mono text-[11.5px] font-medium uppercase tracking-[0.2em] text-yellow">
              Kontakt
            </div>
            <h2 className="h2 mt-5 text-paper">Masz termin. Potrzebujesz wyceny.</h2>
            <p className="lede mt-6 max-w-[44ch] text-paper/70">
              Telefon to najszybszy kanał, dzwonisz, opisujesz sytuację, dostajesz
              orientacyjną cenę w trakcie rozmowy. Jeśli nie odbiorę od razu,
              oddzwonię w godzinach pracy.
            </p>
          </div>

          {/* Route with stops */}
          <ol className="relative flex flex-col gap-6">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-3 left-5 top-3 w-0.5 rounded"
              style={{
                background: "linear-gradient(180deg, hsl(var(--yellow)), hsl(var(--yellow) / 0.25))",
                transform: inView ? "scaleY(1)" : "scaleY(0)",
                transformOrigin: "top",
                transition: `transform 700ms ${EASE} 100ms`,
              }}
            />

            {/* 1 — Zadzwoń (primary action) */}
            <li className="relative grid grid-cols-[42px_1fr] items-center gap-[18px]" style={stop(0)}>
              <span
                className="relative z-10 grid h-[42px] w-[42px] place-items-center rounded-full bg-yellow text-navy"
                style={{ boxShadow: "0 0 0 7px hsl(45 100% 51% / 0.12)" }}
                aria-hidden="true"
              >
                <Phone className="h-[18px] w-[18px]" strokeWidth={2} />
              </span>
              <a
                href={PHONE_HREF}
                className="group flex items-center gap-4 rounded-lg bg-yellow px-5 py-4 text-navy shadow-[0_16px_38px_hsl(45_100%_51%/0.16)] transition-mh hover:-translate-y-0.5 hover:shadow-[0_24px_52px_hsl(45_100%_51%/0.26)]"
              >
                <span className="min-w-0 flex-1">
                  <span className="block font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-navy/60">
                    Zadzwoń
                  </span>
                  <span className="mt-1 block whitespace-nowrap text-[1.25rem] font-bold leading-tight tracking-tight sm:text-[clamp(1.55rem,3vw,2.05rem)]">
                    {PHONE_DISPLAY}
                  </span>
                  <span className="mt-1 block text-[13px] text-navy/70">Pon–Sob · 8:00–20:00</span>
                </span>
                <ArrowRight className="hidden h-5 w-5 shrink-0 transition-mh group-hover:translate-x-1.5 sm:block" aria-hidden="true" />
              </a>
            </li>

            {/* 2 — Dostępność */}
            <li className="relative grid grid-cols-[42px_1fr] items-start gap-[18px]" style={stop(1)}>
              <span className="relative z-10 grid h-[42px] w-[42px] place-items-center rounded-full border border-paper/20 bg-navy text-yellow" aria-hidden="true">
                <Clock className="h-[18px] w-[18px]" strokeWidth={2} />
              </span>
              <div className="flex flex-col gap-1.5 pt-0.5">
                <span className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-paper/45">Dostępność</span>
                <span className="text-[17px] font-semibold text-paper">Oddzwaniam po nieodebranych</span>
                <span className="text-[13.5px] text-paper/55">Najlepiej telefonicznie, bez formularzy</span>
              </div>
            </li>

            {/* 3 — Baza */}
            <li className="relative grid grid-cols-[42px_1fr] items-start gap-[18px]" style={stop(2)}>
              <span className="relative z-10 grid h-[42px] w-[42px] place-items-center rounded-full border border-paper/20 bg-navy text-yellow" aria-hidden="true">
                <MapPin className="h-[18px] w-[18px]" strokeWidth={2} />
              </span>
              <div className="flex flex-col gap-1.5 pt-0.5">
                <span className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-paper/45">Baza</span>
                <span className="text-[17px] font-semibold text-paper">Trzeszczyn, 72-004 Police</span>
                <span className="font-mono text-[13px] text-paper/55">Zachodniopomorskie · 53.55° N · 14.52° E</span>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
};

export default Contact;
