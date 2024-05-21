declare module '@vue/runtime-core' {
	interface ComponentCustomProperties {
		$morph(value: string, ...titles: any[]): string
		$upper(value: string): string
		$lower(value: string): string
		$number(value: number): string
		$date(value: number, format: string): string
		$time(value: number, separator: string = '', full: boolean = false): string
	}
}

declare module '#app' {
	interface NuxtApp {
		$morph(value: string, ...titles: any[]): string
		$upper(value: string): string
		$lower(value: string): string
		$number(value: number): string
		$date(value: number, format: string): string
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