export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: { oswald: ['Oswald', 'sans-serif'], inter: ['Inter', 'sans-serif'] },
      colors: {
        brand: {
          primary: '#1A3A5C',
          accent: '#C9A64C',
          light: '#F0F4F8',
          dark: '#0D1E2E',
        }
      }
    }
  },
  plugins: []
}
