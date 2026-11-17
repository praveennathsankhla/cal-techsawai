export type ToolContent = {
  intro: string;
  howTo: string[];
  formula: {
    equation: string;
    explanation: string;
    example: string;
  };
  faqs: { q: string; a: string }[];
  tips?: string[];
};

export const constructionContent: Record<string, ToolContent> = {
  "concrete-volume-calculator": {
    intro:
      "Concrete is ordered by volume, but most jobs are measured with a tape. This calculator turns length, width and depth into cubic metres or cubic yards, then translates that volume into practical bag counts so you can buy the right amount the first time.",
    howTo: [
      "Measure the pour area in a consistent unit. For a slab, take the longest length and the widest width; for a footing or pier, use the plan dimensions and the full depth. Convert every measurement to metres or feet before entering it, and keep the same unit system throughout.",
      "Enter the thickness or depth carefully. A slab might be 100 mm (4 in) thick, while a strip footing could be 300 mm (12 in) deep. The depth is the dimension that most often causes an under-order, because it is easy to estimate from memory rather than measure.",
      "Choose the bag yield printed on your chosen concrete mix. A 25 kg bag of general-purpose mix typically yields about 0.0125 m³, while a 40 kg bag yields about 0.02 m³. Pre-mixed bags vary, so check the label. Add a waste allowance of 5% for a simple slab, or 10% where the ground is uneven and some material will be lost.",
      "Read the result in cubic metres or cubic yards, then use the bag count to plan the trip. For anything above roughly 1.5 m³, ready-mix concrete is usually cheaper and far less work than mixing dozens of bags. Order a small surplus rather than a small shortfall — stopping mid-pour creates a cold joint.",
    ],
    formula: {
      equation: "Volume = Length × Width × Depth\nBags = Ceiling((Volume × (1 + Waste)) ÷ Bag yield)",
      explanation:
        "Multiplying the three dimensions gives a rectangular volume. The waste factor is applied to the wet volume before dividing by the yield of one bag, and the result is rounded up because you cannot buy part of a bag. For a round pier, substitute π × radius² × height for the length × width × depth term.",
      example:
        "A slab 4 m long, 3 m wide and 100 mm deep has a volume of 4 × 3 × 0.1 = 1.2 m³. With 5% waste that becomes 1.26 m³. Using 25 kg bags at 0.0125 m³ each, you need 1.26 ÷ 0.0125 = 100.8, so order 101 bags — or a ready-mix load.",
    },
    faqs: [
      {
        q: "How much does a 25 kg bag of concrete cover?",
        a: "A general-purpose 25 kg bag usually yields about 0.0125 m³ of mixed concrete. That is enough for a patch roughly 50 mm thick and 0.25 m² in area. Always check the manufacturer's yield because richer mixes cover less.",
      },
      {
        q: "Should I add waste to every concrete order?",
        a: "Yes, a small allowance is sensible. Use 5% for a flat slab on level ground and 10% for footings, uneven sub-grade or jobs with spillage. Ready-mix suppliers can usually adjust the last fraction of a cubic metre.",
      },
      {
        q: "How do I calculate concrete for a round column?",
        a: "Use π × radius² × height. For a 300 mm diameter column that is 3 m tall, the radius is 0.15 m, so the volume is 3.1416 × 0.0225 × 3 = 0.212 m³. Add your waste allowance and convert to bags as usual.",
      },
      {
        q: "Is bagged concrete as strong as ready-mix?",
        a: "A good bagged mix reaches around 20–25 MPa when mixed correctly, which is fine for paths, sheds and small footings. Structural work should follow an engineer's specification and is usually supplied as ready-mix with a known strength class.",
      },
    ],
    tips: [
      "Order 5–10% extra rather than risk a cold joint halfway through a pour.",
      "Wet concrete weighs about 2,400 kg per cubic metre — check access and wheelbarrow routes.",
      "Do not add extra water to make bagged concrete easier to place; it reduces strength.",
    ],
  },
  "tile-quantity-estimator": {
    intro:
      "Tile quantities are deceptively easy to get wrong. A room that looks like it needs 40 tiles can easily consume 48 once cuts, grout joints and a few broken corners are counted. This estimator converts room and tile dimensions into a realistic tile and box order.",
    howTo: [
      "Measure the room's length and width at floor level, not along the skirting. If the room is not a neat rectangle, split it into rectangles, measure each one and add the areas together. For wall tiling, measure the height and width of each wall and deduct doors and windows only if they are fully tiled around.",
      "Enter the actual tile face dimensions — not the box size. A 600 × 600 mm tile has a face area of 0.36 m² before grout. The grout joint matters too: a 3 mm joint adds a small amount to every tile, but it adds up over a large floor and reduces the number of tiles needed slightly.",
      "Choose a waste allowance. Ten percent is the everyday standard. Increase it to 15% for a diagonal or herringbone layout, a room with many alcoves, or a tile with a strong directional pattern that must be matched. Keep at least one spare box for future repairs, especially with discontinued ranges.",
      "Enter the number of tiles per box, then round up. Suppliers sell whole boxes, and the calculator does that for you. Check the box coverage as well: some boxes quote the coverage in square metres, and the count may differ slightly because of nominal tile sizes.",
    ],
    formula: {
      equation: "Room area = Length × Width\nTiles = Ceiling((Room area ÷ Tile area) × (1 + Waste))\nBoxes = Ceiling(Tiles ÷ Tiles per box)",
      explanation:
        "Tile area is the tile length plus the grout joint multiplied by the tile width plus the joint. Grout joints are converted to the same unit as the tile before multiplying. The waste percentage covers cuts, breakages and future repairs, and boxes are rounded up separately.",
      example:
        "A 5 m × 4 m floor is 20 m². A 600 × 600 mm tile with a 3 mm joint covers 0.603 × 0.603 = 0.3636 m². Without waste you need 20 ÷ 0.3636 = 55 tiles. With 10% waste that is 61 tiles, or 11 boxes of 6.",
    },
    faqs: [
      {
        q: "How much tile waste should I allow?",
        a: "Use 10% for a straight lay in a simple room. Allow 15% for diagonal patterns, herringbone, small tiles, or rooms with many cut-outs. Keep any leftover full tiles sealed for repairs.",
      },
      {
        q: "Do I subtract the grout joint from tile size?",
        a: "No — the joint is added to the tile face when estimating coverage. A 600 mm tile with a 3 mm joint occupies about 603 mm of the floor grid. The effect is small per tile but measurable across a large area.",
      },
      {
        q: "How many tiles are in a box?",
        a: "It varies by tile size and manufacturer. Common counts are 4, 6, 8, 10 or 12. Check the label for both the tile count and the stated coverage; the calculator lets you enter any count.",
      },
      {
        q: "Should I buy an extra box?",
        a: "Yes, if storage allows. Tiles from different production runs can vary slightly in shade, and matching a discontinued tile later is difficult. A spare box is cheap insurance for cracked tiles and future alterations.",
      },
    ],
    tips: [
      "Order all tiles for one room at the same time and check the batch/shade code.",
      "Dry-lay a row before fixing to confirm the grout joint and layout.",
      "Include skirting, steps and niches as separate areas.",
    ],
  },
  "paint-coverage-calculator": {
    intro:
      "Paint estimates go wrong for two reasons: openings are ignored, and the coverage printed on the tin is treated as a guarantee. This calculator works from room dimensions, deducts standard openings, applies your chosen number of coats and adds a realistic waste allowance.",
    howTo: [
      "Measure the length and width of the room and the full wall height. The wall area is the perimeter multiplied by the height. If the ceiling is being painted, include its length × width; if not, leave the ceiling option off. Sloped ceilings and half-walls should be measured as separate shapes.",
      "Deduct doors and windows using their actual frame sizes where possible. The defaults in the calculator are 1.8 m² per door and 1.5 m² per window. These are averages and will slightly over- or under-deduct for very large openings. Do not deduct skirting boards unless they are being painted in a different product.",
      "Set the coverage figure from the paint tin and the number of coats. Most interior emulsions cover about 10 m² per litre, though primer and textured surfaces are lower. Two coats is standard for a colour change; a dramatic change from dark to light may need three. Add 10% waste for roller loss, touch-ups and porous surfaces.",
      "Divide the paintable area by coverage to get litres, then multiply by the number of coats. The calculator also converts the result into cans of a standard size. Buy all cans from the same batch, and keep a small quantity for touch-ups. For new plaster, apply a mist coat first — it soaks up far more paint than the calculator assumes.",
    ],
    formula: {
      equation:
        "Wall area = 2 × (Length + Width) × Height − Openings\nPaint (L) = (Wall area × Coats × (1 + Waste)) ÷ Coverage (m²/L)",
      explanation:
        "The perimeter of a rectangular room is twice the sum of length and width. Multiplying by wall height gives the gross wall area, from which doors and windows are subtracted. Coverage is the area one litre can cover in a single coat; dividing the total coated area by coverage gives litres.",
      example:
        "A 5 m × 4 m room with 2.75 m walls has 49.5 m² of gross wall area. Two doors and two windows deduct 6.6 m², leaving 42.9 m². Two coats at 10 m²/L with 10% waste needs 42.9 × 2 × 1.1 ÷ 10 = 9.44 L, so buy three 4 L cans.",
    },
    faqs: [
      {
        q: "How many coats of paint do I need?",
        a: "Two coats is standard for a colour change on a prepared surface. Use three when going from a dark colour to a light one, when the paint is heavily thinned, or when the surface is porous. Primer or undercoat may be needed first.",
      },
      {
        q: "How much area does one litre of paint cover?",
        a: "Interior emulsion typically covers 10–12 m² per litre per coat. Primer and masonry paint are often lower. Always use the figure on the tin; the calculator's default is only a starting point.",
      },
      {
        q: "Should I deduct doors and windows?",
        a: "Yes, but only the painted area. A standard door is about 1.8 m² and a window about 1.5 m². Deducting them gives a more accurate order, although you may still want a little extra for frames and touch-ups.",
      },
      {
        q: "Does paint colour affect coverage?",
        a: "It affects the number of coats more than the coverage per coat. A strong red or deep blue over white may need three or four coats, while a similar tone refresh usually needs two.",
      },
    ],
    tips: [
      "A mist coat on new plaster can use 20–30% more paint than the main coats.",
      "Buy all cans in one batch to avoid subtle colour differences.",
      "Keep a labelled touch-up jar with the room name.",
    ],
  },
  "roof-pitch-calculator": {
    intro:
      "Roof pitch describes how steeply a roof rises. Carpenters express it as a ratio such as 4:12, surveyors as an angle, and roofing suppliers as a percentage slope. This calculator converts between all three and gives the rafter length and slope multiplier you need for material take-offs.",
    howTo: [
      "Measure the rise and run over the same horizontal span. The rise is the vertical height gained, and the run is the horizontal distance travelled. On a drawing, the run is often half the building width for a simple gable. Measure both in the same unit, then enter them in centimetres, inches or feet as prompted.",
      "Read the angle first if you are matching an existing roof. The pitch ratio in the form x:12 is the most useful number for ordering roofing materials in the US and parts of Asia. The slope percentage is useful for drainage and for roofing membranes that have a minimum slope requirement.",
      "Use the rafter length result as the sloped distance from the outside of the wall to the ridge, before any overhang or birdsmouth cuts. Add the eaves overhang and a small allowance for the ridge and fascia. The slope multiplier converts any horizontal run into a sloped length, which is handy for roof area calculations.",
      "Check the result against local practice. Low-slope roofs under about 3:12 need special underlayment and are often restricted for shingles. Steep roofs above 9:12 require more fall protection and may change the roofing system. Always confirm the final design with a qualified roofer or engineer.",
    ],
    formula: {
      equation:
        "Pitch ratio = (Rise ÷ Run) × 12\nAngle = arctan(Rise ÷ Run)\nRafter = √(Rise² + Run²)\nSlope multiplier = √(1 + (Rise ÷ Run)²)",
      explanation:
        "The ratio converts the rise and run into the familiar ‘rise per 12 units of run’ format. The angle comes from the inverse tangent. The rafter and slope multiplier both come from Pythagoras: the sloping side of a right triangle is the square root of the sum of the squares of the other two sides.",
      example:
        "A roof rises 3 m over a 6 m run. The pitch is 3 ÷ 6 × 12 = 6:12. The angle is arctan(0.5) = 26.6°, the rafter length is √(9 + 36) = 6.71 m, and the slope multiplier is 1.118.",
    },
    faqs: [
      {
        q: "What does a 4:12 roof pitch mean?",
        a: "It means the roof rises 4 units vertically for every 12 units horizontally. That is a 1:3 slope, about 18.4°, or 33.3% slope. It is a common low-to-medium pitch for residential roofs.",
      },
      {
        q: "What is the minimum roof pitch for shingles?",
        a: "Asphalt shingles generally need at least 2:12 with a double underlayment, and many manufacturers require 4:12 for standard installation. Below that, membrane or metal roofing is more appropriate. Check the product data and local code.",
      },
      {
        q: "How do I measure roof pitch safely?",
        a: "Measure from the ground or from a stable platform using a level and a tape. Hold the level horizontally, measure 12 units along it, then measure vertically to the roof surface. Avoid walking a wet or steep roof.",
      },
      {
        q: "Does pitch affect roof area?",
        a: "Yes. The sloped area is the plan area multiplied by the slope multiplier. A 6:12 roof has a multiplier of 1.118, so a 100 m² footprint has about 112 m² of roof surface before waste and overhangs.",
      },
    ],
    tips: [
      "Add the eaves overhang to the rafter length before cutting.",
      "Use the slope multiplier to convert plan area into roofing area.",
      "Low-slope roofs need different membranes — confirm the product minimum.",
    ],
  },
  "rebar-weight-calculator": {
    intro:
      "Rebar is priced and transported by weight, not by length. This calculator uses the standard d²/162 relationship to turn bar diameter, length, quantity and lap allowance into kilograms or pounds, so you can check a quote or plan a delivery.",
    howTo: [
      "Select the bar diameter. The dropdown shows both the metric diameter and the common imperial bar number where they correspond. In practice, #3 is 3/8 in (9.5 mm), #4 is 1/2 in (12.7 mm), #5 is 5/8 in (15.9 mm) and #6 is 3/4 in (19 mm); use the nearest listed size or the exact diameter supplied.",
      "Enter the length of one bar as delivered, not the cut length. If bars are supplied in 12 m lengths but you cut them into shorter pieces, the order and the waste should be based on the delivered length. Enter the number of full bars required, then add a lap allowance.",
      "Lap allowances vary by design and bar size. A typical starting point is 10% for a simple layout, but columns, beams and long walls may need 15–20% or a specified lap length. The allowance is applied to the total length before calculating weight, so it also covers the extra steel in the laps.",
      "Use the result to compare suppliers. The unit weight is the theoretical mass per metre for a plain round bar; deformed bars are slightly heavier because of the ribs, but the difference is small. For a structural package, always use the bar schedule and a engineer's lap design rather than an estimate.",
    ],
    formula: {
      equation:
        "Unit weight (kg/m) = d² ÷ 162\nTotal length = Length × Quantity × (1 + Lap)\nTotal weight = Unit weight × Total length",
      explanation:
        "The d²/162 rule comes from the density of steel. For a round bar, mass per metre is π × (d/2)² × 7,850 kg/m³, which simplifies to approximately d²/162 when d is in millimetres. The total length includes the lap allowance, and weight is the product of unit weight and total length.",
      example:
        "Twenty 12 mm bars, each 12 m long, with a 10% lap: total length = 12 × 20 × 1.1 = 264 m. Unit weight = 144 ÷ 162 = 0.889 kg/m. Total weight = 0.889 × 264 = 234.7 kg.",
    },
    faqs: [
      {
        q: "How much does 12 mm rebar weigh per metre?",
        a: "Using d²/162, a 12 mm bar weighs 144 ÷ 162 = 0.889 kg per metre. A standard 12 m bar weighs about 10.7 kg. Deformed bars may be a fraction heavier.",
      },
      {
        q: "What lap allowance should I use?",
        a: "Ten percent is a reasonable early estimate for simple slabs and footings. Structural columns, beams and walls often need 15–20% or a specified lap length. Follow the design drawings for anything structural.",
      },
      {
        q: "Is rebar weight calculated from actual or nominal diameter?",
        a: "Suppliers usually quote theoretical weight based on nominal diameter. The actual mass can be slightly higher because of the deformation pattern. Use the supplier's weight table for final payment.",
      },
      {
        q: "How many bars come in a bundle?",
        a: "It depends on bar size and supplier, but bundles are usually around 2–3 tonnes. The calculator's total weight helps you estimate bundle counts and crane or truck requirements.",
      },
    ],
    tips: [
      "Include chairs, spacers and tie wire as separate items.",
      "Store rebar off the ground to avoid mud and rust staining.",
      "Check the mill certificate for the grade and yield strength.",
    ],
  },
  "brick-block-wall-calculator": {
    intro:
      "A brick wall estimate has to account for the mortar joint, not just the brick. This calculator uses the brick face plus the joint to estimate the number of bricks, the wall area and the mortar volume for a single-leaf wall.",
    howTo: [
      "Measure the wall length and height, and deduct large openings such as doors and windows. Enter dimensions in the unit system you are using; keep the wall and brick measurements consistent. If the wall has piers or returns, calculate each flat section separately and add the results.",
      "Enter the actual brick dimensions. A standard Indian modular brick is about 190 × 90 × 90 mm, while a UK brick is often 215 × 102.5 × 65 mm and a US modular brick is 194 × 92 × 57 mm. The brick width is used as the single-leaf wall thickness, so a different bond or cavity wall needs adjustment.",
      "Set the mortar joint. A 10 mm joint is standard for many bricks, but 6–12 mm is possible. The joint is added to both the length and height of the brick face, because each brick occupies one module of the wall including the mortar around it. A small change in joint size can change the count by several percent.",
      "Choose a waste allowance of 5–10%. Bricks are easily chipped, and corners, openings and bond patterns create cuts. The mortar volume is calculated as the wall volume minus the volume of the bricks, then converted to dry mortar bags using an approximate 0.01 m³ yield per 25 kg bag. For structural walls, confirm the mortar mix and wall tie design.",
    ],
    formula: {
      equation:
        "Wall area = Length × Height\nFace module = (Brick length + Joint) × (Brick height + Joint)\nBricks = Ceiling(Wall area ÷ Face module × (1 + Waste))\nMortar = Wall area × (Brick width + Joint) − Brick volume",
      explanation:
        "Each brick plus its surrounding mortar forms a repeating module on the wall face. Dividing the wall area by that module gives the number of modules, which equals the number of bricks. Mortar volume is the difference between the overall wall volume and the net brick volume.",
      example:
        "A 5 m × 2.5 m wall is 12.5 m². A 190 mm brick with a 10 mm joint gives a module of 0.2 × 0.1 = 0.02 m². Without waste you need 625 bricks; with 5% waste, 657. The wall volume at 100 mm thick is 1.25 m³, and the bricks occupy about 0.94 m³, leaving roughly 0.31 m³ of mortar.",
    },
    faqs: [
      {
        q: "How many bricks are in a square metre?",
        a: "For a 190 × 90 mm brick with a 10 mm joint, about 50 bricks per square metre for a single-leaf wall. A UK 215 × 65 mm brick needs around 60 per m². The calculator gives the exact figure for your brick and joint.",
      },
      {
        q: "Should I use 5% or 10% waste for bricks?",
        a: "Five percent is usually enough for a simple rectangular wall. Use 10% where there are many openings, corners, arches or decorative bonds, or if the bricks are fragile.",
      },
      {
        q: "How much mortar does a brick wall need?",
        a: "It depends on brick size and joint thickness. A typical 10 mm joint uses about 0.02–0.03 m³ of wet mortar per square metre of single-leaf wall. The calculator estimates the total from the wall and brick volumes.",
      },
      {
        q: "Can I use this for concrete block walls?",
        a: "Yes — enter the block's actual length, width and height, and the mortar joint. Blockwork usually has larger face dimensions and a thinner joint, so the count per square metre is much lower than for clay bricks.",
      },
    ],
    tips: [
      "Order all bricks from one batch to keep the colour consistent.",
      "Add extra for cutting around openings and bond patterns.",
      "Check whether your wall needs cavity ties, insulation or reinforcement.",
    ],
  },
  "asphalt-driveway-calculator": {
    intro:
      "Asphalt is sold by weight, but driveways are measured by area and depth. This calculator converts a driveway's dimensions into compacted volume, tonnes and short tons, with a density choice for asphalt, compacted gravel and loose aggregate.",
    howTo: [
      "Measure the driveway length and width, splitting it into rectangles if it curves or widens. Enter the compacted depth you want, not the loose depth delivered. A residential driveway surface is often 50–75 mm (2–3 in) thick, with a separate compacted base beneath it.",
      "Choose the material density that matches what you are ordering. Asphalt is roughly 2,400 kg/m³, compacted gravel about 2,200 kg/m³ and loose gravel around 2,000 kg/m³. These are planning values; your supplier's mix design will have a more precise figure.",
      "Add a waste allowance of 5–10%. Asphalt is difficult to place neatly at the edges, and some material is lost during transfer. The calculator also shows an approximate loose depth using a 25% compaction allowance, which helps when you are ordering loose material that will be rolled.",
      "Use the tonnage to request a quote. Asphalt plants typically price by the tonne, and delivery trucks have weight limits. Confirm access width and overhead clearance. For a new driveway, budget for excavation, geotextile, a compacted sub-base and edge restraints as separate items.",
      "Plan the sub-base and drainage at the same time. A typical driveway needs 100–150 mm of compacted granular base over geotextile, plus a slight fall away from buildings. Measure the base separately and order it with its own waste allowance; this calculator covers only the wearing course.",
    ],
    formula: {
      equation:
        "Volume = Length × Width × Depth × (1 + Waste)\nWeight = Volume × Density\nShort tons = Metric tonnes × 1.10231",
      explanation:
        "Multiplying area by depth gives volume in cubic metres. Density converts volume to mass; the calculator divides by 1,000 to report metric tonnes and applies the short-ton conversion for imperial display. The loose-depth figure divides the compacted depth by the compaction factor.",
      example:
        "A 10 m × 3 m driveway at 75 mm compacted depth is 2.25 m³. With 5% waste that is 2.36 m³. At 2,400 kg/m³ the asphalt weighs 5,670 kg, or 5.67 tonnes — roughly 6.25 short tons.",
    },
    faqs: [
      {
        q: "How thick should an asphalt driveway be?",
        a: "A residential driveway surface is commonly 50–75 mm compacted over a 100–150 mm compacted granular base. Heavier vehicles or weak sub-grade need more. Local suppliers and a site assessment should guide the final build-up.",
      },
      {
        q: "How many tonnes are in a cubic metre of asphalt?",
        a: "Asphalt is typically about 2.4 tonnes per cubic metre. Compacted gravel is around 2.2 tonnes, and loose gravel around 2.0 tonnes. Use your supplier's density for a firm order.",
      },
      {
        q: "Does the calculator account for compaction?",
        a: "It asks for compacted depth and applies waste. The loose-depth line multiplies the compacted depth by 1.25 as a rough guide, but actual compaction varies with the mix and roller passes.",
      },
      {
        q: "How long before I can drive on new asphalt?",
        a: "Keep vehicles off for at least 24–48 hours and avoid heavy loads for several days in warm weather. Your contractor's instructions take priority, as curing depends on the mix and temperature.",
      },
    ],
    tips: [
      "Never skip the sub-base — most driveway failures start below the asphalt.",
      "Confirm truck access and the maximum load per delivery.",
      "Allow for edge restraints, drainage and a slight crossfall.",
    ],
  },
  "drywall-sheetrock-estimator": {
    intro:
      "Drywall is cheap per sheet but expensive to re-order mid-job. This estimator turns room dimensions into sheets, joint compound, tape and screw counts, with an option to include the ceiling and a realistic waste allowance.",
    howTo: [
      "Measure the room's length, width and ceiling height. The wall area is the perimeter multiplied by the height. If you are also boarding the ceiling, include its area. Deduct large openings such as doors and windows if they are not being boarded; the calculator does not deduct them automatically, so reduce the room dimensions or use a separate calculation if the openings are large.",
      "Select the sheet size you can handle and source. A 1200 × 2400 mm (4 × 8 ft) sheet is the standard, but 2700 mm and 3000 mm sheets reduce horizontal joints on tall walls. Larger sheets mean fewer joints and faster finishing, but they are awkward for one person and may not fit up a staircase.",
      "Add 10% waste for a simple room and 15% for a room with many corners, openings or angled walls. Cutting around windows and doors creates offcuts that often cannot be reused. The calculator also estimates joint compound at roughly 0.5 L per m², tape at 0.4 m per m² and screws at 30 per m² — all planning figures for a normal three-coat finish.",
      "Check the board type before ordering. Standard gypsum board suits dry rooms; moisture-resistant board is needed in bathrooms and kitchens, and fire-rated board in garages, plant rooms and certain party walls. Do not substitute ordinary board in wet areas, and follow local fire regulations.",
    ],
    formula: {
      equation:
        "Wall area = 2 × (Length + Width) × Height\nCeiling area = Length × Width\nSheets = Ceiling((Total area × (1 + Waste)) ÷ Sheet area)",
      explanation:
        "The room perimeter multiplied by wall height gives the wall area. Adding the ceiling gives the total boarded area. Dividing by the area of one sheet and rounding up produces the sheet count. Accessories are estimated from the same area at standard rates.",
      example:
        "A 5 m × 4 m room with 2.7 m ceilings has 48.6 m² of wall area. Including the 20 m² ceiling gives 68.6 m². With 10% waste and 2.88 m² sheets, you need 69.6 ÷ 2.88 = 25 sheets (rounded up).",
    },
    faqs: [
      {
        q: "How many screws do I need per sheet of drywall?",
        a: "Plan for about 30–40 screws per 2.4 m² sheet, spaced around 200–300 mm on studs and more closely at edges. The calculator uses 30 per square metre as a starting point; buy a box or two extra.",
      },
      {
        q: "Should I use 8 ft or 10 ft drywall sheets?",
        a: "Use the longest sheet you can comfortably handle and fit into the room. Longer sheets reduce butt joints, which are the most visible and time-consuming to finish. For a 9 ft wall, 9 ft or 10 ft sheets are worth considering.",
      },
      {
        q: "How much joint compound do I need?",
        a: "About 0.5 litres per square metre for a standard three-coat finish, including taping. More is needed for heavy texture or many joints. Buy a little extra rather than running out mid-coat.",
      },
      {
        q: "Can I use regular drywall in a bathroom?",
        a: "No. Use moisture-resistant drywall in bathrooms and kitchens, and cement board or a waterproof membrane in directly wet areas such as showers. Check local code and the manufacturer's guidance.",
      },
    ],
    tips: [
      "Stagger sheet joints and keep them away from corners where possible.",
      "Use longer sheets to reduce butt joints on tall walls.",
      "Acclimatise boards in the room for 24–48 hours before installation.",
    ],
  },
  "lumber-board-foot-calculator": {
    intro:
      "Board feet are the language of hardwood pricing. One board foot is 144 cubic inches — a piece 12 in × 12 in × 1 in. This calculator converts thickness, width, length and quantity into board feet, linear feet and volume.",
    howTo: [
      "Measure thickness, width and length. For rough hardwood, use the nominal dimensions. For dressed lumber, use the actual thickness and width if the price is based on actual size — but most hardwood is still sold by nominal board footage. Keep thickness and width in the same unit and length in the same system.",
      "Enter the number of pieces and a waste allowance. For a cutting list, add 15–20% for defects, snipe and layout. For a simple order of clear boards, 0% may be fine. The calculator reports board feet with the waste already applied, plus linear feet for transport planning.",
      "Compare the board-foot price, not just the length. A wide board contains more wood than a narrow one of the same length, and the board-foot price reflects that. When a supplier quotes per linear foot, ask for the width and thickness so you can compare fairly.",
      "Remember that board footage uses inches and feet even in metric countries. If you measured in centimetres and metres, enter those values and the calculator converts them. One cubic metre equals about 424 board feet, which is a useful sanity check for large orders.",
    ],
    formula: {
      equation: "Board feet = (Thickness (in) × Width (in) × Length (ft)) ÷ 12 × Quantity",
      explanation:
        "A board foot is 1 in × 12 in × 12 in, or 144 in³. Multiplying thickness by width by length in feet gives a value in board-foot twelfths, so dividing by 12 converts to board feet. Quantity and waste scale the result.",
      example:
        "Four boards 2 in thick, 6 in wide and 10 ft long: (2 × 6 × 10) ÷ 12 = 10 board feet per board. Four boards make 40 board feet. With 10% waste, order 44 board feet.",
    },
    faqs: [
      {
        q: "What is a board foot?",
        a: "A board foot is a volume of 144 cubic inches, equivalent to a board 1 inch thick, 12 inches wide and 12 inches long. It is the standard unit for pricing hardwood lumber in North America.",
      },
      {
        q: "Do I use nominal or actual thickness for board feet?",
        a: "Most hardwood is sold on nominal thickness and width, even though it has been surfaced. Softwood construction lumber is usually priced per linear foot or per piece. Confirm the supplier's basis before ordering.",
      },
      {
        q: "How many board feet are in a cubic metre?",
        a: "One cubic metre is about 423.8 board feet. This is useful when comparing metric timber prices with board-foot prices, but always confirm the measurement basis.",
      },
      {
        q: "How much waste should I add for a project?",
        a: "For furniture and cabinetry, 15–20% is typical to allow for defects, snipe and layout. For simple utility boards, 5–10% may be enough. Complex grain matching can require more.",
      },
    ],
    tips: [
      "Ask whether the supplier measures rough or dressed dimensions.",
      "Check for defects before cutting — plan around knots and checks.",
      "For large orders, compare the price per cubic metre as a sanity check.",
    ],
  },
  "stair-stringer-calculator": {
    intro:
      "A comfortable staircase is a series of consistent, code-compliant steps. This calculator turns the total floor-to-floor rise and your preferred riser and tread dimensions into riser count, actual riser height, total run, stair angle and stringer length.",
    howTo: [
      "Measure the total rise from the finished lower floor to the finished upper floor. Include the thickness of the upper floor finish if it is not yet installed. Small errors here multiply across every step, so measure at the actual stair location rather than from a drawing.",
      "Enter your target riser height and tread depth. Residential codes commonly require risers between 150 and 200 mm (6–8 in) and treads of at least 250 mm (10 in), but the exact limits vary by jurisdiction. The calculator rounds the number of risers up, then recalculates the actual riser so every step is equal.",
      "Check the total run. It is the number of treads (one fewer than the number of risers) multiplied by the tread depth. If the run is too long for the space, you cannot simply reduce the tread depth below code — you may need a landing, a switchback or a steeper code-compliant design. The stringer length is the diagonal from the bottom to the top of the stair, before notches and landing cuts.",
      "Use the angle to plan headroom and handrails. A typical stair is around 30–37°. Confirm at least 2 m (6 ft 8 in) of headroom measured vertically from the stair nosing, and check the handrail height, balustrade gaps and landing dimensions against your local code. For structural stairs, have the stringer size and fixings checked by a professional.",
    ],
    formula: {
      equation:
        "Risers = Ceiling(Total rise ÷ Target riser)\nActual riser = Total rise ÷ Risers\nRun = (Risers − 1) × Tread\nStringer = √(Rise² + Run²)",
      explanation:
        "Rounding the riser count up ensures the actual riser is no taller than the target. The run uses one fewer tread than risers because the upper floor is the final step. The stringer is the hypotenuse of the rise-and-run triangle.",
      example:
        "A 2.7 m rise with a 180 mm target riser needs 15 risers (2.7 ÷ 0.18 = 15). The actual riser is 180 mm, the run with a 280 mm tread is 14 × 0.28 = 3.92 m, and the stringer is √(2.7² + 3.92²) = 4.76 m.",
    },
    faqs: [
      {
        q: "What is a comfortable stair riser height?",
        a: "Most residential stairs use risers of 170–190 mm (6.7–7.5 in). The key is consistency: every riser should be within a few millimetres of the others to avoid trip hazards.",
      },
      {
        q: "How do I calculate the number of steps?",
        a: "Divide the total rise by your target riser height and round up. Then divide the total rise by that whole number to get the actual riser. The number of treads is one less than the number of risers.",
      },
      {
        q: "How long should a stair stringer be?",
        a: "Use Pythagoras: the square root of the total rise squared plus the total run squared. Add material for the top and bottom cuts. The calculator's stringer length is the theoretical diagonal before those cuts.",
      },
      {
        q: "Can I use this for outdoor deck stairs?",
        a: "Yes, but outdoor stairs need weather-resistant material, proper footings, drainage and often a different riser/tread ratio. Check local code for exterior stairs and add a landing where required.",
      },
    ],
    tips: [
      "Keep every riser identical — consistency matters more than the exact target.",
      "Check headroom, handrail height and balustrade gaps against local code.",
      "Use a framing square or a stair gauge to mark stringers accurately.",
    ],
  },
  "gravel-sand-calculator": {
    intro:
      "Gravel and sand are sold by volume, weight or bag, and the numbers rarely match the neat area on your plan. This calculator combines area, depth and material density to estimate volume, tonnes and bag counts for driveways, paths, bases and garden projects.",
    howTo: [
      "Measure the length and width of the area to be covered, splitting irregular shapes into rectangles. Enter the compacted depth you want. A driveway base might be 100–150 mm, a garden path 50 mm, and a decorative gravel top layer 50–75 mm. Deeper layers settle more, so allow for that.",
      "Choose the material density. Dry gravel is around 1,500 kg/m³, sand about 1,600 kg/m³ and pea gravel about 1,350 kg/m³. These are bulk densities for loose material; compacted material is denser. If your supplier quotes a different figure, the volume is still useful, but the weight will change.",
      "Add 10% waste. Bulk deliveries are rarely exact, and some material is lost to spillage, uneven ground and compaction. For a small area, the bag count is useful; for a driveway, use tonnes and ask for a part-load or a smaller truck if access is tight.",
      "Plan the base and drainage. Gravel over soft ground will sink, so use a geotextile membrane and a compacted sub-base. Keep the finished level below the damp-proof course of adjacent walls and provide a fall away from buildings. For sand under pavers, use a screeded bedding layer rather than a deep loose fill.",
    ],
    formula: {
      equation:
        "Volume = Length × Width × Depth × (1 + Waste)\nWeight = Volume × Bulk density\nBags = Ceiling(Weight ÷ Bag weight)",
      explanation:
        "Length × width × depth gives cubic metres. The waste factor is applied before converting to weight using the selected bulk density. Bag counts divide the total weight by the weight of one bag, assuming 25 kg bags in metric and 50 lb bags in imperial.",
      example:
        "A 5 m × 4 m area at 80 mm deep is 1.6 m³. With 10% waste, 1.76 m³. At 1,500 kg/m³ that is 2,640 kg, or 2.64 tonnes. In 25 kg bags, that is 106 bags.",
    },
    faqs: [
      {
        q: "How deep should gravel be for a driveway?",
        a: "A driveway base typically needs 100–150 mm of compacted crushed stone, with a 50–75 mm decorative layer on top. Soft sub-grade may need a geotextile and a deeper base. Confirm with a local supplier or contractor.",
      },
      {
        q: "How many tonnes are in a cubic metre of gravel?",
        a: "Loose gravel is about 1.5 tonnes per cubic metre, sand about 1.6 tonnes, and pea gravel about 1.35 tonnes. Compacted material is heavier. Always use the supplier's density for ordering.",
      },
      {
        q: "Do I need a geotextile membrane under gravel?",
        a: "It is strongly recommended over soil. A membrane stops soil pumping into the gravel, keeps the drainage layer clean and reduces the amount of stone you need. It also makes future maintenance easier.",
      },
      {
        q: "Should I buy gravel in bags or bulk?",
        a: "Bags are convenient for small areas and precise quantities but cost much more per tonne. Bulk is better for driveways and large beds, provided a truck can reach the site. The calculator shows both so you can compare.",
      },
    ],
    tips: [
      "Order by the tonne for bulk and confirm the truck's access and weight limits.",
      "Use a geotextile and compact each layer before adding the next.",
      "Keep finished levels below the damp-proof course of walls.",
    ],
  },
  "mulch-calculator": {
    intro:
      "Mulch is sold in litres, cubic feet or bags, and a little goes further than most people expect. This calculator converts bed dimensions and depth into volume and bag counts, with a waste allowance for irregular edges and settling.",
    howTo: [
      "Measure the length and width of each bed, breaking curved borders into rectangles or circles. For a circular bed, use π × radius². Enter the depth you want: 50–75 mm (2–3 in) is typical for maintenance, while a new bed may need 75–100 mm to suppress weeds.",
      "Choose the bag size from the product you plan to buy. A 50-litre bag is common in metric markets, while 2 cu ft (56.6 L) bags are common in the US. If you are buying bulk mulch, use the cubic metre or cubic yard result and ignore the bag count.",
      "Add 5% waste for a simple bed and 10% for irregular edges, slopes or a very loose mulch. The calculator also shows coverage at 50 mm, which helps you compare the cost of different bag sizes. Mulch settles by 10–20% over time, so a slightly deeper initial layer may be worthwhile.",
      "Keep mulch away from trunks, stems and the base of walls. A 50–75 mm gap prevents rot and pest problems. Water the bed before mulching, and do not pile mulch over drainage outlets or low plants. For a large landscape project, bulk delivery is almost always more economical than bags.",
    ],
    formula: {
      equation: "Volume = Length × Width × Depth × (1 + Waste)\nBags = Ceiling((Volume × 1,000) ÷ Bag size in litres)",
      explanation:
        "Area multiplied by depth gives cubic metres. Multiplying by 1,000 converts to litres, and dividing by the bag volume gives the number of bags. The waste factor is applied to the volume before the bag conversion.",
      example:
        "A 5 m × 3 m bed at 75 mm deep is 1.125 m³, or 1,125 litres. With 5% waste that is 1,181 litres. In 50-litre bags, that is 24 bags (rounded up).",
    },
    faqs: [
      {
        q: "How deep should mulch be?",
        a: "Use 50–75 mm (2–3 in) for established beds and up to 100 mm (4 in) for new beds or weed suppression. More than 100 mm can reduce oxygen to the soil and encourage shallow roots.",
      },
      {
        q: "How many bags of mulch make a cubic metre?",
        a: "A cubic metre is 1,000 litres, so it takes twenty 50-litre bags. If you are using 2 cu ft bags, each is about 56.6 litres, so roughly 18 bags make a cubic metre.",
      },
      {
        q: "Should I remove old mulch before adding more?",
        a: "Usually not, unless it has formed a matted, hydrophobic layer or is contaminated with weeds. Rake it to break the surface, top up to the desired depth and keep it away from plant stems.",
      },
      {
        q: "Is bulk mulch cheaper than bags?",
        a: "Yes, for anything more than a few square metres. Bulk mulch is priced by volume and delivered by truck, while bagged mulch carries packaging and handling costs. Check access and delivery fees before ordering.",
      },
    ],
    tips: [
      "Keep a 50–75 mm gap between mulch and trunks or stems.",
      "Water deeply before mulching, not after.",
      "Use a darker mulch for a crisp border and a lighter mulch for a native look.",
    ],
  },
  "sod-calculator": {
    intro:
      "Sod is a living product with a short shelf life, so ordering the right amount matters. This calculator converts lawn dimensions into area, sod rolls and a waste allowance, using the roll size your supplier actually sells.",
    howTo: [
      "Measure the lawn's length and width and sketch the shape. Break irregular lawns into rectangles, triangles and circles, then add the areas. For a circle, use π × radius²; for a triangle, use ½ × base × height. Measure to the edge of the intended turf, not to the fence line.",
      "Choose the roll size from your supplier. Sod is sold in 1 m² rolls, 10 sq ft rolls (0.929 m²), 25 sq ft rolls (2.32 m²) and sometimes larger harvest units. The roll size affects how many pieces you handle, not just the price, so confirm what is available before placing the order.",
      "Add 5–10% waste for trimming around curves, paths and beds. Straight rectangular lawns need less; irregular shapes and tight corners need more. Sod cannot be stretched, and offcuts from the edges are often unusable. Keep the delivery shaded and install it within 24 hours of harvest.",
      "Prepare the ground before the sod arrives. Remove weeds, rototill or loosen compacted soil, add organic matter, grade for drainage and roll to firm the surface. Moisture the soil immediately before laying, butt the seams tightly, and water daily for the first two weeks. The calculator only estimates quantity — site preparation determines whether the lawn survives.",
    ],
    formula: {
      equation: "Lawn area = Length × Width\nRolls = Ceiling((Area × (1 + Waste)) ÷ Roll area)",
      explanation:
        "The lawn area is divided by the area covered by one roll, then rounded up to whole rolls. The waste factor accounts for edge trimming and damaged pieces. For irregular shapes, calculate each section separately and add the results before entering the total.",
      example:
        "A 10 m × 6 m lawn is 60 m². With 5% waste, that is 63 m². Using 1 m² rolls, you need 63 rolls. If your supplier sells 10 sq ft rolls, divide 63 by 0.929 to get 68 rolls.",
    },
    faqs: [
      {
        q: "How long can sod sit before installation?",
        a: "Install within 24 hours of delivery, and sooner in hot weather. Keep rolls shaded and slightly moist, but do not soak them. Sod left in a stack can heat up and die within a day.",
      },
      {
        q: "How much water does new sod need?",
        a: "Water immediately after installation and keep the soil moist for the first 10–14 days. Typically that means a deep watering every day or two, depending on temperature and soil. Reduce frequency once the roots knit into the soil.",
      },
      {
        q: "What is the best time of year to lay sod?",
        a: "Cool-season grasses establish best in spring or early autumn; warm-season grasses prefer late spring or summer. Avoid laying during extreme heat or frost. Local advice is more reliable than a general rule.",
      },
      {
        q: "Do I need topsoil under sod?",
        a: "Sod needs good contact with the soil, not a deep layer of loose topsoil. Amend the existing soil, grade it, firm it and water it before laying. A thin layer of compost can help, but loose fill causes uneven settling.",
      },
    ],
    tips: [
      "Order sod for the day you can install it — freshness matters.",
      "Butt seams tightly and stagger them like brickwork.",
      "Keep the new lawn off heavy traffic until the roots knit.",
    ],
  },
  "fence-post-calculator": {
    intro:
      "Fence posts are the structural backbone of a fence, and the count is more than length divided by spacing. This calculator adds the end post, gate posts, rails and concrete so you can plan a complete fence line.",
    howTo: [
      "Measure the fence line in metres or feet, following the actual route rather than the property boundary on a plan. If the fence changes direction, measure each run separately and add the lengths. Enter the post spacing you plan to use — commonly 2.4 m (8 ft) for timber fences, but check the cladding manufacturer's limit.",
      "The calculator adds one post to the length ÷ spacing result so that both ends are supported. Add extra posts for gates: a gate needs a post on each side, and wide or heavy gates may need a third post or a metal frame. If a gate replaces a line post, the count may not increase by the full number, so review the layout.",
      "Enter the number of horizontal rails per bay and the concrete volume per post. A typical post hole of 300 mm diameter and 600 mm depth holds about 0.042 m³, but the post displaces some of that. The default 30 litres (1 cu ft) per post is a practical allowance. Use concrete, not soil, for a durable fence.",
      "Add a waste allowance for rails and fixings. Rails are usually sold in fixed lengths, so the total rail length helps you work out how many lengths to buy. For a slope, you may need stepped rails rather than continuous ones. Check local rules on fence height, boundary position and permits before building.",
    ],
    formula: {
      equation:
        "Posts = Ceiling(Fence length ÷ Post spacing) + 1 + Gate posts\nRails = (Posts − 1) × Spacing × Rail rows\nConcrete = Posts × Concrete per post",
      explanation:
        "Number of bays equals the number of posts minus one. Each bay needs one rail per row, so total rail length is bays × spacing × rows. Concrete volume per post is multiplied by the post count. The ceiling function ensures a partial final bay gets a post.",
      example:
        "A 30 m fence with 2.4 m spacing needs 30 ÷ 2.4 = 12.5, rounded up to 13 bays, plus 1 end post = 14 posts. With one extra gate post, 15 posts. For two rails, rail length is 14 × 2.4 × 2 = 67.2 m. At 30 L per post, concrete is 450 L.",
    },
    faqs: [
      {
        q: "How far apart should fence posts be?",
        a: "Timber fence posts are commonly spaced 2.4 m (8 ft) apart, with 1.8–3 m depending on cladding weight and wind exposure. Check the fence panel manufacturer's recommendation and local code.",
      },
      {
        q: "How deep should fence posts be set?",
        a: "A common rule is one-third of the above-ground height in the ground, with a minimum of 600 mm (2 ft). Gate posts and windy sites need deeper, larger footings. Use concrete and compact the soil around the hole.",
      },
      {
        q: "How much concrete does a fence post need?",
        a: "A 300 mm diameter hole 600 mm deep holds about 0.042 m³, minus the post volume. A 30-litre (1 cu ft) allowance per post is practical for many timber fences. Larger posts or softer ground need more.",
      },
      {
        q: "Do I need planning permission for a fence?",
        a: "It depends on height, location and local rules. In many places a garden fence under 2 m does not need permission, but corner plots, conservation areas and boundary disputes have extra rules. Check with your local authority before building.",
      },
    ],
    tips: [
      "Use concrete for gate posts and line posts — rammed soil is not durable.",
      "Check for buried services before digging.",
      "Leave the post tops slightly angled or capped to shed water.",
    ],
  },
  "decking-material-calculator": {
    intro:
      "Decking estimates depend on how many boards fit across the deck, not just the total area. This calculator works out board rows, pieces per row, linear length and screws for timber or composite decking, with a waste allowance for cuts and offcuts.",
    howTo: [
      "Measure the deck's length and width at the finished surface. Decide which direction the boards will run. The calculator assumes boards run along the length and are laid side by side across the width. If you plan a picture-frame border or a diagonal layout, add extra boards and waste.",
      "Enter the actual board width — for example 140 mm for a 145 mm nominal board, or 5.5 in for a 5/4 × 6 deck board. Add the gap: 3–5 mm for timber and composite, following the manufacturer's guidance. The effective coverage of each board is width plus gap, and the number of rows is the deck width divided by that coverage, rounded up.",
      "Enter the available board length and the waste allowance. Boards are sold in fixed lengths, so the calculator rounds up pieces per row and then adds waste. A 10% allowance covers end cuts, damaged ends and a few bad boards; use 15% for diagonal or herringbone layouts. Buy all boards from one batch to keep colour consistent.",
      "Plan the structure separately. This estimate covers the walking surface only. You still need joists, beams, posts, hangers, joist tape, fascia and edge fasteners. Screw counts assume two screws per joist per board plus 10%, but hidden fastener systems use different quantities. Check the joist spacing for your board type — composite boards often require closer spacing than timber.",
    ],
    formula: {
      equation:
        "Rows = Ceiling(Deck width ÷ (Board width + Gap))\nPieces per row = Ceiling(Deck length ÷ Board length)\nBoards = Ceiling(Rows × Pieces per row × (1 + Waste))",
      explanation:
        "Each row of boards covers the board width plus the gap. Dividing the deck width by that coverage gives the number of rows. Dividing the deck length by the board length gives the pieces needed in each row. Multiplying and applying waste gives the total board count.",
      example:
        "A 6 m × 4 m deck with 140 mm boards and a 5 mm gap has 4 ÷ 0.145 = 27.6, so 28 rows. With 3.6 m boards, each row needs 2 pieces. That is 56 boards before waste; with 10% waste, 62 boards.",
    },
    faqs: [
      {
        q: "How do I calculate decking boards needed?",
        a: "Divide the deck width by the effective board coverage (board width plus gap), round up to get the number of rows, then divide the deck length by the board length for pieces per row. Multiply the two and add waste.",
      },
      {
        q: "What gap should I leave between decking boards?",
        a: "Usually 3–5 mm (1/8–3/16 in) for timber and composite. Follow the board manufacturer's guidance; some composites need a slightly larger gap, and wet timber may shrink after installation.",
      },
      {
        q: "How many screws per deck board?",
        a: "Plan for two screws at every joist crossing, plus about 10% extra. A 6 m board crossing six joists needs 12 screws. Hidden fastener clips are counted per joist and per board, following the system's instructions.",
      },
      {
        q: "Should I add extra for diagonal decking?",
        a: "Yes. Diagonal and herringbone layouts create more cuts and waste, so allow 15–20% rather than 10%. A picture-frame border also needs additional boards for the perimeter.",
      },
    ],
    tips: [
      "Buy all decking from one production batch to avoid colour variation.",
      "Leave the recommended gap — boards swell in damp weather.",
      "Use stainless or coated fasteners in exposed and coastal locations.",
    ],
  },
};
