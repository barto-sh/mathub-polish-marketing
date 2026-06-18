import type { MouseEvent as ReactMouseEvent } from "react";
import { ArrowRight, Phone } from "lucide-react";
import heroDesktopImg from "@/assets/hero-redesign-desktop-v3.jpg";
import heroMobileImg from "@/assets/hero-redesign-mobile-v3.jpg";
import { scrollToHash } from "@/lib/scrollToHash";

const PHONE_DISPLAY = "+48 730 857 710";
const PHONE_HREF = "tel:+48730857710";

const Hero = () => {
  const scrollToServices = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    scrollToHash("#uslugi");
  };

  return (
    <section
      id="top"
      aria-label="Wprowadzenie"
      className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden bg-navy-deep text-paper"
    >
      <picture className="absolute inset-0 z-0 block overflow-hidden">
        <source media="(min-width: 768px)" srcSet={heroDesktopImg} />
        <img
          src={heroMobileImg}
          alt="Pakowanie kartonu, dmuchana zjeżdżalnia eventowa i maszyna do piany jako oferta MatHub."
          width={864}
          height={1821}
          className="h-full w-full object-cover object-center"
        />
      </picture>

      {/* Lighter scrim — image stays visible, text stays readable */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(90deg, hsl(var(--navy-deep) / 0.46) 0%, hsl(var(--navy-deep) / 0.36) 42%, hsl(var(--navy-deep) / 0.14) 72%, hsl(var(--navy-deep) / 0.21) 100%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(0deg, hsl(var(--navy-deep) / 0.48) 0%, transparent 20%, transparent 80%, hsl(var(--navy-deep) / 0.28) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Ultra-subtle film grain */}
      <div
        className="absolute inset-0 z-0 opacity-[0.05] mix-blend-soft-light"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.86' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "180px",
        }}
        aria-hidden="true"
      />

      <div className="container-mh relative z-10 flex flex-1 flex-col justify-center pt-[92px] pb-16 md:pt-[82px] md:pb-20">
        <div className="max-w-[36rem] md:ml-[8vw] lg:ml-[120px] xl:ml-[160px]">
          <h1
            aria-label="Przeprowadzki i atrakcje"
            className="font-black uppercase leading-[0.88] tracking-tight text-paper"
            style={{
              fontSize: "clamp(2rem, 10vw, 7.5rem)",
              textShadow: "0 4px 26px hsl(var(--ink) / 0.35), 0 1px 0 hsl(var(--ink) / 0.2)",
            }}
          >
            Przeprowadzki
            <br />
            <span className="text-yellow">i atrakcje</span>
          </h1>

          <p className="mt-6 max-w-[38ch] text-[16px] font-medium leading-relaxed text-paper/80 md:mt-7 md:text-[17px]">
            Jedna ekipa do przeprowadzek i atrakcji — dowóz, zabezpieczenie,
            rozstawienie i odbiór ustalone przed terminem.
          </p>

          <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center md:mt-10">
            <a
              href={PHONE_HREF}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-yellow px-6 text-[14px] font-extrabold text-navy shadow-[0_14px_34px_hsl(var(--ink)/0.25)] transition-mh hover:-translate-y-0.5 hover:bg-[hsl(45_100%_56%)]"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Zadzwoń: {PHONE_DISPLAY}
            </a>
            <a
              href="#uslugi"
              onClick={scrollToServices}
              className="group inline-flex items-center gap-2 text-[14px] font-semibold text-paper/80 transition-mh hover:text-yellow"
            >
              Zobacz dwie linie usług
              <ArrowRight className="h-4 w-4 transition-mh group-hover:translate-x-1" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      <p className="sr-only">
        Transport wliczony w ofertę · Wynajem z obsługą lub bez · Nowy, atestowany sprzęt ·
        Ubezpieczenie towaru w cenie · Wycena w 24 h · Bez ukrytych kosztów
      </p>
    </section>
  );
};

export default Hero;
