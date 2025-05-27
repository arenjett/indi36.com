import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bodyColor: "var(--bg-body-color)",
        headerBg: "var(--bg-header-color)",
        primary: "#0d6efd",
      },
      boxShadow: {
        custom: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
      },
      // screens: {
      //   sm: "540px",
      //   md: "720px",
      //   lg: "960px",
      //   xl: "1140px",
      //   "2xl": "1320px",
      // },
      container: {
        center: true,
        padding: "0.75rem",
        screens: {
          sm: "540px",
          md: "720px",
          lg: "960px",
          xl: "1140px",
          "2xl": "1320px",
        },
      },
    },
  },
  plugins: [],
};
export default config;
