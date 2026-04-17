import processNotebook from "@/assets/process-notebook.jpg";
import processQuote from "@/assets/process-quote.jpg";
import processDelivery from "@/assets/process-delivery.jpg";

const STEPS = [
  {
    n: "01",
    title: "Rozmowa",
    body: "Dzwonisz, opisujesz co i gdzie. Termin potwierdzamy w rozmowie.",
    img: processNotebook,
    alt: "Notes, telefon i kawa na biurku — moment zapisywania szczegółów zlecenia.",
  },
  {
    n: "02",
    title: "Wycena",
    body: "Dostajesz konkretną cenę w 24 h. Bez ukrytych kosztów.",
    img: processQuote,
    alt: "Wydrukowana wycena trzymana w dłoniach, obok kalkulator i miarka.",
  },
  {
    n: "03",
    title: "Realizacja",
    body: "Ekipa, bus, wózek. Przywozimy, wnosimy, ustawiamy.",
    img: processDelivery,
    alt: "Bus z otwartymi tylnymi drzwiami i wózek z kartonami w drodze do klatki.",
  },
];

const Process = () => {
  return (
    <section
      id="proces"
      aria-label="Proces współpracy"
      className="bg-paper py-20 md:py-28"
    >
      <div className="container-mh">
        <div className="max-w-3xl">
          <div className="kicker text-yellow-ink">Proces</div>
          <h2 className="h2 mt-3 text-ink">Trzy kroki, zero tajemnic.</h2>
        </div>

        <ol className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {STEPS.map((step) => (
            <li
              key={step.n}
              className="relative flex flex-col"
            >
              {/* Image */}
              <div className="relative overflow-hidden rounded-md bg-cream aspect-[5/4] mb-6">
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

              <div className="text-yellow-ink text-[44px] md:text-[56px] font-semibold leading-none tracking-tight">
                {step.n}
              </div>
              <h3 className="mt-3 text-[20px] font-semibold text-ink">
                {step.title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink/65 max-w-[42ch]">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Process;
