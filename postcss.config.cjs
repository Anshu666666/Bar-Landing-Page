// postcss.config.js
module.exports = {
  plugins: [
    require('postcss-nesting'), // ✅ Nesting plugin must come first
    require('tailwindcss'),
    require('autoprefixer'),
  ]
}
