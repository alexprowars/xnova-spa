import { defineNuxtRouteMiddleware, navigateTo } from '#imports';
import useStore from '~/store';

export default defineNuxtRouteMiddleware((to) => {
	if (to.path === '/' && useStore().user !== null) {
		return navigateTo('/overview/');
	}
})