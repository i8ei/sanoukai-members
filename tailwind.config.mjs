/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Noto Sans JP"', "system-ui", "sans-serif"],
      },
      colors: {
        bg: {
          DEFAULT: "#FAF8F2",
          soft: "#F3F0E8",
        },
        ink: {
          DEFAULT: "#2C3315",
          soft: "#5A6340",
        },
        card: {
          DEFAULT: "#FFFFFF",
          soft: "#FAFAFA",
        },
        line: "rgba(44, 51, 21, 0.12)",
        brand: {
          DEFAULT: "#2D6A4F",
          light: "#40916C",
          dark: "#1B4332",
        },
        soil: "#8B6914",
        leaf: {
          DEFAULT: "#40916C",
          light: "#74C69D",
          pale: "#D8F3DC",
        },
        water: "#2F6F8F",
        sun: {
          DEFAULT: "#E7A83A",
          light: "#F2D280",
          pale: "#FFF8E7",
        },
        accent: "#C45D3E",
        cream: "#FAF5E4",
        earth: {
          DEFAULT: "#8B7355",
          light: "#C4A882",
          pale: "#F5EFE6",
        },
      },
      boxShadow: {
        card: "0 4px 6px -1px rgba(44, 51, 21, 0.05), 0 2px 4px -1px rgba(44, 51, 21, 0.03)",
        "card-hover":
          "0 20px 25px -5px rgba(44, 51, 21, 0.1), 0 10px 10px -5px rgba(44, 51, 21, 0.04)",
        hero: "0 20px 40px -10px rgba(45, 106, 79, 0.4)",
        glass: "0 8px 32px 0 rgba(44, 51, 21, 0.07)",
      },
      borderRadius: {
        xl: "14px",
        "2xl": "20px",
      },
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(135deg, #1B4332 0%, #2D6A4F 40%, #52B788 75%, #F2D280 100%)",
        "hero-overlay":
          "linear-gradient(180deg, rgba(27, 67, 50, 0.9) 0%, rgba(45, 106, 79, 0.75) 50%, rgba(242, 210, 128, 0.6) 100%)",
        "section-warm": "linear-gradient(180deg, #FDFDFB 0%, #FFF8E7 100%)",
        "section-green": "linear-gradient(180deg, #FDFDFB 0%, #E8F5E9 100%)",
        "card-accent": "linear-gradient(135deg, #FFFFFF 0%, #FFF8E7 100%)",
        "glass-panel":
          "linear-gradient(145deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.4) 100%)",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-in": {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) both",
        "fade-in": "fade-in 0.6s ease-out both",
        "slide-in": "slide-in 0.5s ease-out both",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
