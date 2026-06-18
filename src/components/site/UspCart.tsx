import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import cartImg from "@/assets/usp-cart.jpg";
import cartMobileImg from "@/assets/usp-cart-mobile.jpg";

const FEATURES = [
  "Odbiór mebli z wózkiem, zarówno z parteru, jak i z piętra",
  "Załadunek bez konieczności precyzyjnego podjeżdżania - poradzimy sobie nawet przy utrudnionym dostępie",
  "Pianka, folia bąbelkowa, pasy i zabezpieczenie sprzętu w komplecie",
];

const SPECS = [
  { value: "500", unit: "kg+", label: "Udźwig" },
  { value: "800–1300", unit: "mm", label: "Wysokość podnoszenia" },
  { value: "0", unit: "", label: "Ramp i wind hydraulicznych" },
];

const formatIndex = (i: number) => String(i + 1).padStart(2, "0");

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
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const rise = (i: number) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(24px)",
    transition:
      "opacity 700ms cubic-bezier(0.2,0.8,0.2,1), transform 700ms cubic-bezier(0.2,0.8,0.2,1)",
    transitionDelay: `${120 + i * 90}ms`,
  });

  return (
    <section
      ref={ref}
      id="wozek"
      aria-label="Wózek samozaładowczy"
      className="relative overflow-hidden bg-cream py-20 sm:py-24 md:py-28 lg:py-32"
    >
      {/* Single warm accent glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow/10 blur-[120px] sm:h-[40rem] sm:w-[40rem]"
        aria-hidden="true"
      />

      <div className="container-mh relative z-10">
        <div className="mb-10 lg:hidden" style={rise(0)}>
          <div className="flex items-center gap-3">
            <span
              className="inline-block h-2 w-2 rounded-full bg-yellow-ink"
              aria-hidden="true"
            />
            <span className="font-mono text-[11.5px] font-bold uppercase tracking-[0.18em] text-yellow-ink">
              Wyróżnik
            </span>
          </div>
          <h2 className="mt-5 text-[clamp(2.25rem,10vw,3.5rem)] font-semibold leading-[1.05] tracking-tight text-ink">
            Wózek
            <br />
            <span className="text-ink/55">samozaładowczy.</span>
          </h2>
          <p className="lede mt-5 max-w-[34ch] text-ink/[0.72]">
            Paleciak, sztaplarka i winda załadunkowa w jednym — mniej ludzi,
            mniej kombinowania, krótszy czas.
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Text content */}
          <div className="order-2 lg:order-1 lg:pt-12">
            <div className="hidden lg:block" style={rise(1)}>
              <div className="flex items-center gap-3">
                <span
                  className="inline-block h-2 w-2 rounded-full bg-yellow-ink"
                  aria-hidden="true"
                />
                <span className="font-mono text-[11.5px] font-bold uppercase tracking-[0.18em] text-yellow-ink">
                  Wyróżnik
                </span>
              </div>
              <h2 className="mt-5 text-[clamp(2.25rem,5vw,3.75rem)] font-semibold leading-[1.05] tracking-tight text-ink">
                Wózek
                <br />
                <span className="text-ink/55">samozaładowczy.</span>
              </h2>
            </div>

            <p
              className="lede mt-6 hidden max-w-[48ch] text-ink/[0.72] lg:block"
              style={rise(2)}
            >
              Paleciak, sztaplarka i winda załadunkowa w jednym. Samodzielnie
              wjeżdża na przestrzeń ładunkową busa — nie potrzebujemy rampy,
              hydraulicznej windy przy budynku, ani pięciu ludzi do wniesienia
              pralki albo ciężkiego sprzętu. Mniejsza ekipa, krótszy czas,
              niższa cena.
            </p>

            <ul className="space-y-0 lg:mt-10" style={rise(3)}>
              {FEATURES.map((f, idx) => (
                <li
                  key={f}
                  className="group/item flex items-start gap-4 border-t border-line py-4 first:border-t-0 first:pt-0 last:pb-0"
                >
                  <span
                    className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-line bg-paper text-yellow-ink transition-mh group-hover/item:border-yellow-ink group-hover/item:bg-yellow-ink group-hover/item:text-paper"
                    aria-hidden="true"
                  >
                    <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </span>
                  <div className="flex flex-1 items-start justify-between gap-4">
                    <span className="text-[15px] font-medium leading-relaxed text-ink/80">
                      {f}
                    </span>
                    <span className="hidden font-mono text-[11px] font-semibold text-ink/20 transition-mh group-hover/item:text-yellow-ink/70 sm:block">
                      {formatIndex(idx)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            {/* Specs — desktop */}
            <div
              className="mt-12 hidden items-start gap-8 sm:flex"
              style={rise(4)}
            >
              {SPECS.map((s, idx) => (
                <div
                  key={s.label}
                  className={`min-w-0 ${idx > 0 ? "border-l border-line pl-8" : ""}`}
                >
                  <div className="flex items-baseline gap-1.5">
                    <span className="whitespace-nowrap font-mono text-[clamp(1.75rem,3.2vw,2.5rem)] font-semibold leading-none tracking-tight text-ink">
                      {s.value}
                    </span>
                    {s.unit && (
                      <span className="text-[14px] font-semibold text-ink/55">
                        {s.unit}
                      </span>
                    )}
                  </div>
                  <div className="mt-2 max-w-[14ch] text-[12px] font-semibold uppercase leading-snug tracking-[0.1em] text-ink/50">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image composition */}
          <div
            className="relative order-1 mx-auto w-full max-w-[480px] lg:order-2 lg:max-w-none lg:pl-8"
            style={rise(2)}
          >
            {/* Frame */}
            <div className="group/image relative aspect-[3/4] overflow-hidden rounded-sm border border-line bg-paper p-2 shadow-[0_28px_70px_-20px_hsl(var(--ink)/0.16)] sm:p-3">
              <div className="relative h-full w-full overflow-hidden bg-cream">
                <picture className="block h-full w-full">
                  <source media="(min-width: 768px)" srcSet={cartImg} />
                  <img
                    src={cartMobileImg}
                    alt="Elektryczny wózek paletowy z masztem podnoszącym MatHub (udźwig 500 kg) we wnętrzu paki samochodu transportowego."
                    width={1732}
                    height={1672}
                    loading="lazy"
                    className="h-full w-full object-cover object-center transition-transform ease-mh group-hover/image:scale-[1.03]"
                    style={{ transitionDuration: "1400ms" }}
                  />
                </picture>
              </div>
            </div>

            {/* Mobile specs */}
            <div
              className="mt-8 grid grid-cols-3 gap-8 border-t border-line pt-6 sm:hidden"
              style={rise(5)}
            >
              {SPECS.map((s) => (
                <div key={s.label} className="min-w-0 text-center">
                  <div className="flex items-baseline justify-center gap-0.5">
                    <span className="whitespace-nowrap font-mono text-[clamp(1.1rem,5vw,1.5rem)] font-semibold leading-none tracking-tight text-ink">
                      {s.value}
                    </span>
                    {s.unit && (
                      <span className="text-[10px] font-semibold text-ink/55">
                        {s.unit}
                      </span>
                    )}
                  </div>
                  <div className="mt-1.5 text-[9px] font-bold uppercase leading-tight tracking-[0.04em] text-ink/50 min-[390px]:text-[10px]">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UspCart;
