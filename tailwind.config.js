module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        "lato-bold": ["LatoBold"],
        "inter-bold": ["InterBold"],
        "inter-medium": ["InterMedium"],
        "inter-regular": ["InterRegular"],
        "inter-italic": ["InterItalic"],
      },
    },
  },
  safelist: [
    { pattern: /bg-gray-(100|200|300|400|500|600|700|800|900)/ },
    { pattern: /text-gray-(100|200|300|400|500|600|700|800|900)/ },
    { pattern: /text-\[\d+px\]/ },
    // { pattern: /tex
    // t-\[#[0-9a-fA-F]+\]/ }, // For hex color values like text-[#0D1D35]
    // { pattern: /text-\[.+\]/ }, // Catch-all for any other arbitrary text values
    { pattern: /bg-red-(100|200|300|400|500|600|700|800|900)/ },
    { pattern: /p-(1|2|3|4|5|6|7|8|9|10)/ },
    { pattern: /pt-(1|2|3|4|5|6|7|8|9|10)/ },
    { pattern: /pb-(1|2|3|4|5|6|7|8|9|10)/ },
    { pattern: /pl-(1|2|3|4|5|6|7|8|9|10)/ },
    { pattern: /px-(1|2|3|4|5|6|7|8|9|10)/ },
    { pattern: /py-(1|2|3|4|5|6|7|8|9|10)/ },
    { pattern: /right-(1|2|3|4|5|6|7|8|9|10)/ },
    { pattern: /left-(1|2|3|4|5|6|7|8|9|10|11|12|14)/ },
    { pattern: /top-(1|2|3|4|5|6|7|8|9|10)/ },
    { pattern: /ml-(1|2|3|4|5|6|7|8|9|10)/ },
    { pattern: /mr-(1|2|3|4|5|6|7|8|9|10)/ },
    { pattern: /mb-(1|2|3|4|5|6|7|8|9|10)/ },
    { pattern: /w-(1|2|3|4|5|6|7|8|9|10|11|12|14)/ },
    { pattern: /gap-x-(1|2|3|4|5|6|7|8|9|10)/ },
    { pattern: /gap-y-(1|2|3|4|5|6|7|8|9|10)/ },
    { pattern: /h-(0|0\.5|1|1\.5|2|2\.5|3|3\.5|4|5|6|7|8|9|10|11|12|14|16|20|24|28|32|36|40|44|48|52|56|60|64|72|80|96)/ },
    { pattern: /my-(1|2|3|4|5|6|7|8|9|10)/ },
  ],
  plugins: [],
};
