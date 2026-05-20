/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Manrope"', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 20px 45px -18px rgba(15, 23, 42, 0.28)',
        glass: '0 10px 35px rgba(15, 23, 42, 0.12)',
      },
      colors: {
        brand: {
          50: '#eefbf7',
          100: '#d7f6eb',
          200: '#b4eedb',
          300: '#82e0c1',
          400: '#4fcf9d',
          500: '#25b884',
          600: '#17916a',
          700: '#146f56',
          800: '#125846',
          900: '#10483c',
        },
        ink: {
          950: '#07111f',
        },
      },
      backgroundImage: {
        'dashboard-radial': 'radial-gradient(circle at top left, rgba(37,184,132,0.18), transparent 36%), radial-gradient(circle at top right, rgba(90,114,255,0.18), transparent 30%), linear-gradient(180deg, rgba(255,255,255,0.92), rgba(247,250,252,1))',
      },
    },
  },
  plugins: [],
};
