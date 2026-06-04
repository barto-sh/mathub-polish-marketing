import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import cartImg from "@/assets/usp-cart.jpg";
import cartMobileImg from "@/assets/usp-cart-mobile.jpg";

const FEATURES = [
  "Odbiór mebli z wózkiem, zarówno z parteru, jak i z piętra",
  "Załadunek bez konieczności precyzyjnego podjeżdżania - poradzimy sobie nawet przy utrudnionym dostępie",
  "Pianka, folia bąbelkowa, pasy transportowe w komplecie",
];

const SPECS = [
  { value: "500", unit: "kg+", label: "Udźwig" },
  { value: "800–1300", unit: "mm", label: "Wysokość podnoszenia" },
  { value: "0", unit: "", label: "Ramp i wind hydraulicznych" },
];

const UspCart = () => {
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

  // staggered rise for each content block
  const rise = (i: number) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "none" : "translateY(20px)",
    transition:
      "opacity 600ms cubic-bezier(0.2,0.8,0.2,1), transform 600ms cubic-bezier(0.2,0.8,0.2,1)",
    transitionDelay: `${i * 80}ms`,
  });

  return (
    <section
      ref={ref}
      id="wozek"
      aria-label="Wózek samozaładowczy"
      className="relative flex min-h-[640px] items-end overflow-hidden bg-navy text-paper md:min-h-[88vh]"
    >
      <picture className="absolute inset-x-0 top-0 block h-[390px] w-full md:inset-0 md:h-full">
        <source media="(min-width: 768px)" srcSet={cartImg} width={1920} height={1080} />
        <img
          src={cartMobileImg}
          alt="Elektryczny wózek paletowy z masztem podnoszącym MatHub (udźwig 500 kg) we wnętrzu paki samochodu transportowego."
          width={1732}
          height={1672}
          className="usp-kenburns h-full w-full object-contain object-top md:object-cover md:object-center"
        />
      </picture>
      <div className="hero-kino__scrim absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(105deg, transparent 40%, hsl(0 0% 100% / 0.06) 50%, transparent 60%)",
          transform: inView ? "translateX(100%)" : "translateX(-100%)",
          transition: "transform 1600ms cubic-bezier(0.2,0.8,0.2,1) 300ms",
        }}
        aria-hidden="true"
      />

      {/* Top label corner */}
      <div className="pointer-events-none absolute inset-x-0 top-0">
        <div className="container-mh pt-8 md:pt-10">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-yellow" aria-hidden="true" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-paper/80">
              Sprzęt — udźwig 500 kg
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-mh relative w-full pb-16 pt-[390px] min-[390px]:pt-[430px] md:py-20">
        <div className="max-w-2xl">
          <div className="kicker text-yellow" style={rise(0)}>
            Wyróżnik
          </div>
          <h2 className="h2 mt-3 text-paper" style={rise(1)}>
            Wózek samozaładowczy.
            <br />
            Winda załadunkowa, której nie musisz mieć.
          </h2>
          <p className="lede mt-5 text-paper/80" style={rise(2)}>
            Paleciak, sztaplarka i winda załadunkowa w jednym. Samodzielnie wjeżdża
            na przestrzeń ładunkową busa - nie potrzebujemy rampy, hydraulicznej windy przy
            budynku, ani pięciu ludzi do wniesienia pralki. Co oznacza: mniejsza
            ekipa, krótszy czas, niższa cena.
          </p>

          <ul className="mt-7 space-y-3" style={rise(3)}>
            {FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-3 text-[15px] text-paper/90">
                <span
                  className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-sm"
                  style={{ backgroundColor: "hsl(45 100% 51% / 0.15)" }}
                  aria-hidden="true"
                >
                  <Check className="h-3.5 w-3.5 text-yellow" strokeWidth={3} />
                </span>
                <span className="leading-relaxed">{f}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-y-5" style={rise(4)}>
            {SPECS.map((s, i) => (
              <div
                key={s.label}
                className={`min-w-[150px] flex-1 ${i > 0 ? "border-l-2 pl-5" : ""}`}
                style={i > 0 ? { borderColor: "hsl(45 100% 51% / 0.5)" } : undefined}
              >
                <div className="flex items-baseline gap-1.5">
                  <span className="whitespace-nowrap text-yellow text-[clamp(1.75rem,4vw,2.25rem)] font-semibold leading-none tracking-tight">
                    {s.value}
                  </span>
                  {s.unit && (
                    <span className="text-[15px] font-medium text-paper/70">{s.unit}</span>
                  )}
                </div>
                <div className="mt-2 text-[11.5px] font-medium uppercase tracking-wider text-paper/60">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UspCart;
