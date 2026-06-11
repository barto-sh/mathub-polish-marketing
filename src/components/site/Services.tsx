import svcHome from "@/assets/svc-home.jpg";
import svcFurniture from "@/assets/svc-furniture.jpg";
import svcOffice from "@/assets/svc-office.jpg";
import svcBoxes from "@/assets/svc-boxes.jpg";
import svcAppliance from "@/assets/svc-appliance.jpg";
import svcPiano from "@/assets/svc-piano.jpg";

const SERVICES = [
  {
    tag: "Mieszkania",
    title: "Przeprowadzki mieszkań",
    body: "Kawalerka, M3, M5. Pakowanie, demontaż mebli, transport, ustawienie na miejscu.",
    img: svcBoxes,
    alt: "Stos kartonów do przeprowadzki opartych o kremową ścianę w słońcu.",
  },
  {
    tag: "Domy",
    title: "Przeprowadzki domów",
    body: "Całe gospodarstwo: salon, kuchnia, garaż, piwnica, ogród. W jednym lub kilku kursach.",
    img: svcHome,
    alt: "Częściowo opróżniony salon domu z zapakowanymi pudłami przy oknie.",
  },
  {
    tag: "Biura",
    title: "Przeprowadzki biur",
    body: "Biurka, serwery, archiwa. Realizujemy po godzinach, żeby nie zatrzymywać firmy.",
    img: svcOffice,
    alt: "Puste nowoczesne biuro z fotelem i szafką na dokumenty gotowe do przewozu.",
  },
  {
    tag: "Meble",
    title: "Transport mebli",
    body: "Pojedyncza szafa, kanapa z IKEA, zabytkowy kredens. Z wniesieniem lub bez.",
    img: svcFurniture,
    alt: "Drewniane krzesło typu mid-century stojące samotnie na parkiecie w pustym pokoju.",
  },
  {
    tag: "AGD / RTV",
    title: "Transport AGD / RTV",
    body: 'Pralka, lodówka, TV 75". W pionie, w pasach, z pianką w miejscach kontaktowych.',
    img: svcAppliance,
    alt: "Pralka owinięta kocem i zabezpieczona pomarańczowymi pasami transportowymi we wnętrzu busa.",
  },
  {
    tag: "Ponadgabaryt",
    title: "Transport ponadgabarytowy",
    body: "Fortepian, siłownia, motocykl, maszyna stolarska. Ustalamy indywidualnie.",
    img: svcPiano,
    alt: "Pianino owinięte szarym kocem transportowym z pomarańczowymi pasami.",
  },
];

const Services = () => {
  return (
    <section id="uslugi" aria-label="Usługi" className="bg-paper py-20 md:py-28">
      <div className="container-mh">
        <div className="max-w-3xl">
          <div className="kicker text-yellow-ink">Zakres</div>
          <h2 className="h2 mt-3 text-ink">Co wozimy i jak.</h2>
          <p className="lede mt-5 text-ink/70">
            Jedna ekipa, jeden bus, sześć typowych zleceń. Jeśli nie ma tu tego,
            czego szukasz, zadzwoń - realizujemy też nietypowe zlecenia, od fortepianu po motocykl.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-line">
          {SERVICES.map((s, i) => (
            <article
              key={s.title}
              className="group bg-paper transition-mh hover:bg-white hover:shadow-md cursor-default flex flex-col relative hover:z-10"
            >
              {/* Image */}
              <div className="relative overflow-hidden bg-navy aspect-[4/3]">
                <img
                  src={s.img}
                  alt={s.alt}
                  loading="lazy"
                  width={1024}
                  height={768}
                  className="w-full h-full object-cover transition-mh duration-700 group-hover:scale-105"
                  style={{ filter: "saturate(0.85) contrast(1.05)" }}
                />
                {/* Subtle navy tint overlay for cohesion */}
                <div
                  className="absolute inset-0 transition-mh"
                  style={{
                    background:
                      "linear-gradient(180deg, hsl(217 50% 21% / 0) 0%, hsl(217 50% 21% / 0.25) 100%)",
                  }}
                  aria-hidden="true"
                />
                {/* Index marker */}
                <div className="absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-paper/90">
                  0{i + 1} / 06
                </div>
              </div>
              {/* Content */}
              <div className="p-6 md:p-7 flex flex-col flex-1">
                <div className="kicker text-[11px] text-yellow-ink">{s.tag}</div>
                <h3 className="mt-2 text-[18px] font-semibold text-ink leading-snug">
                  {s.title}
                </h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-ink/65 max-w-[60ch]">
                  {s.body}
                </p>
                <div
                  className="mt-5 h-px w-10 transition-mh group-hover:w-16"
                  style={{ backgroundColor: "hsl(217 50% 21%)" }}
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
