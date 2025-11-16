import { defineNuxtRouteMiddleware, navigateTo } from '#imports';
import useStore from '~/store';

export default defineNuxtRouteMiddleware((to) => {
	const store = useStore();

	if (to.path === '/' && store.user !== null) {
		return navigateTo('/overview');
	}

	if (store.user && (!store.user['race'] || !store.user['avatar']) && ['state', 'infos', 'content', 'start', 'logout'].indexOf(to.path.split('/')[1] || '') === -1) {
		return navigateTo('/start');
	}
})