import { useEffect, useRef, useState } from "react";

const STATS = [
  { value: "500 kg+", label: "udźwig wózka samozaładowczego" },
  { value: "0", label: "ramp i wind hydraulicznych potrzebnych" },
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
      className="relative overflow-hidden bg-navy-deep py-20 md:py-24"
    >
      {/* Component-level custom keyframes to avoid altering global CSS configs */}
      <style>{`
        @keyframes hudRotate {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes hudRotateBack {
          from { transform: translate(-50%, -50%) rotate(360deg); }
          to { transform: translate(-50%, -50%) rotate(0deg); }
        }
        @keyframes hudSweep {
          0% { top: 0%; opacity: 0; }
          15% { opacity: 0.7; }
          85% { opacity: 0.7; }
          100% { top: 100%; opacity: 0; }
        }
        .hud-glow-text {
          color: #ffc107;
          font-family: 'JetBrains Mono', monospace;
          text-shadow: 0 0 16px rgba(255, 193, 7, 0.55), 0 0 4px rgba(255, 193, 7, 0.3);
        }
      `}</style>

      <div className="container-mh relative z-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className="relative flex flex-col items-center justify-center p-6 text-center border border-white/5 bg-white/[0.01] rounded-lg overflow-hidden transition-all duration-500 hover:border-yellow/20 hover:bg-white/[0.02]"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "none" : "translateY(20px)",
                transition: `opacity 700ms ${EASE}, transform 700ms ${EASE}, border-color 0.3s, background 0.3s`,
                transitionDelay: `${i * 100}ms`,
              }}
            >
              {/* Corner HUD Bracket Accents */}
              <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-white/10" />
              <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-white/10" />
              <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-white/10" />
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-white/10" />

              {/* Laser Scanning Line */}
              <div
                className="absolute left-0 w-full h-[2px] pointer-events-none z-10"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(255, 193, 7, 0.45), transparent)",
                  animation: `hudSweep ${3 + i * 0.5}s ease-in-out infinite`,
                }}
              />

              {/* Value hero — rings center exclusively on the stat value */}
              <div className="relative flex items-center justify-center py-5">
                {/* Holographic Radar Ring (Outer) */}
                <div
                  className="absolute pointer-events-none left-1/2 top-1/2 rounded-full border border-dashed border-yellow/25"
                  style={{
                    width: 140,
                    height: 140,
                    animation: `hudRotate ${12 + i * 2}s linear infinite`,
                    transform: "translate(-50%, -50%)",
                  }}
                />

                {/* Holographic Radar Ring (Inner) */}
                <div
                  className="absolute pointer-events-none left-1/2 top-1/2 rounded-full border border-dotted border-yellow/15"
                  style={{
                    width: 100,
                    height: 100,
                    animation: `hudRotateBack ${8 + i}s linear infinite`,
                    transform: "translate(-50%, -50%)",
                  }}
                />

                {/* Stat Value — centered by flexbox, rings orbit around it */}
                <div
                  className="hud-glow-text relative whitespace-nowrap font-black leading-none tracking-tight select-none"
                  style={{ fontSize: "clamp(2.2rem, 5vw, 3.4rem)" }}
                >
                  {s.value}
                </div>
              </div>

              {/* Stat Label — outside the ring container */}
              <div className="relative mx-auto mt-1 max-w-[20ch] text-[13px] leading-snug text-paper/60 md:text-[14px] text-center">
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
