// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        negra: ['Modern Negra', 'sans-serif'],
      },
    },
    screens: {
      // ⬅️ Default screens (optional)
      md: '540px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      'max-md': {max:'539px'},


    },
  },
  plugins: [],
}
