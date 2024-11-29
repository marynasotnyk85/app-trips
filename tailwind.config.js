import withMT from "@material-tailwind/html/utils/withMT";
 
/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Montserrat', 'Helvetica Neue', 'Arial', 'sans-serif'],
        body: ['Montserrat', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      fontSize: {
        heading: '30px',
        body: '16px',
      },
      fontWeight: {
        heading: '700',
        body: '400',
      },
      colors: {
        textColor: '#2b265b',
        primaryBlue: '#3560ab',  
        secondaryBlue: '#00bcd6',
        secondaryGreen: '#46d28c',
        textPrimary: '#2b265b', // Colore testo principale
        textSecondary: '#666666', // Colore testo secondario
      },
    },
  },
  plugins: [],
});