import type { Config } from "tailwindcss";

const config: Config = {
  plugins: [
    function ({ addUtilities }: { addUtilities: Function }) {
      const newUtilities = {
        ".text-outline": {
          textShadow: "0 0 0px #000, 0 0 0px #000", //#324c4c
        },
      };
      addUtilities(newUtilities);
    },
  ],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      // keyframes: {
      //   "spin-scale-down": {
      //     "0%": { transform: "rotate(0deg) scale(1)" },
      //     "100%": { transform: "rotate(860deg) scale(0.01)" },
      //   },
      // },
      // animation: {
      //   "spin-scale-down-once": "spin-scale-down 3s linear 1",
      // },
    },
  },
};
export default config;
