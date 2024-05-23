import { defineNuxtPlugin } from '#imports';
import { number, morph, date, time } from '~/utils/format';
import useStore from '~/store';

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.provide('morph', (value, ...titles) => {
		return morph(value, titles);
	});

	nuxtApp.provide('upper', (value) => {
		return value.toUpperCase();
	});

	nuxtApp.provide('lower', (value) => {
		return value.toLowerCase();
	});

	nuxtApp.provide('number', number);

	nuxtApp.provide('date', (value, format) => {
		const store = useStore();

		value += (new Date()).getTimezoneOffset() * 60;

		if (store['stats'] && store['stats']['timezone']) {
			value += store['stats']['timezone'];
		}

		if (store['user'] && store['user']?.['options']['timezone']) {
			value += store['user']['timezone'] * 1800;
		}

		return date(format, value);
	});

	nuxtApp.provide('time', time);
})