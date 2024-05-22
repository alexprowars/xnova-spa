import useStore from '~/store'
import { defineNuxtRouteMiddleware, showError, navigateTo } from '#imports'
import { useApiGet } from '~/composables/useApi';

export default defineNuxtRouteMiddleware(async(to, from) => {
	try {
		const store = useStore();

		if (store.initialized) {
			return;
		}

		const data = await useApiGet(to.path, {
			initial: 'Y'
		});

		if (data['redirect'] && data['redirect'].length > 0) {
			return navigateTo(data.redirect);
		}

		for (let key in data) {
			if (data.hasOwnProperty(key))
				store[key] = data[key];
		}

		if (data['route'] && data['route']['controller'] === 'error') {
			new Error('Страница не найдена');
		}

		store.initialized = true;
	} catch(e) {
		return showError(e);
	}
});