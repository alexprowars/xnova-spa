import { Emitter } from 'mitt';

export type Events = {
	logout: void;
	login: void;
	stateUpdated: void;
};

declare module '@vue/runtime-core' {
	interface ComponentCustomProperties {
		$morph(value: string, ...titles: any[]): string
		$formatNumber(value: number): string
		$formatDate(value: number, format: string): string
		$formatTime(value: number, separator: string = '', full: boolean = false): string
		$events: Emitter<Events>
	}
}

declare module '#app' {
	interface NuxtApp {
		$morph(value: string, ...titles: any[]): string
		$formatNumber(value: number): string
		$formatDate(value: number, format: string): string
		$formatTime(value: number, separator: string = '', full: boolean = false): string
		$events: Emitter<Events>
	}
}

declare global {
	interface Window {
		__NUXT__: any
		dataLayer: any
	}
}

export {}