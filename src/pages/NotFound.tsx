import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Truck } from "lucide-react";

const NotFound = () => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "404 — MatHub";

    return () => {
      document.title = previousTitle;
    };
  }, []);

  return (
    <main className="min-h-screen bg-paper text-ink flex items-center justify-center px-6 py-16">
      <div className="max-w-md text-center">
        <div className="mx-auto mb-8 inline-flex items-center gap-2.5">
          <span
            className="inline-flex h-9 w-9 items-center justify-center rounded-sm bg-yellow"
            aria-hidden="true"
          >
            <Truck className="h-5 w-5 text-navy" strokeWidth={2.25} />
          </span>
          <span
            className="text-[24px] font-semibold text-ink"
            style={{ letterSpacing: "-0.01em" }}
          >
            MatHub
          </span>
        </div>
        <div className="kicker text-yellow-ink">404</div>
        <h1 className="h2 mt-3 text-ink">Nie znaleźliśmy tej strony.</h1>
        <p className="mt-4 text-[15px] leading-relaxed text-ink/65">
          Link mógł się zmienić albo strona została przeniesiona. Wróć na stronę
          główną i sprawdź aktualne informacje o przeprowadzkach.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-sm bg-yellow px-5 h-12 text-[15px] font-semibold text-navy transition-mh hover:bg-[hsl(45_100%_56%)] shadow-sm"
        >
          Wróć do strony głównej
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
