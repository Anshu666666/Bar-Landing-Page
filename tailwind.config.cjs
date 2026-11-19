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
      xs: '420px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      'max-md': { max: '767px' },
      'max-sm': { max: '639px' },
      'max-lg': { max: '1023px' },
    },
  },
  plugins: [],
}
