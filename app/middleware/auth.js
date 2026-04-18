import { defineNuxtRouteMiddleware, navigateTo, useRequestURL } from '#imports';
import useStore from '~/store';

export default defineNuxtRouteMiddleware((to) => {
	const store = useStore();

	if (store.user === null) {
		return navigateTo('/');
	}

	if ((!store.user.race || !store.user.sex) && !to.path.startsWith('/start')) {
		return navigateTo('/start');
	}
});