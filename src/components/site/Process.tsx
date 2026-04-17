const STEPS = [
  {
    n: "01",
    title: "Rozmowa",
    body: "Dzwonisz, opisujesz co i gdzie. Termin potwierdzamy w rozmowie.",
  },
  {
    n: "02",
    title: "Wycena",
    body: "Dostajesz konkretną cenę w 24 h. Bez „to zależy”.",
  },
  {
    n: "03",
    title: "Realizacja",
    body: "Ekipa, bus, wózek. Przywozimy, wnosimy, ustawiamy.",
  },
];

const Process = () => {
  return (
    <section id="proces" aria-label="Proces współpracy" className="bg-paper py-20 md:py-28">
      <div className="container-mh">
        <div className="max-w-3xl">
          <div className="kicker text-yellow-ink">Proces</div>
          <h2 className="h2 mt-3 text-ink">Trzy kroki. Bez tajemnic.</h2>
        </div>

        <div className="mt-14 relative">
          {/* Desktop horizontal line */}
          <div
            className="hidden md:block absolute top-[36px] left-0 right-0 h-px"
            style={{ backgroundColor: "hsl(var(--ink) / 0.12)" }}
            aria-hidden="true"
          />
          {/* Mobile vertical line */}
          <div
            className="md:hidden absolute top-0 bottom-0 left-[18px] w-px"
            style={{ backgroundColor: "hsl(var(--ink) / 0.12)" }}
            aria-hidden="true"
          />

          <ol className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 relative">
            {STEPS.map((step, i) => (
              <li key={step.n} className="relative pl-12 md:pl-0">
                {/* Dot */}
                <div
                  className="absolute md:relative left-0 top-1 md:top-0 md:mb-5 h-9 w-9 rounded-full bg-paper border-2 flex items-center justify-center"
                  style={{ borderColor: "hsl(41 80% 38%)" }}
                  aria-hidden="true"
                >
                  <span className="h-2 w-2 rounded-full bg-yellow-ink" />
                </div>
                <div className="text-yellow-ink text-[42px] md:text-[56px] font-semibold leading-none tracking-tight">
                  {step.n}
                </div>
                <h3 className="mt-3 text-[20px] font-semibold text-ink">{step.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink/65 max-w-[42ch]">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default Process;
