/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        noche:      '#0D1B2A',
        nocheAlt:   '#13243A',
        marfil:     '#F4F1E6',
        pergamino:  '#EAE6DC',
        dorado:     '#C6A85A',
        doradoAlt:  '#A88B45',
        vino:       '#7A1E2C',
        vinoAlt:    '#5C1620',
        carbon:     '#1A1A1A'
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans:  ['"Poppins"', 'system-ui', 'sans-serif']
      },
      letterSpacing: {
        editorial: '0.18em'
      }
    }
  },
  plugins: []
}
