import type { ToolContent } from "./construction";

export const hobbyContent: Record<string, ToolContent> = {
  "yarn-yardage-calculator": {
    intro:
      "Running out of yarn near the end of a project is one of the most frustrating things in knitting or crochet. This calculator estimates the yardage and number of skeins you need from the finished weight of a similar project and the yardage per 100 g of your yarn.",
    howTo: [
      "Start with a finished project you can weigh, or use the weight stated in the pattern. A sweater might use 400–600 g, a hat 50–100 g and a pair of socks 100 g. If you are designing from scratch, knit a swatch, measure its area and weight, then scale up to the finished area.",
      "Choose the yarn weight that matches your yarn's thickness. The dropdown gives typical yardage per 100 g for lace, fingering, sport, DK, worsted and bulky yarns. These are averages; a dense wool and a fluffy alpaca can differ substantially. Check the ball band for the most reliable figure.",
      "Enter the yardage or metreage per skein and a waste allowance. Ten percent covers gauge differences, joins and a small amount of damaged yarn. The calculator returns the total length, the number of skeins and both metres and yards, so you can shop from any supplier.",
      "Remember that stitch pattern changes consumption. Cables, lace, colourwork and textured stitches use different amounts of yarn than stocking stitch at the same gauge. Buy one extra skein for a large garment, and check the dye lot — matching a missing skein later is often impossible.",
    ],
    formula: {
      equation:
        "Yarn length = (Finished weight ÷ 100) × Yardage per 100 g\nSkeins = Ceiling((Yarn length × (1 + Waste)) ÷ Skein length)",
      explanation:
        "The finished weight is divided by 100 g to find how many 100 g units the project contains, then multiplied by the yarn's yardage per 100 g. The waste factor is added before dividing by the skein length, and the result is rounded up to whole skeins.",
      example:
        "A 400 g DK project at 250 yd per 100 g needs (400 ÷ 100) × 250 = 1,000 yd. With 10% waste that is 1,100 yd. If one skein has 220 yd, you need 5 skeins.",
    },
    faqs: [
      {
        q: "How accurate is the weight method?",
        a: "It is usually within 10–15% for the same yarn and a similar stitch pattern. Gauge, stitch texture and fibre density all affect the result. A swatch-based calculation is more accurate for a new design.",
      },
      {
        q: "Should I buy an extra skein?",
        a: "For garments and large blankets, yes. It protects against gauge differences, knots and future repairs. Check the dye lot and keep the receipt in case you do not need it.",
      },
      {
        q: "How many yards are in 100 g of DK yarn?",
        a: "Roughly 250 yards (230 m), but it varies widely by fibre and manufacturer. A dense cotton DK may be closer to 200 yd, while a fluffy blend may exceed 300 yd.",
      },
      {
        q: "Does crochet use more yarn than knitting?",
        a: "Often yes, for the same project and yarn, because crochet stitches are usually denser and taller. Add 10–20% to a knitted estimate if you are converting a pattern to crochet.",
      },
    ],
    tips: [
      "Keep the ball band — it lists yardage, weight, fibre and dye lot.",
      "Weigh your swatch on a kitchen scale for better accuracy.",
      "Buy all skeins for a project at once from the same dye lot.",
    ],
  },
  "aquarium-stocking-calculator": {
    intro:
      "The old ‘one inch per gallon’ rule is a rough starting point, not a stocking plan. This calculator checks tank volume, fish inches and filtration level so you can see how close a proposed stock list is to a sensible bioload.",
    howTo: [
      "Measure the tank's inside length, width and water height, not the outside dimensions. Enter them in centimetres or inches. The calculator converts the volume to litres and US gallons. Remember that substrate, decor and rocks displace water, so the usable volume is usually a little lower than the geometric volume.",
      "Enter the adult length of the fish you plan to keep, not the size they are now. A fish that is 3 cm in the shop may reach 15 cm, and stocking calculations must use adult size. Enter the number of fish and choose a filtration level: light, normal or heavy.",
      "Read the stock percentage and the maximum number of fish of that size. The rule is based on one inch of adult fish per US gallon, adjusted by the filtration factor. A result under 70% is comfortable for many community setups; near 100% is fully stocked; above 100% is overstocked.",
      "Use the result alongside research, not instead of it. The rule ignores body mass, waste output, swimming space, territorial behaviour and oxygen demand. Goldfish, cichlids and plecos produce far more waste than their length suggests. Check temperature, pH, hardness and adult tank size for every species before buying.",
    ],
    formula: {
      equation:
        "Volume (L) = Length × Width × Height × 1,000\nGallons = Litres ÷ 3.785\nStock % = ((Fish length in inches × Count) ÷ (Gallons × Filtration factor)) × 100",
      explanation:
        "The tank dimensions in metres give cubic metres; multiplying by 1,000 gives litres. Fish length is converted to inches and multiplied by the number of fish. The capacity in inches is the gallon volume multiplied by the filtration factor, and the stock percentage compares the two.",
      example:
        "A 60 × 30 × 40 cm tank holds 72 L, or 19 US gallons. Ten fish at 5 cm adult length are 10 × 1.97 = 19.7 inches. With normal filtration, capacity is 19 inches, so the tank is at about 104% — overstocked.",
    },
    faqs: [
      {
        q: "Is the one-inch-per-gallon rule accurate?",
        a: "It is only a rough guide for small, slim freshwater fish. It does not account for body mass, waste, activity level or territorial needs. Use it as a first filter, then research each species.",
      },
      {
        q: "How many fish can I keep in a 20-gallon tank?",
        a: "Using the rule, about 20 inches of adult fish with normal filtration — for example, ten 2-inch fish. In practice, a 20-gallon community tank might hold fewer, larger or messier fish. Check adult size and behaviour.",
      },
      {
        q: "Does a bigger filter increase stocking capacity?",
        a: "Better filtration supports more biological load, but it does not create swimming space or reduce aggression. This calculator applies a modest 1.3× allowance for heavy filtration, not an unlimited increase.",
      },
      {
        q: "Can I use this for saltwater tanks?",
        a: "Not directly. Marine stocking depends on different criteria, including swimming space, territory, reef compatibility and nutrient export. Use marine-specific guidance and keep the bioload conservative.",
      },
    ],
    tips: [
      "Always stock gradually so the biofilter can catch up.",
      "Test ammonia, nitrite and nitrate during the first weeks.",
      "Research adult size, temperament and tank length requirements.",
    ],
  },
  "pc-power-supply-calculator": {
    intro:
      "A power supply that is too small can shut down under load; one that is far too large wastes money and often runs inefficiently. This calculator estimates peak system load and recommends a PSU wattage with sensible headroom for a single-GPU desktop.",
    howTo: [
      "Enter the CPU and graphics card power figures from reputable reviews, not the box marketing. Use sustained power draw for gaming or rendering rather than a momentary burst. If you are unsure, the manufacturer's TDP is a starting point, but real-world sustained draw can be higher.",
      "Add the rest of the system: memory sticks, drives, fans and any extra cards. The calculator uses small fixed allowances for each. Water pumps, RGB controllers and capture cards are easy to forget — add them in the extra field.",
      "The recommended wattage includes about 30% headroom above the estimated peak load. This covers transient spikes, capacitor ageing, future upgrades and the fact that a PSU is most efficient at 50–70% load. The result is rounded up to a common retail size.",
      "Choose a quality unit from a reputable brand with the right connectors for your GPU. A 750 W no-name unit is not equivalent to a 750 W 80 Plus Gold unit. Check the 12 V rail capacity, warranty and reviews. For a multi-GPU workstation or a server, use a proper power budget rather than this desktop estimate.",
    ],
    formula: {
      equation:
        "Peak load = 40 + CPU × 1.25 + GPU × 1.15 + RAM × 4 + Drives × 8 + Fans × 3 + Extra\nRecommended PSU = Ceiling((Peak load × 1.3) ÷ 50) × 50",
      explanation:
        "The base 40 W covers the motherboard and basic peripherals. CPU and GPU figures are increased by 25% and 15% to approximate sustained and transient behaviour. Other components use typical allowances. The total is multiplied by 1.3 and rounded up to the next 50 W.",
      example:
        "A 125 W CPU and 250 W GPU with two RAM sticks, two drives, three fans and 20 W of extras: 40 + 156 + 288 + 8 + 16 + 9 + 20 = 537 W. With 30% headroom, 698 W, rounded up to a 700 W PSU.",
    },
    faqs: [
      {
        q: "Is 30% PSU headroom enough?",
        a: "For most single-GPU desktops, yes. It covers transient spikes and leaves the unit in a comfortable efficiency range. Overclocking, multi-GPU or many drives may need more.",
      },
      {
        q: "Does a higher wattage PSU use more electricity?",
        a: "No. The system draws what it needs; a higher-wattage unit does not force more power. Efficiency at low load matters, so avoid a massively oversized unit for a low-power build.",
      },
      {
        q: "Can I reuse my old PSU for a new GPU?",
        a: "Only if it has enough capacity, the right connectors and good reviews for transient handling. Age, capacitor quality and warranty matter. A failing PSU can damage every component, so do not cut corners.",
      },
      {
        q: "What PSU wattage do I need for an RTX-class GPU?",
        a: "A modern high-end GPU system often needs 750–850 W, while a mid-range build may be fine with 550–650 W. Use the actual CPU and GPU power figures and add headroom rather than guessing from the model name.",
      },
    ],
    tips: [
      "Check the PSU's 12 V rail and connector count for your GPU.",
      "Leave room for a future GPU upgrade if you plan one.",
      "Buy from a reputable brand with a 5–10 year warranty.",
    ],
  },
  "resin-epoxy-volume-calculator": {
    intro:
      "Epoxy is mixed in a precise ratio, and a small volume error can leave a tacky, uncured surface. This calculator works out the total resin needed for a mold, then splits it into Part A and Part B using your mix ratio.",
    howTo: [
      "Measure the mold's internal length, width and depth. For a simple rectangular mold, enter all three. For a shaped mold, estimate the average depth; a deeper pour uses more resin than a shallow one. If you are filling a tray with embedded objects, the resin volume is the mold volume minus the object volume.",
      "Choose the mix ratio printed on your resin. Common ratios are 1:1, 2:1, 3:1 and 4:1 by volume. Do not confuse volume ratios with weight ratios — they are different, and using the wrong one is a common cause of failed casts. The calculator assumes a volume ratio.",
      "Add a waste allowance of 10%. Some resin stays on the mixing cup and stir stick, and a little is lost to bubbles and spillage. For a large pour, work in layers no deeper than 10 mm to avoid overheating; for a deep casting, use a slow-curing resin designed for the thickness.",
      "Measure Part A and Part B separately by volume, then mix thoroughly for the time stated by the manufacturer. Scrape the sides of the cup and stir slowly to reduce bubbles. Pour at the recommended temperature and allow the full cure time before demolding. If the ratio is by weight, use a scale and follow the supplier's chart instead.",
    ],
    formula: {
      equation:
        "Volume = Length × Width × Depth\nTotal resin = Volume × (1 + Waste)\nPart A = Total × Ratio ÷ (Ratio + 1)\nPart B = Total ÷ (Ratio + 1)",
      explanation:
        "Multiplying the mold dimensions gives the volume. For a 2:1 ratio, the total is divided into three parts: two parts resin and one part hardener. The formula generalises to any ratio by treating the ratio as the number of resin parts.",
      example:
        "A 20 × 15 × 2 cm mold holds 600 mL. With 10% waste, 660 mL. For a 2:1 resin, Part A is 660 × 2 ÷ 3 = 440 mL and Part B is 660 ÷ 3 = 220 mL.",
    },
    faqs: [
      {
        q: "Should I mix epoxy by volume or weight?",
        a: "Follow the manufacturer's instructions. Many craft resins give a volume ratio, while some casting resins give a weight ratio. A kitchen scale is more accurate for small batches, but only if the product specifies weight.",
      },
      {
        q: "How deep can I pour epoxy at once?",
        a: "It depends on the resin. Most craft resins recommend layers of 6–10 mm to prevent overheating and cracking. Deep-cast resins are formulated for thicker pours and must still follow the manufacturer's limit.",
      },
      {
        q: "Why is my epoxy sticky after curing?",
        a: "The most common causes are an inaccurate mix ratio, incomplete mixing, cold working conditions or expired hardener. Measure carefully, scrape the cup walls and keep the room within the recommended temperature range.",
      },
      {
        q: "How much extra resin should I mix?",
        a: "About 10% is sensible for cup loss and spillage. For a complex mold with deep textures, allow 15%. It is better to have a little left over than to stop mid-pour and create a visible seam.",
      },
    ],
    tips: [
      "Wear gloves and work in a ventilated space.",
      "Measure the two parts separately before combining.",
      "Mix slowly to reduce bubbles, and use a heat gun if needed.",
    ],
  },
  "candle-wax-calculator": {
    intro:
      "Candle wax is sold by weight, but containers are measured by volume. This calculator converts container dimensions and wax density into the grams of wax and fragrance oil needed, so you can fill a batch without guesswork.",
    howTo: [
      "Measure the container's internal diameter and the height you plan to fill. Leave 6–12 mm of headspace below the rim so the wick stays centred and the wax does not overflow. If the container tapers, use the average diameter across the fill height.",
      "Choose the wax type. Soy wax is around 0.86 g/mL, paraffin about 0.90 g/mL and beeswax about 0.96 g/mL. A blend is usually between 0.86 and 0.90. These densities are guides; the supplier's technical sheet is more accurate and may vary by batch.",
      "Set the fragrance load. Most fragrance oils recommend 6–10% of the wax weight, with some allowing up to 12%. High loads can affect burn quality and cause sweating. The calculator adds the fragrance to the wax weight to give the total pour weight.",
      "Calculate the wick size separately. Wick choice depends on the container diameter, wax type and fragrance load, not just the volume. Test-burn every new combination. Pour at the temperature recommended by the wax supplier, cure for the recommended time (often 3–7 days for soy), and trim the wick before each burn.",
    ],
    formula: {
      equation:
        "Container volume = π × (Diameter ÷ 2)² × Fill height\nWax weight = Volume × Wax density\nFragrance = Wax weight × Fragrance %",
      explanation:
        "The cylinder volume formula gives the fill volume in millilitres. Multiplying by density converts to grams. Fragrance is calculated as a percentage of the wax weight, and the total pour weight is the sum of wax and fragrance.",
      example:
        "Three jars 70 mm wide and 70 mm tall hold π × 35² × 70 = 269,400 mm³ = 269 mL each, or 807 mL total. Soy wax at 0.86 g/mL weighs 694 g. At 8% fragrance, add 56 g, for a total of 750 g.",
    },
    faqs: [
      {
        q: "How much fragrance oil should I use?",
        a: "Most suppliers recommend 6–10% of the wax weight. Start at 6–8%, check the manufacturer's maximum load and test-burn before scaling up. More fragrance is not always better and can affect the burn.",
      },
      {
        q: "How much wax do I need for a 200 ml jar?",
        a: "Multiply the fill volume by the wax density. For soy at 0.86 g/mL, 200 mL needs about 172 g of wax, plus fragrance at your chosen percentage. Leave headspace, so the actual fill volume is usually less than the jar's nominal capacity.",
      },
      {
        q: "Why does my candle have a sinkhole?",
        a: "Sinkholes are common with soy wax as it cools and contracts. Pour at the recommended temperature, cool slowly in a draft-free room, and consider a second pour to top up the cavity after the first set.",
      },
      {
        q: "Can I use a kitchen scale for candle making?",
        a: "Yes. A digital scale with 1 g resolution is ideal for wax and fragrance. Weighing is more consistent than measuring volume, especially when the wax is melted and its volume changes with temperature.",
      },
    ],
    tips: [
      "Keep a pour log with wax, fragrance, wick and temperatures.",
      "Test-burn a sample from every new batch.",
      "Use a thermometer — overheating can discolour or weaken the wax.",
    ],
  },
  "cosplay-foam-clay-estimator": {
    intro:
      "Cosplay builds consume more foam and clay than the plan suggests. This estimator approximates the surface area of a prop or armour piece, then converts it into EVA foam sheets and modelling clay, with room for layers and mistakes.",
    howTo: [
      "Measure the piece's overall length, width and depth as if it were a box. For a chest plate, that is width across the chest, height from shoulder to waist and depth from chest to back. The calculator uses a box surface-area approximation, which is close for armour plates and blocky props.",
      "Add the number of foam layers. Many builds use two layers for strength or to create a bevel, while simple props use one. Choose your sheet size and add 15% waste — complex curves, bevels and failed cuts consume far more than the net area suggests.",
      "If you are sculpting details with clay rather than foam, enter the average clay thickness. The calculator multiplies surface area by thickness and an average density of 1.5 g/cm³. For small detail work, weigh a test piece to calibrate the estimate to your material.",
      "Plan the pattern before cutting. Make a paper template, test the fit and mark the grain direction. EVA foam has a skin that takes contact cement well, but heat forming requires practice. Keep a scrap piece for testing glue and paint. The estimate covers material quantity, not the cost of sealers, primer, paint or LEDs.",
    ],
    formula: {
      equation:
        "Surface area = 2 × (Length×Width + Length×Depth + Width×Depth) × Layers\nSheets = Ceiling((Area × (1 + Waste)) ÷ Sheet area)\nClay = Area × Thickness × 1.5 g/cm³",
      explanation:
        "The box surface-area formula adds the areas of all six faces. Multiplying by the number of layers gives the foam area, and dividing by the sheet area (with waste) gives the number of sheets. Clay weight uses volume × density.",
      example:
        "A 30 × 20 × 10 cm piece has a surface area of 2 × (600 + 300 + 200) = 2,200 cm². Two layers make 4,400 cm². With 15% waste, 5,060 cm². On 60 × 90 cm sheets (5,400 cm²), one sheet is enough.",
    },
    faqs: [
      {
        q: "How thick should EVA foam be for armour?",
        a: "Use 5–10 mm for curved plates and 10–20 mm for structural or bevelled pieces. Many cosplayers laminate thinner sheets for curves and use thicker foam for edges and weapons. Test heat forming before committing.",
      },
      {
        q: "How much clay do I need for detail work?",
        a: "It depends on the detail depth. A thin 1–2 mm skin uses far less than sculpted ornaments. Weigh a small test piece to calibrate, then scale by surface area. The calculator's 5 mm default is a generous starting point.",
      },
      {
        q: "How many foam sheets does a full cosplay need?",
        a: "A simple helmet might use one or two sheets; a full armour set can use six to twelve or more, depending on layers and waste. Build a paper pattern and estimate piece by piece for a closer figure.",
      },
      {
        q: "Can I use this for thermoplastic or Worbla?",
        a: "The surface-area method still works, but sheet sizes, overlap and waste differ. Thermoplastics can be stretched and re-formed, so start with the net area plus 20–25% and buy an extra sheet for complex builds.",
      },
    ],
    tips: [
      "Make paper templates and test the fit before cutting foam.",
      "Seal EVA foam before painting to avoid a textured finish.",
      "Keep a scrap bin — offcuts are useful for small details.",
    ],
  },
  "3d-printing-filament-calculator": {
    intro:
      "Slicer estimates are useful, but filament is sold by weight and spools run out at the worst moment. This calculator converts a model's solid volume, infill, supports and material density into grams, metres and the percentage of a spool.",
    howTo: [
      "Find the model volume in your slicer. Most slicers show the volume of the solid model before infill. Enter it in cubic centimetres or cubic inches. If you only know the weight of a previous print, use the spool-used figure and work backwards, or enter a volume estimate for the new model.",
      "Choose the material and enter the infill percentage. PLA is about 1.24 g/cm³, PETG 1.27, ABS 1.04, TPU 1.21 and nylon 1.14. The calculator applies a shell allowance of 18% plus the infill fraction, which approximates walls, top and bottom layers. Real shell volume depends on your wall count and layer height.",
      "Add supports and waste. Supports can add 5–15% for complex models, and purge lines, failed prints and filament changes add more. Enter the spool weight and filament diameter so the calculator can report grams, metres and spool percentage.",
      "Use the result for ordering and scheduling, not as a replacement for the slicer. The slicer knows the exact toolpath and extrusion width. Compare the two estimates; a large gap usually means the shell allowance or support estimate is off. Keep spools sealed with desiccant, especially PETG and nylon.",
    ],
    formula: {
      equation:
        "Used volume = Model volume × (0.18 + 0.82 × Infill) × (1 + Supports) × (1 + Waste)\nWeight = Used volume × Density\nLength = Used volume ÷ Filament cross-section",
      explanation:
        "The shell allowance treats a fraction of the model as solid walls and the rest as infill. Supports and waste are applied as percentages. Weight is volume times density, and filament length divides the volume by the cross-sectional area of the filament.",
      example:
        "A 100 cm³ model at 20% infill, 5% supports and 5% waste: 100 × (0.18 + 0.164) × 1.05 × 1.05 = 37.9 cm³. At 1.24 g/cm³ that is 47 g of PLA, or about 15.6 m of 1.75 mm filament.",
    },
    faqs: [
      {
        q: "How many grams of filament are in a 1 kg spool?",
        a: "A standard spool contains 1,000 g of filament, excluding the spool itself. Some brands sell 750 g or 2 kg spools. Always check the net filament weight, not the shipping weight.",
      },
      {
        q: "How long is 1 kg of 1.75 mm PLA?",
        a: "PLA at 1.24 g/cm³ and 1.75 mm diameter works out to about 330 m per kilogram. The exact length varies slightly with density and diameter tolerance.",
      },
      {
        q: "Does infill percentage directly set the weight?",
        a: "Not exactly. Walls, top and bottom layers are solid regardless of infill, so a 0% infill print still has significant material. The calculator uses an 18% shell allowance to account for this.",
      },
      {
        q: "How much filament do supports use?",
        a: "Typically 5–15% of the model material for complex overhangs, and less for models designed to print without supports. Tree supports can be more efficient but use more in some geometries.",
      },
    ],
    tips: [
      "Weigh your spool before and after a print to calibrate future estimates.",
      "Dry PETG and nylon before printing — moisture causes poor surfaces.",
      "Add 5–10% for purge lines and failed first layers.",
    ],
  },
  "model-train-scale-calculator": {
    intro:
      "Model railways compress the real world by a fixed ratio. This calculator converts real-world lengths into model sizes for Z, N, HO, OO, S, O and G scales, and works in reverse when you have a model measurement.",
    howTo: [
      "Choose the scale from the dropdown. The number is the ratio between real size and model size: 1:87 means the model is 87 times smaller than the real thing. Note that OO scale (1:76) runs on the same 16.5 mm track gauge as HO (1:87) but models a slightly larger prototype.",
      "Choose the conversion direction. If you know the real locomotive or building length, select real-to-model and enter the real length in metres or feet. If you have a model and want to know what it represents, select model-to-real and enter the model length in centimetres or inches.",
      "Read the result in the active unit system. The calculator also shows the scale as 1:x and the scale factor. Use it to check whether a building kit will fit a layout, or to convert a prototype drawing into model dimensions.",
      "Leave room for real-world compromises. Model manufacturers often shorten locomotives, adjust gauge and simplify details to handle curves. A model may not be exactly to scale, and track gauge can differ from true scale gauge. For accurate modelling, use prototype drawings and the scale ratio, then check clearances on your layout.",
    ],
    formula: {
      equation:
        "Model length = Real length ÷ Scale ratio\nReal length = Model length × Scale ratio",
      explanation:
        "A scale of 1:87 means one unit on the model represents 87 units in the real world. Divide real dimensions by the ratio to get model dimensions, or multiply model dimensions by the ratio to get real dimensions.",
      example:
        "A 20 m real locomotive in HO scale (1:87) is 20 ÷ 87 = 0.23 m, or 23 cm long. A 15 cm HO model represents 15 × 87 = 1,305 cm, or 13.05 m.",
    },
    faqs: [
      {
        q: "What does HO scale mean?",
        a: "HO scale is 1:87, so the model is 87 times smaller than the real object. It is the most popular model railway scale worldwide and runs on 16.5 mm track.",
      },
      {
        q: "What is the difference between HO and OO?",
        a: "HO is 1:87 and OO is 1:76. Both use 16.5 mm track, so OO models are slightly larger than they should be for the gauge. This compromise is common in the UK.",
      },
      {
        q: "How do I convert a real building to model size?",
        a: "Divide every real dimension by the scale ratio. A 12 m wide building in N scale (1:160) becomes 12 ÷ 160 = 0.075 m, or 7.5 cm wide. Check the footprint against your layout before building.",
      },
      {
        q: "Is G scale always 1:22.5?",
        a: "G is a family of large scales rather than a single ratio. Common ratios include 1:22.5, 1:24 and 1:29, and track gauges vary. Confirm the specific manufacturer's scale before converting dimensions.",
      },
    ],
    tips: [
      "Use the same scale for all structures on a layout.",
      "Check model clearances on curves before buying a long locomotive.",
      "Prototype drawings are more reliable than box measurements.",
    ],
  },
  "guitar-fretboard-calculator": {
    intro:
      "Fret placement is governed by the 12th root of two. A tiny error at the nut becomes a audible intonation problem by the 12th fret. This calculator gives the exact distance from the nut to every fret for any scale length.",
    howTo: [
      "Enter the scale length, which is twice the distance from the nut to the 12th fret. A Fender Stratocaster is 25.5 in (648 mm), a Gibson Les Paul is 24.75 in (628 mm), and a classical guitar is around 650 mm. Measure an existing instrument from the nut face to the centre of the 12th fret and double it if you are unsure.",
      "Choose the number of frets. The calculator displays every fret position from the nut and also shows the spacing from the previous fret. Use the full table when marking a new board; the summary cards are a quick check of the first, 12th and highest fret.",
      "Mark from the nut for each fret, not from the previous fret. Accumulating measurements from fret to fret multiplies any error. Use a sharp scribe or a fine pencil, and check the 12th fret lands exactly at half the scale length.",
      "Allow for compensation at the saddle. The theoretical scale length is not the same as the final string length; saddles are moved back slightly to compensate for string stiffness. Fret slots are usually cut slightly narrower than the calculated position to leave room for the crown. For a first build, practise on scrap and verify with a tuner.",
    ],
    formula: {
      equation: "Distance from nut = Scale length × (1 − 2^(−n ÷ 12))",
      explanation:
        "Each fret raises the pitch by a semitone, which is a frequency ratio of 2^(1/12). The remaining string length at fret n is the scale length divided by 2^(n/12), so the distance from the nut is the scale length minus that remaining length.",
      example:
        "On a 648 mm scale, the 12th fret is 648 × (1 − 2^−1) = 324 mm from the nut. The first fret is 648 × (1 − 2^−1/12) = 36.5 mm. The 24th fret is 648 × (1 − 2^−2) = 486 mm.",
    },
    faqs: [
      {
        q: "What is scale length on a guitar?",
        a: "Scale length is twice the distance from the nut to the 12th fret. It determines string tension, fret spacing and tone. Common electric lengths are 25.5 in (Fender) and 24.75 in (Gibson).",
      },
      {
        q: "Is the 12th fret exactly halfway?",
        a: "Theoretically yes — the 12th fret is at half the scale length and sounds one octave above the open string. In practice, saddle compensation and string stiffness mean the speaking length is adjusted at the bridge.",
      },
      {
        q: "Do I measure fret positions from the nut or the previous fret?",
        a: "Measure every fret from the nut using the cumulative table. Measuring from the previous fret accumulates rounding errors. Use a reliable ruler or a fret slotting template.",
      },
      {
        q: "Does fretboard radius affect the calculation?",
        a: "No. Fret spacing along the string is independent of the radius across the board. The radius affects playability and the fret crown, but not the longitudinal positions.",
      },
    ],
    tips: [
      "Double-check the 12th fret at exactly half the scale length.",
      "Use a steel rule with fine graduations and mark from the nut each time.",
      "Cut test slots on scrap before working on the final board.",
    ],
  },
  "homebrew-abv-calculator": {
    intro:
      "Original and final gravity tell you how much sugar fermented and how strong the beer became. This calculator converts those readings into ABV, ABW and apparent attenuation using the standard brewing formulas.",
    howTo: [
      "Take the original gravity (OG) after the wort is cooled and before fermentation begins. Take the final gravity (FG) after fermentation is complete and stable for two or three days. Use a hydrometer or refractometer, and correct for temperature if your instrument requires it.",
      "Enter the readings as specific gravity values, such as 1.050 and 1.010. The difference between them is the gravity drop, which is proportional to the alcohol produced. Choose the standard formula for most beers; the alternate formula is more accurate for high-gravity brews.",
      "Read the ABV, ABW and attenuation. Apparent attenuation is the percentage of the original gravity points that have been consumed. It depends on the yeast strain, mash temperature and fermentability of the wort. A 75% attenuation is typical for many ale yeasts.",
      "Remember that these formulas are estimates. Hydrometer calibration, temperature, dissolved CO2 and measurement error all affect the result. For legal or commercial labelling, use a laboratory analysis. For home brewing, compare your calculated ABV with the taste and body of the beer.",
      "If you add priming sugar for bottle conditioning, the extra alcohol is negligible — usually less than 0.1% ABV — so do not adjust the recipe for it. For kegged beer, force carbonation does not change the gravity reading. Keep a brew log of OG, FG, yeast and temperature so you can compare batches and spot a stuck fermentation early.",
    ],
    formula: {
      equation:
        "ABV (%) = (OG − FG) × 131.25\nABW (%) = ABV × 0.789\nAttenuation (%) = (OG − FG) ÷ (OG − 1) × 100",
      explanation:
        "The standard formula multiplies the gravity drop by 131.25, an empirical constant that approximates ethanol yield. ABW is ABV multiplied by ethanol's density relative to water. Apparent attenuation compares the gravity drop with the original gravity points above 1.000.",
      example:
        "An OG of 1.050 and an FG of 1.010 give a drop of 0.040. ABV = 0.040 × 131.25 = 5.25%. ABW = 4.14%, and attenuation = 0.040 ÷ 0.050 = 80%.",
    },
    faqs: [
      {
        q: "What is a good ABV for home-brewed beer?",
        a: "It depends on the style. Ordinary bitters and lagers are often 3.5–5%, IPAs 5–7%, and stouts or strong ales 7–10%. Match the beer to the style rather than chasing a number.",
      },
      {
        q: "Why is my calculated ABV different from the kit?",
        a: "Kit instructions assume a particular final gravity. If your fermentation stops early or attenuates further, the ABV changes. Temperature correction and measurement error also matter.",
      },
      {
        q: "Should I use a refractometer or hydrometer?",
        a: "A hydrometer is simple and reliable for fermented beer. A refractometer is convenient for OG but needs a correction formula once alcohol is present. Whichever you use, calibrate it with distilled water.",
      },
      {
        q: "What is apparent attenuation?",
        a: "It is the percentage of original gravity points consumed by the yeast. It is called ‘apparent’ because alcohol is less dense than water, which distorts the reading. Real attenuation is slightly lower.",
      },
    ],
    tips: [
      "Record OG and FG every brew to learn your system.",
      "Correct hydrometer readings for sample temperature.",
      "Keep fermentation temperature stable for consistent attenuation.",
    ],
  },
  "fabric-yardage-estimator": {
    intro:
      "Fabric is sold by length, but patterns are laid out in two dimensions. This estimator converts pattern pieces, fabric width and a waste allowance into the running length of fabric you need, in metres or yards.",
    howTo: [
      "Measure the length and width of each pattern piece, including seam allowances. Count how many of each piece you are cutting. For a dress with a front, back, two sleeves and a skirt, add each piece separately, or use the largest bounding rectangle if the pieces are similar.",
      "Enter the usable fabric width, which is the distance between the selvedges. A quilting cotton is often 42–44 in (107–112 cm), while apparel fabric may be 150 cm. The calculator divides the total piece area by the fabric width to estimate running length.",
      "Add 15% waste for a simple layout and 20% for pattern matching, directional prints or a nap fabric such as velvet. This area method assumes efficient nesting; real pattern layout can waste more, especially on small pieces. For a precise answer, lay the pattern pieces out on a gridded surface.",
      "Check the pattern envelope and the fabric's shrinkage. Pre-wash and dry the fabric before cutting, especially natural fibres. If the fabric has a repeat, buy enough extra to match the pattern at the seams. For large projects, buy all the fabric at once so the dye lot is consistent.",
    ],
    formula: {
      equation: "Total area = Pieces × Length × Width\nFabric length = (Total area ÷ Fabric width) × (1 + Waste)",
      explanation:
        "The area of all pattern pieces is added together. Dividing by the usable fabric width gives the minimum running length if the pieces nest perfectly. The waste factor accounts for seam allowances, pattern matching and offcuts.",
      example:
        "Two pieces 70 × 55 cm have an area of 7,700 cm². On 112 cm wide fabric, the minimum length is 7,700 ÷ 112 = 68.75 cm. With 15% waste, 79 cm — so buy at least 1 m.",
    },
    faqs: [
      {
        q: "How much extra fabric should I buy?",
        a: "Add 15% for simple projects and 20% for directional prints, naps or pattern matching. If the pattern envelope gives a yardage, use it as a cross-check; it already includes a layout allowance.",
      },
      {
        q: "Does fabric width matter?",
        a: "Yes. A wider fabric needs less running length for the same area. Always use the usable width between selvedges, not the nominal bolt width.",
      },
      {
        q: "Should I pre-wash fabric before cutting?",
        a: "For washable garments, yes. Pre-washing removes shrinkage and finishes, so the finished garment keeps its size. Follow the care instructions for the fibre.",
      },
      {
        q: "Can I use this for quilting?",
        a: "It works for simple backing and large pieces, but quilting yardage depends on pattern, borders and backing width. Use a quilting-specific calculator for borders and binding.",
      },
    ],
    tips: [
      "Pre-wash and press fabric before laying out patterns.",
      "Buy all fabric for a project from one dye lot.",
      "Mark the nap or directional print before cutting.",
    ],
  },
  "quilting-border-calculator": {
    intro:
      "A quilt border is cut as long strips, but the fabric is only as wide as the bolt. This calculator works out the total border length, the number of strips to cut and the fabric length needed, including multiple borders.",
    howTo: [
      "Measure the quilt top's finished length and width before borders are added. Enter the width of each border and the number of borders. A single border is the most common, but two or three borders create a framed look; each additional border increases the perimeter.",
      "Enter the usable fabric width (width of fabric, or WOF). Quilting cotton is usually about 42 in (107 cm) usable after selvedges. If you pre-wash, measure again. The calculator divides the total strip length by the fabric width to find how many strips to cut.",
      "Read the strip count and fabric length. Cut strips across the fabric width, join them with a diagonal seam, and press. For mitred corners, add one extra border width to each side before calculating; the calculator's straight-border estimate will be slightly short for mitred corners.",
      "Add a 10% waste allowance for seams, trimming and joining. Keep the border strips straight and measure the quilt through the centre rather than along the edges, which may stretch. Pin carefully to avoid wavy borders, and quilt the border before adding binding.",
    ],
    formula: {
      equation:
        "Total strip length = Σ [2 × (Length + Width) + 8 × Border width × (Border number − 1)]\nStrips = Ceiling((Total length × (1 + Waste)) ÷ Fabric width)\nFabric length = Strips × Border width",
      explanation:
        "Each border ring adds the quilt perimeter plus extra length for the wider corners. The total strip length is divided by the usable fabric width to get the number of strips, and the fabric length is the strip count multiplied by the border width.",
      example:
        "A 180 × 150 cm quilt with one 7.5 cm border needs 2 × (180 + 150) = 660 cm of strip length. With 10% waste, 726 cm. On 108 cm wide fabric, that is 7 strips, and 7 × 7.5 = 52.5 cm of fabric length.",
    },
    faqs: [
      {
        q: "How do I calculate quilting border fabric?",
        a: "Add the quilt's perimeter to the corner allowance, divide by the usable fabric width to find the number of strips, then multiply by the border width. Add 10% for seams and trimming.",
      },
      {
        q: "Should borders be cut on the straight grain?",
        a: "Yes, cut border strips along the lengthwise grain where possible for stability. Crosswise strips are more economical but can stretch. Many quilters cut lengthwise strips for long borders.",
      },
      {
        q: "How wide should a quilt border be?",
        a: "There is no fixed rule. Borders are often 5–15 cm wide, with wider borders on large quilts. The proportion should suit the quilt design; make a paper mock-up if you are unsure.",
      },
      {
        q: "Do mitred corners need more fabric?",
        a: "Yes. Mitred corners require extra length and careful marking. Add one border width to each side of the calculation, or cut extra strips and trim after stitching.",
      },
    ],
    tips: [
      "Measure the quilt through the centre to avoid stretched edges.",
      "Join strips with a diagonal seam for a flatter border.",
      "Press seams open and pin evenly before stitching.",
    ],
  },
  "bead-jewelry-calculator": {
    intro:
      "A bead strand is a sequence of beads, spacers and findings, and the count has to fit the finished length. This calculator tells you how many beads fit per strand, the total for multiple strands and the leftover length.",
    howTo: [
      "Decide the finished length: a bracelet is often 17–19 cm, a choker 35–40 cm and a necklace 45–50 cm. Measure your wrist or neck and add the desired fit. Enter the length in centimetres or inches.",
      "Enter the bead diameter and the spacer or knot gap. If you are using knots between beads, measure the finished knot; if you are using metal spacers, use their width. The clasp and finishing allowance covers the clasp, crimps and a little slack — usually 2–3 cm.",
      "The calculator divides the available length by the bead-plus-spacer spacing and rounds down. It reports beads per strand, total beads and the leftover length. Use the leftover to adjust the design: add a focal bead, a few spacers or a small extender chain.",
      "Lay out the design on a bead board before stringing. Check the drape and the position of the focal bead. Use the correct stringing material for the bead weight — nylon for lightweight beads, beading wire for heavier designs, and a needle for seed beads. Crimp or knot securely and test the clasp.",
      "Allow for the thread path as well as the bead size. Beads with large holes can sit closer together than their outside diameter suggests, while irregular or faceted beads need a little extra room. If the pattern alternates bead sizes, calculate each repeating group as a unit so the total stays balanced.",
    ],
    formula: {
      equation:
        "Available length = Finished length − Clasp allowance\nBeads = Floor(Available length ÷ (Bead diameter + Spacer gap))\nLeftover = Available length − Beads × (Bead diameter + Spacer gap)",
      explanation:
        "Each bead plus its spacer occupies one repeating unit. Dividing the available length by that unit gives the number of complete units, rounded down. The leftover is the space that could not fit another full unit.",
      example:
        "A 45 cm necklace with a 3 cm clasp allowance leaves 42 cm. With 8 mm beads and 1 mm spacers, each unit is 0.9 cm. 42 ÷ 0.9 = 46.7, so 46 beads, using 41.4 cm and leaving 0.6 cm.",
    },
    faqs: [
      {
        q: "How many beads are in a 45 cm necklace?",
        a: "It depends on bead size. With 8 mm beads and 1 mm spacers, about 46 beads. With 6 mm beads, nearer 60. Add the clasp allowance before dividing.",
      },
      {
        q: "Should I add an extender chain?",
        a: "An extender chain gives 3–5 cm of adjustment and is useful for gifts. If you use one, shorten the main strand accordingly or count it as part of the clasp allowance.",
      },
      {
        q: "How do I account for a focal bead?",
        a: "Subtract the focal bead and its spacers from the available length, calculate the remaining beads, then add the focal piece back. Lay the design out to check the balance.",
      },
      {
        q: "What stringing material should I use?",
        a: "Use beading wire for most stone and glass beads, nylon or elastic for lightweight stretch bracelets, and a needle and thread for seed beads. Match the material to the bead weight and the finished design.",
      },
    ],
    tips: [
      "Lay out the pattern on a bead board before stringing.",
      "Use a caliper for accurate bead diameters.",
      "Test the clasp and string tension before wearing.",
    ],
  },
  "woodworking-board-foot-calculator": {
    intro:
      "Nominal lumber sizes are a convenient fiction: a 2 × 4 is not 2 in by 4 in. This calculator uses nominal dimensions for board-foot pricing, then shows the actual dressed size so your cut list matches the wood you will actually handle.",
    howTo: [
      "Choose the nominal size from the dropdown. The label shows both the nominal name and the actual dressed dimensions — for example, a 2 × 4 is actually 1.5 × 3.5 in. Board footage is calculated from the nominal size because that is how softwood and hardwood are priced.",
      "Enter the length of one board and the number of boards. Add a waste allowance; 10% is typical for a project with cuts and defects, while 15% is safer for furniture with grain matching. The calculator returns board feet, linear feet and volume.",
      "Use the linear feet to plan transport and the board feet to compare prices. A board-foot price is not directly comparable to a linear-foot price unless you know the width and thickness. Divide the total price by the board feet to compare suppliers fairly.",
      "Check the actual size before cutting. Dressed lumber is smaller than nominal, and the actual dimensions can vary slightly by mill and moisture content. Design joinery around the measured size, not the nominal label. For hardwood, confirm whether the supplier measures rough or surfaced stock.",
    ],
    formula: {
      equation:
        "Board feet = (Nominal thickness (in) × Nominal width (in) × Length (ft)) ÷ 12 × Quantity\nActual size = dressed dimensions after planing",
      explanation:
        "Board footage is a volume measure based on nominal dimensions. A 2 × 4 × 8 ft board is (2 × 4 × 8) ÷ 12 = 5.33 board feet, even though its actual volume is smaller. The dressed size is shown for project planning.",
      example:
        "Six 2 × 4 boards, each 4 m long, have a total length of 13.12 ft each. Board feet per board = (2 × 4 × 13.12) ÷ 12 = 8.75. For six boards with 10% waste, 57.7 board feet.",
    },
    faqs: [
      {
        q: "Why is a 2 × 4 not 2 inches by 4 inches?",
        a: "Nominal sizes are historical names. Softwood is planed after sawing, so a 2 × 4 becomes about 1.5 × 3.5 in. The nominal size is still used for pricing and board-foot calculations.",
      },
      {
        q: "Are board feet based on actual or nominal size?",
        a: "Softwood construction lumber is usually priced per piece or linear foot, but hardwood is often priced per board foot using nominal dimensions. Always ask the supplier which basis they use.",
      },
      {
        q: "How do I convert board feet to cubic metres?",
        a: "One board foot is about 0.00236 m³, and one cubic metre is about 424 board feet. Use the conversion for a rough comparison, but confirm the measurement basis with the supplier.",
      },
      {
        q: "How much waste should I allow for a woodworking project?",
        a: "Ten percent is a reasonable starting point for simple projects. Use 15–20% for furniture, grain matching or boards with defects. Complex joinery can require more.",
      },
    ],
    tips: [
      "Measure the actual dressed size before finalising joinery.",
      "Check for bow, twist and knots before cutting.",
      "Compare suppliers by price per board foot, not per piece.",
    ],
  },
  "cake-pan-size-converter": {
    intro:
      "Changing pan size changes the batter volume and the baking time. This converter compares the volume of your original and new pans, then gives a batter multiplier and a practical oven-time guide for round, square and rectangular tins.",
    howTo: [
      "Select the original pan shape and enter its internal dimensions. For a round pan, use the diameter; for a square, use one side; for a rectangular pan, use length and width. Enter the depth as well, because a deep 18 cm pan holds more batter than a shallow 20 cm pan of the same diameter.",
      "Repeat for the new pan. The calculator compares the two volumes, not just the diameters. A 20 cm round pan is not twice a 15 cm pan — the area scales with the square of the diameter. This is why a recipe for a 20 cm tin can overflow a 23 cm tin with the same batter.",
      "Use the batter multiplier to scale the recipe. If the multiplier is 1.3, make 130% of the original batter. It is usually easier to make a full recipe and bake the excess as cupcakes than to measure 1.3 eggs. Keep the oven temperature the same and adjust the time gradually.",
      "Check the cake early. A larger, deeper cake needs longer; a thinner cake needs less. The calculator's guide is a starting point, not a guarantee. Use a skewer or cake tester, and rotate the pan if your oven has hot spots. Fill pans no more than two-thirds full to leave room for rise.",
    ],
    formula: {
      equation:
        "Round area = π × (Diameter ÷ 2)²\nSquare area = Side²\nRectangular area = Length × Width\nVolume = Area × Depth\nBatter multiplier = New volume ÷ Original volume",
      explanation:
        "The calculator finds the area of each pan shape, multiplies by depth to get volume, and divides the new volume by the old one. A multiplier above 1 means more batter; below 1 means less. Time is adjusted cautiously because oven performance varies.",
      example:
        "A 20 cm round pan 7 cm deep holds π × 10² × 7 = 2,199 cm³. A 23 cm round pan 7 cm deep holds π × 11.5² × 7 = 2,908 cm³. The multiplier is 1.32, so make 32% more batter.",
    },
    faqs: [
      {
        q: "Can I swap a round pan for a square pan?",
        a: "Yes, if the areas are similar. A 20 cm round pan has about 314 cm²; a 18 cm square pan has 324 cm², so they are close. Keep the depth similar and check the cake early.",
      },
      {
        q: "How do I scale a recipe for a larger pan?",
        a: "Use the batter multiplier to scale all ingredients, or make the original recipe and add a proportional amount. For awkward fractions, make a full batch and bake the excess as cupcakes.",
      },
      {
        q: "Should I change the oven temperature when changing pan size?",
        a: "Usually keep the same temperature and adjust the time. Larger, deeper cakes benefit from a slightly lower temperature and longer bake to avoid a burnt crust and raw centre. Note your oven's behaviour.",
      },
      {
        q: "How full should I fill a cake pan?",
        a: "Fill to about two-thirds. This leaves room for rise and prevents overflow. If you have excess batter, make cupcakes or a small extra tin rather than overfilling.",
      },
    ],
    tips: [
      "Measure pan dimensions inside the rim, not outside.",
      "Use baking strips for even layers on large cakes.",
      "Write down the pan size and bake time that worked for next time.",
    ],
  },
};
