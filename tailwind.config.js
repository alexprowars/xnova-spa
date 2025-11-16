export default {
	theme: {
		screens: {
			'sm': '480px',
			'md': '992px',
			'lg': '1200px',
			'xl': '1600px',
		},
		fontFamily: {
			sans: ['Verdana', 'Arial', 'sans-serif'],
		}
	},
	content: [
		"./app/components/**/*.{js,vue,ts}",
		"./app/layouts/**/*.vue",
		"./app/pages/**/*.vue",
		"./app/plugins/**/*.{js,ts}",
		"./app/app.vue",
		"./app/error.vue",
	],
	darkMode: 'class',
	plugins: [],
}