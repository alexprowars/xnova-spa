import { defineNuxtPlugin } from '#imports';
import { number, morph, time } from '~/utils/format';

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.provide('morph', (value, ...titles) => {
		return morph(value, titles);
	});

	nuxtApp.provide('number', number);
	nuxtApp.provide('time', time);
})