import processNotebook from "@/assets/process-notebook.jpg";
import processQuote from "@/assets/process-quote.jpg";
import processDelivery from "@/assets/process-delivery.jpg";

const STEPS = [
  {
    n: "01",
    title: "Rozmowa",
    body: "Dzwonisz, opisujesz przeprowadzkę albo wydarzenie. Termin, dostęp i warunki potwierdzamy w rozmowie.",
    img: processNotebook,
    alt: "Notes, telefon i kawa na biurku — moment zapisywania szczegółów zlecenia.",
  },
  {
    n: "02",
    title: "Wycena",
    body: "Dostajesz konkretną cenę pod trasę, sprzęt, termin i obsługę. Bez ukrytych kosztów.",
    img: processQuote,
    alt: "Wydrukowana wycena trzymana w dłoniach, obok kalkulator i miarka.",
  },
  {
    n: "03",
    title: "Realizacja",
    body: "Przywozimy, wnosimy albo rozstawiamy. Po wydarzeniu odbiór według ustaleń.",
    img: processDelivery,
    alt: "Bus z otwartymi tylnymi drzwiami i wózek z kartonami w drodze do klatki.",
  },
];

const Process = () => {
  return (
    <section
      id="proces"
      aria-label="Proces współpracy"
      className="bg-paper py-20 max-md:py-12 md:py-28"
    >
      <div className="container-mh">
        <div className="max-w-3xl">
          <div className="kicker text-yellow-ink">Proces</div>
          <h2 className="h2 mt-3 text-ink">Trzy kroki, zero tajemnic.</h2>
        </div>

        <div className="mt-7 grid grid-cols-3 gap-px overflow-hidden rounded-md border border-line bg-line md:hidden">
          {STEPS.map((step) => (
            <div key={step.n} className="relative h-24 bg-cream">
              <img
                src={step.img}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover"
                style={{ filter: "saturate(0.82) contrast(1.04)" }}
                aria-hidden="true"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/45 to-transparent" aria-hidden="true" />
              <span className="absolute bottom-2 left-2 font-mono text-[11px] font-bold text-paper">
                {step.n}
              </span>
            </div>
          ))}
        </div>

        <ol className="mt-14 grid grid-cols-1 gap-10 max-md:mt-7 max-md:border-t max-md:border-line md:grid-cols-3 md:gap-8">
          {STEPS.map((step) => (
            <li
              key={step.n}
              className="relative flex flex-col max-md:grid max-md:grid-cols-[54px_minmax(0,1fr)] max-md:gap-4 max-md:border-b max-md:border-line max-md:py-5"
            >
              {/* Image */}
              <div className="relative mb-6 overflow-hidden rounded-md bg-cream aspect-[5/4] max-md:hidden">
                <img
                  src={step.img}
                  alt={step.alt}
                  loading="lazy"
                  className="w-full h-full object-cover"
                  style={{ filter: "saturate(0.85) contrast(1.02)" }}
                />
                {/* Step number badge */}
                <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 bg-paper/95 backdrop-blur-sm px-2.5 py-1 rounded-sm">
                  <span
                    className="inline-block h-1.5 w-1.5 rounded-full bg-yellow-ink"
                    aria-hidden="true"
                  />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink">
                    Krok {step.n}
                  </span>
                </div>
              </div>

              <div className="text-[44px] font-semibold leading-none tracking-tight text-yellow-ink max-md:text-[30px] md:text-[56px]">
                {step.n}
              </div>
              <div>
                <h3 className="mt-3 text-[20px] font-semibold text-ink max-md:mt-0 max-md:text-[18px]">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-[42ch] text-[15px] leading-relaxed text-ink/65 max-md:mt-1.5 max-md:text-[14px]">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Process;
