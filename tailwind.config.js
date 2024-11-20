/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  screens: {
    ssm: "375px",
    // => @media (min-width: 375px) { ... }

    xs: "450px",
    // => @media (min-width: 450px) { ... }

    sm: "575px",
    // => @media (min-width: 576px) { ... }

    md: "768px",
    // => @media (min-width: 768px) { ... }

    lg: "992px",
    // => @media (min-width: 992px) { ... }

    xl: "1200px",
    // => @media (min-width: 1200px) { ... }

    "2xl": "1400px",
    // => @media (min-width: 1400px) { ... }
  },
  theme: {
    extend: {
      colors: {
        primary: "#056FBB",
        // primary: "#4F46E5",
        secondary: "#6B7280",
        background: "#F3F4F6",
        // "primary-dark": "#3730A3",
        "primary-dark": "#025A9E",

        "primary-darkmode": "#13227A",
        "secondary-darkmode": "#A8AEB9",
        "background-darkmode": "#121212",
        "primary-dark-darkmode": "#013A6B",

        // "primary-darkmode": "#89C2FF",
        // "secondary-darkmode": "#A8AEB9",
        // "background-darkmode": "#1F1F1F",
      },
    },
  },
  plugins: [],
};
