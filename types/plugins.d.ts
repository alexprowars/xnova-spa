declare global {
	interface Window {
		__NUXT__: any
		dataLayer: any
	}
}

export {}