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
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      aria-label="Kluczowe liczby"
      className="relative overflow-hidden bg-navy-deep"
    >
      <div className="container-mh py-16 md:py-20">
        <div className="grid grid-cols-2 gap-x-6 gap-y-14 md:grid-cols-4">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className="relative text-center"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "none" : "translateY(20px)",
                transition: `opacity 700ms ${EASE}, transform 700ms ${EASE}`,
                transitionDelay: `${i * 100}ms`,
              }}
            >
              {/* Breathing halo */}
              <span
                aria-hidden="true"
                className="tb-halo pointer-events-none absolute left-1/2 top-[34%]"
                style={{
                  width: 170,
                  height: 170,
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(255,193,7,0.22), transparent 66%)",
                  filter: "blur(8px)",
                  transform: "translate(-50%, -50%)",
                  animationDelay: `${i * 0.9}s`,
                }}
              />

              {/* Value — flowing gold */}
              <div
                className="tb-num relative font-black leading-none tracking-tight"
                style={{ fontSize: "clamp(2.2rem, 5vw, 3rem)" }}
              >
                {s.value}
              </div>

              {/* Label */}
              <div className="relative mx-auto mt-3.5 max-w-[20ch] text-[13px] leading-snug text-paper/50 md:text-[14px]">
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
