import useStore from '~/store/index.ts'
import { defineNuxtRouteMiddleware, useNuxtApp } from '#imports'
import dayjs from 'dayjs';

export default defineNuxtRouteMiddleware(async(to, from) => {
	const store = useStore();
	await store.loadState();

	useNuxtApp().$i18n.setLocale(store.settings.language);
	dayjs.locale(store.settings.language);
});