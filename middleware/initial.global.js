import useStore from '~/store';
import { defineNuxtRouteMiddleware, showError } from '#imports';

export default defineNuxtRouteMiddleware(async(to, from) => {
	try {
		const store = useStore();

		if (store.initialized) {
			return;
		}

		await store.loadState();

		setInterval(async () => {
			await store.loadState()
		}, 30000);

		store.initialized = true;
	} catch(e) {
		return showError(e);
	}
});