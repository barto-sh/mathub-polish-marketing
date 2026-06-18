const HIGHWAY = {
  fov: 420,
  cameraY: 110,
  cameraZ: -260,
  horizonYRatio: 0.38,
  roadWidth: 720,
  fogNear: 160,
  fogFar: 2000,
  edgeAlpha: 0.24,
  laneAlpha: 0.34,
  markerSpacing: 180,
  markerLength: 60,
  studSpacing: 240,
};

export type HighwayScene = typeof HIGHWAY & {
  horizonY: number;
  roadScale: number;
  washRadius: number;
  beamRadius: number;
  beamYOffset: number;
  sourceYOffset: number;
  vignetteHeight: number;
};

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

export const getGoldenHighwayScene = (width: number, height: number): HighwayScene => {
  const isMobile = width < 640;
  const responsiveRoadWidth = width < 1200
    ? clamp(width * 0.6, 230, HIGHWAY.roadWidth)
    : HIGHWAY.roadWidth;
  const horizonYRatio = isMobile
    ? clamp((width * 0.38) / Math.max(height, 1), 0.23, 0.31)
    : HIGHWAY.horizonYRatio;
  const horizonY = height * horizonYRatio;
  const nearScale = HIGHWAY.fov / HIGHWAY.fogNear;
  const nearOvershoot = isMobile ? clamp(height * 0.14, 76, 110) : 78;
  const cameraY = isMobile
    ? Math.max(HIGHWAY.cameraY, (height - horizonY + nearOvershoot) / nearScale)
    : HIGHWAY.cameraY;
  const roadScale = clamp(responsiveRoadWidth / HIGHWAY.roadWidth, 0.42, 1);

  return {
    ...HIGHWAY,
    cameraY,
    horizonYRatio,
    horizonY,
    roadWidth: responsiveRoadWidth,
    roadScale,
    washRadius: isMobile ? clamp(width * 1.05, 330, 520) : height * 0.92,
    beamRadius: isMobile ? clamp(width * 0.9, 280, 440) : height * 0.58,
    beamYOffset: isMobile ? clamp(height * 0.17, 82, 126) : 160,
    sourceYOffset: isMobile ? clamp(height * 0.18, 92, 142) : 180,
    vignetteHeight: isMobile ? clamp(height * 0.55, 260, 380) : 260,
  };
};
