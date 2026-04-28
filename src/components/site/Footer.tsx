import { Truck, Phone, Clock, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[hsl(var(--navy-deep))] text-paper">
      <div className="container-mh py-16 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-10 lg:gap-12">
          {/* Brand & Description */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-2.5">
              <span
                className="inline-flex h-8 w-8 items-center justify-center rounded-sm bg-yellow"
                aria-hidden="true"
              >
                <Truck className="h-5 w-5 text-navy" strokeWidth={2.25} />
              </span>
              <span
                className="text-[22px] font-semibold text-paper"
                style={{ letterSpacing: "-0.01em" }}
              >
                MatHub
              </span>
            </div>
            <p className="mt-1 text-[14px] leading-relaxed text-paper/60 max-w-[42ch]">
              Przeprowadzki i transport bagażowy. Jednoosobowa działalność z bazą
              w Trzeszczynie, cała rozmowa, cała praca i cała odpowiedzialność u
              jednej osoby.
            </p>
          </div>

          {/* Dane firmy */}
          <div>
            <h3 className="kicker text-yellow text-[11px]">Dane firmy</h3>
            <ul className="mt-4 space-y-2 text-[13.5px] text-paper/70">
              <li>
                <span className="text-paper/50">Nazwa:</span> MatHub
              </li>
              <li>
                <span className="text-paper/50">NIP:</span> 858-167-45-59
              </li>
            </ul>
          </div>

          {/* Kontakt */}
          <div>
            <h3 className="kicker text-yellow text-[11px]">Adres / kontakt</h3>
            <ul className="mt-4 space-y-3 text-[13.5px] text-paper/70">
              <li className="flex items-start gap-2.5 group">
                <MapPin className="h-4 w-4 mt-0.5 text-paper/50 transition-colors group-hover:text-yellow shrink-0" />
                <span>Trzeszczyn, 72-004 Police</span>
              </li>
              <li className="flex items-center gap-2.5 group">
                <Phone className="h-4 w-4 text-paper/50 transition-colors group-hover:text-yellow shrink-0" />
                <a href="tel:+48730857710" className="hover:text-yellow transition-mh">
                  +48 730 857 710
                </a>
              </li>
              <li className="flex items-center gap-2.5 group">
                <Clock className="h-4 w-4 text-paper/50 transition-colors group-hover:text-yellow shrink-0" />
                <span>Pon–Sob · 8:00–20:00</span>
              </li>
            </ul>
          </div>

          {/* Realizacja */}
          <div>
            <h3 className="kicker text-yellow text-[11px]">Realizacja</h3>
            <ul className="mt-4 space-y-2.5 text-[13.5px] text-paper/70">
              {[
                "Ubezpieczenie towaru w cenie",
                "Wózek samozaładowczy, udźwig 500 kg",
                "Pasy, koce, pianka w komplecie",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span
                    className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-yellow shrink-0"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Legal strip */}
        <div className="mt-14 pt-6 border-t border-line-dark flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[12.5px] text-paper/50">
          <div>© 2026 MatHub. Wszystkie prawa zastrzeżone.</div>
          <div>Zachodniopomorskie · PL</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
