import { Phone, Clock, MapPin, ArrowRight } from "lucide-react";

const PHONE_DISPLAY = "+48 730 857 710";
const PHONE_HREF = "tel:+48730857710";

const Contact = () => {
  return (
    <section id="kontakt" aria-label="Kontakt" className="bg-navy text-paper py-20 md:py-28">
      <div className="container-mh">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-16 items-start">
          <div>
            <div className="kicker text-yellow">Kontakt</div>
            <h2 className="h2 mt-3 text-paper">Masz termin. Potrzebujesz wyceny.</h2>
            <p className="lede mt-5 text-paper/75 max-w-[48ch]">
              Telefon to najszybszy kanał, dzwonisz, opisujesz sytuację, dostajesz
              orientacyjną cenę w trakcie rozmowy. Jeśli nie odbiorę od razu,
              oddzwonię w godzinach pracy.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {/* Primary — phone */}
            <a
              href={PHONE_HREF}
              className="group flex items-center gap-5 rounded-md bg-yellow text-navy p-5 md:p-6 transition-mh hover:bg-[#ffd34d] hover:translate-x-1 shadow-sm"
            >
              <span
                className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-sm bg-navy/10"
                aria-hidden="true"
              >
                <Phone className="h-5 w-5 text-navy" />
              </span>
              <div className="flex-1 min-w-0">
                <div className="text-[12px] font-semibold uppercase tracking-wider text-navy/70">
                  Zadzwoń
                </div>
                <div className="text-[20px] md:text-[22px] font-semibold leading-tight">
                  {PHONE_DISPLAY}
                </div>
                <div className="mt-0.5 text-[13px] text-navy/70">
                  Pon–Sob · 8:00–20:00
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-navy shrink-0" aria-hidden="true" />
            </a>

            {/* Availability */}
            <div
              className="group flex items-center gap-5 rounded-md p-5 md:p-6 border transition-mh hover:translate-x-1"
              style={{
                backgroundColor: "hsl(0 0% 100% / 0.04)",
                borderColor: "hsl(0 0% 100% / 0.12)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "hsl(45 100% 51%)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "hsl(0 0% 100% / 0.12)")}
            >
              <span
                className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-sm"
                style={{ backgroundColor: "hsl(0 0% 100% / 0.06)" }}
                aria-hidden="true"
              >
                <Clock className="h-5 w-5 text-yellow" />
              </span>
              <div className="flex-1 min-w-0">
                <div className="text-[12px] font-semibold uppercase tracking-wider text-paper/60">
                  Dostępność
                </div>
                <div className="text-[18px] md:text-[20px] font-semibold leading-tight text-paper">
                  Oddzwaniam po nieodebranych
                </div>
                <div className="mt-0.5 text-[13px] text-paper/60">
                  Najlepiej telefonicznie, bez formularzy
                </div>
              </div>
            </div>

            {/* Info — base */}
            <div
              className="flex items-start gap-5 p-5 md:p-6"
              style={{ borderLeft: "3px solid hsl(45 100% 51%)" }}
            >
              <span
                className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-sm"
                style={{ backgroundColor: "hsl(0 0% 100% / 0.06)" }}
                aria-hidden="true"
              >
                <MapPin className="h-5 w-5 text-yellow" />
              </span>
              <div className="flex-1 min-w-0">
                <div className="text-[12px] font-semibold uppercase tracking-wider text-paper/60">
                  Baza
                </div>
                <div className="text-[18px] md:text-[20px] font-semibold leading-tight text-paper">
                  Trzeszczyn, 72-004 Police
                </div>
                <div className="mt-0.5 text-[13px] text-paper/60">
                  Zachodniopomorskie · 53.55° N · 14.52° E
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
