import { defineNuxtPlugin } from '#imports';
import { createVfm } from 'vue-final-modal';
import FloatingVue from 'floating-vue';
import Vue3TouchEvents from 'vue3-touch-events'

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.use(FloatingVue);
	nuxtApp.vueApp.use(Vue3TouchEvents, {
		touchHoldTolerance: 100,
	});

	nuxtApp.vueApp.use(createVfm());

	nuxtApp.vueApp.config.errorHandler = (error) => {
		console.error(error);
	}
});