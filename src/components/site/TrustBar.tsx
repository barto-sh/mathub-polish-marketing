import type { LucideIcon } from "lucide-react";
import {
  Clock3,
  MapPinned,
  PackageCheck,
  PartyPopper,
} from "lucide-react";

const PROOF_POINTS = [
  {
    value: "500 kg+",
    label: "transport ciężkich ładunków",
    kicker: "Przeprowadzki",
    icon: PackageCheck,
  },
  {
    value: "3 strefy",
    label: "dmuchańce, piana i obsługa",
    kicker: "Atrakcje",
    icon: PartyPopper,
  },
  {
    value: "24 h",
    label: "kontakt i wycena po zgłoszeniu",
    kicker: "Organizacja",
    icon: Clock3,
  },
  {
    value: "Cała PL",
    label: "trasy lokalne i między miastami",
    kicker: "Zasięg",
    icon: MapPinned,
  },
] satisfies Array<{
  value: string;
  label: string;
  kicker: string;
  icon: LucideIcon;
}>;

const TrustBar = () => {
  return (
    <section
      aria-label="Kluczowe liczby"
      className="relative overflow-hidden bg-navy-deep py-4 text-paper md:py-6"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,hsl(var(--yellow)/0.42),transparent)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px bg-paper/10"
      />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:grid-cols-4 md:gap-3">
          {PROOF_POINTS.map((point) => {
            const Icon = point.icon;

            return (
              <article
                key={point.label}
                className="group relative flex min-h-24 items-center gap-3 overflow-hidden rounded-lg border border-paper/10 bg-[linear-gradient(145deg,hsl(var(--navy)/0.68),hsl(var(--navy-deep)/0.96))] p-3 text-left shadow-[0_18px_48px_hsl(var(--navy-deep)/0.28)] md:min-h-28 md:gap-3.5 md:p-4"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-[2px] bg-[linear-gradient(90deg,hsl(var(--yellow)/0.08),hsl(var(--yellow)/0.9),hsl(var(--yellow)/0.08))]"
                />
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-3 h-px w-10 bg-yellow/55 md:left-4 md:w-12"
                />

                <div className="relative z-10 grid h-9 w-9 flex-none place-items-center rounded-md border border-yellow/30 bg-yellow/12 text-yellow shadow-[inset_0_1px_0_hsl(var(--paper)/0.12),0_10px_24px_hsl(var(--yellow)/0.08)] md:h-11 md:w-11">
                  <Icon className="h-[18px] w-[18px] stroke-[1.9] md:h-[21px] md:w-[21px]" />
                </div>

                <div className="relative z-10 min-w-0 flex-1">
                  <p className="mb-1 text-[8px] font-black uppercase leading-[1.1] tracking-[0.08em] text-yellow/82 md:text-[9px] md:tracking-[0.14em]">
                    {point.kicker}
                  </p>
                  <strong className="block font-heading text-[1.32rem] font-black leading-[1.08] tracking-normal text-paper md:text-[1.55rem]">
                    {point.value}
                  </strong>
                  <p className="mt-1 text-[0.7rem] font-semibold leading-snug tracking-normal text-paper/72 md:mt-1.5 md:text-[0.76rem]">
                    {point.label}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
