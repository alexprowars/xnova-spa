import useStore from '~/store/index.ts'
import { defineNuxtRouteMiddleware, useNuxtApp, callOnce } from '#imports'
import dayjs from 'dayjs';

export default defineNuxtRouteMiddleware(async () => {
	const nuxtApp = useNuxtApp();

	await callOnce(async () => {
		const store = useStore();
		await store.loadState();

		nuxtApp.$i18n.setLocale(store.settings.language);
		dayjs.locale(store.settings.language);
	});
});