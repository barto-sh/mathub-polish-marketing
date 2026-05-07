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
    <section id="zasieg" aria-label="Zasięg" className="bg-cream py-20 md:py-28 overflow-hidden">
      <div className="container-mh relative z-10">
        <div className="max-w-3xl">
          <div className="kicker text-yellow-ink">Zasięg</div>
          <h2 className="h2 mt-3 text-ink">
            Zachodniopomorskie bazą. Cała Polska po drodze.
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12">
            {FEATURES.map((feature, idx) => (
              <div key={idx} className="flex flex-col gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-white border border-line shadow-sm flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-md">
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

          <div className="relative rounded-3xl overflow-hidden border border-line bg-white shadow-lg group">
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
