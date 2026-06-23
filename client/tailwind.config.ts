import { defineConfig } from 'tailwindcss/tailwind-config'

export default defineConfig({
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF6B35',
        secondary: '#004E89',
        accent: '#F7931E',
        dark: '#1A1A1A',
        light: '#F5F5F5',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
})
