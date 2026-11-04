export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Cairo", "sans-serif"],
        cairo: ["Cairo", "sans-serif"],
        mono: ["Cairo", "sans-serif"],
      },
      colors: {
        brand: {
          primary: "#4F547B",
          secondary: "#EFB144",
          purpleDark: "#262262",
          background: "#F5F7FE",
          surface: "#FFFFFF",
          surfaceMuted: "#F8F9FA",
          text: "#000000",
          textLight: "#4F547B",
          orange: "#FFA51A",
          gold: "#F2BB53",
          danger: "#FB5F5F",
        },
        navy: {
          50: "#F5F7FE",
          100: "#EAEBFA",
          200: "#D4D7F2",
          700: "#393478",
          800: "#2E2A6F",
          900: "#262262",
          950: "#1C184D",
        },
        royalBlue: {
          50: "#F5F7FE",
          100: "#E9ECF8",
          500: "#626894",
          600: "#4F547B",
          700: "#3F4363",
        },
        gold: {
          50: "#FEFBF4",
          100: "#FDF6E7",
          200: "#FAECCF",
          300: "#F6DC9F",
          400: "#F2BB53",
          500: "#EFB144",
          600: "#DA9B2C",
          700: "#B47B1A",
        },
        surface: {
          base: "#F5F7FE",
          card: "#FFFFFF",
          muted: "#F8F9FA",
          border: "#E2E8F0",
        },
        status: {
          success: "#10B981",
          danger: "#FB5F5F",
          warning: "#FFA51A",
          info: "#4F547B",
        },
      },
      boxShadow: {
        subtle: "0 1px 3px 0 rgba(38, 34, 98, 0.05), 0 1px 2px -1px rgba(38, 34, 98, 0.05)",
        card: "0 4px 6px -1px rgba(38, 34, 98, 0.07), 0 2px 4px -2px rgba(38, 34, 98, 0.05)",
        elevated: "0 10px 25px -3px rgba(38, 34, 98, 0.12), 0 4px 6px -4px rgba(38, 34, 98, 0.06)",
      },
    },
  },
  plugins: [],
};
