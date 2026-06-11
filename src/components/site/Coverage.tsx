import { MapPin, Truck, ShieldCheck, Clock } from "lucide-react";

const FEATURES = [
  {
    icon: <MapPin className="w-5 h-5 text-yellow-ink" strokeWidth={1.5} />,
    title: "Ogólnopolski zasięg",
    desc: "Nasza flota przemierza całą Polskę, od Szczecina po Rzeszów. Realizujemy trasy we wszystkich województwach.",
  },
  {
    icon: <Truck className="w-5 h-5 text-yellow-ink" strokeWidth={1.5} />,
    title: "Baza operacyjna",
    desc: "Zachodniopomorskie to nasz dom. Stąd wyruszamy, by dowieźć Twój ładunek w dowolne miejsce w kraju.",
  },
  {
    icon: <Clock className="w-5 h-5 text-yellow-ink" strokeWidth={1.5} />,
    title: "Indywidualne wyceny",
    desc: "Kursy długodystansowe wyceniamy elastycznie, dopasowując ofertę do Twoich konkretnych potrzeb i specyfiki trasy.",
  },
  {
    icon: <ShieldCheck className="w-5 h-5 text-yellow-ink" strokeWidth={1.5} />,
    title: "Gwarancja jakości",
    desc: "Każdy ładunek traktujemy priorytetowo, zapewniając bezpieczny i terminowy transport od drzwi do drzwi.",
  },
];

const Coverage = () => {
  return (
    <section id="zasieg" aria-label="Zasięg" className="bg-cream py-20 max-md:py-12 md:py-28 overflow-hidden">
      <div className="container-mh relative z-10">
        <div className="max-w-3xl">
          <div className="kicker text-yellow-ink">Zasięg</div>
          <h2 className="h2 mt-3 text-ink">
            Zachodniopomorskie bazą. Cała Polska po drodze.
          </h2>
        </div>

        <div className="mt-7 overflow-hidden rounded-lg border border-line bg-white shadow-[0_18px_44px_hsl(var(--ink)/0.08)] md:hidden">
          <div
            className="relative h-[152px]"
            style={{
              background:
                "linear-gradient(135deg, hsl(45 100% 51% / 0.18), hsl(45 100% 51% / 0) 42%), radial-gradient(circle at 30% 35%, hsl(217 50% 21% / 0.24), transparent 8rem), hsl(var(--cream))",
            }}
            aria-hidden="true"
          >
            <span className="absolute left-8 right-8 top-1/2 h-0.5 -translate-y-1/2 bg-[linear-gradient(90deg,hsl(var(--yellow)),hsl(var(--navy)/0.28),hsl(var(--yellow)))]" />
            <span className="absolute left-5 top-1/2 grid h-[34px] w-[34px] -translate-y-1/2 place-items-center rounded-full bg-yellow font-mono text-[11px] font-black text-navy-deep shadow-[0_0_0_8px_hsl(var(--yellow)/0.16)]">
              SZ
            </span>
            <span className="absolute right-5 top-1/2 grid h-[34px] w-[34px] -translate-y-1/2 place-items-center rounded-full bg-yellow font-mono text-[11px] font-black text-navy-deep shadow-[0_0_0_8px_hsl(var(--yellow)/0.16)]">
              PL
            </span>
          </div>
          <div className="p-5">
            <h3 className="text-[19px] font-semibold leading-snug tracking-tight text-ink">
              Od Szczecina do Rzeszowa.
            </h3>
            <p className="mt-2 text-[14.5px] font-medium leading-relaxed text-ink/70">
              Baza: Trzeszczyn, 72-004 Police. Kursy lokalne i długodystansowe wyceniamy indywidualnie.
            </p>
          </div>
        </div>

        <div className="mt-16 hidden grid-cols-1 items-center gap-12 md:grid lg:grid-cols-2 lg:gap-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12">
            {FEATURES.map((feature, idx) => (
              <div key={idx} className="flex flex-col gap-4 group">
                <div className="w-12 h-12 rounded-md bg-white border border-line shadow-sm flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-md">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-medium tracking-tight text-ink mb-2">{feature.title}</h3>
                  <p className="text-[15px] leading-relaxed text-ink/70">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="relative rounded-lg overflow-hidden border border-line bg-white shadow-lg group">
            <iframe
              title="Mapa: Trzeszczyn, 72-004 Police"
              src="https://www.google.com/maps?q=53.55,14.52&z=11&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-[400px] md:h-[480px] border-0 grayscale-[15%] saturate-[0.9] contrast-[1.02] transition-all duration-700 ease-in-out group-hover:grayscale-0 group-hover:saturate-100"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Coverage;
