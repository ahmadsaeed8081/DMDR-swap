/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'tw-',
  content: [ "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'Sora': ['"Sora"', 'sans-serif'],
        'poppins': ['"Poppins"', 'sans-serif'],
      },
      backgroundImage:{
        Hero:"url('assets/images/home.png')",
        HeroForm:"url('assets/images/hero_form.png')", 
        'button-gradient': 'linear-gradient(90deg, #49C6CB 0%, #161616 100%)',
        'gradient': 'linear-gradient(90.37deg, rgba(255, 255, 255, 0.52) 10.97%, rgba(243, 243, 243, 0.29) 100%)'
        
      
      },
      borderImageSource: {
        'gradient': 'linear-gradient(86.91deg, #77D9FF 8.72%, #3091EE 94.71%)',
      },
      borderWidth: {
        'custom': '2.14px',
      },
    },
  },
  plugins: [],
}

