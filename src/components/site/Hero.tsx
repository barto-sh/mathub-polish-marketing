import { Fragment } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import { Phone, ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero-hands.jpg";
import { scrollToHash } from "@/lib/scrollToHash";

const PHONE_DISPLAY = "+48 730 857 710";
const PHONE_HREF = "tel:+48730857710";
const HEAD_WORDS = ["Przeprowadzki", "bez", "problemów."];

const Hero = () => {
  const scrollToContact = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    scrollToHash("#kontakt");
  };

  return (
    <section
      id="top"
      aria-label="Wprowadzenie"
      className="hero-kino relative isolate flex min-h-[88svh] flex-col overflow-hidden bg-navy-deep text-paper"
    >
      {/* Full-bleed photo + cinematic treatment (unchanged image) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={heroImg}
          alt="Pakowanie kartonu w trakcie przeprowadzki — dłonie w rękawicach roboczych zaklejają pudło taśmą."
          width={1080}
          height={1920}
          className="h-full w-full object-cover"
          style={{ transform: "scale(1.08)", objectPosition: "56% 42%" }}
        />
      </div>
      <div className="hero-kino__scrim absolute inset-0 z-0" aria-hidden="true" />
      <div className="hero-kino__grain absolute inset-0 z-0" aria-hidden="true" />

      {/* Content — anchored bottom-left */}
      <div className="container-mh relative z-10 flex flex-1 flex-col justify-end pt-24 pb-14 md:pb-16">
        <div className="hero-kino__rise inline-flex w-fit items-center gap-2 rounded-full border border-paper/20 bg-paper/5 px-3 py-1.5 backdrop-blur-sm">
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ backgroundColor: "hsl(142 71% 38%)" }}
            aria-hidden="true"
          />
          <span className="text-[12px] font-medium text-paper sm:text-[12.5px]">
            <span className="sm:hidden">Dostępny dziś · Szczecin i okolice</span>
            <span className="hidden sm:inline">Dostępny dziś · Trzeszczyn / Szczecin i okolice</span>
          </span>
        </div>

        <h1 className="display mt-6 max-w-full text-paper" style={{ fontSize: "clamp(2rem, 10vw, 6rem)", maxWidth: "min(16ch, 100%)" }}>
          {HEAD_WORDS.map((word, i) => (
            <Fragment key={word}>
              <span className="hero-kino__word">
                <span style={{ animationDelay: `${0.05 + i * 0.06}s` }}>{word}</span>
              </span>{" "}
            </Fragment>
          ))}
          <span className="hero-kino__word">
            <span className="text-yellow" style={{ animationDelay: `${0.05 + HEAD_WORDS.length * 0.06}s` }}>
              My to nosimy.
            </span>
          </span>
        </h1>

        <p className="hero-kino__rise lede mt-6 max-w-xl text-paper/85" style={{ animationDelay: "0.34s" }}>
          <span className="md:hidden">
            Mieszkania, domy, biura i trudny transport z wózkiem samozaładowczym 500 kg. Wycena szybko, bez ukrytych kosztów.
          </span>
          <span className="hidden md:inline">
            Mieszkania, domy, biura. Pakujemy, ładujemy, wieziemy - z wózkiem samozaładowczym o udźwigu 500 kg,
            dzięki czemu żadna winda hydrauliczna nie jest potrzebna. Zachodniopomorskie i cała Polska.
          </span>
        </p>

        <div className="hero-kino__rise mt-8 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "0.42s" }}>
          <a
            href={PHONE_HREF}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-sm bg-yellow px-5 text-[15px] font-semibold text-navy shadow-sm transition-mh hover:-translate-y-0.5 hover:bg-[hsl(45_100%_56%)]"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            Zadzwoń {PHONE_DISPLAY}
          </a>
          <a
            href="#kontakt"
            onClick={scrollToContact}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-sm border border-paper/30 px-5 text-[15px] font-semibold text-paper transition-mh hover:border-yellow hover:text-yellow"
          >
            Sprawdź termin
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>

      {/* Proof — accessible copy for AT; the route UI below is decorative */}
      <p className="sr-only">Ubezpieczenie towaru w cenie · Wycena w 24 h · Bez ukrytych kosztów</p>

      <div className="hero-kino__proof relative z-10 w-full px-6 pb-6 sm:px-10" aria-hidden="true">
        <div className="hero-kino__route mx-auto grid w-full max-w-[1200px] grid-cols-3 items-stretch gap-px lg:hidden">
          <div className="hero-kino__stop">
            <span className="hero-kino__pin">1</span>
            <strong>Ochrona</strong>
          </div>
          <span className="hero-kino__line hidden" />
          <div className="hero-kino__stop">
            <span className="hero-kino__pin">2</span>
            <strong>24 h</strong>
          </div>
          <span className="hero-kino__line hidden" />
          <div className="hero-kino__stop">
            <span className="hero-kino__pin">3</span>
            <strong>Bez dopłat</strong>
          </div>
        </div>

        <div className="hero-kino__route mx-auto hidden w-full max-w-[1200px] grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-4 lg:grid">
          <div className="hero-kino__stop">
            <span className="hero-kino__pin">1</span>
            <strong>Ubezpieczenie towaru w cenie</strong>
          </div>
          <span className="hero-kino__line" />
          <div className="hero-kino__stop">
            <span className="hero-kino__pin">2</span>
            <strong>Wycena w 24 h</strong>
          </div>
          <span className="hero-kino__line" />
          <div className="hero-kino__stop">
            <span className="hero-kino__pin">3</span>
            <strong>Bez ukrytych kosztów</strong>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Hero;
