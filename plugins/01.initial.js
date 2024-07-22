import { defineNuxtPlugin, useAsyncData } from '#imports';
import useStore from '~/store/index.js';

export default defineNuxtPlugin(async (nuxtApp) => {
	await useAsyncData(() => {
		return useStore().loadState()
	});
});