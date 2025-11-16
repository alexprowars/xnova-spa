import { defineNuxtPlugin } from '#imports';
import { number, morph, time } from '~/utils/format';
import dayjs from 'dayjs';

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.provide('morph', (value, ...titles) => {
		return morph(value, titles);
	});

	nuxtApp.provide('formatDate', (value, format) => {
		return dayjs(value).tz().format(format)
	});

	nuxtApp.provide('formatNumber', number);
	nuxtApp.provide('formatTime', time);
})