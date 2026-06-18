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
      { threshold: 0.18 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const rise = (i: number) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "none" : "translateY(14px)",
    transition: `opacity 600ms ${EASE}, transform 600ms ${EASE}`,
    transitionDelay: `${120 + i * 110}ms`,
  });

  return (
    <section
      ref={ref}
      id="kontakt"
      aria-label="Kontakt"
      className="relative scroll-mt-0 overflow-hidden bg-navy-deep py-14 pb-20 text-paper sm:py-16 md:py-24 md:pb-28 lg:py-28"
    >
      {/* Directional wash — same left-dark → right-light language as the hero */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(90deg, hsl(var(--navy-deep) / 0.55) 0%, transparent 45%, transparent 68%, hsl(var(--navy) / 0.22) 100%)",
        }}
      />
      {/* Top hairline glow — links back to the TrustBar under the hero */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 z-0 h-px bg-[linear-gradient(90deg,transparent,hsl(var(--yellow)/0.42),transparent)]"
      />

      <div className="container-mh relative z-10">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:gap-16">
          {/* Intro */}
          <div>
            <div className="flex items-center gap-3" style={rise(0)}>
              <span className="mh-led" aria-hidden="true" />
              <span className="font-mono text-[11.5px] font-medium uppercase tracking-[0.2em] text-yellow">
                Kontakt
              </span>
            </div>
            <h2 className="h2 mt-5 text-paper" style={rise(1)}>
              Masz termin. Potrzebujesz wyceny.
            </h2>
            <p className="lede mt-6 max-w-[44ch] text-paper/70" style={rise(2)}>
              Telefon to najszybszy kanał — opisujesz transport albo event,
              a ja dopytuję o termin, miejsce, dostęp i warunki. Jeśli nie
              odbiorę od razu, oddzwonię w godzinach pracy.
            </p>
          </div>

          {/* Console panel */}
          <div className="mh-console" style={rise(3)}>
            {/* Primary row — phone CTA */}
            <div className="mh-console__row">
              <a
                href={PHONE_HREF}
                className="group mh-console__cta w-full"
              >
                <span className="mh-console__chip shrink-0" aria-hidden="true">
                  <Phone className="h-5 w-5" strokeWidth={2} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-paper/60">
                    Zadzwoń
                  </span>
                  <span className="mt-1.5 block text-[1.35rem] font-bold leading-tight tracking-tight text-paper sm:text-[clamp(1.5rem,2.4vw,1.9rem)]">
                    {PHONE_DISPLAY}
                  </span>
                  <span className="mt-1.5 block text-[13px] font-medium text-paper/65">
                    Pon–Sob · 8:00–20:00
                  </span>
                </span>
                <ArrowRight
                  className="hidden h-5 w-5 shrink-0 text-yellow transition-mh group-hover:translate-x-1.5 sm:block"
                  aria-hidden="true"
                />
              </a>
            </div>

            {/* Secondary row — availability */}
            <div className="mh-console__row">
              <span className="mh-console__chip mh-console__chip--ghost shrink-0" aria-hidden="true">
                <Clock className="h-[18px] w-[18px]" strokeWidth={2} />
              </span>
              <div className="min-w-0">
                <span className="block font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-paper/55">
                  Dostępność
                </span>
                <span className="mt-1 block text-[16px] font-semibold leading-snug text-paper">
                  Oddzwaniam po nieodebranych
                </span>
                <span className="mt-1 block text-[13px] font-medium text-paper/60">
                  Najlepiej telefonicznie, bez formularzy
                </span>
              </div>
            </div>

            {/* Tertiary row — base / location */}
            <div className="mh-console__row">
              <span className="mh-console__chip mh-console__chip--ghost shrink-0" aria-hidden="true">
                <MapPin className="h-[18px] w-[18px]" strokeWidth={2} />
              </span>
              <div className="min-w-0">
                <span className="block font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-paper/55">
                  Baza
                </span>
                <span className="mt-1 block text-[16px] font-semibold leading-snug text-paper">
                  Trzeszczyn, 72-004 Police
                </span>
                <span className="mt-1 flex flex-col gap-0.5 font-mono text-[12px] font-medium leading-relaxed text-paper/60 min-[420px]:flex-row min-[420px]:gap-2">
                  <span>Zachodniopomorskie</span>
                  <span aria-hidden="true" className="hidden min-[420px]:inline text-yellow/50">·</span>
                  <span>53.55° N · 14.52° E</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
