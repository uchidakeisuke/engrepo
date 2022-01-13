module.exports = {
	purge: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
		'./public/**/*',
	],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			backgroundImage: theme => ({
				japan: "url('../public/japan.jpg')",
			}),
			width: {
				800: '800px',
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
