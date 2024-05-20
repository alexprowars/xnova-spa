import { defineNuxtPlugin } from '#imports';
import useStore from '~/store';
import { createVfm } from 'vue-final-modal';

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.use(createVfm());

	const store = useStore();

	nuxtApp.provide('state', function (key) {
		return store[key];
	});

	nuxtApp.vueApp.config.errorHandler = (error) => {
		console.error(error);
	}
});