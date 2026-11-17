export type UnitSystem = "metric" | "imperial";

export type SelectOption = { value: string; label: string };

export type NumberField = {
  kind: "number";
  id: string;
  label: string;
  help?: string;
  metric: { default: number; unit: string; min?: number; max?: number; step?: number };
  imperial: { default: number; unit: string; min?: number; max?: number; step?: number };
};

export type SelectField = {
  kind: "select";
  id: string;
  label: string;
  help?: string;
  default: string;
  options: SelectOption[];
};

export type Field = NumberField | SelectField;

export type ResultItem = {
  label: string;
  value: number | string;
  unit?: string;
  decimals?: number;
  emphasis?: boolean;
  hint?: string;
  format?: "number" | "text";
};

export type ResultTable = {
  title?: string;
  columns: string[];
  rows: (string | number)[][];
};

export type CalcOutput = {
  items: ResultItem[];
  note?: string;
  error?: string;
  table?: ResultTable;
};

export type Values = Record<string, string>;

export type Calculator = {
  fields: Field[];
  calculate: (values: Values, system: UnitSystem) => CalcOutput;
  unitless?: boolean;
  resultHeading?: string;
};

export const n = (values: Values, id: string, fallback = 0): number => {
  const raw = String(values[id] ?? "").trim().replace(",", ".");
  const parsed = Number.parseFloat(raw);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export const s = (values: Values, id: string, fallback = ""): string => String(values[id] ?? fallback);

export const clamp = (value: number, min = 0) => (Number.isFinite(value) ? Math.max(min, value) : min);

/** metres from metres (metric) / feet (imperial) */
export const toM = (value: number, system: UnitSystem) => (system === "metric" ? value : value * 0.3048);
/** metres from centimetres (metric) / inches (imperial) */
export const toMSmall = (value: number, system: UnitSystem) =>
  system === "metric" ? value / 100 : value * 0.0254;
/** metres from millimetres (metric) / inches (imperial) */
export const toMM = (value: number, system: UnitSystem) =>
  system === "metric" ? value / 1000 : value * 0.0254;
/** kilograms from kilograms (metric) / pounds (imperial) */
export const toKg = (value: number, system: UnitSystem) =>
  system === "metric" ? value : value * 0.45359237;
/** grams from grams (metric) / ounces (imperial) */
export const toG = (value: number, system: UnitSystem) =>
  system === "metric" ? value : value * 28.349523125;
/** litres from litres (metric) / US gallons (imperial) */
export const toL = (value: number, system: UnitSystem) =>
  system === "metric" ? value : value * 3.785411784;
/** cubic metres to the active display volume unit */
export const volOut = (m3: number, system: UnitSystem) =>
  system === "metric" ? m3 : m3 * 1.30795062;
export const areaOut = (m2: number, system: UnitSystem) =>
  system === "metric" ? m2 : m2 * 10.7639104;
export const smallOut = (m: number, system: UnitSystem) =>
  system === "metric" ? m * 100 : m / 0.0254;
export const lenOut = (m: number, system: UnitSystem) => (system === "metric" ? m : m / 0.3048);
export const kgOut = (kg: number, system: UnitSystem) => (system === "metric" ? kg : kg / 0.45359237);
export const gOut = (g: number, system: UnitSystem) => (system === "metric" ? g : g / 28.349523125);
export const lOut = (litres: number, system: UnitSystem) =>
  system === "metric" ? litres : litres / 3.785411784;

export const volumeUnit = (system: UnitSystem) => (system === "metric" ? "m³" : "cu yd");
export const areaUnit = (system: UnitSystem) => (system === "metric" ? "m²" : "sq ft");
export const smallUnit = (system: UnitSystem) => (system === "metric" ? "cm" : "in");
export const lengthUnit = (system: UnitSystem) => (system === "metric" ? "m" : "ft");
export const weightUnit = (system: UnitSystem) => (system === "metric" ? "kg" : "lb");
export const smallWeightUnit = (system: UnitSystem) => (system === "metric" ? "g" : "oz");
export const liquidUnit = (system: UnitSystem) => (system === "metric" ? "L" : "gal");

export const round = (value: number, decimals = 2): number => {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
};

export const otherSystem = (system: UnitSystem): UnitSystem =>
  system === "metric" ? "imperial" : "metric";
