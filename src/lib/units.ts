export type UnitCategoryId = "length" | "weight" | "temperature" | "volume" | "area" | "speed" | "data";

export type UnitDef = {
  id: string;
  label: string;
  symbol: string;
  /** multiplier to the category base unit (unused for temperature) */
  factor: number;
};

export type UnitCategory = {
  id: UnitCategoryId;
  units: UnitDef[];
  metricDefault: string;
  imperialDefault: string;
};

export const unitCategories: Record<UnitCategoryId, UnitCategory> = {
  length: {
    id: "length",
    metricDefault: "m",
    imperialDefault: "ft",
    units: [
      { id: "mm", label: "Millimetres", symbol: "mm", factor: 0.001 },
      { id: "cm", label: "Centimetres", symbol: "cm", factor: 0.01 },
      { id: "m", label: "Metres", symbol: "m", factor: 1 },
      { id: "km", label: "Kilometres", symbol: "km", factor: 1000 },
      { id: "in", label: "Inches", symbol: "in", factor: 0.0254 },
      { id: "ft", label: "Feet", symbol: "ft", factor: 0.3048 },
      { id: "yd", label: "Yards", symbol: "yd", factor: 0.9144 },
      { id: "mi", label: "Miles", symbol: "mi", factor: 1609.344 },
      { id: "nmi", label: "Nautical miles", symbol: "nmi", factor: 1852 },
    ],
  },
  weight: {
    id: "weight",
    metricDefault: "kg",
    imperialDefault: "lb",
    units: [
      { id: "mg", label: "Milligrams", symbol: "mg", factor: 0.000001 },
      { id: "g", label: "Grams", symbol: "g", factor: 0.001 },
      { id: "kg", label: "Kilograms", symbol: "kg", factor: 1 },
      { id: "t", label: "Metric tonnes", symbol: "t", factor: 1000 },
      { id: "oz", label: "Ounces", symbol: "oz", factor: 0.028349523125 },
      { id: "lb", label: "Pounds", symbol: "lb", factor: 0.45359237 },
      { id: "st", label: "Stone", symbol: "st", factor: 6.35029318 },
      { id: "ton", label: "US short tons", symbol: "ton", factor: 907.18474 },
    ],
  },
  temperature: {
    id: "temperature",
    metricDefault: "c",
    imperialDefault: "f",
    units: [
      { id: "c", label: "Celsius", symbol: "°C", factor: 1 },
      { id: "f", label: "Fahrenheit", symbol: "°F", factor: 1 },
      { id: "k", label: "Kelvin", symbol: "K", factor: 1 },
    ],
  },
  volume: {
    id: "volume",
    metricDefault: "l",
    imperialDefault: "gal",
    units: [
      { id: "ml", label: "Millilitres", symbol: "mL", factor: 0.001 },
      { id: "l", label: "Litres", symbol: "L", factor: 1 },
      { id: "m3", label: "Cubic metres", symbol: "m³", factor: 1000 },
      { id: "tsp", label: "Teaspoons (US)", symbol: "tsp", factor: 0.00492892159 },
      { id: "tbsp", label: "Tablespoons (US)", symbol: "tbsp", factor: 0.0147867648 },
      { id: "cup", label: "Cups (US)", symbol: "cup", factor: 0.2365882365 },
      { id: "floz", label: "Fluid ounces (US)", symbol: "fl oz", factor: 0.0295735296 },
      { id: "pt", label: "Pints (US)", symbol: "pt", factor: 0.473176473 },
      { id: "qt", label: "Quarts (US)", symbol: "qt", factor: 0.946352946 },
      { id: "gal", label: "Gallons (US)", symbol: "gal", factor: 3.785411784 },
      { id: "ft3", label: "Cubic feet", symbol: "ft³", factor: 28.316846592 },
    ],
  },
  area: {
    id: "area",
    metricDefault: "m2",
    imperialDefault: "ft2",
    units: [
      { id: "cm2", label: "Square centimetres", symbol: "cm²", factor: 0.0001 },
      { id: "m2", label: "Square metres", symbol: "m²", factor: 1 },
      { id: "ha", label: "Hectares", symbol: "ha", factor: 10000 },
      { id: "km2", label: "Square kilometres", symbol: "km²", factor: 1000000 },
      { id: "in2", label: "Square inches", symbol: "in²", factor: 0.00064516 },
      { id: "ft2", label: "Square feet", symbol: "ft²", factor: 0.09290304 },
      { id: "yd2", label: "Square yards", symbol: "yd²", factor: 0.83612736 },
      { id: "acre", label: "Acres", symbol: "ac", factor: 4046.8564224 },
    ],
  },
  speed: {
    id: "speed",
    metricDefault: "kmh",
    imperialDefault: "mph",
    units: [
      { id: "ms", label: "Metres per second", symbol: "m/s", factor: 1 },
      { id: "kmh", label: "Kilometres per hour", symbol: "km/h", factor: 0.2777777778 },
      { id: "mph", label: "Miles per hour", symbol: "mph", factor: 0.44704 },
      { id: "kn", label: "Knots", symbol: "kn", factor: 0.5144444444 },
      { id: "fts", label: "Feet per second", symbol: "ft/s", factor: 0.3048 },
    ],
  },
  data: {
    id: "data",
    metricDefault: "gb",
    imperialDefault: "gib",
    units: [
      { id: "b", label: "Bytes", symbol: "B", factor: 1 },
      { id: "kb", label: "Kilobytes (decimal)", symbol: "kB", factor: 1000 },
      { id: "kib", label: "Kibibytes (binary)", symbol: "KiB", factor: 1024 },
      { id: "mb", label: "Megabytes (decimal)", symbol: "MB", factor: 1_000_000 },
      { id: "mib", label: "Mebibytes (binary)", symbol: "MiB", factor: 1_048_576 },
      { id: "gb", label: "Gigabytes (decimal)", symbol: "GB", factor: 1_000_000_000 },
      { id: "gib", label: "Gibibytes (binary)", symbol: "GiB", factor: 1_073_741_824 },
      { id: "tb", label: "Terabytes (decimal)", symbol: "TB", factor: 1_000_000_000_000 },
      { id: "tib", label: "Tebibytes (binary)", symbol: "TiB", factor: 1_099_511_627_776 },
    ],
  },
};

export function convert(value: number, from: string, to: string, category: UnitCategoryId): number {
  if (category === "temperature") {
    const celsius =
      from === "c" ? value : from === "f" ? ((value - 32) * 5) / 9 : value - 273.15;
    return to === "c" ? celsius : to === "f" ? (celsius * 9) / 5 + 32 : celsius + 273.15;
  }
  const units = unitCategories[category].units;
  const fromUnit = units.find((u) => u.id === from);
  const toUnit = units.find((u) => u.id === to);
  if (!fromUnit || !toUnit) return Number.NaN;
  return (value * fromUnit.factor) / toUnit.factor;
}

export function unitSymbol(category: UnitCategoryId, id: string): string {
  return unitCategories[category].units.find((u) => u.id === id)?.symbol ?? id;
}
