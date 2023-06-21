module.exports = {
	content: [
		'./src/app/**/*.{js,ts,jsx,tsx}',
		'./src/pages/**/*.{js,ts,jsx,tsx}', // Backwards compatibility with Pages Router
		'./src/components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			gridTemplateColumns: {
				playlistTitles: 'repeat(auto-fit, 24ch)',
			},
		},
	},
	plugins: [],
};
