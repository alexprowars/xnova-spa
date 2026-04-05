import { defineNuxtRouteMiddleware, showError } from '#imports';
import useStore from '~/store';

export default defineNuxtRouteMiddleware(() => {
	const store = useStore();

	if (store.user?.vacation !== null) {
		return showError({
			data: {
				error: {
					message: 'Нет доступа! Включен режим отпуска',
				}
			}
		});
	}
});