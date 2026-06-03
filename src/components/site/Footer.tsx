import { useEffect, useRef } from "react";
import { Truck, Phone, Clock, MapPin } from "lucide-react";

const REALIZACJA = [
  "Ubezpieczenie towaru w cenie",
  "Wózek samozaładowczy, udźwig 500 kg",
  "Pasy, koce, pianka w komplecie",
];

const Footer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 3D Wireframe Canvas Animation Logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    // Grid properties
    const cols = 24;
    const rows = 14;
    let offset = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = "rgba(255, 193, 7, 0.08)"; // Brand gold with low alpha
      ctx.lineWidth = 1;

      // Animate grid offset forward to simulate driving
      offset = (offset + 0.5) % 40;

      // Draw perspective perspective grid lines
      for (let r = 0; r < rows; r++) {
        const y = (r * 40 - offset) + 20;
        if (y < 0 || y > height) continue;

        // Fade lines as they approach the horizon (top)
        const alpha = (y / height) * 0.15;
        ctx.strokeStyle = `rgba(255, 193, 7, ${alpha})`;

        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw converging vertical lines for perspective road effect
      const centerX = width / 2;
      for (let c = 0; c <= cols; c++) {
        const xOffset = (c - cols / 2) * (width / cols) * 1.8;

        ctx.strokeStyle = "rgba(255, 193, 7, 0.04)";
        ctx.beginPath();
        ctx.moveTo(centerX + xOffset * 0.1, 0); // Converge at horizon
        ctx.lineTo(centerX + xOffset, height);  // Diverge at front
        ctx.stroke();
      }

      animFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animFrameId);
    };
  }, []);

  return (
    <footer className="relative bg-[hsl(var(--navy-deep))] text-paper overflow-hidden">
      {/* 3D Wireframe Canvas Overlay */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      <div className="container-mh relative z-10 py-16 md:py-20">
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
                <a href="tel:+48730857710" className="transition-all duration-200 hover:text-yellow">
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
        <div className="mt-14 flex flex-col items-start justify-between gap-2 border-t border-white/10 pt-6 font-mono text-[12px] text-paper/40 sm:flex-row sm:items-center">
          <div>© 2026 MatHub. Wszystkie prawa zastrzeżone.</div>
          <div>Zachodniopomorskie · PL</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
