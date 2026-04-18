import useStore from '~/store/index.ts'
import { defineNuxtRouteMiddleware, useNuxtApp, callOnce, useRequestURL } from '#imports'
import dayjs from 'dayjs';

export default defineNuxtRouteMiddleware(async () => {
	const nuxtApp = useNuxtApp();

	await callOnce(async () => {
		const requestUrl = useRequestURL();

		let referral = '';

		if (requestUrl.pathname === '/') {
			referral = requestUrl.search.slice(1);

			if (!/^\d+$/.test(referral)) {
				referral = '';
			}
		}

		const store = useStore();
		await store.loadState(referral);

		nuxtApp.$i18n.setLocale(store.settings.language);
		dayjs.locale(store.settings.language);
	});
});