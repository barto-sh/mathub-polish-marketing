const STATS = [
  { value: "500 kg+", label: "udźwig wózka samozaładowczego" },
  { value: "0", label: "ramp i wind hydraulicznych potrzebnych" },
  { value: "24 h", label: "na wycenę od zgłoszenia" },
  { value: "PL", label: "zasięg: od Szczecina do Rzeszowa" },
];

const TrustBar = () => {
  return (
    <section aria-label="Kluczowe liczby" className="bg-navy text-paper">
      <div className="container-mh py-10 md:py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="md:pl-5 md:border-l-2"
              style={{ borderColor: "hsl(45 100% 51%)" }}
            >
              <div className="text-yellow text-[28px] md:text-[34px] font-semibold leading-none tracking-tight">
                {s.value}
              </div>
              <div className="mt-2 text-[13px] md:text-[14px] text-paper/70 leading-snug">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
