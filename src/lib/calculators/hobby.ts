import {
  type Calculator,
  type NumberField,
  type SelectField,
  areaOut,
  areaUnit,
  clamp,
  gOut,
  kgOut,
  lenOut,
  lengthUnit,
  n,
  smallOut,
  smallUnit,
  smallWeightUnit,
  s,
  toG,
  toM,
  toMM,
  toMSmall,
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

const count = (id: string, label: string, def: number): NumberField =>
  field(id, label, { default: def, unit: "pcs", step: 1 }, { default: def, unit: "pcs", step: 1 });

const watts = (id: string, label: string, def: number): NumberField =>
  field(id, label, { default: def, unit: "W", step: 5 }, { default: def, unit: "W", step: 5 });

const wasteField = (def = "10"): SelectField => ({
  kind: "select",
  id: "waste",
  label: "Waste allowance",
  default: def,
  options: [
    { value: "0", label: "None (0%)" },
    { value: "5", label: "5% — tight estimate" },
    { value: "10", label: "10% — standard" },
    { value: "15", label: "15% — generous" },
    { value: "20", label: "20% — complex project" },
  ],
});

export const hobbyCalculators: Record<string, Calculator> = {
  "yarn-yardage-calculator": {
    fields: [
      field(
        "projectWeight",
        "Finished project weight",
        { default: 400, unit: "g" },
        { default: 14, unit: "oz" },
        "Weigh a similar finished item, or use the yarn quantity stated in the pattern.",
      ),
      {
        kind: "select",
        id: "yarnWeight",
        label: "Yarn weight / thickness",
        default: "250",
        options: [
          { value: "800", label: "Lace — ~800 yd per 100 g" },
          { value: "400", label: "Fingering — ~400 yd per 100 g" },
          { value: "300", label: "Sport — ~300 yd per 100 g" },
          { value: "250", label: "DK — ~250 yd per 100 g" },
          { value: "200", label: "Worsted — ~200 yd per 100 g" },
          { value: "120", label: "Bulky — ~120 yd per 100 g" },
        ],
      },
      field(
        "skein",
        "Yarn per skein",
        { default: 200, unit: "m" },
        { default: 220, unit: "yd" },
        "Check the ball band: yardage varies a lot between brands.",
      ),
      wasteField("10"),
    ],
    calculate(v, system) {
      const weightG = toG(n(v, "projectWeight"), system);
      const yardsPer100 = n(v, "yarnWeight", 250);
      const skeinM = system === "metric" ? n(v, "skein", 200) : n(v, "skein", 220) * 0.9144;
      const waste = n(v, "waste") / 100;
      if (weightG <= 0 || yardsPer100 <= 0 || skeinM <= 0) {
        return { items: [], error: "Enter a project weight and a skein length greater than zero." };
      }
      const yards = (weightG / 100) * yardsPer100;
      const metres = yards * 0.9144;
      const neededM = metres * (1 + waste);
      return {
        items: [
          { label: "Yarn needed", value: system === "metric" ? neededM : neededM / 0.9144, unit: system === "metric" ? "m" : "yd", decimals: 0, emphasis: true },
          { label: "Skeins required", value: Math.ceil(neededM / skeinM), unit: "skeins", decimals: 0 },
          { label: "Yarn needed in yards", value: neededM / 0.9144, unit: "yd", decimals: 0 },
          { label: "Yarn needed in metres", value: neededM, unit: "m", decimals: 0 },
          { label: "Estimated finished weight", value: gOut(weightG, system), unit: smallWeightUnit(system), decimals: 0 },
        ],
        note: "Yardage per 100 g is only a guide. Gauge, stitch pattern and fibre content all change the real consumption — buy one extra skein for a large project.",
      };
    },
  },

  "aquarium-stocking-calculator": {
    fields: [
      small("tankLength", "Tank length", 60, 24),
      small("tankWidth", "Tank width / depth", 30, 12),
      small("tankHeight", "Water height", 40, 16),
      small("fishLength", "Adult fish length", 5, 2),
      count("fishCount", "Number of fish", 10),
      {
        kind: "select",
        id: "filtration",
        label: "Filtration level",
        default: "1",
        options: [
          { value: "0.8", label: "Light — small filter, few plants" },
          { value: "1", label: "Normal — matched filter" },
          { value: "1.3", label: "Heavy — oversized filter & plants" },
        ],
      },
    ],
    calculate(v, system) {
      const L = toMSmall(n(v, "tankLength"), system);
      const W = toMSmall(n(v, "tankWidth"), system);
      const H = toMSmall(n(v, "tankHeight"), system);
      const fishCm = toMSmall(n(v, "fishLength"), system);
      const fishCount = n(v, "fishCount");
      const factor = n(v, "filtration", 1);
      if (L <= 0 || W <= 0 || H <= 0 || fishCm <= 0) {
        return { items: [], error: "Enter positive tank dimensions and an adult fish length." };
      }
      const litres = (L * W * H) * 1000;
      const gallons = litres / 3.785411784;
      const fishInches = (fishCm / 2.54) * fishCount;
      const capacityInches = gallons * factor;
      const stock = (fishInches / capacityInches) * 100;
      const maxFish = Math.floor(capacityInches / (fishCm / 2.54));
      const status = stock <= 70 ? "Comfortable" : stock <= 100 ? "Near capacity" : "Overstocked";
      return {
        items: [
          { label: "Tank volume", value: system === "metric" ? litres : gallons, unit: system === "metric" ? "L" : "US gal", decimals: 1, emphasis: true },
          { label: "Stock level", value: stock, unit: "%", decimals: 0 },
          { label: "Status", value: status, format: "text" },
          { label: "Fish of this size the tank can hold", value: maxFish, unit: "fish", decimals: 0 },
          { label: "Volume in the other unit", value: system === "metric" ? gallons : litres, unit: system === "metric" ? "US gal" : "L", decimals: 1 },
        ],
        note: "The inch-per-gallon rule is a starting point for small, slim freshwater fish. It ignores waste output, adult size, swimming space and filtration — research every species before stocking.",
      };
    },
  },

  "pc-power-supply-calculator": {
    unitless: true,
    fields: [
      watts("cpu", "CPU power draw (TDP)", 125),
      watts("gpu", "Graphics card power draw (TDP)", 250),
      count("ram", "Memory sticks", 2),
      count("drives", "SSD / HDD drives", 2),
      count("fans", "Case fans", 3),
      watts("extra", "Extra cards / accessories", 20),
    ],
    calculate(v) {
      const cpu = n(v, "cpu", 125);
      const gpu = n(v, "gpu", 250);
      const ram = n(v, "ram", 2);
      const drives = n(v, "drives", 2);
      const fans = n(v, "fans", 3);
      const extra = n(v, "extra", 20);
      const load = 40 + cpu * 1.25 + gpu * 1.15 + ram * 4 + drives * 8 + fans * 3 + extra;
      const recommended = Math.ceil((load * 1.3) / 50) * 50;
      const idle = 25 + cpu * 0.2 + gpu * 0.12 + ram * 2 + drives * 3 + fans * 1.5;
      return {
        items: [
          { label: "Recommended PSU wattage", value: recommended, unit: "W", decimals: 0, emphasis: true },
          { label: "Estimated peak system load", value: load, unit: "W", decimals: 0 },
          { label: "Headroom at peak", value: recommended - load, unit: "W", decimals: 0 },
          { label: "Estimated idle draw", value: idle, unit: "W", decimals: 0 },
          { label: "Load percentage on recommended unit", value: (load / recommended) * 100, unit: "%", decimals: 0 },
        ],
        note: "This is a planning estimate for a single-GPU desktop. Transient GPU spikes can exceed steady-state TDP, so a quality 80 Plus Gold unit at 50–70% load is the sweet spot.",
      };
    },
  },

  "resin-epoxy-volume-calculator": {
    fields: [
      small("length", "Mold length", 20, 8),
      small("width", "Mold width", 15, 6),
      small("depth", "Pour depth", 2, 0.5),
      {
        kind: "select",
        id: "ratio",
        label: "Resin : hardener ratio",
        default: "2",
        options: [
          { value: "1", label: "1 : 1 by volume" },
          { value: "2", label: "2 : 1 by volume" },
          { value: "3", label: "3 : 1 by volume" },
          { value: "4", label: "4 : 1 by volume" },
        ],
      },
      wasteField("10"),
    ],
    calculate(v, system) {
      const L = toMSmall(n(v, "length"), system);
      const W = toMSmall(n(v, "width"), system);
      const D = toMSmall(n(v, "depth"), system);
      const ratio = n(v, "ratio", 2);
      const waste = n(v, "waste") / 100;
      if (L <= 0 || W <= 0 || D <= 0) return { items: [], error: "Enter positive mold dimensions." };
      const ml = (L * 100) * (W * 100) * (D * 100);
      const total = ml * (1 + waste);
      const partA = (total * ratio) / (ratio + 1);
      const partB = total / (ratio + 1);
      return {
        items: [
          { label: "Total mixed resin", value: total, unit: "mL", decimals: 0, emphasis: true },
          { label: "Resin (Part A)", value: partA, unit: "mL", decimals: 0 },
          { label: "Hardener (Part B)", value: partB, unit: "mL", decimals: 0 },
          { label: "Total in litres", value: total / 1000, unit: "L", decimals: 2 },
          { label: "Total in US fluid ounces", value: total / 29.5735, unit: "fl oz", decimals: 1 },
        ],
        note: "Always mix by the ratio printed on your resin — weight and volume ratios are not interchangeable. Pour in thin layers (under 10 mm) to avoid overheating.",
      };
    },
  },

  "candle-wax-calculator": {
    fields: [
      count("containers", "Number of containers", 3),
      small("diameter", "Container diameter", 7, 2.75),
      small("height", "Fill height", 7, 2.75),
      {
        kind: "select",
        id: "wax",
        label: "Wax type",
        default: "0.86",
        options: [
          { value: "0.86", label: "Soy wax — 0.86 g/mL" },
          { value: "0.90", label: "Paraffin — 0.90 g/mL" },
          { value: "0.96", label: "Beeswax — 0.96 g/mL" },
          { value: "0.88", label: "Soy blend — 0.88 g/mL" },
        ],
      },
      field("fragrance", "Fragrance load", { default: 8, unit: "%", max: 12, step: 0.5 }, { default: 8, unit: "%", max: 12, step: 0.5 }),
    ],
    calculate(v, system) {
      const count = n(v, "containers", 1);
      const d = toMSmall(n(v, "diameter"), system);
      const h = toMSmall(n(v, "height"), system);
      const density = n(v, "wax", 0.86);
      const fragrance = n(v, "fragrance", 8) / 100;
      if (count <= 0 || d <= 0 || h <= 0) return { items: [], error: "Enter a container count and positive dimensions." };
      const volumeMl = Math.PI * (d / 2) ** 2 * h * 1_000_000 * count;
      const waxG = volumeMl * density;
      const fragranceG = waxG * fragrance;
      return {
        items: [
          { label: "Wax required", value: kgOut(waxG / 1000, system), unit: weightUnit(system), decimals: 1, emphasis: true },
          { label: "Fragrance oil", value: kgOut(fragranceG / 1000, system), unit: weightUnit(system), decimals: 1 },
          { label: "Total wax + fragrance", value: kgOut((waxG + fragranceG) / 1000, system), unit: weightUnit(system), decimals: 1 },
          { label: "Wax per container", value: kgOut(waxG / count / 1000, system), unit: weightUnit(system), decimals: 1 },
          { label: "Total volume", value: volumeMl, unit: "mL", decimals: 0 },
        ],
        note: "Fill containers to about 6–12 mm below the rim to leave room for the wick and prevent overflow. Most fragrance oils recommend a 6–10% load.",
      };
    },
  },

  "cosplay-foam-clay-estimator": {
    fields: [
      small("length", "Piece length", 30, 12),
      small("width", "Piece width", 20, 8),
      small("height", "Piece depth / curve", 10, 4),
      count("layers", "Foam layers", 2),
      {
        kind: "select",
        id: "sheet",
        label: "Foam sheet size",
        default: "5400",
        options: [
          { value: "5400", label: "60 × 90 cm sheet (5,400 cm²)" },
          { value: "1800", label: "30 × 60 cm sheet (1,800 cm²)" },
          { value: "697", label: "9 × 12 in sheet (697 cm²)" },
          { value: "623", label: "A4 sheet (623 cm²)" },
        ],
      },
      field("thickness", "Clay thickness", { default: 5, unit: "mm" }, { default: 0.1875, unit: "in" }),
      wasteField("15"),
    ],
    calculate(v, system) {
      const L = toMSmall(n(v, "length"), system);
      const W = toMSmall(n(v, "width"), system);
      const H = toMSmall(n(v, "height"), system);
      const layers = Math.max(1, n(v, "layers", 1));
      const sheetCm2 = n(v, "sheet", 5400);
      const thicknessCm = toMM(n(v, "thickness"), system) * 100;
      const waste = n(v, "waste") / 100;
      if (L <= 0 || W <= 0 || H <= 0) return { items: [], error: "Enter positive piece dimensions." };
      const areaCm2 = 2 * ((L * W) + (L * H) + (W * H)) * 10000 * layers;
      const sheets = Math.ceil((areaCm2 * (1 + waste)) / sheetCm2);
      const clayG = areaCm2 * thicknessCm * 1.5;
      return {
        items: [
          { label: "Foam sheets required", value: sheets, unit: "sheets", decimals: 0, emphasis: true },
          { label: "Surface area", value: system === "metric" ? areaCm2 : areaCm2 / 6.4516, unit: system === "metric" ? "cm²" : "in²", decimals: 0 },
          { label: "Modelling clay", value: kgOut(clayG / 1000, system), unit: weightUnit(system), decimals: 0 },
          { label: "Clay in grams", value: clayG, unit: "g", decimals: 0 },
          { label: "Layers used", value: layers, unit: "layers", decimals: 0 },
        ],
        note: "The surface area is a box approximation for armour plates and props. Complex shapes need a pattern test on paper first — it saves far more foam than a tighter waste estimate.",
      };
    },
  },

  "3d-printing-filament-calculator": {
    fields: [
      field(
        "volume",
        "Model volume (solid)",
        { default: 100, unit: "cm³" },
        { default: 6.1, unit: "in³" },
        "Your slicer shows this as the model volume before infill.",
      ),
      {
        kind: "select",
        id: "material",
        label: "Filament material",
        default: "1.24",
        options: [
          { value: "1.24", label: "PLA — 1.24 g/cm³" },
          { value: "1.27", label: "PETG — 1.27 g/cm³" },
          { value: "1.04", label: "ABS — 1.04 g/cm³" },
          { value: "1.21", label: "TPU — 1.21 g/cm³" },
          { value: "1.14", label: "Nylon — 1.14 g/cm³" },
        ],
      },
      field("infill", "Infill", { default: 20, unit: "%", max: 100, step: 5 }, { default: 20, unit: "%", max: 100, step: 5 }),
      field("supports", "Supports allowance", { default: 5, unit: "%", step: 1 }, { default: 5, unit: "%", step: 1 }),
      field("waste", "Failed prints / purge", { default: 5, unit: "%", step: 1 }, { default: 5, unit: "%", step: 1 }),
      field("spool", "Spool weight", { default: 1000, unit: "g" }, { default: 35.3, unit: "oz" }),
      {
        kind: "select",
        id: "diameter",
        label: "Filament diameter",
        default: "1.75",
        options: [
          { value: "1.75", label: "1.75 mm" },
          { value: "2.85", label: "2.85 mm" },
        ],
      },
    ],
    calculate(v, system) {
      const volumeCm3 = system === "metric" ? n(v, "volume", 100) : n(v, "volume", 6.1) * 16.387064;
      const density = n(v, "material", 1.24);
      const infill = clamp(n(v, "infill", 20), 0);
      const supports = n(v, "supports") / 100;
      const waste = n(v, "waste") / 100;
      const spoolG = toG(n(v, "spool", system === "metric" ? 1000 : 35.3), system);
      const diameter = n(v, "diameter", 1.75);
      if (volumeCm3 <= 0 || diameter <= 0) return { items: [], error: "Enter a model volume and filament diameter." };
      const solidFraction = 0.18 + 0.82 * (infill / 100);
      const usedVolume = volumeCm3 * solidFraction * (1 + supports) * (1 + waste);
      const grams = usedVolume * density;
      const lengthM = usedVolume / (Math.PI * (diameter / 20) ** 2) / 100;
      return {
        items: [
          { label: "Filament required", value: grams, unit: "g", decimals: 0, emphasis: true },
          { label: "Filament length", value: lengthM, unit: "m", decimals: 2 },
          { label: "Spool used", value: (grams / spoolG) * 100, unit: "%", decimals: 1 },
          { label: "Prints from one spool", value: Math.floor(spoolG / grams), unit: "prints", decimals: 0 },
          { label: "Filament in ounces", value: grams / 28.3495, unit: "oz", decimals: 1 },
        ],
        note: "The 18% shell allowance is a rough average for a typical wall count. Your slicer's estimated filament weight is always more precise — use this tool for ordering and comparing spools.",
      };
    },
  },

  "model-train-scale-calculator": {
    fields: [
      {
        kind: "select",
        id: "scale",
        label: "Model scale",
        default: "87",
        options: [
          { value: "220", label: "Z scale — 1:220" },
          { value: "160", label: "N scale — 1:160" },
          { value: "87", label: "HO scale — 1:87" },
          { value: "76", label: "OO scale — 1:76" },
          { value: "64", label: "S scale — 1:64" },
          { value: "48", label: "O scale — 1:48" },
          { value: "22.5", label: "G scale — 1:22.5" },
        ],
      },
      {
        kind: "select",
        id: "direction",
        label: "Conversion direction",
        default: "real",
        options: [
          { value: "real", label: "Real-world length → model" },
          { value: "model", label: "Model length → real world" },
        ],
      },
      length("real", "Real-world length", 20, 65),
      small("model", "Model length", 23, 9),
    ],
    calculate(v, system) {
      const scale = n(v, "scale", 87);
      const direction = s(v, "direction", "real");
      const realM = toM(n(v, "real"), system);
      const modelCm = toMSmall(n(v, "model"), system) * 100;
      if (scale <= 0) return { items: [], error: "Choose a valid scale." };
      const outModelCm = direction === "real" ? (realM * 100) / scale : modelCm;
      const outRealM = direction === "real" ? realM : (modelCm / 100) * scale;
      return {
        items: [
          { label: "Model length", value: smallOut(outModelCm / 100, system), unit: smallUnit(system), decimals: 2, emphasis: true },
          { label: "Real-world length", value: lenOut(outRealM, system), unit: lengthUnit(system), decimals: 2 },
          { label: "Scale", value: `1 : ${scale}`, format: "text" },
          { label: "Scale factor", value: scale, unit: "× smaller", decimals: 1 },
          { label: "Model length in millimetres", value: outModelCm * 10, unit: "mm", decimals: 1 },
        ],
        note: "Model railway scales describe the ratio between the real world and the model. Gauges such as HO and OO share similar track widths but different scale ratios, so always check both.",
      };
    },
  },

  "guitar-fretboard-calculator": {
    fields: [
      field(
        "scaleLength",
        "Scale length",
        { default: 648, unit: "mm" },
        { default: 25.5, unit: "in" },
        "Fender Stratocaster: 25.5 in / 648 mm. Gibson Les Paul: 24.75 in / 628 mm.",
      ),
      {
        kind: "select",
        id: "frets",
        label: "Number of frets",
        default: "22",
        options: ["19", "20", "21", "22", "24"].map((x) => ({ value: x, label: `${x} frets` })),
      },
    ],
    calculate(v, system) {
      const scale = toMM(n(v, "scaleLength"), system) * 1000;
      const frets = Math.max(1, Math.min(24, n(v, "frets", 22)));
      if (scale <= 0) return { items: [], error: "Enter a scale length greater than zero." };
      const position = (fret: number) => scale * (1 - 2 ** (-fret / 12));
      const unit = system === "metric" ? "mm" : "in";
      const convert = (mm: number) => (system === "metric" ? mm : mm / 25.4);
      const rows = Array.from({ length: frets }, (_, i) => {
        const fret = i + 1;
        return [
          fret,
          convert(position(fret)).toFixed(2),
          convert(position(fret) - position(fret - 1)).toFixed(2),
        ];
      });
      return {
        items: [
          { label: "12th fret position", value: convert(position(12)), unit, decimals: 2, emphasis: true, hint: "The 12th fret sits at half the scale length." },
          { label: "1st fret position", value: convert(position(1)), unit, decimals: 2 },
          { label: `Fret ${frets} position`, value: convert(position(frets)), unit, decimals: 2 },
          { label: "Scale length", value: convert(scale), unit, decimals: 1 },
        ],
        table: { title: "Fret positions from the nut", columns: ["Fret", `From nut (${unit})`, `From previous fret (${unit})`], rows },
        note: "Positions are measured from the nut to the centre of each fret slot. The 12th fret must land exactly halfway along the scale for correct octaves.",
      };
    },
  },

  "homebrew-abv-calculator": {
    unitless: true,
    fields: [
      field("og", "Original gravity (OG)", { default: 1.05, unit: "SG", step: 0.001 }, { default: 1.05, unit: "SG", step: 0.001 }),
      field("fg", "Final gravity (FG)", { default: 1.01, unit: "SG", step: 0.001 }, { default: 1.01, unit: "SG", step: 0.001 }),
      {
        kind: "select",
        id: "formula",
        label: "ABV formula",
        default: "standard",
        options: [
          { value: "standard", label: "Standard — (OG − FG) × 131.25" },
          { value: "alternate", label: "Alternate — accounts for high gravity" },
        ],
      },
    ],
    calculate(v) {
      const og = n(v, "og", 1.05);
      const fg = n(v, "fg", 1.01);
      if (og <= 1 || fg <= 0.9 || fg > og) {
        return { items: [], error: "Original gravity must be above 1.000 and final gravity must be lower than OG." };
      }
      const diff = og - fg;
      const abv =
        s(v, "formula") === "alternate"
          ? (76.08 * diff * fg) / (1.775 - og) * (1 / 0.794)
          : diff * 131.25;
      const attenuation = (diff / (og - 1)) * 100;
      return {
        items: [
          { label: "Alcohol by volume", value: abv, unit: "% ABV", decimals: 2, emphasis: true },
          { label: "Alcohol by weight", value: abv * 0.789, unit: "% ABW", decimals: 2 },
          { label: "Apparent attenuation", value: attenuation, unit: "%", decimals: 1 },
          { label: "Gravity points dropped", value: diff * 1000, unit: "points", decimals: 0 },
          { label: "Final gravity", value: fg, unit: "SG", decimals: 3 },
        ],
        note: "Hydrometer readings should be temperature-corrected. For high-gravity beers above 1.070, the alternate formula is usually closer to lab results.",
      };
    },
  },

  "fabric-yardage-estimator": {
    fields: [
      count("pieces", "Number of pieces", 2),
      small("pieceLength", "Piece length", 70, 28),
      small("pieceWidth", "Piece width", 55, 22),
      small("fabricWidth", "Fabric width", 112, 44, "Usable width between selvedges."),
      wasteField("15"),
    ],
    calculate(v, system) {
      const pieces = n(v, "pieces", 1);
      const pieceL = toMSmall(n(v, "pieceLength"), system);
      const pieceW = toMSmall(n(v, "pieceWidth"), system);
      const fabricW = toMSmall(n(v, "fabricWidth"), system);
      const waste = n(v, "waste") / 100;
      if (pieces <= 0 || pieceL <= 0 || pieceW <= 0 || fabricW <= 0) {
        return { items: [], error: "Enter positive piece and fabric dimensions." };
      }
      const area = pieces * pieceL * pieceW;
      const running = (area / fabricW) * (1 + waste);
      return {
        items: [
          { label: "Fabric required", value: system === "metric" ? running : running * 1.09361, unit: system === "metric" ? "m" : "yd", decimals: 2, emphasis: true },
          { label: "Fabric in yards", value: running * 1.09361, unit: "yd", decimals: 2 },
          { label: "Fabric in metres", value: running, unit: "m", decimals: 2 },
          { label: "Total piece area", value: areaOut(area, system), unit: areaUnit(system), decimals: 2 },
          { label: "Fabric width", value: smallOut(fabricW, system), unit: smallUnit(system), decimals: 0 },
        ],
        note: "This is an area-based estimate. Directional prints, nap fabrics and pattern repeats can increase the requirement — lay out your pattern pieces to be sure.",
      };
    },
  },

  "quilting-border-calculator": {
    fields: [
      small("quiltLength", "Quilt top length", 180, 72),
      small("quiltWidth", "Quilt top width", 150, 60),
      small("borderWidth", "Each border width", 7.5, 3),
      {
        kind: "select",
        id: "borders",
        label: "Number of borders",
        default: "1",
        options: ["1", "2", "3", "4"].map((x) => ({ value: x, label: `${x} border${x === "1" ? "" : "s"}` })),
      },
      small("fabricWidth", "Usable fabric width", 108, 42, "Width of fabric (WOF) between selvedges."),
      wasteField("10"),
    ],
    calculate(v, system) {
      const L = toMSmall(n(v, "quiltLength"), system);
      const W = toMSmall(n(v, "quiltWidth"), system);
      const bw = toMSmall(n(v, "borderWidth"), system);
      const borders = Math.max(1, n(v, "borders", 1));
      const fabricW = toMSmall(n(v, "fabricWidth"), system);
      const waste = n(v, "waste") / 100;
      if (L <= 0 || W <= 0 || bw <= 0 || fabricW <= 0) {
        return { items: [], error: "Enter positive quilt, border and fabric widths." };
      }
      let totalLength = 0;
      for (let i = 0; i < borders; i++) {
        totalLength += 2 * (L + W) + 8 * bw * i;
      }
      totalLength += borders * 0.15;
      const strips = Math.ceil((totalLength * (1 + waste)) / fabricW);
      const running = strips * bw;
      return {
        items: [
          { label: "Border fabric length", value: system === "metric" ? running : running * 1.09361, unit: system === "metric" ? "m" : "yd", decimals: 2, emphasis: true },
          { label: "Total border strip length", value: system === "metric" ? totalLength : totalLength * 1.09361, unit: system === "metric" ? "m" : "yd", decimals: 2 },
          { label: "Strips to cut", value: strips, unit: `strips × ${bw > 0 ? smallOut(bw, system).toFixed(1) : 0} ${smallUnit(system)}`, decimals: 0 },
          { label: "Border area", value: areaOut(totalLength * bw, system), unit: areaUnit(system), decimals: 2 },
          { label: "Fabric in metres", value: running, unit: "m", decimals: 2 },
        ],
        note: "Assumes straight-cut borders with a small seam allowance. For mitred corners, add one extra border-width to each side before calculating strips.",
      };
    },
  },

  "bead-jewelry-calculator": {
    fields: [
      small("length", "Finished length", 45, 18),
      field("bead", "Bead diameter", { default: 8, unit: "mm" }, { default: 0.315, unit: "in" }),
      field("spacer", "Spacer / knot gap", { default: 1, unit: "mm" }, { default: 0.04, unit: "in" }),
      small("clasp", "Clasp & finishing allowance", 3, 1.25),
      count("strands", "Number of strands", 1),
    ],
    calculate(v, system) {
      const lengthCm = toMSmall(n(v, "length"), system) * 100;
      const beadCm = toMM(n(v, "bead"), system) * 100;
      const spacerCm = toMM(n(v, "spacer"), system) * 100;
      const claspCm = toMSmall(n(v, "clasp"), system) * 100;
      const strands = Math.max(1, n(v, "strands", 1));
      if (lengthCm <= 0 || beadCm <= 0) return { items: [], error: "Enter a finished length and bead diameter." };
      const available = clamp(lengthCm - claspCm);
      const beads = Math.floor(available / (beadCm + spacerCm));
      const used = beads * (beadCm + spacerCm);
      return {
        items: [
          { label: "Beads per strand", value: beads, unit: "beads", decimals: 0, emphasis: true },
          { label: "Total beads", value: beads * strands, unit: "beads", decimals: 0 },
          { label: "Beaded length", value: smallOut(used / 100, system), unit: smallUnit(system), decimals: 2 },
          { label: "Leftover length", value: smallOut((available - used) / 100, system), unit: smallUnit(system), decimals: 2 },
          { label: "Finished strands", value: strands, unit: "strands", decimals: 0 },
        ],
        note: "The clasp allowance covers the clasp, crimp beads and a little breathing room. Add 1–2 beads for a looser fit, or use a bead board to lay out the pattern first.",
      };
    },
  },

  "woodworking-board-foot-calculator": {
    fields: [
      {
        kind: "select",
        id: "nominal",
        label: "Nominal lumber size",
        default: "2x4",
        options: [
          { value: "1x4", label: "1 × 4 — actual 0.75 × 3.5 in" },
          { value: "1x6", label: "1 × 6 — actual 0.75 × 5.5 in" },
          { value: "1x8", label: "1 × 8 — actual 0.75 × 7.25 in" },
          { value: "2x4", label: "2 × 4 — actual 1.5 × 3.5 in" },
          { value: "2x6", label: "2 × 6 — actual 1.5 × 5.5 in" },
          { value: "2x8", label: "2 × 8 — actual 1.5 × 7.25 in" },
          { value: "4x4", label: "4 × 4 — actual 3.5 × 3.5 in" },
        ],
      },
      length("length", "Length per board", 4, 12),
      count("quantity", "Number of boards", 6),
      wasteField("10"),
    ],
    calculate(v, system) {
      const nominal = s(v, "nominal", "2x4").split("x").map(Number);
      const t = nominal[0] || 2;
      const w = nominal[1] || 4;
      const lFt = lenOut(toM(n(v, "length"), system), "imperial");
      const qty = n(v, "quantity", 1);
      const waste = n(v, "waste") / 100;
      if (lFt <= 0 || qty <= 0) return { items: [], error: "Enter a board length and quantity." };
      const bf = ((t * w * lFt) / 12) * qty * (1 + waste);
      const actual = {
        "1x4": "0.75 × 3.5 in",
        "1x6": "0.75 × 5.5 in",
        "1x8": "0.75 × 7.25 in",
        "2x4": "1.5 × 3.5 in",
        "2x6": "1.5 × 5.5 in",
        "2x8": "1.5 × 7.25 in",
        "4x4": "3.5 × 3.5 in",
      }[s(v, "nominal", "2x4")];
      return {
        items: [
          { label: "Board feet", value: bf, unit: "bd ft", decimals: 2, emphasis: true },
          { label: "Linear feet", value: lFt * qty, unit: "lin ft", decimals: 1 },
          { label: "Actual dressed size", value: actual ?? "—", format: "text" },
          { label: "Volume", value: system === "metric" ? ((t * 0.0254) * (w * 0.0254) * (lFt * 0.3048) * qty * (1 + waste)) : ((t * w * lFt) / 12) * qty * (1 + waste) / 12, unit: system === "metric" ? "m³" : "cu ft", decimals: 3 },
        ],
        note: "Board footage is calculated from nominal dimensions, which is how lumber is sold. The actual dressed size is smaller and is what you use for the finished project.",
      };
    },
  },

  "cake-pan-size-converter": {
    fields: [
      {
        kind: "select",
        id: "oldShape",
        label: "Original pan shape",
        default: "round",
        options: [
          { value: "round", label: "Round" },
          { value: "square", label: "Square" },
          { value: "rect", label: "Rectangular" },
        ],
      },
      small("oldA", "Original diameter / length", 20, 8),
      small("oldB", "Original width (rectangular only)", 20, 8),
      small("oldDepth", "Original pan depth", 7, 2.75),
      {
        kind: "select",
        id: "newShape",
        label: "New pan shape",
        default: "round",
        options: [
          { value: "round", label: "Round" },
          { value: "square", label: "Square" },
          { value: "rect", label: "Rectangular" },
        ],
      },
      small("newA", "New diameter / length", 23, 9),
      small("newB", "New width (rectangular only)", 23, 9),
      small("newDepth", "New pan depth", 7, 2.75),
    ],
    calculate(v, system) {
      const oldA = toMSmall(n(v, "oldA"), system);
      const oldB = toMSmall(n(v, "oldB"), system);
      const oldD = toMSmall(n(v, "oldDepth"), system);
      const newA = toMSmall(n(v, "newA"), system);
      const newB = toMSmall(n(v, "newB"), system);
      const newD = toMSmall(n(v, "newDepth"), system);
      const area = (shape: string, a: number, b: number) =>
        shape === "round" ? Math.PI * (a / 2) ** 2 : shape === "square" ? a * a : a * b;
      const oldVol = area(s(v, "oldShape", "round"), oldA, oldB) * oldD;
      const newVol = area(s(v, "newShape", "round"), newA, newB) * newD;
      if (oldVol <= 0 || newVol <= 0) return { items: [], error: "Enter positive pan dimensions." };
      const ratio = newVol / oldVol;
      const timeGuide = ratio > 1.25 ? "Add 10–20 minutes; check early." : ratio < 0.8 ? "Start checking 5–10 minutes earlier." : "Keep the same bake time; check at the usual point.";
      return {
        items: [
          { label: "Batter multiplier", value: ratio, unit: "× original recipe", decimals: 2, emphasis: true },
          { label: "Original pan volume", value: system === "metric" ? oldVol * 1000 : oldVol * 61.0237, unit: system === "metric" ? "mL" : "in³", decimals: 0 },
          { label: "New pan volume", value: system === "metric" ? newVol * 1000 : newVol * 61.0237, unit: system === "metric" ? "mL" : "in³", decimals: 0 },
          { label: "Batter to make", value: ratio * 100, unit: "% of recipe", decimals: 0 },
          { label: "Oven time guide", value: timeGuide, format: "text" },
        ],
        note: "Volume is a better guide than diameter alone. Keep the oven temperature the same, and adjust the time gradually — deeper batters need longer, shallower ones need less.",
      };
    },
  },
};
