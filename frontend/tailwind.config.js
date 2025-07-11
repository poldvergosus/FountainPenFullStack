export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
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
      },
      fontFamily: {
        literata: ['Literata', 'serif'],
      },
      fontSize: {
        h1: 'var(--font-size-h1)',
        regular: 'var(--font-size-regular)',
      },
      lineHeight: {
        title: 'var(--line-height-title)',
      },

      keyframes: {
        slide: {
           '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      animation: {
        slide: 'slide 30s linear infinite',
      },
    },
  },
  plugins: [],
}
