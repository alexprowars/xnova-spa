import useStore from '~/store'
import { defineNuxtRouteMiddleware, showError } from '#imports'
import { useApiGet } from '~/composables/useApi';

export default defineNuxtRouteMiddleware(async(to, from) => {
	try {
		const data = await useApiGet(to.path, {
			initial: 'Y'
		});

		if (data['redirect'] && data['redirect'].length > 0) {
			return context.redirect(data.redirect);
		}

		const store = useStore();

		for (let key in data) {
			if (data.hasOwnProperty(key))
				store[key] = data[key];
		}

		if (data['route'] && data['route']['controller'] === 'error') {
			new Error('Страница не найдена');
		}
	} catch(e) {
		return showError(e);
	}
});