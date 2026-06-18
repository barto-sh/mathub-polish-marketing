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
    label: "ciężkie rzeczy bez rampy",
    kicker: "Wózek",
    icon: PackageCheck,
  },
  {
    value: "Dowóz",
    label: "dmuchańce, piana i obsługa",
    kicker: "Eventy",
    icon: PartyPopper,
  },
  {
    value: "24 h",
    label: "kontakt i dostępność terminu",
    kicker: "Wycena",
    icon: Clock3,
  },
  {
    value: "Lokalnie + PL",
    label: "trasy pod transport i eventy",
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
      aria-label="Najważniejsze atuty"
      className="relative overflow-hidden border-y border-paper/10 bg-navy-deep py-3 text-paper sm:py-4"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,hsl(var(--yellow)/0.42),transparent)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent,hsl(var(--paper)/0.12),transparent)]"
      />

      <div className="container-mh relative z-10">
        <dl className="grid grid-cols-2 overflow-hidden rounded-md border border-paper/10 bg-[linear-gradient(180deg,hsl(var(--paper)/0.052),hsl(var(--paper)/0.018))] md:grid-cols-4">
          {PROOF_POINTS.map((point, idx) => {
            const Icon = point.icon;

            return (
              <div
                key={point.label}
                className={`relative flex min-h-[92px] items-start gap-2.5 px-3 py-4 text-left sm:min-h-[88px] sm:items-center sm:gap-3 sm:px-4 md:min-h-[76px] lg:px-5 ${
                  idx % 2 === 1 ? "max-md:border-l max-md:border-paper/10" : ""
                } ${idx < 2 ? "max-md:border-b max-md:border-paper/10" : ""} ${
                  idx > 0 ? "md:border-l md:border-paper/10" : ""
                }`}
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-3 top-0 h-px bg-[linear-gradient(90deg,hsl(var(--yellow)/0.38),transparent)] md:inset-x-4"
                />
                <span
                  aria-hidden="true"
                  className="mt-0.5 grid h-6 w-6 flex-none place-items-center rounded-sm border border-yellow/[0.18] bg-yellow/[0.07] text-yellow/[0.78] sm:mt-0 sm:h-7 sm:w-7"
                >
                  <Icon className="h-[13px] w-[13px] stroke-[1.8] sm:h-[15px] sm:w-[15px]" />
                </span>

                <div className="relative z-10 min-w-0 flex-1">
                  <dt className="text-[8px] font-bold uppercase leading-none tracking-[0.16em] text-yellow/[0.74] sm:text-[9px] sm:tracking-[0.18em]">
                    {point.kicker}
                  </dt>
                  <dd className="mt-1.5 block text-[1.08rem] font-bold leading-none tracking-tight text-paper sm:text-[1.16rem] md:text-[1.08rem] lg:text-[1.18rem]">
                    {point.value}
                  </dd>
                  <dd className="mt-1.5 text-[0.68rem] font-semibold leading-snug text-paper/[0.62] sm:text-[0.72rem] lg:text-[0.76rem]">
                    {point.label}
                  </dd>
                </div>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
};

export default TrustBar;
