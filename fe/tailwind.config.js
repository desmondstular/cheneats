/** @type {import('tailwindcss').Config} */
export default {
  content: [
	  "./index.html",
	  "./src/**/*.{js,ts,jsx,tsx}",
	  'node_modules/preline/dist/*.js'
  ],
  theme: {
    extend: {
		colors: {
			'chen-blue': "#00b6ff"
		}
	},
  },
  plugins: [
	  require("daisyui"),
	  require('preline/plugin')
  ],
	daisyui: {
	  themes: [
		  "light",
		  "cupcake"
	  ]
	}
}

