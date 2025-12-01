import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx,mdx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // E‑commerce theme palette
        primary: "#FFD369", // primary button / highlight
        accent: "#FF6B35",  // offers / attention
        base: {
          dark: "#222831",  // navbar / dark accents
          light: "#F8F8F8", // surface background
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        display: ["var(--font-poppins)", "Poppins", "sans-serif"],
      },
      boxShadow: {
        soft: "0 25px 70px -35px rgba(0,0,0,0.45)",
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(transparent 94%, rgba(255,255,255,0.1) 96%), linear-gradient(90deg, transparent 94%, rgba(255,255,255,0.1) 96%)",
      },
    },
  },
  plugins: [],
};

export default config;

