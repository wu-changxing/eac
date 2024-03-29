/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    borderRadius: {
      '4xl': '2rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '7xl': '5rem',
      '8xl': '8rem',
      '9xl': '10rem',
      '10xl': '12rem',
      'full': '9999px',
      'none': '0',
      'sm': '0.125rem',
      'md': '0.375rem',
      'lg': '0.5rem',
      'xl': '0.75rem',
      '2xl': '1rem',
      '3xl': '1.5rem',
    },
    extend: {
      animation: {
        'move-left': 'moveLeft 10s linear forwards'
      },
      boxShadow: {
        '8xl': '0 0 60px 15px rgba(0, 0, 0, 0.25)',  // Balanced shadow
      },
      keyframes: {
        moveLeft: {
          '0%': { left: '100%' },
          '100%': { left: '-100%' },
        }
      },
      fontSize: {
        xxs: '0.625rem', // Add the 'xxs' text size variant here
        xxxs: '0.5rem',
      },
    },
  },
  plugins: [],
};
