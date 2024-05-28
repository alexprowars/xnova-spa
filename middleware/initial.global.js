import useStore from '~/store';
import { defineNuxtRouteMiddleware, showError } from '#imports';

let interval;

export default defineNuxtRouteMiddleware(async(to, from) => {
	const store = useStore();

	if (store.initialized) {
		return;
	}

	try {
		await store.loadState();

		store.initialized = true;
	} catch(e) {
		return showError(e);
	}

	if (!interval && store.isAuthorized) {
		interval = setInterval(async () => {
			await store.loadState()
		}, 30000);
	} else {
		clearInterval(interval);
	}
});