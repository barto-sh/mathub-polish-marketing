import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Bath,
  Building2,
  Castle,
  Home,
  PartyPopper,
  Phone,
  Ruler,
  ShieldCheck,
  SlidersHorizontal,
  Truck,
  Waves,
} from "lucide-react";
import eventAttractions from "@/assets/services-event-attractions-gpt-v1.jpg";
import svcAppliance from "@/assets/svc-appliance.jpg";
import svcBoxes from "@/assets/svc-boxes.jpg";
import svcOffice from "@/assets/svc-office.jpg";

const PHONE_DISPLAY = "+48 730 857 710";
const PHONE_HREF = "tel:+48730857710";

const TRANSPORT_SCOPE = [
  {
    icon: Home,
    title: "Mieszkania i domy",
    body: "Kartony, meble, demontaż, zabezpieczenie, wniesienie i ustawienie na miejscu.",
  },
  {
    icon: Building2,
    title: "Biura",
    body: "Biurka, archiwa, wyposażenie firm. Możliwa realizacja poza godzinami pracy.",
  },
  {
    icon: Bath,
    title: "Meble + AGD / RTV",
    body: "Pojedyncze odbiory, sprzęt w pasach, transport z wniesieniem albo bez.",
  },
  {
    icon: Ruler,
    title: "Ponadgabaryty",
    body: "Fortepian, motocykl, sprzęt specjalny i zlecenia wymagające osobnej wyceny.",
  },
];

const EVENT_SCOPE = [
  {
    icon: Castle,
    title: "Zjeżdżalnia Jungla 4",
    body: "Dmuchana zjeżdżalnia z dowozem, rozstawieniem i odbiorem pod ustalony termin.",
  },
  {
    icon: PartyPopper,
    title: "Plac Zabaw Ośmiornica 2",
    body: "Dmuchany plac zabaw z mocną identyfikacją wizualną dla dziecięcej strefy wydarzenia.",
  },
  {
    icon: Waves,
    title: "Piana Party 1000 W",
    body: "Wytwornica piany w skrzyni transportowej, płyn i przygotowanie stanowiska.",
  },
  {
    icon: SlidersHorizontal,
    title: "Obsługa lub sam wynajem",
    body: "Sprzęt z obsługą ekipy albo bez obsługi. Cena ustalana pod termin i lokalizację.",
  },
];

const SERVICE_FACTS = [
  { label: "Warunki", value: "Teren + prąd" },
  { label: "Sprzęt", value: "Atestowany" },
  { label: "Obsługa", value: "Z ekipą / bez" },
  { label: "Termin", value: "Ustalany w rozmowie" },
];

const TRANSPORT_HERO = {
  img: svcBoxes,
  alt: "Kartony przygotowane do przeprowadzki.",
};

const TRANSPORT_THUMBS = [
  { img: svcOffice, alt: "Biuro przygotowane do przeprowadzki." },
  { img: svcAppliance, alt: "AGD zabezpieczone pasami transportowymi." },
];

const formatIndex = (i: number) => String(i + 1).padStart(2, "0");

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || !("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -80px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const reveal = (i: number) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(18px)",
    transition:
      "opacity 650ms cubic-bezier(0.2, 0.8, 0.2, 1), transform 650ms cubic-bezier(0.2, 0.8, 0.2, 1)",
    transitionDelay: `${120 + i * 70}ms`,
  });

  return (
    <section
      ref={sectionRef}
      id="uslugi"
      aria-label="Usługi"
      className="relative overflow-hidden bg-paper py-20 sm:py-24 md:py-28 lg:py-32"
    >
      {/* Subtle dot grid texture — adds depth without grain */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, hsl(var(--ink) / 0.14) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage:
            "linear-gradient(180deg, transparent 0%, black 12%, black 88%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(180deg, transparent 0%, black 12%, black 88%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      <div className="container-mh relative z-10">
        {/* HEADER — editorial two-column */}
        <div className="grid gap-7 md:gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.85fr)] lg:items-end lg:gap-20">
          <div style={reveal(0)}>
            <div className="flex items-center gap-3">
              <span
                className="inline-block h-2 w-2 rounded-full bg-yellow-ink"
                aria-hidden="true"
              />
              <span className="font-mono text-[11.5px] font-bold uppercase tracking-[0.18em] text-yellow-ink">
                Oferta
              </span>
            </div>
            <h2 className="h2 mt-4 max-w-[18ch] text-ink">
              Co robimy — od transportu po atrakcje.
            </h2>
          </div>
          <p
            className="max-w-[500px] text-[15px] font-medium leading-relaxed text-ink/[0.72] md:text-[16px] lg:justify-self-end lg:pb-1"
            style={reveal(1)}
          >
            Dwie linie usług, jeden sposób pracy: dowóz, zabezpieczenie,
            rozstawienie i odbiór ustalony przed realizacją.
          </p>
        </div>

        <div
          className="mt-9 h-px w-full bg-gradient-to-r from-yellow-ink/50 via-line to-transparent md:mt-11"
          aria-hidden="true"
          style={reveal(2)}
        />

        {/* MAIN GRID: transport + events */}
        <div className="mt-10 grid grid-cols-1 items-stretch gap-6 md:mt-12 lg:grid-cols-2 lg:gap-8">
          {/* Transport card */}
          <article
            className="group/card flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white shadow-[0_24px_80px_-16px_hsl(var(--ink)/0.08)] transition-mh hover:-translate-y-1 hover:shadow-[0_32px_96px_-16px_hsl(var(--ink)/0.12)]"
            style={reveal(3)}
          >
            {/* Hero image + thumbnails */}
            <div className="relative aspect-[4/3] overflow-hidden border-b border-line bg-line">
              <div className="grid h-full grid-rows-[minmax(0,2.05fr)_minmax(0,1fr)] gap-px">
                <div className="relative min-h-0 overflow-hidden bg-white">
                  <img
                    src={TRANSPORT_HERO.img}
                    alt={TRANSPORT_HERO.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-mh group-hover/card:scale-[1.03]"
                  />
                </div>
                <div className="grid min-h-0 grid-cols-2 gap-px">
                  {TRANSPORT_THUMBS.map((item, idx) => (
                    <div
                      key={idx}
                      className="group/thumb relative min-h-0 overflow-hidden bg-white"
                    >
                      <img
                        src={item.img}
                        alt={item.alt}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 ease-mh group-hover/thumb:scale-[1.05]"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-1 flex-col p-6 sm:p-7 lg:p-8">
              <div className="flex items-start gap-3.5">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-line bg-cream text-navy">
                  <Truck className="h-[18px] w-[18px]" strokeWidth={1.8} />
                </span>
                <div className="min-w-0 pt-0.5">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-yellow-ink/90">
                    Transport
                  </span>
                  <h3 className="text-[19px] font-semibold tracking-tight text-ink sm:text-[21px]">
                    Przeprowadzki i przewóz rzeczy
                  </h3>
                </div>
              </div>

              <ul className="mt-7 grid gap-3.5">
                {TRANSPORT_SCOPE.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <li
                      key={item.title}
                      className="group/item relative flex min-h-[92px] items-start gap-4 rounded-lg border border-transparent p-3.5 transition-mh hover:border-line hover:bg-cream/50"
                    >
                      <span
                        className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-line bg-paper text-navy"
                        aria-hidden="true"
                      >
                        <Icon className="h-[15px] w-[15px]" strokeWidth={1.8} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline justify-between gap-3">
                          <h4 className="text-[15px] font-semibold text-ink sm:text-[16px]">
                            {item.title}
                          </h4>
                          <span className="font-mono text-[11px] font-semibold text-ink/25 transition-mh group-hover/item:text-yellow-ink/70">
                            {formatIndex(idx)}
                          </span>
                        </div>
                        <p className="mt-1 text-[14px] leading-relaxed text-ink/65">
                          {item.body}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </article>

          {/* Events card */}
          <article
            className="group/card flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white shadow-[0_24px_80px_-16px_hsl(var(--ink)/0.08)] transition-mh hover:-translate-y-1 hover:shadow-[0_32px_96px_-16px_hsl(var(--ink)/0.12)]"
            style={reveal(4)}
          >
            <div className="relative aspect-[4/3] overflow-hidden border-b border-line">
              <img
                src={eventAttractions}
                alt="Dmuchana zjeżdżalnia, dmuchany plac zabaw ośmiornica, maszyna do piany, kartony i wózek transportowy."
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 ease-mh group-hover/card:scale-[1.03]"
                style={{
                  objectPosition: "62% center",
                }}
              />
            </div>

            <div className="flex flex-1 flex-col p-6 sm:p-7 lg:p-8">
              <div className="flex items-start gap-3.5">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-line bg-cream text-navy">
                  <PartyPopper
                    className="h-[18px] w-[18px]"
                    strokeWidth={1.8}
                  />
                </span>
                <div className="min-w-0 pt-0.5">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-yellow-ink/90">
                    Atrakcje
                  </span>
                  <h3 className="text-[19px] font-semibold tracking-tight text-ink sm:text-[21px]">
                    Dmuchańce i piana party
                  </h3>
                </div>
              </div>

              <ul className="mt-7 grid gap-3.5">
                {EVENT_SCOPE.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <li
                      key={item.title}
                      className="group/item relative flex min-h-[92px] items-start gap-4 rounded-lg border border-transparent p-3.5 transition-mh hover:border-line hover:bg-cream/50"
                    >
                      <span
                        className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-line bg-paper text-navy"
                        aria-hidden="true"
                      >
                        <Icon className="h-[15px] w-[15px]" strokeWidth={1.8} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline justify-between gap-3">
                          <h4 className="text-[15px] font-semibold text-ink sm:text-[16px]">
                            {item.title}
                          </h4>
                          <span className="font-mono text-[11px] font-semibold text-ink/25 transition-mh group-hover/item:text-yellow-ink/70">
                            {formatIndex(idx)}
                          </span>
                        </div>
                        <p className="mt-1 text-[14px] leading-relaxed text-ink/65">
                          {item.body}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </article>
        </div>

        {/* Proof strip — inline spec */}
        <div
          className="mt-10 hidden items-center justify-between gap-px overflow-hidden rounded-xl border border-line bg-line sm:flex lg:mt-12"
          style={reveal(5)}
        >
          {SERVICE_FACTS.map((fact, idx) => (
            <div
              key={fact.label}
              className={`flex flex-1 items-center justify-center gap-3 bg-white px-4 py-5 ${idx > 0 ? "border-l border-line" : ""}`}
            >
              <ShieldCheck className="h-5 w-5 shrink-0 text-yellow-ink" strokeWidth={1.8} />
              <div className="min-w-0">
                <span className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-ink/50">
                  {fact.label}
                </span>
                <span className="block text-[14px] font-semibold text-ink">
                  {fact.value}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile proof strip */}
        <div
          className="mt-10 grid grid-cols-2 gap-3 sm:hidden lg:mt-12"
          style={reveal(5)}
        >
          {SERVICE_FACTS.map((fact) => (
            <div
              key={fact.label}
              className="flex items-center gap-3 rounded-lg border border-line bg-white px-4 py-4"
            >
              <ShieldCheck className="h-5 w-5 shrink-0 text-yellow-ink" strokeWidth={1.8} />
              <div className="min-w-0">
                <span className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-ink/50">
                  {fact.label}
                </span>
                <span className="block text-[14px] font-semibold text-ink">
                  {fact.value}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* CLOSING CTA */}
        <div
          className="relative mt-12 flex flex-col items-start justify-between gap-6 overflow-hidden rounded-xl border border-line bg-cream p-6 sm:flex-row sm:items-center sm:p-8 lg:mt-16"
          style={reveal(6)}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              background:
                "linear-gradient(135deg, hsl(var(--yellow) / 0.16) 0%, transparent 45%)",
            }}
            aria-hidden="true"
          />
          <div className="relative z-10">
            <p className="text-[16px] font-semibold text-ink sm:text-[17px]">
              Powiedz, czego dotyczy termin.
            </p>
            <p className="mt-1 text-[14px] text-ink/65">
              Przeprowadzka: skąd–dokąd, piętro, gabaryty. Atrakcja: data,
              miejsce, teren i dostęp do prądu.
            </p>
          </div>
          <a
            href={PHONE_HREF}
            className="relative z-10 inline-flex h-11 shrink-0 items-center gap-2.5 rounded-md bg-yellow px-5 text-[13.5px] font-extrabold text-navy shadow-[0_12px_28px_hsl(var(--ink)/0.14)] transition-mh hover:-translate-y-0.5 hover:bg-[hsl(45_100%_56%)]"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {PHONE_DISPLAY}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
