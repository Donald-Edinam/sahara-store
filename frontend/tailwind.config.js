/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Montserrat', 'sans-serif'],
        'serif': ['Montaga', 'serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
        'montaga': ['Montaga', 'serif'],
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        afrimart: {
          "primary": "#F5E6D3",
          "secondary": "#70350D",
          "accent": "#D35400",
          "neutral": "#4E3629",
          "base-100": "#F5E6D3",
          "info": "#21618C",
          "success": "#27AE60",
          "warning": "#F39C12",
          "error": "#C0392B",
        },
      },
    ],
    darkTheme: "light",
    base: true,
    styled: true,
    utils: true,
    prefix: "",
    logs: true,
    themeRoot: ":root",
  },
}