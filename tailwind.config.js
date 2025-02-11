/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    screens: {
      'xxs': '0px',
      'xs': '480px',
      'sm': '640px',
      'md': '860px',
      'lg': '1100px',
      'xl': '1280px',
      '2xl': '1536px'
    }
  },
  plugins: [],
};
