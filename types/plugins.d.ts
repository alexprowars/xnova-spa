declare module '@vue/runtime-core' {
	interface ComponentCustomProperties {
		$morph(value: string, ...titles: any[]): string
		$number(value: number): string
		$time(value: number, separator: string = '', full: boolean = false): string
	}
}

declare module '#app' {
	interface NuxtApp {
		$morph(value: string, ...titles: any[]): string
		$number(value: number): string
		$time(value: number, separator: string = '', full: boolean = false): string
	}
}

declare global {
	interface Window {
		__NUXT__: any
		dataLayer: any
	}
}

export {}