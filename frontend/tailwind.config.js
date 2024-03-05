/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';
import tailwindcssForms from '@tailwindcss/forms';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  safelist: [
    'badge-gray',
    'badge-red',
    'badge-yellow',
    'badge-green',
    'badge-blue',
    'badge-indigo',
    'badge-purple',
    'badge-pink',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [tailwindcssForms],
};
