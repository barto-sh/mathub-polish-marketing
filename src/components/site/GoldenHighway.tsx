import { useEffect, useRef } from "react";
import { getGoldenHighwayScene } from "./goldenHighwayScene";

/* ============================================================
   GoldenHighway — world-class driver's POV 3D highway canvas
   background for the MatHub footer.

   A perspective-projected two-lane road with:
   - asphalt surface with center seam and side curbs
   - reflective dashed center divider + solid road edges
   - low-profile side rails
   - clipped truck-POV headlight wash on the road surface
   - depth fog, DPR-aware resizing, IntersectionObserver pause
   - prefers-reduced-motion support
   ============================================================ */

interface HighwayState {
  ctx: CanvasRenderingContext2D;
  dpr: number;
  width: number;
  height: number;
  zOffset: number;
  baseSpeed: number;
  scrollBoost: number;
  lastTime: number;
  reducedMotion: boolean;
}

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

const GoldenHighway = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || import.meta.env.MODE === "test") return;

    let ctx: CanvasRenderingContext2D | null = null;
    try {
      ctx = canvas.getContext("2d");
    } catch {
      return;
    }
    if (!ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const state: HighwayState = {
      ctx,
      dpr: Math.min(window.devicePixelRatio || 1, 2),
      width: canvas.offsetWidth,
      height: canvas.offsetHeight,
      zOffset: 0,
      baseSpeed: reducedMotion ? 0 : 220,
      scrollBoost: 0,
      lastTime: performance.now(),
      reducedMotion,
    };

    const resize = () => {
      state.width = canvas.offsetWidth;
      state.height = canvas.offsetHeight;
      canvas.width = Math.floor(state.width * state.dpr);
      canvas.height = Math.floor(state.height * state.dpr);
      ctx.resetTransform();
      ctx.scale(state.dpr, state.dpr);
    };
    resize();

    const onResize = () => {
      state.dpr = Math.min(window.devicePixelRatio || 1, 2);
      resize();
      if (state.reducedMotion) {
        draw(performance.now());
      }
    };
    window.addEventListener("resize", onResize);

    // Scroll-linked speed boost.
    let lastScrollY = window.scrollY;
    const onScroll = () => {
      const delta = Math.abs(window.scrollY - lastScrollY);
      lastScrollY = window.scrollY;
      state.scrollBoost = Math.min(state.scrollBoost + delta * 2, 1200);
    };
    if (!state.reducedMotion) {
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    let scene = getGoldenHighwayScene(state.width, state.height);

    const project = (x: number, z: number): { x: number; y: number; scale: number } | null => {
      const dz = z - scene.cameraZ;
      if (dz <= 1) return null;
      const scale = scene.fov / dz;
      const px = state.width / 2 + x * scale;
      const py = scene.horizonY + scene.cameraY * scale;
      return { x: px, y: py, scale };
    };

    const fog = (z: number): number => {
      const dz = z - scene.cameraZ;
      return clamp((dz - scene.fogNear) / (scene.fogFar - scene.fogNear), 0, 1);
    };

    const headlightIntensity = (x: number, z: number): number => {
      const f = fog(z);
      if (f >= 0.98) return 0;

      const depth = clamp((z - (scene.cameraZ + scene.fogNear)) / 1220, 0, 1);
      const depthFalloff = Math.sin(depth * Math.PI) * 0.65 + (1 - depth) * 0.35;
      const beamOffset = 84 * scene.roadScale;
      const beamSpread = clamp(330 * scene.roadScale, 190, 330);
      const leftBeam = Math.max(0, 1 - Math.abs(x + beamOffset) / beamSpread);
      const rightBeam = Math.max(0, 1 - Math.abs(x - beamOffset) / beamSpread);
      const beam = Math.max(leftBeam, rightBeam);

      return clamp(beam * depthFalloff * (1 - f * 0.72), 0, 1);
    };

    const withRoadClip = (zNear: number, zFar: number, draw: () => void) => {
      const c = state.ctx;
      const leftNear = project(-scene.roadWidth / 2, zNear);
      const rightNear = project(scene.roadWidth / 2, zNear);
      const leftFar = project(-scene.roadWidth / 2, zFar);
      const rightFar = project(scene.roadWidth / 2, zFar);
      if (!leftNear || !rightNear || !leftFar || !rightFar) return;

      c.save();
      c.beginPath();
      c.moveTo(leftFar.x, leftFar.y);
      c.lineTo(rightFar.x, rightFar.y);
      c.lineTo(rightNear.x, rightNear.y);
      c.lineTo(leftNear.x, leftNear.y);
      c.closePath();
      c.clip();
      draw();
      c.restore();
    };

    const strokeLine = (
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      color: string,
      width: number
    ) => {
      const c = state.ctx;
      c.save();
      c.beginPath();
      c.moveTo(x1, y1);
      c.lineTo(x2, y2);
      c.strokeStyle = color;
      c.lineWidth = width;
      c.lineCap = "round";
      c.stroke();
      c.restore();
    };

    const drawRoadBand = (
      x: number,
      zStart: number,
      zEnd: number,
      widthWorld: number,
      color: string
    ) => {
      const half = widthWorld / 2;
      const nearLeft = project(x - half, zStart);
      const nearRight = project(x + half, zStart);
      const farLeft = project(x - half, zEnd);
      const farRight = project(x + half, zEnd);
      if (!nearLeft || !nearRight || !farLeft || !farRight) return;

      const c = state.ctx;
      c.save();
      c.beginPath();
      c.moveTo(farLeft.x, farLeft.y);
      c.lineTo(farRight.x, farRight.y);
      c.lineTo(nearRight.x, nearRight.y);
      c.lineTo(nearLeft.x, nearLeft.y);
      c.closePath();
      c.fillStyle = color;
      c.fill();
      c.restore();
    };

    let rafId = 0;
    let isVisible = true;

    // Draw the asphalt road surface as a perspective polygon.
    const drawRoadSurface = (zNear: number, zFar: number) => {
      const c = state.ctx;
      const leftNear = project(-scene.roadWidth / 2, zNear);
      const rightNear = project(scene.roadWidth / 2, zNear);
      const leftFar = project(-scene.roadWidth / 2, zFar);
      const rightFar = project(scene.roadWidth / 2, zFar);
      if (!leftNear || !rightNear || !leftFar || !rightFar) return;

      c.save();
      c.beginPath();
      c.moveTo(leftFar.x, leftFar.y);
      c.lineTo(rightFar.x, rightFar.y);
      c.lineTo(rightNear.x, rightNear.y);
      c.lineTo(leftNear.x, leftNear.y);
      c.closePath();

      // Base asphalt gradient.
      const grad = c.createLinearGradient(leftNear.x, leftNear.y, rightNear.x, rightNear.y);
      grad.addColorStop(0, "rgba(12, 22, 34, 0.82)");
      grad.addColorStop(0.18, "rgba(9, 16, 26, 0.68)");
      grad.addColorStop(0.5, "rgba(5, 9, 15, 0.76)");
      grad.addColorStop(0.82, "rgba(9, 16, 26, 0.68)");
      grad.addColorStop(1, "rgba(12, 22, 34, 0.82)");
      c.fillStyle = grad;
      c.fill();

      c.restore();
    };

    // Center median strip.
    const drawMedianStrip = (zNear: number, zFar: number) => {
      const halfMedian = clamp(16 * scene.roadScale, 8, 16);
      const pNearLeft = project(-halfMedian, zNear);
      const pNearRight = project(halfMedian, zNear);
      const pFarLeft = project(-halfMedian, zFar);
      const pFarRight = project(halfMedian, zFar);
      if (!pNearLeft || !pNearRight || !pFarLeft || !pFarRight) return;

      const c = state.ctx;
      c.save();
      c.beginPath();
      c.moveTo(pFarLeft.x, pFarLeft.y);
      c.lineTo(pFarRight.x, pFarRight.y);
      c.lineTo(pNearRight.x, pNearRight.y);
      c.lineTo(pNearLeft.x, pNearLeft.y);
      c.closePath();
      c.fillStyle = "rgba(4, 8, 14, 0.62)";
      c.fill();
      c.restore();
    };

    // Side curbs.
    const drawCurbs = (zNear: number, zFar: number) => {
      const curbW = clamp(12 * scene.roadScale, 7, 12);
      const leftOuter = -scene.roadWidth / 2 - curbW;
      const leftInner = -scene.roadWidth / 2;
      const rightInner = scene.roadWidth / 2;
      const rightOuter = scene.roadWidth / 2 + curbW;

      const drawCurb = (x1: number, x2: number) => {
        const p1Near = project(x1, zNear);
        const p2Near = project(x2, zNear);
        const p1Far = project(x1, zFar);
        const p2Far = project(x2, zFar);
        if (!p1Near || !p2Near || !p1Far || !p2Far) return;
        const c = state.ctx;
        c.save();
        c.beginPath();
        c.moveTo(p1Far.x, p1Far.y);
        c.lineTo(p2Far.x, p2Far.y);
        c.lineTo(p2Near.x, p2Near.y);
        c.lineTo(p1Near.x, p1Near.y);
        c.closePath();
        c.fillStyle = "rgba(255, 193, 7, 0.1)";
        c.fill();
        c.restore();
      };

      drawCurb(leftOuter, leftInner);
      drawCurb(rightInner, rightOuter);
    };

    // Road-clipped, truck-driver POV headlight wash.
    const drawHeadlightWash = (zNear: number, zFar: number) => {
      const c = state.ctx;
      const zSource = zNear + 20;
      const zFarBeam = scene.cameraZ + 1480;
      const headlightNearOffset = 92 * scene.roadScale;
      const headlightFarOffset = 130 * scene.roadScale;

      withRoadClip(zNear, zFar, () => {
        const horizonY = scene.horizonY;
        const sourceY = state.height + scene.sourceYOffset;

        // A broad low-beam flood clipped to the road plane. This avoids
        // visible lamp/truck shapes while still reading as headlights.
        const roadWash = c.createRadialGradient(
          state.width / 2,
          sourceY,
          40,
          state.width / 2,
          sourceY,
          scene.washRadius
        );
        roadWash.addColorStop(0, "rgba(255, 238, 196, 0.28)");
        roadWash.addColorStop(0.28, "rgba(255, 224, 156, 0.18)");
        roadWash.addColorStop(0.62, "rgba(255, 205, 112, 0.07)");
        roadWash.addColorStop(1, "rgba(255, 196, 92, 0)");

        c.save();
        c.globalCompositeOperation = "screen";
        c.fillStyle = roadWash;
        c.fillRect(0, horizonY - 20, state.width, state.height - horizonY + 20);
        c.restore();

        // Real truck headlights form two overlapping lobes with a soft
        // horizontal cutoff instead of two sharp cones.
        [-1, 1].forEach((side) => {
          const pNear = project(side * headlightNearOffset, zSource);
          const pFar = project(side * headlightFarOffset, zFarBeam);
          if (!pNear || !pFar) return;

          const beam = c.createRadialGradient(
            pNear.x,
            pNear.y + scene.beamYOffset,
            20,
            pFar.x,
            pFar.y + scene.beamYOffset,
            scene.beamRadius
          );
          beam.addColorStop(0, "rgba(255, 242, 205, 0.34)");
          beam.addColorStop(0.22, "rgba(255, 225, 162, 0.22)");
          beam.addColorStop(0.54, "rgba(255, 205, 118, 0.09)");
          beam.addColorStop(1, "rgba(255, 205, 118, 0)");

          c.save();
          c.globalCompositeOperation = "screen";
          c.fillStyle = beam;
          c.fillRect(0, horizonY, state.width, state.height - horizonY);
          c.restore();
        });
      });

      const drawReflectiveStreak = (
        side: number,
        sourceOffset: number,
        farOffset: number,
        width: number,
        alpha: number
      ) => {
        const pNear = project(side * sourceOffset, zSource);
        const pFar = project(side * farOffset, zFarBeam);
        if (!pNear || !pFar) return;

        c.save();
        const streak = c.createLinearGradient(pNear.x, pNear.y, pFar.x, pFar.y);
        streak.addColorStop(0, `rgba(255, 238, 195, ${alpha})`);
        streak.addColorStop(0.36, `rgba(255, 218, 148, ${alpha * 0.36})`);
        streak.addColorStop(1, "rgba(255, 210, 126, 0)");
        c.globalCompositeOperation = "screen";
        c.strokeStyle = streak;
        c.lineWidth = width;
        c.beginPath();
        c.moveTo(pNear.x, pNear.y);
        c.lineTo(pFar.x, pFar.y);
        c.stroke();
        c.restore();
      };

      withRoadClip(zNear, zFar, () => {
        [-1, 1].forEach((side) => {
          drawReflectiveStreak(side, 96 * scene.roadScale, 150 * scene.roadScale, clamp(18 * scene.roadScale, 10, 18), 0.1);
          drawReflectiveStreak(side, 46 * scene.roadScale, 70 * scene.roadScale, clamp(7 * scene.roadScale, 4, 7), 0.08);
        });
      });
    };

    // Dashed center lane divider.
    const drawLaneDivider = (zNear: number, zFar: number) => {
      const startZ = Math.floor((zNear - state.zOffset) / scene.markerSpacing) * scene.markerSpacing + state.zOffset;
      for (let z = startZ; z <= zFar; z += scene.markerSpacing) {
        const f = fog(z);
        if (f >= 0.98) continue;
        const endZ = z + scene.markerLength * clamp(1 - f * 0.5, 0.65, 1);
        const alpha = scene.laneAlpha * (1 - f);
        const paintWidth = clamp(11 * scene.roadScale * (1 - f * 0.45), 5.5, 11);
        drawRoadBand(0, z, endZ, paintWidth, `hsla(45, 100%, 62%, ${alpha})`);

        const reflectAlpha = 0.42 * headlightIntensity(0, z);
        if (reflectAlpha > 0.02) {
          drawRoadBand(0, z, endZ, paintWidth + 4, `rgba(255, 244, 212, ${reflectAlpha})`);
        }
      }
    };

    // Solid road edges with reflective paint catching the headlight wash.
    const drawLongitudinalLines = (zNear: number, zFar: number) => {
      const lanes = [-scene.roadWidth / 2, scene.roadWidth / 2];
      lanes.forEach((x) => {
        const segmentLength = 110;
        for (let z = zNear; z < zFar; z += segmentLength) {
          const zEnd = Math.min(z + segmentLength, zFar);
          const f = fog(z + segmentLength * 0.5);
          if (f >= 0.98) continue;

          const baseAlpha = scene.edgeAlpha * (1 - f);
          drawRoadBand(x, z, zEnd, clamp(8 * scene.roadScale, 5, 8), `hsla(45, 100%, 54%, ${baseAlpha})`);

          const reflectAlpha = 0.36 * headlightIntensity(x, z + segmentLength * 0.5);
          if (reflectAlpha > 0.015) {
            drawRoadBand(x, z, zEnd, clamp(13 * scene.roadScale, 7, 13), `rgba(255, 236, 190, ${reflectAlpha})`);
          }
        }
      });
    };

    // Low-profile road studs that brighten only inside the headlight wash.
    const drawReflectiveRoadStuds = (zNear: number, zFar: number) => {
      const startZ = Math.floor((zNear - state.zOffset) / scene.studSpacing) * scene.studSpacing + state.zOffset;
      for (let z = startZ; z <= zFar; z += scene.studSpacing) {
        const f = fog(z);
        if (f >= 0.98) continue;

        [-1, 1].forEach((side) => {
          const x = side * (scene.roadWidth / 2 - clamp(42 * scene.roadScale, 20, 42));
          const intensity = headlightIntensity(x, z);
          const alpha = 0.06 * (1 - f) + 0.48 * intensity;
          if (alpha < 0.035) return;

          const length = clamp((24 * (1 - f) + 8) * scene.roadScale, 10, 24);
          const width = clamp((18 * (1 - f) + 5) * scene.roadScale, 6, 18);
          drawRoadBand(x, z, z + length, width, `rgba(255, 214, 120, ${alpha})`);

          const hotAlpha = 0.26 * intensity;
          if (hotAlpha > 0.035) {
            drawRoadBand(x, z + length * 0.25, z + length * 0.82, width * 0.52, `rgba(255, 248, 220, ${hotAlpha})`);
          }
        });
      }
    };

    // Continuous side rails kept intentionally subtle to avoid flashing ticks.
    const drawGuardrails = (zNear: number, zFar: number) => {
      const railOffset = clamp(48 * scene.roadScale, 24, 48);
      const leftRailX = -scene.roadWidth / 2 - railOffset;
      const rightRailX = scene.roadWidth / 2 + railOffset;

      [leftRailX, rightRailX].forEach((x) => {
        const segmentLength = 130;
        for (let z = zNear; z < zFar; z += segmentLength) {
          const zEnd = Math.min(z + segmentLength, zFar);
          const f = fog(z + segmentLength * 0.5);
          if (f >= 0.98) continue;
          const pNear = project(x, z);
          const pFar = project(x, zEnd);
          if (!pNear || !pFar) continue;
          strokeLine(pNear.x, pNear.y, pFar.x, pFar.y, `rgba(255, 193, 7, ${0.1 * (1 - f)})`, 1.25);
        }
      });
    };

    const draw = (time: number) => {
      scene = getGoldenHighwayScene(state.width, state.height);
      const dt = Math.min((time - state.lastTime) / 1000, 0.05);
      state.lastTime = time;

      state.scrollBoost *= 0.93;
      const speed = state.baseSpeed + state.scrollBoost;
      if (!state.reducedMotion) {
        state.zOffset -= speed * dt;
      }

      const c = state.ctx;
      c.clearRect(0, 0, state.width, state.height);

      // Horizon/sky fade.
      const horizonY = scene.horizonY;
      const skyGrad = c.createLinearGradient(0, 0, 0, horizonY + 70);
      skyGrad.addColorStop(0, "hsl(215 55% 9%)");
      skyGrad.addColorStop(1, "rgba(10, 20, 34, 0)");
      c.fillStyle = skyGrad;
      c.fillRect(0, 0, state.width, horizonY + 70);

      const zNear = scene.cameraZ + scene.fogNear;
      const zFar = scene.cameraZ + scene.fogFar;

      // Draw from back to front for correct layering.
      drawRoadSurface(zNear, zFar);
      drawMedianStrip(zNear, zFar);
      drawCurbs(zNear, zFar);
      drawHeadlightWash(zNear, zFar);
      drawLaneDivider(zNear, zFar);
      drawLongitudinalLines(zNear, zFar);
      drawReflectiveRoadStuds(zNear, zFar);
      drawGuardrails(zNear, zFar);

      // Bottom vignette for text readability.
      const vignette = c.createLinearGradient(0, state.height - scene.vignetteHeight, 0, state.height);
      vignette.addColorStop(0, "rgba(10, 18, 30, 0)");
      vignette.addColorStop(0.6, "rgba(10, 18, 30, 0.55)");
      vignette.addColorStop(1, "rgba(10, 18, 30, 0.82)");
      c.fillStyle = vignette;
      c.fillRect(0, state.height - scene.vignetteHeight, state.width, scene.vignetteHeight);

      if (isVisible && !state.reducedMotion) {
        rafId = requestAnimationFrame(draw);
      }
    };

    if (state.reducedMotion) {
      draw(performance.now());
    } else {
      rafId = requestAnimationFrame(draw);
    }

    let io: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        ([entry]) => {
          const nowVisible = entry.isIntersecting;
          if (nowVisible && !isVisible) {
            isVisible = true;
            state.lastTime = performance.now();
            if (state.reducedMotion) {
              draw(state.lastTime);
            } else {
              rafId = requestAnimationFrame(draw);
            }
          } else if (!nowVisible && isVisible) {
            isVisible = false;
            cancelAnimationFrame(rafId);
          }
        },
        { rootMargin: "120px" }
      );
      io.observe(canvas);
    }

    return () => {
      window.removeEventListener("resize", onResize);
      if (!state.reducedMotion) {
        window.removeEventListener("scroll", onScroll);
      }
      cancelAnimationFrame(rafId);
      io?.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};

export default GoldenHighway;
