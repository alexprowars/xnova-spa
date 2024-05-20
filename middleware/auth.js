import { defineNuxtRouteMiddleware, navigateTo } from '#imports';
import useStore from '~/store';

export default defineNuxtRouteMiddleware(() => {
	const store = useStore();

	if (store.user === null) {
		return navigateTo('/');
	}
});