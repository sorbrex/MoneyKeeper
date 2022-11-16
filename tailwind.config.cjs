/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			rotate:{
				135: "135deg",
			},
		},
		colors: {
			transparent: "transparent",
			current: "currentColor",
			white: "#ffffff",
			pureblack: "#000000",
			black: "#1e1c1c",
			softblack: "#323232",
			pageGray: "#F3F4F6",
			contrastGreen: "#41BEA6",
			contrastRed: "#ff4545",
			contrastBlue: "#0F1AF2",
			darkPastelBlue: "#1B378C",
			faceBlue: "#1877F2",
			linkBlue: "#007FFF",
			rose: "#DEA4FF",
		},
	},
	plugins: [],
}
