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
  plugins: [],
}
