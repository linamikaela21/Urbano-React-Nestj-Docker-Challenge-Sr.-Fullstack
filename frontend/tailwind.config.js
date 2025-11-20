module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#c1292e',
          background: '#ffffff',
          active: '#c1292e',
          header: '#e2e1e1',
        },
        red: {
          primary: '#c1292e',
          hover: '#c1292e',
        },
        white: {
          DEFAULT: '#ffffff',
          primary: '#ffffff',
          hover: '#f2f2f2',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
