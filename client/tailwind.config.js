/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      lineClamp: {
        10:'10',
     },
     colors:{
      'l-purple':'#cdb4db',
      'l-pink':'#ffc8dd',
      'pink':'#ffafcc',
      'l-cyan':'#bde0fe',
      'cyan':'#a2d2ff',
      'black':'#080708',
      'l-black':'#0a100d',
      'white':'#fdfdff'
    
        },
    },
  
   
  },
  plugins: [],
}