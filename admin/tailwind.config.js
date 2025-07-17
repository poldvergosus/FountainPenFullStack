/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        bg: 'var(--color-bg)',
        textbg: 'var(--color-text-bg)',
        accent: 'var(--color-accent)',
        brand: '#A2A9B4',
      },},
  },
  plugins: [],
}