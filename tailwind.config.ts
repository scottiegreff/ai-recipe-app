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
      backgroundImage: {},
    },
  },
};
export default config;
