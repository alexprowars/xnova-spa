import mitt from 'mitt';
import { defineNuxtPlugin, navigateTo } from '#imports';
import useStore from '~/store';

export default defineNuxtPlugin((nuxtApp) => {
	const events = mitt();
	const store = useStore();

	events.on('login', () => {
		store.setTimezone();
	});

	events.on('logout', () => {
		store.setTimezone();
	});

	nuxtApp.provide('events', events);
});