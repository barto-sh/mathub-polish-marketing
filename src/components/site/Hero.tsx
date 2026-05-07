import { Phone, ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero-hands.jpg";

const PHONE_DISPLAY = "+48 730 857 710";
const PHONE_HREF = "tel:+48730857710";

const Hero = () => {
  return (
    <section
      id="top"
      aria-label="Wprowadzenie"
      className="bg-paper pt-10 pb-16 md:pt-16 md:pb-24 lg:pt-20 lg:pb-28"
    >
      <div className="container-mh">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-16 items-center">
          {/* Left — typography */}
          <div>
            {/* Eyebrow pill */}
            <div
              className="inline-flex items-center gap-2 rounded-sm border px-3 py-1.5"
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
              style={{
                fontSize: "clamp(2.35rem, 6.5vw, 4.75rem)",
                maxWidth: "16ch",
              }}
            >
              Przeprowadzki bez problemów.{" "}
              <span style={{ color: "#C8941A" }}>My to nosimy.</span>
            </h1>

            <p className="lede mt-6 text-ink/75 max-w-xl">
              Mieszkania, domy, biura. Pakujemy, ładujemy, wieziemy - z wózkiem
              samozaładowczym o udźwigu 500 kg, dzięki czemu żadna winda hydrauliczna nie
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
                Sprawdź termin
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>

            <p className="mt-6 text-[13.5px] text-ink/60">
              <strong className="font-semibold text-ink/80">Ubezpieczenie</strong>{" "}
              towaru w cenie ·{" "}
              <strong className="font-semibold text-ink/80">Wycena</strong> w 24 h ·{" "}
              <strong className="font-semibold text-ink/80">Bez</strong> ukrytych kosztów
            </p>
          </div>

          {/* Right — image with craft frame */}
          <div className="relative">
            {/* Yellow corner accent — top-left */}
            <div
              className="absolute -top-3 -left-3 h-8 w-8 border-l-2 border-t-2 z-10 hidden md:block"
              style={{ borderColor: "hsl(45 100% 51%)" }}
              aria-hidden="true"
            />
            {/* Navy corner accent — bottom-right */}
            <div
              className="absolute -bottom-3 -right-3 h-8 w-8 border-r-2 border-b-2 z-10 hidden md:block"
              style={{ borderColor: "hsl(217 50% 21%)" }}
              aria-hidden="true"
            />
            <div className="relative overflow-hidden rounded-md shadow-md bg-navy">
              <img
                src={heroImg}
                alt="Pakowanie kartonu w trakcie przeprowadzki — dłonie w rękawicach roboczych zaklejają pudło taśmą."
                width={1080}
                height={1920}
                className="w-full h-[420px] sm:h-[520px] lg:h-[600px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
