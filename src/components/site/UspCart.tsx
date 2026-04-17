import { Check } from "lucide-react";

const FEATURES = [
  "Zjazd z wózkiem po meble z mieszkania na parterze i z piętra",
  "Załadunek bez „dokładnie tu podstaw samochód” — pomieści się i pół metra dalej",
  "Pianka, folia bąbelkowa, pasy transportowe w komplecie",
];

const SPECS = [
  { value: "500", unit: "kg+", label: "Udźwig", span: false },
  { value: "800–1300", unit: "mm", label: "Wysokość podnoszenia", span: false },
  { value: "0", unit: "", label: "Ramp i wind hydraulicznych", span: true },
];

const UspCart = () => {
  return (
    <section id="wozek" aria-label="Wózek samozaładowczy" className="bg-navy text-paper py-20 md:py-28">
      <div className="container-mh">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-start">
          <div>
            <div className="kicker text-yellow">Wyróżnik</div>
            <h2 className="h2 mt-3 text-paper">
              Wózek samozaładowczy.
              <br />
              Winda załadunkowa, której nie musisz mieć.
            </h2>
            <p className="lede mt-5 text-paper/75">
              Paleciak, sztaplarka i winda załadunkowa w jednym. Samodzielnie wjeżdża
              na pakę z ładunkiem — nie potrzebujemy rampy, hydraulicznej windy przy
              budynku, ani pięciu ludzi do wniesienia pralki. Co oznacza: mniejsza
              ekipa, krótszy czas, niższa cena.
            </p>

            <ul className="mt-8 space-y-3">
              {FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-3 text-[15px] text-paper/85">
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
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-1 gap-px bg-line-dark rounded-md overflow-hidden">
            {SPECS.map((s) => (
              <div
                key={s.label}
                className={`bg-navy p-6 md:p-7 ${
                  s.span ? "col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div className="flex items-baseline gap-1.5">
                  <span className="text-yellow text-[40px] md:text-[48px] font-semibold leading-none tracking-tight">
                    {s.value}
                  </span>
                  {s.unit && (
                    <span className="text-paper/70 text-[16px] font-medium">
                      {s.unit}
                    </span>
                  )}
                </div>
                <div className="mt-2 text-[13px] uppercase tracking-wider text-paper/60 font-medium">
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
