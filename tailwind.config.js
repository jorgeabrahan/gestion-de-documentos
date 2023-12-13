/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        'raisin-black': {
          DEFAULT: '#262628',
          800: '#252526'
        },
        onyx: {
          DEFAULT: '#424245'
        },
        'anti-flash-white': {
          DEFAULT: '#f5f5f7'
        },
        'eerie-black': {
          DEFAULT: '#1d1d1f',
          800: '#1f1f1f'
        },
        'dim-gray': {
          DEFAULT: '#6E6E73'
        },
        'fire-engine-red': {
          DEFAULT: '#d60017',
          500: '#fa233b'
        },
        'true-blue': {
          DEFAULT: '#0066CC'
        },
        'celtic-blue': {
          DEFAULT: '#0071E3'
        }
      }
    },
  },
  plugins: [],
}

