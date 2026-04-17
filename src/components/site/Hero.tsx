import { Phone, ArrowRight } from "lucide-react";

const PHONE_DISPLAY = "+48 XXX XXX XXX";
const PHONE_HREF = "tel:+48000000000";

const Hero = () => {
  return (
    <section
      id="top"
      aria-label="Wprowadzenie"
      className="bg-paper pt-12 pb-20 md:pt-20 md:pb-28"
    >
      <div className="container-mh">
        <div className="max-w-4xl">
          {/* Eyebrow pill */}
          <div
            className="inline-flex items-center gap-2 rounded-sm border px-3 py-1.5 reveal is-visible"
            style={{
              borderColor: "hsl(45 100% 51% / 0.4)",
              backgroundColor: "hsl(45 100% 51% / 0.1)",
            }}
          >
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ backgroundColor: "hsl(142 71% 38%)" }}
              aria-hidden="true"
            />
            <span className="text-[12.5px] font-medium text-ink">
              Dostępny dziś · Trzeszczyn / Szczecin i okolice
            </span>
          </div>

          <h1
            className="display mt-6 text-ink"
            style={{ fontSize: "clamp(2.5rem, 7vw, 5.25rem)", maxWidth: "18ch" }}
          >
            Przeprowadzki bez dramy.{" "}
            <span style={{ color: "#C8941A" }}>My to nosimy.</span>
          </h1>

          <p className="lede mt-6 text-ink/75 max-w-2xl">
            Mieszkania, domy, biura. Pakujemy, ładujemy, wiozemy — z wózkiem
            samozaładowczym o udźwigu 500 kg, więc żadna winda hydrauliczna nie
            jest potrzebna. Zachodniopomorskie i cała Polska.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a
              href={PHONE_HREF}
              className="inline-flex items-center justify-center gap-2 rounded-sm bg-yellow px-5 h-12 text-[15px] font-semibold text-navy transition-mh hover:bg-[hsl(45_100%_56%)] shadow-sm"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Zadzwoń {PHONE_DISPLAY}
            </a>
            <a
              href="#kontakt"
              className="inline-flex items-center justify-center gap-2 rounded-sm border border-navy px-5 h-12 text-[15px] font-semibold text-navy transition-mh hover:bg-navy hover:text-paper"
            >
              Napisz i oddzwonię
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <p className="mt-6 text-[13.5px] text-ink/60">
            <strong className="font-semibold text-ink/80">Ubezpieczenie</strong> towaru w cenie ·{" "}
            <strong className="font-semibold text-ink/80">Wycena</strong> w 24 h ·{" "}
            <strong className="font-semibold text-ink/80">Bez</strong> ukrytych kosztów
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
