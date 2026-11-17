import type { ToolContent } from "./construction";

export const universalContent: Record<string, ToolContent> = {
  "unit-converter": {
    intro:
      "This universal converter handles length, weight, temperature, volume, area, speed and digital data in one place. Choose a category, set the units you have and the units you want, and the result updates as you type. It uses exact or standard conversion factors, including the difference between decimal and binary data units.",
    howTo: [
      "Choose the category that matches what you are measuring. Length covers millimetres to nautical miles; weight covers milligrams to short tons; volume covers millilitres to cubic feet; area includes hectares and acres; speed includes metres per second, km/h, mph and knots; data distinguishes decimal megabytes from binary mebibytes.",
      "Enter the value in the From field, then choose the source and destination units. Use the swap button to reverse them. The high-level result shows the converted value, and the table below shows the same value in every unit in the category, which is useful for checking a conversion or comparing products.",
      "Set the number of decimal places to suit the job. Two decimals are fine for most DIY measurements, while four or more may be appropriate for engineering or laboratory work. For very large or very small values, the table is often clearer than a single number. The converter does not round the underlying value until the display step.",
      "Temperature conversions are handled separately because the scales have different zero points. Celsius, Fahrenheit and Kelvin are converted through Celsius as the base. Volume and weight conversions use US customary units where marked; UK imperial gallons and fluid ounces differ, so use the specific UK unit if your recipe or supplier requires it.",
    ],
    formula: {
      equation:
        "Result = Value × (From unit factor ÷ To unit factor)\nTemperature: °F = (°C × 9/5) + 32; K = °C + 273.15",
      explanation:
        "Each unit in a category has a factor that converts it to a common base unit. To convert between any two units, multiply by the source factor and divide by the destination factor. Temperature is affine rather than multiplicative, so it needs its own formula.",
      example:
        "To convert 10 miles to kilometres: 10 × 1,609.344 ÷ 1,000 = 16.093 km. To convert 20 °C to °F: (20 × 9/5) + 32 = 68 °F. To convert 1 GB (decimal) to GiB: 1,000,000,000 ÷ 1,073,741,824 = 0.931 GiB.",
    },
    faqs: [
      {
        q: "How many square feet are in a square metre?",
        a: "One square metre is about 10.764 square feet. Multiply square metres by 10.764 to convert. Remember that area conversions use the square of the linear factor, which is why 1 m² is not 3.28 ft².",
      },
      {
        q: "What is the difference between MB and MiB?",
        a: "A decimal megabyte (MB) is 1,000,000 bytes, while a mebibyte (MiB) is 1,048,576 bytes. Operating systems sometimes display binary sizes with decimal labels, which is why a 1 TB drive appears smaller than expected.",
      },
      {
        q: "Is a US gallon the same as an imperial gallon?",
        a: "No. A US gallon is 3.785 L, while an imperial gallon is 4.546 L. US fluid ounces are also smaller than imperial fluid ounces. This converter uses US customary units for gallons, pints and fluid ounces.",
      },
      {
        q: "How accurate are these conversions?",
        a: "The factors are standard definitions and are accurate to the precision shown. Rounding at the display step may introduce small differences. For scientific or legal work, use a calibrated instrument and the required standard.",
      },
    ],
    tips: [
      "Use the swap button to check a conversion in reverse.",
      "Set more decimals for engineering or recipe work.",
      "Check whether your source uses US or imperial volume units.",
    ],
  },
};
