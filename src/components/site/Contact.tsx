import { useEffect, useRef, useState } from "react";
import { Phone, Clock, MapPin, ArrowRight } from "lucide-react";

const PHONE_DISPLAY = "+48 730 857 710";
const PHONE_HREF = "tel:+48730857710";
const EASE = "cubic-bezier(0.2,0.8,0.2,1)";

const Contact = () => {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  // Refs for 3D card tilt effects
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);

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

  // Direct high-performance DOM manipulation for 3D tilt interaction (no state updates on mousemove)
  const handleMouseMove = (cardRef: React.RefObject<HTMLDivElement | null>) => (e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - (rect.width / 2);
    const y = e.clientY - rect.top - (rect.height / 2);

    // Smooth 3D tilt calculation (max tilt angle 6 degrees)
    const tiltX = (y / (rect.height / 2)) * -6;
    const tiltY = (x / (rect.width / 2)) * 6;

    card.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(12px)`;
  };

  const handleMouseLeave = (cardRef: React.RefObject<HTMLDivElement | null>) => () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "rotateX(0deg) rotateY(0deg) translateZ(0px)";
  };

  return (
    <section
      ref={ref}
      id="kontakt"
      aria-label="Kontakt"
      className="text-paper py-20 md:py-28 overflow-hidden"
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

          {/* Route with stops (Kinetic Connection Line) */}
          <ol className="relative flex flex-col gap-6 pl-12 lg:pl-16 c3-perspective-panel">
            {/* Pulsing kinetic timeline track */}
            <div
              aria-hidden="true"
              className="c3-line-track"
              style={{
                transform: inView ? "scaleY(1)" : "scaleY(0)",
                transformOrigin: "top",
                transition: `transform 700ms ${EASE} 100ms`,
              }}
            >
              <div className="c3-line-pulse" />
            </div>

            {/* 1 — Zadzwoń (primary action) */}
            <li className="relative" style={stop(0)}>
              {/* Concentric ripples around the icon */}
              <div className="absolute -left-12 lg:-left-16 top-5 z-10" aria-hidden="true">
                <div className="c3-ripple-container">
                  <span className="c3-ripple-ring" />
                  <span className="c3-ripple-ring" />
                  <span className="c3-ripple-ring" />
                  <span
                    className="relative z-10 grid h-[42px] w-[42px] place-items-center rounded-full bg-yellow text-navy"
                    style={{ boxShadow: "0 0 0 7px hsl(45 100% 51% / 0.12)" }}
                  >
                    <Phone className="h-[18px] w-[18px]" strokeWidth={2} />
                  </span>
                </div>
              </div>

              <div
                ref={card1Ref}
                onMouseMove={handleMouseMove(card1Ref)}
                onMouseLeave={handleMouseLeave(card1Ref)}
                className="c3-tilt-card transition-all duration-300"
                style={{ padding: 0 }}
              >
                <a
                  href={PHONE_HREF}
                  className="group c3-shimmer-btn block w-full"
                >
                  <span className="c3-shimmer-btn-content">
                    <span className="min-w-0 flex-1 text-left">
                      <span className="block font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-paper/45 group-hover:text-navy-deep/50 transition-colors duration-300">
                        Zadzwoń
                      </span>
                      <span className="mt-1.5 block whitespace-nowrap text-[1.25rem] font-bold leading-tight tracking-tight sm:text-[clamp(1.55rem,3vw,2.05rem)] text-paper group-hover:text-navy-deep transition-colors duration-300">
                        {PHONE_DISPLAY}
                      </span>
                      <span className="mt-1 block text-[13px] text-paper/75 group-hover:text-navy-deep/75 transition-colors duration-300">
                        Pon–Sob · 8:00–20:00
                      </span>
                    </span>
                    <ArrowRight className="hidden h-5 w-5 shrink-0 transition-mh group-hover:translate-x-1.5 sm:block text-paper group-hover:text-navy-deep transition-colors duration-300" aria-hidden="true" />
                  </span>
                </a>
              </div>
            </li>

            {/* 2 — Dostępność */}
            <li className="relative" style={stop(1)}>
              <div className="absolute -left-12 lg:-left-16 top-6 z-10" aria-hidden="true">
                <div className="c3-ripple-container">
                  <span className="c3-ripple-ring" />
                  <span className="c3-ripple-ring" />
                  <span className="c3-ripple-ring" />
                  <span className="relative z-10 grid h-[42px] w-[42px] place-items-center rounded-full border border-paper/20 bg-navy text-yellow">
                    <Clock className="h-[18px] w-[18px]" strokeWidth={2} />
                  </span>
                </div>
              </div>

              <div
                ref={card2Ref}
                onMouseMove={handleMouseMove(card2Ref)}
                onMouseLeave={handleMouseLeave(card2Ref)}
                className="c3-tilt-card"
              >
                <div className="flex flex-col gap-1.5 pt-0.5">
                  <span className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-paper/45">Dostępność</span>
                  <span className="text-[17px] font-semibold text-paper">Oddzwaniam po nieodebranych</span>
                  <span className="text-[13.5px] text-paper/55">Najlepiej telefonicznie, bez formularzy</span>
                </div>
              </div>
            </li>

            {/* 3 — Baza */}
            <li className="relative" style={stop(2)}>
              <div className="absolute -left-12 lg:-left-16 top-6 z-10" aria-hidden="true">
                <div className="c3-ripple-container">
                  <span className="c3-ripple-ring" />
                  <span className="c3-ripple-ring" />
                  <span className="c3-ripple-ring" />
                  <span className="relative z-10 grid h-[42px] w-[42px] place-items-center rounded-full border border-paper/20 bg-navy text-yellow">
                    <MapPin className="h-[18px] w-[18px]" strokeWidth={2} />
                  </span>
                </div>
              </div>

              <div
                ref={card3Ref}
                onMouseMove={handleMouseMove(card3Ref)}
                onMouseLeave={handleMouseLeave(card3Ref)}
                className="c3-tilt-card"
              >
                <div className="flex flex-col gap-1.5 pt-0.5">
                  <span className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-paper/45">Baza</span>
                  <span className="text-[17px] font-semibold text-paper">Trzeszczyn, 72-004 Police</span>
                  <span className="font-mono text-[13px] text-paper/55">Zachodniopomorskie · 53.55° N · 14.52° E</span>
                </div>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
};

export default Contact;
