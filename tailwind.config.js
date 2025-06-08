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
		"./components/**/*.{js,vue,ts}",
		"./layouts/**/*.vue",
		"./pages/**/*.vue",
		"./plugins/**/*.{js,ts}",
		"./app.vue",
		"./error.vue",
	],
	darkMode: 'class',
	plugins: [],
}