export interface PlankPosition {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
}

export interface PatternInfo {
  id: string;
  name: string;
  wastage: number; // percentage
  description: string;
}

export const patternTypes: PatternInfo[] = [
  { id: "straight", name: "Straight", wastage: 5, description: "Classic parallel layout — minimal waste, timeless look." },
  { id: "herringbone", name: "Herringbone", wastage: 15, description: "V-shaped zigzag pattern — adds visual movement and luxury." },
  { id: "chevron", name: "Chevron", wastage: 18, description: "Angled ends meeting at a point — sleek and contemporary." },
  { id: "brick", name: "Brick Offset", wastage: 8, description: "Staggered half-offset — adds rhythm without complexity." },
  { id: "basketweave", name: "Basket Weave", wastage: 12, description: "Alternating horizontal/vertical pairs — classic elegance." },
  { id: "diagonal", name: "Diagonal", wastage: 15, description: "45° angle layout — makes spaces feel larger." },
];

// Generate plank positions for a given pattern, room size, and plank dimensions
export function generatePattern(
  patternId: string,
  roomWidth: number, // in planks
  roomHeight: number, // in planks
  plankWidth: number,
  plankHeight: number,
): PlankPosition[] {
  switch (patternId) {
    case "herringbone":
      return generateHerringbone(roomWidth, roomHeight, plankWidth, plankHeight);
    case "chevron":
      return generateChevron(roomWidth, roomHeight, plankWidth, plankHeight);
    case "brick":
      return generateBrick(roomWidth, roomHeight, plankWidth, plankHeight);
    case "basketweave":
      return generateBasketweave(roomWidth, roomHeight, plankWidth, plankHeight);
    case "diagonal":
      return generateDiagonal(roomWidth, roomHeight, plankWidth, plankHeight);
    default:
      return generateStraight(roomWidth, roomHeight, plankWidth, plankHeight);
  }
}

function generateStraight(
  cols: number, rows: number, pw: number, ph: number,
): PlankPosition[] {
  const positions: PlankPosition[] = [];
  for (let r = 0; r < rows; r++) {
    const offset = r % 2 === 0 ? 0 : pw * 0.33;
    for (let c = -1; c <= cols; c++) {
      positions.push({ x: c * pw + offset, y: r * ph, width: pw, height: ph, rotation: 0 });
    }
  }
  return positions;
}

function generateHerringbone(
  cols: number, rows: number, pw: number, ph: number,
): PlankPosition[] {
  const positions: PlankPosition[] = [];
  for (let r = -1; r <= rows * 2; r++) {
    for (let c = -1; c <= cols; c++) {
      const baseX = c * ph * 2;
      const baseY = r * ph / 2;
      // Left plank (vertical)
      positions.push({ x: baseX, y: baseY, width: ph, height: pw / 2, rotation: 0 });
      // Right plank (horizontal)
      positions.push({ x: baseX + ph, y: baseY, width: pw / 2, height: ph, rotation: 0 });
    }
  }
  return positions;
}

function generateChevron(
  cols: number, rows: number, pw: number, ph: number,
): PlankPosition[] {
  const positions: PlankPosition[] = [];
  for (let r = -1; r <= rows * 2; r++) {
    for (let c = -1; c <= cols; c++) {
      const baseX = c * pw;
      const baseY = r * ph * 0.7;
      positions.push({ x: baseX, y: baseY, width: pw * 0.5, height: ph * 0.5, rotation: 30 });
      positions.push({ x: baseX + pw * 0.5, y: baseY, width: pw * 0.5, height: ph * 0.5, rotation: -30 });
    }
  }
  return positions;
}

function generateBrick(
  cols: number, rows: number, pw: number, ph: number,
): PlankPosition[] {
  const positions: PlankPosition[] = [];
  for (let r = 0; r < rows; r++) {
    const offset = r % 2 === 0 ? 0 : pw * 0.5;
    for (let c = -1; c <= cols; c++) {
      positions.push({ x: c * pw + offset, y: r * ph, width: pw, height: ph, rotation: 0 });
    }
  }
  return positions;
}

function generateBasketweave(
  cols: number, rows: number, pw: number, ph: number,
): PlankPosition[] {
  const positions: PlankPosition[] = [];
  const unit = Math.max(pw, ph);
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const isAlt = (r + c) % 2 === 0;
      if (isAlt) {
        // Two horizontal planks
        positions.push({ x: c * unit, y: r * unit, width: unit, height: unit / 2, rotation: 0 });
        positions.push({ x: c * unit, y: r * unit + unit / 2, width: unit, height: unit / 2, rotation: 0 });
      } else {
        // Two vertical planks
        positions.push({ x: c * unit, y: r * unit, width: unit / 2, height: unit, rotation: 0 });
        positions.push({ x: c * unit + unit / 2, y: r * unit, width: unit / 2, height: unit, rotation: 0 });
      }
    }
  }
  return positions;
}

function generateDiagonal(
  cols: number, rows: number, pw: number, ph: number,
): PlankPosition[] {
  const positions: PlankPosition[] = [];
  for (let r = -cols; r < rows + cols; r++) {
    for (let c = -1; c <= cols; c++) {
      const offset = r * pw * 0.3;
      positions.push({
        x: c * pw * 0.707 + offset,
        y: r * ph * 0.707,
        width: pw,
        height: ph,
        rotation: 45,
      });
    }
  }
  return positions;
}
