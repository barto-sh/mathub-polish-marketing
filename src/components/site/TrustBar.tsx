import { useEffect, useRef, useState } from "react";

const STATS = [
  { value: "500 kg+", label: "udźwig wózka samozaładowczego" },
  { value: "0", label: "ramp i wind hydraulicznych" },
  { value: "24 h", label: "na wycenę od zgłoszenia" },
  { value: "PL", label: "zasięg: od Szczecina do Rzeszowa" },
];

const EASE = "cubic-bezier(0.4,0,0.2,1)";

const TrustBar = () => {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }

    const fallback = window.setTimeout(() => setInView(true), 1200);
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          window.clearTimeout(fallback);
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => {
      window.clearTimeout(fallback);
      io.disconnect();
    };
  }, []);

  return (
    <section
      ref={ref}
      aria-label="Kluczowe liczby"
      className="relative overflow-hidden bg-navy-deep py-14 md:py-[72px]"
    >
      {/* Component-level custom keyframes to avoid altering global CSS configs. */}
      <style>{`
        @keyframes vectorRingClockwise {
          to { transform: rotate(360deg); }
        }
        @keyframes vectorRingCounter {
          to { transform: rotate(-360deg); }
        }
        @keyframes vectorHorizonPulse {
          0%, 100% { opacity: 0.18; }
          50% { opacity: 0.42; }
        }
        .vector-horizon-value {
          color: #ffc107;
          font-family: 'JetBrains Mono', monospace;
          text-shadow: 0 0 14px rgba(255, 193, 7, 0.42);
        }
        .vector-horizon-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 50% 32%, rgba(255, 193, 7, 0.1), transparent 42%),
            linear-gradient(135deg, rgba(255, 255, 255, 0.045), transparent 58%);
          opacity: 0.66;
          pointer-events: none;
        }
        .vector-horizon-card::after {
          content: "";
          position: absolute;
          left: 18%;
          right: 18%;
          top: 50%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255, 193, 7, 0.42), transparent);
          opacity: 0.38;
          pointer-events: none;
        }
        @media (prefers-reduced-motion: reduce) {
          .vector-ring {
            animation: none !important;
          }
        }
      `}</style>

      <div className="container-mh relative z-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className="vector-horizon-card group relative flex min-h-[230px] flex-col items-center justify-center overflow-hidden rounded-lg border border-white/5 bg-[linear-gradient(135deg,hsl(var(--navy-deep)/0.78),hsl(var(--ink)/0.9))] px-5 py-7 text-center shadow-[0_18px_44px_hsl(var(--ink)/0.28)] transition-[border-color,box-shadow,background-color] duration-500 hover:border-yellow/30 hover:shadow-[0_22px_54px_hsl(var(--ink)/0.42)] sm:min-h-[250px] sm:p-6"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "none" : "translateY(20px)",
                transition: `opacity 700ms ${EASE}, transform 700ms ${EASE}, border-color 0.3s, box-shadow 0.3s, background-color 0.3s`,
                transitionDelay: `${i * 100}ms`,
              }}
            >
              <div className="relative z-10 flex h-[132px] w-[132px] items-center justify-center sm:h-[150px] sm:w-[150px]">
                <svg
                  className="absolute inset-0 h-full w-full"
                  viewBox="0 0 100 100"
                  role="presentation"
                  aria-hidden="true"
                >
                  <circle
                    className="vector-ring origin-center"
                    cx="50"
                    cy="50"
                    r="46"
                    fill="none"
                    stroke="rgba(255, 193, 7, 0.2)"
                    strokeWidth="1.2"
                    strokeDasharray="4 8"
                    style={{ animation: `vectorRingClockwise ${15 + i * 2}s linear infinite` }}
                  />
                  <circle
                    className="vector-ring origin-center transition-[opacity,stroke-width] duration-300 group-hover:opacity-100"
                    cx="50"
                    cy="50"
                    r="39"
                    fill="none"
                    stroke="#ffc107"
                    strokeWidth="1.35"
                    strokeDasharray="38 40"
                    opacity="0.45"
                    style={{ animation: `vectorRingCounter ${10 + i}s linear infinite` }}
                  />
                  <circle
                    className="vector-ring origin-center"
                    cx="50"
                    cy="50"
                    r="28"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.1)"
                    strokeWidth="0.8"
                    strokeDasharray="1 6"
                    style={{ animation: "vectorHorizonPulse 3.4s ease-in-out infinite" }}
                  />
                </svg>

                <div className="absolute inset-6 rounded-full bg-yellow/5 blur-xl" aria-hidden="true" />

                <div className="vector-horizon-value relative z-10 whitespace-nowrap text-[2.15rem] font-black leading-none tracking-tight transition-[color,text-shadow] duration-300 group-hover:text-yellow sm:text-[2.55rem]">
                  {s.value}
                </div>
              </div>

              <div className="relative z-10 mx-auto mt-5 max-w-[22ch] text-center text-[13px] font-medium leading-snug text-paper/65 transition-colors duration-300 group-hover:text-paper md:text-[14px]">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
