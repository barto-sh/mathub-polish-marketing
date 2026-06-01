import { Truck, Phone, Clock, MapPin } from "lucide-react";

const REALIZACJA = [
  "Ubezpieczenie towaru w cenie",
  "Wózek samozaładowczy, udźwig 500 kg",
  "Pasy, koce, pianka w komplecie",
];

const Footer = () => {
  return (
    <footer className="bg-[hsl(var(--navy-deep))] text-paper">
      <div className="container-mh py-16 md:py-20">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[2.2fr_1fr_1.1fr_1.2fr] lg:gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5">
              <span className="inline-flex h-[30px] w-[30px] items-center justify-center rounded-md bg-yellow" aria-hidden="true">
                <Truck className="h-[18px] w-[18px] text-navy" strokeWidth={2} />
              </span>
              <span className="text-[20px] font-semibold text-paper" style={{ letterSpacing: "-0.01em" }}>
                MatHub
              </span>
            </div>
            <p className="mt-[18px] max-w-[40ch] text-[14px] leading-relaxed text-paper/58">
              Przeprowadzki i transport bagażowy. Jednoosobowa działalność z bazą
              w Trzeszczynie, cała rozmowa, cała praca i cała odpowiedzialność u
              jednej osoby.
            </p>
          </div>

          {/* Dane firmy */}
          <div>
            <h3 className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-paper/40">Dane firmy</h3>
            <ul className="mt-[18px] space-y-2.5 text-[14px] text-paper/70">
              <li>
                <span className="text-paper/40">Nazwa:</span> MatHub
              </li>
              <li>
                <span className="text-paper/40">NIP:</span> <span className="font-mono">858-167-45-59</span>
              </li>
            </ul>
          </div>

          {/* Adres / kontakt */}
          <div>
            <h3 className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-paper/40">Adres / kontakt</h3>
            <ul className="mt-[18px] space-y-2.5 text-[14px] text-paper/70">
              <li className="group flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-[15px] w-[15px] shrink-0 text-paper/40 transition-colors group-hover:text-yellow" />
                <span>Trzeszczyn, 72-004 Police</span>
              </li>
              <li className="group flex items-center gap-2.5">
                <Phone className="h-[15px] w-[15px] shrink-0 text-paper/40 transition-colors group-hover:text-yellow" />
                <a href="tel:+48730857710" className="transition-mh hover:text-yellow">
                  +48 730 857 710
                </a>
              </li>
              <li className="group flex items-center gap-2.5">
                <Clock className="h-[15px] w-[15px] shrink-0 text-paper/40 transition-colors group-hover:text-yellow" />
                <span>Pon–Sob · 8:00–20:00</span>
              </li>
            </ul>
          </div>

          {/* Realizacja */}
          <div>
            <h3 className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-paper/40">Realizacja</h3>
            <ul className="mt-[18px] space-y-2.5 text-[14px] text-paper/70">
              {REALIZACJA.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="mt-[7px] inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-yellow" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Legal strip */}
        <div className="mt-14 flex flex-col items-start justify-between gap-2 border-t border-line-dark pt-6 font-mono text-[12px] text-paper/40 sm:flex-row sm:items-center">
          <div>© 2026 MatHub. Wszystkie prawa zastrzeżone.</div>
          <div>Zachodniopomorskie · PL</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
