import type { MouseEvent as ReactMouseEvent } from "react";
import { ArrowRight, Phone, ShieldCheck, Truck, Users } from "lucide-react";
import heroDesktopImg from "@/assets/hero-redesign-desktop-gpt-v4.jpg";
import heroMobileImg from "@/assets/hero-redesign-mobile-gpt-v4.jpg";
import { scrollToHash } from "@/lib/scrollToHash";

const PHONE_DISPLAY = "+48 730 857 710";
const PHONE_HREF = "tel:+48730857710";

const BENEFITS = [
  {
    icon: Truck,
    label: "Transport wliczony w ofertę",
  },
  {
    icon: Users,
    label: "Wynajem z obsługą lub bez",
  },
  {
    icon: ShieldCheck,
    label: "Nowy, atestowany sprzęt",
  },
];

const Hero = () => {
  const scrollToServices = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    scrollToHash("#uslugi");
  };

  return (
    <section
      id="top"
      aria-label="Wprowadzenie"
      className="relative isolate overflow-hidden bg-navy-deep text-paper"
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
      <div
        className="absolute inset-0 z-0 md:hidden"
        style={{
          background:
            "linear-gradient(90deg, hsl(var(--navy-deep) / 0.78) 0%, hsl(var(--navy-deep) / 0.58) 25%, hsl(var(--navy-deep) / 0.28) 51%, hsl(var(--navy-deep) / 0.10) 74%, hsl(var(--navy-deep) / 0.38) 100%), linear-gradient(0deg, hsl(var(--navy-deep) / 0.86) 0%, transparent 24%, transparent 74%, hsl(var(--ink) / 0.45) 100%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 z-0 hidden md:block"
        style={{
          background:
            "linear-gradient(90deg, hsl(var(--navy-deep) / 0.56) 0%, hsl(var(--navy-deep) / 0.42) 25%, hsl(var(--navy-deep) / 0.18) 51%, hsl(var(--navy-deep) / 0.06) 74%, hsl(var(--navy-deep) / 0.30) 100%), linear-gradient(0deg, hsl(var(--navy-deep) / 0.72) 0%, transparent 24%, transparent 74%, hsl(var(--ink) / 0.32) 100%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 z-0 opacity-[0.08] mix-blend-soft-light"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.86' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "180px",
        }}
        aria-hidden="true"
      />

      <div className="container-mh relative z-10 min-h-[620px] pt-[92px] pb-7 sm:min-h-[560px] md:min-h-[390px] md:pt-[82px] lg:min-h-[418px]">
        <div className="max-w-[28rem] md:ml-[15vw] md:max-w-[30rem] lg:ml-[190px] xl:ml-[210px]">
          <h1
            aria-label="Przeprowadzki bez problemów. Atrakcje, które zapamiętasz."
            className="font-black leading-[0.98] tracking-normal text-paper"
            style={{ fontSize: "clamp(2.05rem, 3.7vw, 3.15rem)" }}
          >
            Przeprowadzki
            <br />
            bez problemów.
            <br />
            <span className="text-yellow">
              Atrakcje, które
              <br />
              zapamiętasz.
            </span>
          </h1>

        <p className="mt-5 max-w-[35ch] text-[14.5px] font-medium leading-relaxed text-paper/86 sm:text-[15.5px] md:mt-3 md:max-w-[46ch] md:text-[13.5px] md:leading-snug lg:text-[14.5px]">
          Mieszkania, domy, biura i dmuchańce - obsługa. Zjeżdżalnie, dmuchany zamek,
          wózek samozaładowczy, transport. Dowozimy, montujemy, pakujemy bezpiecznie i na czas.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row md:mt-4">
          <a
            href={PHONE_HREF}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-yellow px-5 text-[13.5px] font-extrabold text-navy shadow-[0_12px_28px_hsl(var(--ink)/0.2)] transition-mh hover:-translate-y-0.5 hover:bg-[hsl(45_100%_56%)] md:h-10 md:px-4 md:text-[12.5px]"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            Zadzwoń: {PHONE_DISPLAY}
          </a>
          <a
            href="#uslugi"
            onClick={scrollToServices}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-paper/35 bg-navy-deep/35 px-5 text-[13.5px] font-bold text-paper shadow-[0_10px_24px_hsl(var(--ink)/0.12)] backdrop-blur-sm transition-mh hover:border-yellow hover:text-yellow md:h-10 md:px-4 md:text-[12.5px]"
          >
            Zobacz atrakcje
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
      </div>

      <p className="sr-only">
        Transport wliczony w ofertę · Wynajem z obsługą lub bez · Nowy, atestowany sprzęt ·
        Ubezpieczenie towaru w cenie · Wycena w 24 h · Bez ukrytych kosztów
      </p>

      <div className="relative z-10 border-y border-paper/10 bg-navy-deep/72 px-4 py-3 backdrop-blur-md sm:px-6 md:border-b-0 md:bg-navy-deep/58 md:py-2.5" aria-hidden="true">
        <div className="mx-auto grid w-full max-w-[1040px] grid-cols-1 gap-2 sm:grid-cols-3 md:gap-2">
          {BENEFITS.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex min-h-10 items-center justify-center gap-3 rounded-md border border-paper/10 bg-navy-deep/70 px-4 py-2 text-center shadow-[0_14px_30px_hsl(var(--ink)/0.18)] md:min-h-9 md:px-3 md:py-1.5"
            >
              <Icon className="h-4 w-4 shrink-0 text-yellow md:h-3.5 md:w-3.5" strokeWidth={2.5} />
              <span className="text-[12px] font-extrabold leading-tight text-paper md:text-[11.5px]">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
