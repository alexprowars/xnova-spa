import { defineNuxtPlugin } from '#imports';
import { createVfm } from 'vue-final-modal';

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.use(createVfm());

	nuxtApp.vueApp.config.errorHandler = (error) => {
		console.error(error);
	}
});