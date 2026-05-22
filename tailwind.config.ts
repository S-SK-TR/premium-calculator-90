import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#1E293B',
        secondary: '#334155',
        accent: '#3B82F6',
        background: '#0F172A',
        text: '#F8FAFC'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      fontSize: {
        h1: '2.25rem',
        h2: '1.875rem',
        h3: '1.5rem',
        body: '1rem'
      }
    }
  },
  plugins: []
} satisfies Config