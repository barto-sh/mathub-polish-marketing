const Footer = () => {
  return (
    <footer className="bg-[hsl(var(--navy-deep))] text-paper">
      <div className="container-mh py-16 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-10 lg:gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5">
              <span
                className="inline-flex h-7 w-7 items-center justify-center rounded-sm bg-yellow"
                aria-hidden="true"
              >
                <span className="text-navy text-[14px] font-bold leading-none">M</span>
              </span>
              <span
                className="text-[20px] font-semibold text-paper"
                style={{ letterSpacing: "-0.01em" }}
              >
                MatHub
              </span>
            </div>
            <p className="mt-5 text-[14px] leading-relaxed text-paper/60 max-w-[42ch]">
              Przeprowadzki i transport bagażowy. Jednoosobowa działalność z bazą
              w Trzeszczynie — cała rozmowa, cała robota i cała odpowiedzialność u
              jednej osoby.
            </p>
          </div>

          {/* Dane firmy */}
          <div>
            <div className="kicker text-yellow text-[11px]">Dane firmy</div>
            <ul className="mt-4 space-y-2 text-[13.5px] text-paper/70">
              <li>
                <span className="text-paper/50">Nazwa:</span> MatHub
              </li>
              <li>
                <span className="text-paper/50">JDG / NIP:</span> _________
              </li>
              <li>
                <span className="text-paper/50">REGON:</span> _________
              </li>
            </ul>
          </div>

          {/* Adres */}
          <div>
            <div className="kicker text-yellow text-[11px]">Adres / kontakt</div>
            <ul className="mt-4 space-y-2 text-[13.5px] text-paper/70">
              <li>
                <span className="text-paper/50">Baza:</span> Trzeszczyn, 72-004 Police
              </li>
              <li>
                <span className="text-paper/50">Telefon:</span>{" "}
                <a href="tel:+48000000000" className="hover:text-yellow transition-mh">
                  +48 XXX XXX XXX
                </a>
              </li>
              <li>
                <span className="text-paper/50">E-mail:</span>{" "}
                <a
                  href="mailto:kontakt@mathub.pl"
                  className="hover:text-yellow transition-mh"
                >
                  kontakt@mathub.pl
                </a>
              </li>
            </ul>
          </div>

          {/* Realizacja */}
          <div>
            <div className="kicker text-yellow text-[11px]">Realizacja</div>
            <ul className="mt-4 space-y-2.5 text-[13.5px] text-paper/70">
              {[
                "Ubezpieczenie towaru w cenie",
                "Wózek samozaładowczy · udźwig 500 kg",
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
