import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  theme: {
    extend: {
      colors: {
        brand: {
          900: '#12316E',
        },
        gray: {
          50: '#F7FAFC',
          400: '#A0AEC0',
          500: '#718096',
          600: '#4A5568',
          700: '#2D3748',
        },
        red: {
          100: '#FED7D7',
          500: '#E53E3E',
          600: '#C53030',
        },
      },
    },
  },
  extract: {
    include: ['src/**/*.{html,jsx,tsx}'],
    exclude: ['node_modules', '.git'],
  },
})
