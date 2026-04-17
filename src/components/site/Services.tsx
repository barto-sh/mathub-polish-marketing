const SERVICES = [
  {
    tag: "Mieszkania",
    title: "Przeprowadzki mieszkań",
    body: "Kawalerka, M3, M5. Pakowanie, demontaż mebli, transport, ustawienie na miejscu.",
  },
  {
    tag: "Domy",
    title: "Przeprowadzki domów",
    body: "Całe gospodarstwo: salon, kuchnia, garaż, piwnica, ogród. W jednym lub kilku kursach.",
  },
  {
    tag: "Biura",
    title: "Przeprowadzki biur",
    body: "Biurka, serwery, archiwa. Realizujemy po godzinach, żeby nie zatrzymywać firmy.",
  },
  {
    tag: "Meble",
    title: "Transport mebli",
    body: "Pojedyncza szafa, kanapa z IKEA, zabytkowy kredens. Z wniesieniem lub bez.",
  },
  {
    tag: "AGD / RTV",
    title: "Transport AGD / RTV",
    body: 'Pralka, lodówka, TV 75". W pionie, w pasach, z pianką w miejscach kontaktowych.',
  },
  {
    tag: "Ponadgabaryt",
    title: "Transport ponadgabarytowy",
    body: "Fortepian, siłownia, motocykl, maszyna stolarska. Ustalamy indywidualnie.",
  },
];

const Services = () => {
  return (
    <section id="uslugi" aria-label="Usługi" className="bg-paper py-20 md:py-28">
      <div className="container-mh">
        <div className="max-w-3xl">
          <div className="kicker text-yellow-ink">Zakres</div>
          <h2 className="h2 mt-3 text-ink">Co wozimy — i jak.</h2>
          <p className="lede mt-5 text-ink/70">
            Jedna ekipa, jeden bus, sześć typowych zleceń. Jeśli nie ma tu tego
            czego szukasz, zadzwoń — robimy też rzeczy dziwne, od fortepianu po motor.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-line">
          {SERVICES.map((s) => (
            <article
              key={s.title}
              className="group bg-paper p-7 md:p-8 transition-mh hover:bg-white hover:shadow-md hover:-translate-y-0.5 cursor-default"
            >
              <div className="kicker text-[11px] text-yellow-ink">{s.tag}</div>
              <h3 className="mt-3 text-[18px] font-semibold text-ink leading-snug">
                {s.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink/65 max-w-[60ch]">
                {s.body}
              </p>
              <div
                className="mt-6 h-px w-10 transition-mh group-hover:w-16"
                style={{ backgroundColor: "hsl(217 50% 21%)" }}
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
