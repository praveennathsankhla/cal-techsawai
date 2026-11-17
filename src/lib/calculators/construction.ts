import {
  type Calculator,
  type NumberField,
  type SelectField,
  areaOut,
  areaUnit,
  clamp,
  kgOut,
  lenOut,
  lengthUnit,
  liquidUnit,
  lOut,
  n,
  smallOut,
  smallUnit,
  s,
  toM,
  toMM,
  toMSmall,
  volOut,
  volumeUnit,
  weightUnit,
} from "./types";

const field = (
  id: string,
  label: string,
  metric: { default: number; unit: string; min?: number; max?: number; step?: number },
  imperial: { default: number; unit: string; min?: number; max?: number; step?: number },
  help?: string,
): NumberField => ({
  kind: "number",
  id,
  label,
  help,
  metric: { min: 0, step: 0.1, ...metric },
  imperial: { min: 0, step: 0.1, ...imperial },
});

const length = (id: string, label: string, mDef: number, iDef: number) =>
  field(id, label, { default: mDef, unit: "m" }, { default: iDef, unit: "ft" });

const small = (id: string, label: string, mDef: number, iDef: number, help?: string) =>
  field(id, label, { default: mDef, unit: "cm" }, { default: iDef, unit: "in" }, help);

const wasteField = (def = "10"): SelectField => ({
  kind: "select",
  id: "waste",
  label: "Waste allowance",
  default: def,
  options: [
    { value: "0", label: "None (0%)" },
    { value: "5", label: "5% — tight, simple layout" },
    { value: "10", label: "10% — standard" },
    { value: "15", label: "15% — cuts, angles & extras" },
    { value: "20", label: "20% — complex or fragile work" },
  ],
});

const countField = (id: string, label: string, def: number): NumberField =>
  field(id, label, { default: def, unit: "pcs", step: 1 }, { default: def, unit: "pcs", step: 1 });

export const constructionCalculators: Record<string, Calculator> = {
  "concrete-volume-calculator": {
    fields: [
      length("length", "Length", 4, 13),
      length("width", "Width", 3, 10),
      small("depth", "Thickness / depth", 10, 4, "Slab thickness, footing depth or column height."),
      {
        kind: "select",
        id: "bag",
        label: "Concrete bag size",
        default: "0.0125",
        help: "Yield varies by mix. Check the bag before ordering.",
        options: [
          { value: "0.0125", label: "25 kg bag — approx. 0.0125 m³ (Metric)" },
          { value: "0.02", label: "40 kg bag — approx. 0.02 m³ (Metric)" },
          { value: "0.0085", label: "40 lb bag — approx. 0.0085 m³ (Imperial)" },
          { value: "0.0127", label: "60 lb bag — approx. 0.0127 m³ (Imperial)" },
          { value: "0.017", label: "80 lb bag — approx. 0.017 m³ (Imperial)" },
        ],
      },
      wasteField("5"),
    ],
    calculate(v, system) {
      const L = toM(n(v, "length"), system);
      const W = toM(n(v, "width"), system);
      const D = toMSmall(n(v, "depth"), system);
      const waste = n(v, "waste") / 100;
      const bagValue = s(v, "bag", "0.0125");
      const yieldPerBag = Number.parseFloat(bagValue) || 0.0125;
      const bagMassKg: Record<string, number> = {
        "0.0125": 25,
        "0.02": 40,
        "0.0085": 18.14,
        "0.0127": 27.22,
        "0.017": 36.29,
      };
      const bagMass = bagMassKg[bagValue] ?? 25;
      const volume = L * W * D;
      if (volume <= 0) return { items: [], error: "Enter a length, width and depth greater than zero." };
      const total = volume * (1 + waste);
      const bags = Math.ceil(total / yieldPerBag);
      return {
        items: [
          { label: "Concrete volume", value: volOut(total, system), unit: volumeUnit(system), decimals: 2, emphasis: true },
          { label: "Volume before waste", value: volOut(volume, system), unit: volumeUnit(system), decimals: 2 },
          { label: "Bags required", value: bags, unit: "bags", decimals: 0 },
          {
            label: "Approximate wet weight",
            value: kgOut(total * 2400, system),
            unit: weightUnit(system),
            decimals: 0,
            hint: "Concrete weighs roughly 2,400 kg/m³.",
          },
          { label: "Bag weight basis", value: kgOut(bagMass, system), unit: weightUnit(system), decimals: 1 },
        ],
        note: "Waste is added before bag rounding. Slabs, footings and piers all use length × width × depth; for round piers use a diameter and height with πr²h.",
      };
    },
  },

  "tile-quantity-estimator": {
    fields: [
      length("roomLength", "Room length", 5, 16),
      length("roomWidth", "Room width", 4, 12),
      small("tileLength", "Tile length", 60, 24),
      small("tileWidth", "Tile width", 60, 24),
      field("grout", "Grout joint", { default: 3, unit: "mm", step: 1 }, { default: 0.125, unit: "in", step: 0.0625 }),
      {
        kind: "select",
        id: "perBox",
        label: "Tiles per box",
        default: "6",
        options: ["1", "4", "6", "8", "10", "12", "20"].map((x) => ({ value: x, label: `${x} tiles` })),
      },
      wasteField(),
    ],
    calculate(v, system) {
      const L = toM(n(v, "roomLength"), system);
      const W = toM(n(v, "roomWidth"), system);
      const tl = toMSmall(n(v, "tileLength"), system);
      const tw = toMSmall(n(v, "tileWidth"), system);
      const grout = toMM(n(v, "grout"), system);
      const waste = n(v, "waste") / 100;
      const perBox = Math.max(1, n(v, "perBox", 6));
      if (L <= 0 || W <= 0 || tl <= 0 || tw <= 0) {
        return { items: [], error: "Enter positive room and tile dimensions." };
      }
      const area = L * W;
      const tileArea = (tl + grout) * (tw + grout);
      const tiles = Math.ceil((area / tileArea) * (1 + waste));
      return {
        items: [
          { label: "Floor area", value: areaOut(area, system), unit: areaUnit(system), decimals: 2, emphasis: true },
          { label: "Tiles required", value: tiles, unit: "tiles", decimals: 0 },
          { label: "Boxes required", value: Math.ceil(tiles / perBox), unit: "boxes", decimals: 0 },
          { label: "Tiles before waste", value: Math.ceil(area / tileArea), unit: "tiles", decimals: 0 },
          { label: "Coverage per tile", value: areaOut(tileArea, system), unit: areaUnit(system), decimals: 3 },
        ],
        note: "Diagonal layouts, herringbone patterns and rooms with many obstructions usually need 15–20% waste. Keep one spare box for future repairs.",
      };
    },
  },

  "paint-coverage-calculator": {
    fields: [
      length("roomLength", "Room length", 5, 16),
      length("roomWidth", "Room width", 4, 13),
      small("wallHeight", "Wall height", 275, 108),
      field(
        "coverage",
        "Paint coverage",
        { default: 10, unit: "m²/L" },
        { default: 350, unit: "sq ft/gal" },
        "Coverage is printed on the tin; 10 m²/L is typical for emulsion.",
      ),
      {
        kind: "select",
        id: "coats",
        label: "Number of coats",
        default: "2",
        options: ["1", "2", "3", "4"].map((x) => ({ value: x, label: `${x} coat${x === "1" ? "" : "s"}` })),
      },
      countField("doors", "Doors to subtract", 2),
      countField("windows", "Windows to subtract", 2),
      {
        kind: "select",
        id: "ceiling",
        label: "Include the ceiling?",
        default: "no",
        options: [
          { value: "no", label: "Walls only" },
          { value: "yes", label: "Walls + ceiling" },
        ],
      },
      wasteField("10"),
    ],
    calculate(v, system) {
      const L = toM(n(v, "roomLength"), system);
      const W = toM(n(v, "roomWidth"), system);
      const H = toMSmall(n(v, "wallHeight"), system);
      const coverage =
        system === "metric" ? n(v, "coverage", 10) : (n(v, "coverage", 350) * 0.092903) / 3.785411784;
      const coats = Math.max(1, n(v, "coats", 2));
      const waste = n(v, "waste") / 100;
      if (L <= 0 || W <= 0 || H <= 0 || coverage <= 0) {
        return { items: [], error: "Enter positive room dimensions and paint coverage." };
      }
      let area = 2 * (L + W) * H;
      area -= n(v, "doors") * 1.8 + n(v, "windows") * 1.5;
      if (s(v, "ceiling") === "yes") area += L * W;
      area = clamp(area);
      const paint = (area * coats * (1 + waste)) / coverage;
      const canSize = system === "metric" ? 4 : 1;
      return {
        items: [
          { label: "Paintable area", value: areaOut(area, system), unit: areaUnit(system), decimals: 1, emphasis: true },
          { label: "Paint required", value: lOut(paint, system), unit: liquidUnit(system), decimals: 1 },
          { label: "Cans to buy", value: Math.ceil(paint / canSize), unit: system === "metric" ? "× 4 L cans" : "× 1 gal cans", decimals: 0 },
          { label: "Total with coats & waste", value: lOut(paint, system), unit: liquidUnit(system), decimals: 1 },
          { label: "Wall area before deductions", value: areaOut(2 * (L + W) * H, system), unit: areaUnit(system), decimals: 1 },
        ],
        note: "Deduct doors (≈1.8 m² / 19 sq ft) and windows (≈1.5 m² / 16 sq ft). Porous or new plaster can absorb 10–20% more paint.",
      };
    },
  },

  "roof-pitch-calculator": {
    fields: [
      small("rise", "Rise (vertical)", 300, 60),
      small("run", "Run (horizontal)", 600, 120),
    ],
    calculate(v, system) {
      const rise = toMSmall(n(v, "rise"), system);
      const run = toMSmall(n(v, "run"), system);
      if (rise <= 0 || run <= 0) return { items: [], error: "Enter a rise and run greater than zero." };
      const ratio = rise / run;
      const angle = (Math.atan(ratio) * 180) / Math.PI;
      const slope = ratio * 100;
      const multiplier = Math.sqrt(1 + ratio * ratio);
      const rafter = Math.sqrt(rise * rise + run * run);
      return {
        items: [
          { label: "Roof angle", value: angle, unit: "°", decimals: 1, emphasis: true },
          { label: "Pitch (rise : 12)", value: ratio * 12, unit: ": 12", decimals: 1 },
          { label: "Slope percentage", value: slope, unit: "%", decimals: 1 },
          { label: "Rafter length", value: smallOut(rafter, system), unit: smallUnit(system), decimals: 1 },
          { label: "Roof slope multiplier", value: multiplier, unit: "× run", decimals: 3, hint: "Multiply the horizontal run to get the sloped rafter length." },
        ],
        note: "Pitch is rise over run. A 4:12 roof rises 4 units for every 12 horizontal units, which is about 18.4°.",
      };
    },
  },

  "rebar-weight-calculator": {
    fields: [
      {
        kind: "select",
        id: "bar",
        label: "Rebar diameter",
        default: "12",
        options: [
          { value: "6", label: "#2 / 6 mm" },
          { value: "8", label: "#3 / 8 mm" },
          { value: "10", label: "#4 / 10 mm" },
          { value: "12", label: "#5 / 12 mm" },
          { value: "16", label: "#6 / 16 mm" },
          { value: "20", label: "#7 / 20 mm" },
          { value: "25", label: "#8 / 25 mm" },
          { value: "32", label: "#10 / 32 mm" },
        ],
      },
      length("length", "Length per bar", 12, 20),
      countField("quantity", "Number of bars", 20),
      field("lap", "Lap / overlap allowance", { default: 10, unit: "%", step: 1 }, { default: 10, unit: "%", step: 1 }),
    ],
    calculate(v, system) {
      const d = n(v, "bar", 12);
      const length = toM(n(v, "length"), system);
      const qty = n(v, "quantity", 1);
      const lap = n(v, "lap") / 100;
      if (d <= 0 || length <= 0 || qty <= 0) return { items: [], error: "Enter a bar size, length and quantity." };
      const unitWeight = (d * d) / 162;
      const totalLength = length * qty * (1 + lap);
      const weight = unitWeight * totalLength;
      return {
        items: [
          { label: "Total rebar weight", value: kgOut(weight, system), unit: weightUnit(system), decimals: 1, emphasis: true },
          { label: "Total bar length", value: lenOut(totalLength, system), unit: lengthUnit(system), decimals: 1 },
          { label: "Weight per bar", value: kgOut(unitWeight * length, system), unit: weightUnit(system), decimals: 2 },
          {
            label: "Unit weight",
            value: system === "metric" ? unitWeight : kgOut(unitWeight * 0.3048, system),
            unit: system === "metric" ? "kg/m" : "lb/ft",
            decimals: 3,
          },
          { label: "Bars ordered", value: qty, unit: "bars", decimals: 0 },
        ],
        note: "The metric formula d²/162 gives the weight in kg per metre. Always add a laps allowance for columns, beams and long walls.",
      };
    },
  },

  "brick-block-wall-calculator": {
    fields: [
      length("wallLength", "Wall length", 5, 16),
      small("wallHeight", "Wall height", 250, 100),
      small("brickLength", "Brick length", 19, 7.5),
      small("brickWidth", "Brick width", 9, 3.5),
      small("brickHeight", "Brick height", 9, 3),
      field("joint", "Mortar joint", { default: 10, unit: "mm", step: 1 }, { default: 0.375, unit: "in", step: 0.125 }),
      wasteField("5"),
    ],
    calculate(v, system) {
      const L = toM(n(v, "wallLength"), system);
      const H = toMSmall(n(v, "wallHeight"), system);
      const bL = toMSmall(n(v, "brickLength"), system);
      const bW = toMSmall(n(v, "brickWidth"), system);
      const bH = toMSmall(n(v, "brickHeight"), system);
      const joint = toMM(n(v, "joint"), system);
      const waste = n(v, "waste") / 100;
      if (L <= 0 || H <= 0 || bL <= 0 || bW <= 0 || bH <= 0) {
        return { items: [], error: "Enter positive wall and brick dimensions." };
      }
      const area = L * H;
      const faceArea = (bL + joint) * (bH + joint);
      const bricks = Math.ceil((area / faceArea) * (1 + waste));
      const wallVolume = area * bW;
      const brickVolume = bricks * bL * bW * bH;
      const mortar = clamp(wallVolume - brickVolume);
      return {
        items: [
          { label: "Bricks required", value: bricks, unit: "bricks", decimals: 0, emphasis: true },
          { label: "Wall area", value: areaOut(area, system), unit: areaUnit(system), decimals: 2 },
          { label: "Mortar volume", value: volOut(mortar, system), unit: volumeUnit(system), decimals: 3 },
          { label: "Bricks per m²", value: Math.ceil(1 / faceArea), unit: "bricks / m²", decimals: 0 },
          { label: "Dry mortar bags", value: Math.ceil(mortar / 0.01), unit: "× 25 kg / 50 lb", decimals: 0 },
        ],
        note: "This assumes a single-leaf wall using the brick width as wall thickness. For a half-brick or cavity wall, adjust the wall thickness and add piers separately.",
      };
    },
  },

  "asphalt-driveway-calculator": {
    fields: [
      length("length", "Driveway length", 10, 33),
      length("width", "Driveway width", 3, 10),
      small("depth", "Compacted depth", 7.5, 3),
      {
        kind: "select",
        id: "density",
        label: "Material density",
        default: "2400",
        options: [
          { value: "2400", label: "Asphalt — 2,400 kg/m³ (150 lb/ft³)" },
          { value: "2200", label: "Compacted gravel — 2,200 kg/m³ (137 lb/ft³)" },
          { value: "2000", label: "Loose gravel — 2,000 kg/m³ (125 lb/ft³)" },
        ],
      },
      wasteField("5"),
    ],
    calculate(v, system) {
      const L = toM(n(v, "length"), system);
      const W = toM(n(v, "width"), system);
      const D = toMSmall(n(v, "depth"), system);
      const density = n(v, "density", 2400);
      const waste = n(v, "waste") / 100;
      if (L <= 0 || W <= 0 || D <= 0) return { items: [], error: "Enter positive driveway dimensions." };
      const volume = L * W * D * (1 + waste);
      const tonnes = (volume * density) / 1000;
      return {
        items: [
          { label: "Asphalt / aggregate volume", value: volOut(volume, system), unit: volumeUnit(system), decimals: 2, emphasis: true },
          { label: "Material weight", value: system === "metric" ? tonnes : tonnes * 1.10231, unit: system === "metric" ? "tonnes" : "short tons", decimals: 2 },
          { label: "Surface area", value: areaOut(L * W, system), unit: areaUnit(system), decimals: 1 },
          { label: "Depth before compaction", value: smallOut(D * 1.25, system), unit: smallUnit(system), decimals: 1, hint: "Loose asphalt typically compacts by about 20–25%." },
        ],
        note: "For a driveway base, add a separate compacted gravel layer of 100–150 mm (4–6 in). Order asphalt from a local plant using tonnes and confirm the compacted yield.",
      };
    },
  },

  "drywall-sheetrock-estimator": {
    fields: [
      length("roomLength", "Room length", 5, 16),
      length("roomWidth", "Room width", 4, 13),
      small("wallHeight", "Ceiling height", 270, 108),
      {
        kind: "select",
        id: "sheet",
        label: "Sheet size",
        default: "2.88",
        options: [
          { value: "2.88", label: "1200 × 2400 mm (4 × 8 ft) — 2.88 m²" },
          { value: "3.24", label: "1200 × 2700 mm (4 × 9 ft) — 3.24 m²" },
          { value: "3.60", label: "1200 × 3000 mm (4 × 10 ft) — 3.60 m²" },
          { value: "4.32", label: "1200 × 3600 mm (4 × 12 ft) — 4.32 m²" },
        ],
      },
      {
        kind: "select",
        id: "ceiling",
        label: "Include ceiling?",
        default: "no",
        options: [
          { value: "no", label: "Walls only" },
          { value: "yes", label: "Walls + ceiling" },
        ],
      },
      wasteField("10"),
    ],
    calculate(v, system) {
      const L = toM(n(v, "roomLength"), system);
      const W = toM(n(v, "roomWidth"), system);
      const H = toMSmall(n(v, "wallHeight"), system);
      const sheet = n(v, "sheet", 2.88);
      const waste = n(v, "waste") / 100;
      if (L <= 0 || W <= 0 || H <= 0) return { items: [], error: "Enter positive room dimensions." };
      let area = 2 * (L + W) * H;
      if (s(v, "ceiling") === "yes") area += L * W;
      const sheets = Math.ceil((area * (1 + waste)) / sheet);
      return {
        items: [
          { label: "Drywall sheets", value: sheets, unit: "sheets", decimals: 0, emphasis: true },
          { label: "Wall / ceiling area", value: areaOut(area, system), unit: areaUnit(system), decimals: 1 },
          { label: "Joint compound", value: system === "metric" ? area * 0.5 : area * 0.132, unit: system === "metric" ? "L" : "gal", decimals: 1, hint: "Approximate for three coats and taping." },
          { label: "Joint tape", value: system === "metric" ? area * 0.4 : area * 1.3, unit: system === "metric" ? "m" : "ft", decimals: 0 },
          { label: "Screws", value: Math.ceil(area * 30), unit: "screws", decimals: 0 },
        ],
        note: "Sheets are rounded up whole. Tall walls may need horizontal joints, which increases tape, compound and labour. Add 10% waste for cut-outs and damaged corners.",
      };
    },
  },

  "lumber-board-foot-calculator": {
    fields: [
      small("thickness", "Thickness", 5, 2, "Use the nominal size for rough lumber, or the actual size for dressed boards."),
      small("width", "Width", 10, 4),
      length("length", "Length", 3, 10),
      countField("quantity", "Quantity", 4),
      wasteField("0"),
    ],
    calculate(v, system) {
      const t = toMSmall(n(v, "thickness"), system) / 0.0254;
      const w = toMSmall(n(v, "width"), system) / 0.0254;
      const lFt = lenOut(toM(n(v, "length"), system), "imperial");
      const qty = n(v, "quantity", 1);
      const waste = n(v, "waste") / 100;
      if (t <= 0 || w <= 0 || lFt <= 0) return { items: [], error: "Enter positive board dimensions." };
      const bf = ((t * w * lFt) / 12) * qty * (1 + waste);
      const volumeM3 = ((t * 0.0254) * (w * 0.0254) * (lFt * 0.3048)) * qty * (1 + waste);
      return {
        items: [
          { label: "Board feet", value: bf, unit: "bd ft", decimals: 2, emphasis: true },
          { label: "Linear feet", value: lFt * qty, unit: "lin ft", decimals: 1 },
          { label: "Volume", value: system === "metric" ? volumeM3 : volumeM3 * 35.3147, unit: system === "metric" ? "m³" : "cu ft", decimals: 3 },
          { label: "Board feet per piece", value: (t * w * lFt) / 12, unit: "bd ft", decimals: 2 },
        ],
        note: "One board foot is 144 cubic inches — a board 12 in × 12 in × 1 in. Board footage is the standard way hardwood is priced.",
      };
    },
  },

  "stair-stringer-calculator": {
    fields: [
      small("rise", "Total rise (floor to floor)", 270, 106),
      small("riser", "Target riser height", 18, 7),
      small("tread", "Tread depth", 28, 11),
      small("width", "Stair width", 90, 36),
    ],
    calculate(v, system) {
      const rise = toMSmall(n(v, "rise"), system);
      const target = toMSmall(n(v, "riser"), system);
      const tread = toMSmall(n(v, "tread"), system);
      const width = toMSmall(n(v, "width"), system);
      if (rise <= 0 || target <= 0 || tread <= 0) return { items: [], error: "Enter a total rise, riser height and tread depth." };
      const steps = Math.max(2, Math.ceil(rise / target));
      const actualRiser = rise / steps;
      const run = (steps - 1) * tread;
      const stringer = Math.sqrt(rise * rise + run * run);
      const angle = (Math.atan(rise / run) * 180) / Math.PI;
      return {
        items: [
          { label: "Number of risers", value: steps, unit: "steps", decimals: 0, emphasis: true },
          { label: "Actual riser height", value: smallOut(actualRiser, system), unit: smallUnit(system), decimals: 2 },
          { label: "Total run", value: smallOut(run, system), unit: smallUnit(system), decimals: 1 },
          { label: "Stringer length", value: smallOut(stringer, system), unit: smallUnit(system), decimals: 1, hint: "Add 300 mm / 12 in for the top and bottom cuts." },
          { label: "Stair angle", value: angle, unit: "°", decimals: 1 },
          { label: "Stair width", value: smallOut(width, system), unit: smallUnit(system), decimals: 0 },
        ],
        note: "Building codes commonly require risers between 150–200 mm (6–8 in) and treads at least 250 mm (10 in). Always check your local code.",
      };
    },
  },

  "gravel-sand-calculator": {
    fields: [
      length("length", "Area length", 5, 16),
      length("width", "Area width", 4, 13),
      small("depth", "Depth", 8, 3),
      {
        kind: "select",
        id: "material",
        label: "Material",
        default: "1500",
        options: [
          { value: "1500", label: "Gravel / crushed stone — 1,500 kg/m³" },
          { value: "1600", label: "Sand — 1,600 kg/m³" },
          { value: "1350", label: "Pea gravel — 1,350 kg/m³" },
          { value: "1450", label: "Topsoil — 1,450 kg/m³" },
        ],
      },
      wasteField("10"),
    ],
    calculate(v, system) {
      const L = toM(n(v, "length"), system);
      const W = toM(n(v, "width"), system);
      const D = toMSmall(n(v, "depth"), system);
      const density = n(v, "material", 1500);
      const waste = n(v, "waste") / 100;
      if (L <= 0 || W <= 0 || D <= 0) return { items: [], error: "Enter positive area dimensions and depth." };
      const volume = L * W * D * (1 + waste);
      const weight = volume * density;
      const bagKg = system === "metric" ? 25 : 22.68;
      return {
        items: [
          { label: "Material volume", value: volOut(volume, system), unit: volumeUnit(system), decimals: 2, emphasis: true },
          { label: "Material weight", value: kgOut(weight, system), unit: weightUnit(system), decimals: 0 },
          { label: "Bags (25 kg / 50 lb)", value: Math.ceil(weight / bagKg), unit: "bags", decimals: 0 },
          { label: "Area", value: areaOut(L * W, system), unit: areaUnit(system), decimals: 1 },
          { label: "Metric tonnes", value: weight / 1000, unit: "t", decimals: 2 },
        ],
        note: "Bulk aggregate is usually sold by the tonne or cubic yard. Loose material settles, so 10% extra is sensible for new beds and driveways.",
      };
    },
  },

  "mulch-calculator": {
    fields: [
      length("length", "Bed length", 5, 16),
      length("width", "Bed width", 3, 10),
      small("depth", "Mulch depth", 7.5, 3, "50–75 mm (2–3 in) is typical for garden beds."),
      {
        kind: "select",
        id: "bag",
        label: "Bag size",
        default: "50",
        options: [
          { value: "50", label: "50 litre bag" },
          { value: "56.6", label: "2 cu ft bag (56.6 L)" },
          { value: "70", label: "70 litre bag" },
        ],
      },
      wasteField("5"),
    ],
    calculate(v, system) {
      const L = toM(n(v, "length"), system);
      const W = toM(n(v, "width"), system);
      const D = toMSmall(n(v, "depth"), system);
      const bag = n(v, "bag", 50);
      const waste = n(v, "waste") / 100;
      if (L <= 0 || W <= 0 || D <= 0) return { items: [], error: "Enter positive bed dimensions and depth." };
      const m3 = L * W * D * (1 + waste);
      const litres = m3 * 1000;
      return {
        items: [
          { label: "Mulch volume", value: volOut(m3, system), unit: volumeUnit(system), decimals: 2, emphasis: true },
          { label: "Bags required", value: Math.ceil(litres / bag), unit: "bags", decimals: 0 },
          { label: "Volume in litres", value: litres, unit: "L", decimals: 0 },
          { label: "Coverage at 50 mm", value: areaOut(m3 / 0.05, system), unit: areaUnit(system), decimals: 1 },
          { label: "Bed area", value: areaOut(L * W, system), unit: areaUnit(system), decimals: 1 },
        ],
        note: "Mulch is normally sold by volume, not weight. Avoid piling it against trunks or stems — keep a 50–75 mm gap to prevent rot.",
      };
    },
  },

  "sod-calculator": {
    fields: [
      length("length", "Lawn length", 10, 33),
      length("width", "Lawn width", 6, 20),
      {
        kind: "select",
        id: "roll",
        label: "Sod roll size",
        default: "1",
        options: [
          { value: "1", label: "1 m² roll" },
          { value: "0.929", label: "10 sq ft roll (0.929 m²)" },
          { value: "2.32", label: "25 sq ft roll (2.32 m²)" },
        ],
      },
      wasteField("5"),
    ],
    calculate(v, system) {
      const L = toM(n(v, "length"), system);
      const W = toM(n(v, "width"), system);
      const roll = n(v, "roll", 1);
      const waste = n(v, "waste") / 100;
      if (L <= 0 || W <= 0) return { items: [], error: "Enter positive lawn dimensions." };
      const area = L * W;
      const total = area * (1 + waste);
      return {
        items: [
          { label: "Lawn area", value: areaOut(area, system), unit: areaUnit(system), decimals: 1, emphasis: true },
          { label: "Sod rolls required", value: Math.ceil(total / roll), unit: "rolls", decimals: 0 },
          { label: "Area with waste", value: areaOut(total, system), unit: areaUnit(system), decimals: 1 },
          { label: "Rolls per 100 m²", value: Math.ceil(100 / roll), unit: "rolls", decimals: 0 },
        ],
        note: "Order fresh sod for the day of installation. Measure irregular lawns by dividing them into rectangles and circles, then add 5–10% for trimming.",
      };
    },
  },

  "fence-post-calculator": {
    fields: [
      length("length", "Fence length", 30, 100),
      length("spacing", "Post spacing", 2.4, 8),
      countField("gates", "Extra gate posts", 1),
      {
        kind: "select",
        id: "rails",
        label: "Horizontal rails per bay",
        default: "2",
        options: ["1", "2", "3", "4"].map((x) => ({ value: x, label: `${x} rail${x === "1" ? "" : "s"}` })),
      },
      field("concrete", "Concrete per post", { default: 30, unit: "L" }, { default: 1, unit: "cu ft" }),
    ],
    calculate(v, system) {
      const L = toM(n(v, "length"), system);
      const spacing = toM(n(v, "spacing"), system);
      const gates = n(v, "gates");
      const rails = Math.max(1, n(v, "rails", 2));
      const perPost = system === "metric" ? n(v, "concrete", 30) / 1000 : n(v, "concrete", 1) * 0.0283168;
      if (L <= 0 || spacing <= 0) return { items: [], error: "Enter a fence length and post spacing." };
      const posts = Math.ceil(L / spacing) + 1 + gates;
      const bays = Math.max(0, posts - 1);
      const railLength = bays * spacing * rails;
      const concreteVolume = posts * perPost;
      return {
        items: [
          { label: "Posts required", value: posts, unit: "posts", decimals: 0, emphasis: true },
          { label: "Rail length", value: lenOut(railLength, system), unit: lengthUnit(system), decimals: 1 },
          { label: "Concrete volume", value: volOut(concreteVolume, system), unit: volumeUnit(system), decimals: 3 },
          { label: "Concrete bags (25 kg / 50 lb)", value: Math.ceil(concreteVolume / 0.0125), unit: "bags", decimals: 0 },
          { label: "Bays between posts", value: bays, unit: "bays", decimals: 0 },
        ],
        note: "Standard fence posts sit about 600–750 mm (2–2.5 ft) in the ground. Gate posts should be larger and set deeper than line posts.",
      };
    },
  },

  "decking-material-calculator": {
    fields: [
      length("length", "Deck length", 6, 20),
      length("width", "Deck width", 4, 13),
      small("boardWidth", "Board width", 14, 5.5),
      field("gap", "Board gap", { default: 5, unit: "mm", step: 1 }, { default: 0.1875, unit: "in", step: 0.0625 }),
      length("boardLength", "Board length", 3.6, 12),
      wasteField("10"),
    ],
    calculate(v, system) {
      const L = toM(n(v, "length"), system);
      const W = toM(n(v, "width"), system);
      const bw = toMSmall(n(v, "boardWidth"), system);
      const gap = toMM(n(v, "gap"), system);
      const bl = toM(n(v, "boardLength"), system);
      const waste = n(v, "waste") / 100;
      if (L <= 0 || W <= 0 || bw <= 0 || bl <= 0) return { items: [], error: "Enter positive deck and board dimensions." };
      const rows = Math.ceil(W / (bw + gap));
      const piecesPerRow = Math.ceil(L / bl);
      const boards = Math.ceil(rows * piecesPerRow * (1 + waste));
      return {
        items: [
          { label: "Decking boards", value: boards, unit: "boards", decimals: 0, emphasis: true },
          { label: "Rows across the deck", value: rows, unit: "rows", decimals: 0 },
          { label: "Total linear boards", value: boards * lenOut(bl, system), unit: lengthUnit(system), decimals: 1 },
          { label: "Deck surface area", value: areaOut(L * W, system), unit: areaUnit(system), decimals: 1 },
          { label: "Decking screws", value: Math.ceil(rows * piecesPerRow * 2 * 1.1), unit: "screws", decimals: 0, hint: "Two screws per joist per board, plus 10%." },
        ],
        note: "Run boards along the longest dimension where possible. Add fascia, joists, beams and fixings separately — this estimate covers the walking surface only.",
      };
    },
  },
};
