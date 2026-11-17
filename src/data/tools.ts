export type CategoryId = "construction" | "hobby" | "universal";

export type Tool = {
  slug: string;
  category: CategoryId;
  icon: string;
  name: string;
  short: string;
  keywords: string[];
  popular?: boolean;
};

export const tools: Tool[] = [
  {
    slug: "concrete-volume-calculator",
    category: "construction",
    icon: "Layers3",
    name: "Concrete Volume Calculator",
    short: "Work out concrete volume, bag counts and weight for slabs, footings and columns.",
    keywords: ["cement", "slab", "footing", "column", "bags", "m3", "cubic yards"],
    popular: true,
  },
  {
    slug: "tile-quantity-estimator",
    category: "construction",
    icon: "LayoutGrid",
    name: "Tile Quantity Estimator",
    short: "Estimate tiles, boxes and waste for floors and walls of any size.",
    keywords: ["tiles", "floor", "wall", "grout", "boxes", "waste"],
    popular: true,
  },
  {
    slug: "paint-coverage-calculator",
    category: "construction",
    icon: "Paintbrush",
    name: "Paint Coverage Calculator",
    short: "Calculate litres of paint and cans needed for walls and ceilings.",
    keywords: ["paint", "litres", "gallons", "coverage", "coats", "walls"],
    popular: true,
  },
  {
    slug: "roof-pitch-calculator",
    category: "construction",
    icon: "House",
    name: "Roof Pitch Calculator",
    short: "Convert rise and run into roof angle, slope percentage and pitch ratio.",
    keywords: ["roof", "pitch", "slope", "angle", "rafter", "rise", "run"],
  },
  {
    slug: "rebar-weight-calculator",
    category: "construction",
    icon: "Ruler",
    name: "Rebar Weight Calculator",
    short: "Find rebar weight by bar diameter, total length and lap allowance.",
    keywords: ["rebar", "steel", "reinforcement", "weight", "diameter", "lap"],
  },
  {
    slug: "brick-block-wall-calculator",
    category: "construction",
    icon: "BrickWall",
    name: "Brick & Block Wall Calculator",
    short: "Estimate bricks, mortar volume and bags for a single-leaf wall.",
    keywords: ["brick", "block", "wall", "mortar", "masonry", "courses"],
  },
  {
    slug: "asphalt-driveway-calculator",
    category: "construction",
    icon: "CarFront",
    name: "Asphalt & Driveway Calculator",
    short: "Estimate asphalt volume, tonnes and compaction for driveways.",
    keywords: ["asphalt", "driveway", "tarmac", "tonnes", "compaction", "gravel"],
  },
  {
    slug: "drywall-sheetrock-estimator",
    category: "construction",
    icon: "PanelsTopLeft",
    name: "Drywall & Sheetrock Estimator",
    short: "Count drywall sheets, tape, compound and screws for a room.",
    keywords: ["drywall", "sheetrock", "gypsum", "plasterboard", "screws", "tape"],
  },
  {
    slug: "lumber-board-foot-calculator",
    category: "construction",
    icon: "TreePine",
    name: "Lumber & Board Foot Calculator",
    short: "Convert board dimensions into board feet, linear feet and volume.",
    keywords: ["lumber", "timber", "board foot", "hardwood", "linear feet"],
    popular: true,
  },
  {
    slug: "stair-stringer-calculator",
    category: "construction",
    icon: "TrendingUp",
    name: "Stair & Stringer Calculator",
    short: "Plan riser height, tread run, stair angle and stringer length.",
    keywords: ["stairs", "staircase", "stringer", "riser", "tread", "angle"],
  },
  {
    slug: "gravel-sand-calculator",
    category: "construction",
    icon: "Shovel",
    name: "Gravel & Sand Calculator",
    short: "Calculate gravel or sand volume, weight and bags for any area.",
    keywords: ["gravel", "sand", "aggregate", "tonnes", "bags", "base"],
  },
  {
    slug: "mulch-calculator",
    category: "construction",
    icon: "Sprout",
    name: "Mulch Calculator",
    short: "Find mulch volume and bag counts for garden beds and borders.",
    keywords: ["mulch", "garden", "bark", "compost", "bags", "beds"],
  },
  {
    slug: "sod-calculator",
    category: "construction",
    icon: "Leaf",
    name: "Sod Calculator",
    short: "Estimate sod rolls and coverage for a new lawn, including waste.",
    keywords: ["sod", "turf", "lawn", "grass", "rolls", "landscaping"],
  },
  {
    slug: "fence-post-calculator",
    category: "construction",
    icon: "Fence",
    name: "Fence Post Calculator",
    short: "Count fence posts, rails and concrete bags for your fence line.",
    keywords: ["fence", "posts", "rails", "concrete", "spacing", "gates"],
  },
  {
    slug: "decking-material-calculator",
    category: "construction",
    icon: "LayoutPanelTop",
    name: "Decking Material Calculator",
    short: "Estimate decking boards, linear length and screws for a deck.",
    keywords: ["deck", "decking", "boards", "composite", "screws", "joists"],
  },

  {
    slug: "yarn-yardage-calculator",
    category: "hobby",
    icon: "Spool",
    name: "Yarn Yardage Calculator",
    short: "Estimate yarn yardage, metres and skeins from project weight.",
    keywords: ["yarn", "knitting", "crochet", "skeins", "yardage", "wool"],
    popular: true,
  },
  {
    slug: "aquarium-stocking-calculator",
    category: "hobby",
    icon: "Fish",
    name: "Aquarium Stocking Calculator",
    short: "Check tank volume, stocking percentage and a safe fish count.",
    keywords: ["aquarium", "fish tank", "stocking", "gallons", "litres", "bioload"],
  },
  {
    slug: "pc-power-supply-calculator",
    category: "hobby",
    icon: "Cpu",
    name: "PC Power Supply Calculator",
    short: "Estimate peak system load and the right PSU wattage with headroom.",
    keywords: ["psu", "power supply", "pc build", "wattage", "gpu", "cpu"],
  },
  {
    slug: "resin-epoxy-volume-calculator",
    category: "hobby",
    icon: "FlaskConical",
    name: "Resin Epoxy Volume Calculator",
    short: "Calculate total resin, Part A and Part B for a mold and mix ratio.",
    keywords: ["resin", "epoxy", "mold", "craft", "hardener", "casting"],
  },
  {
    slug: "candle-wax-calculator",
    category: "hobby",
    icon: "Flame",
    name: "Candle Wax Calculator",
    short: "Work out wax and fragrance oil weights for any candle container.",
    keywords: ["candle", "wax", "soy", "fragrance", "jars", "craft"],
  },
  {
    slug: "cosplay-foam-clay-estimator",
    category: "hobby",
    icon: "Theater",
    name: "Cosplay Foam & Clay Estimator",
    short: "Estimate EVA foam sheets and modelling clay for prop builds.",
    keywords: ["cosplay", "foam", "clay", "armor", "props", "eva"],
  },
  {
    slug: "3d-printing-filament-calculator",
    category: "hobby",
    icon: "Printer",
    name: "3D Printing Filament Calculator",
    short: "Convert model volume and infill into filament grams, metres and spool use.",
    keywords: ["3d printing", "filament", "pla", "petg", "infill", "spool"],
  },
  {
    slug: "model-train-scale-calculator",
    category: "hobby",
    icon: "TrainFront",
    name: "Model Train Scale Calculator",
    short: "Scale real-world lengths to Z, N, HO, OO, O and G model sizes.",
    keywords: ["model train", "railway", "scale", "ho", "n scale", "gauge"],
  },
  {
    slug: "guitar-fretboard-calculator",
    category: "hobby",
    icon: "Guitar",
    name: "Guitar Fretboard Calculator",
    short: "Get exact fret positions from the nut for any scale length.",
    keywords: ["guitar", "fretboard", "scale length", "luthier", "fret", "intonation"],
  },
  {
    slug: "homebrew-abv-calculator",
    category: "hobby",
    icon: "Beer",
    name: "Home Brewing ABV Calculator",
    short: "Calculate ABV, attenuation and gravity points from OG and FG.",
    keywords: ["homebrew", "beer", "abv", "gravity", "attenuation", "brewing"],
  },
  {
    slug: "fabric-yardage-estimator",
    category: "hobby",
    icon: "Scissors",
    name: "Fabric Yardage Estimator",
    short: "Estimate fabric length in metres or yards from pattern pieces.",
    keywords: ["fabric", "sewing", "yardage", "pattern", "dressmaking"],
  },
  {
    slug: "quilting-border-calculator",
    category: "hobby",
    icon: "Grid2x2",
    name: "Quilting Border Calculator",
    short: "Calculate border strips and fabric yardage for a quilt top.",
    keywords: ["quilting", "quilt", "border", "strips", "fabric", "binding"],
  },
  {
    slug: "bead-jewelry-calculator",
    category: "hobby",
    icon: "Gem",
    name: "Bead & Jewelry Calculator",
    short: "Count beads per strand for necklaces, bracelets and spacers.",
    keywords: ["beads", "jewelry", "bracelet", "necklace", "strand", "craft"],
  },
  {
    slug: "woodworking-board-foot-calculator",
    category: "hobby",
    icon: "Hammer",
    name: "Woodworking Board Foot Calculator",
    short: "Price and plan nominal lumber with board feet and actual sizes.",
    keywords: ["woodworking", "lumber", "board foot", "nominal", "hardwood"],
  },
  {
    slug: "cake-pan-size-converter",
    category: "hobby",
    icon: "CakeSlice",
    name: "Cake Pan Size Converter",
    short: "Scale a cake recipe between round, square and rectangular pans.",
    keywords: ["cake", "baking", "pan", "recipe", "batter", "conversion"],
  },

  {
    slug: "unit-converter",
    category: "universal",
    icon: "ArrowLeftRight",
    name: "Universal Unit Converter",
    short: "Convert length, weight, temperature, volume, area, speed and data.",
    keywords: ["unit converter", "length", "weight", "temperature", "volume", "metric", "imperial"],
    popular: true,
  },
];

export const toolsByCategory = (category: CategoryId) => tools.filter((tool) => tool.category === category);

export const popularTools = tools.filter((tool) => tool.popular);

export const toolBySlug = (slug: string) => tools.find((tool) => tool.slug === slug);

export const categoryIds: CategoryId[] = ["construction", "hobby", "universal"];
