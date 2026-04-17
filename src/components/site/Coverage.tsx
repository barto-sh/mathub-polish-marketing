const PLACES = [
  { city: "Szczecin", time: "30 min" },
  { city: "Police", time: "10 min" },
  { city: "Goleniów", time: "25 min" },
  { city: "Stargard", time: "45 min" },
  { city: "Świnoujście", time: "70 min" },
];

const Coverage = () => {
  return (
    <section id="zasieg" aria-label="Zasięg" className="bg-cream py-20 md:py-28">
      <div className="container-mh">
        <div className="max-w-3xl">
          <div className="kicker text-yellow-ink">Zasięg</div>
          <h2 className="h2 mt-3 text-ink">
            Zachodniopomorskie bazą. Cała Polska po drodze.
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          <div>
            <ul className="divide-y divide-line">
              {PLACES.map((p) => (
                <li
                  key={p.city}
                  className="flex items-baseline justify-between py-4"
                >
                  <span className="text-[18px] font-medium text-ink">{p.city}</span>
                  <span className="text-[14px] text-ink/60 tabular-nums">
                    {p.time}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-[15px] leading-relaxed text-ink/70 max-w-[55ch]">
              Poza województwem — cała Polska: od Szczecina do Rzeszowa. Kursy
              długodystansowe wyceniamy indywidualnie.
            </p>
          </div>

          <div className="rounded-md overflow-hidden border border-line shadow-sm bg-white">
            <iframe
              title="Mapa: Trzeszczyn, 72-004 Police"
              src="https://www.google.com/maps?q=53.55,14.52&z=11&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-[360px] md:h-[420px] border-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Coverage;
