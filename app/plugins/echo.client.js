import Echo from 'laravel-echo'
import Pusher from 'pusher-js';
import { defineNuxtPlugin, useRuntimeConfig } from '#imports';

export default defineNuxtPlugin((nuxtApp) => {
	const runtimeConfig = useRuntimeConfig();

	if (typeof runtimeConfig.public.reverbAppKey === 'undefined' || !runtimeConfig.public.reverbAppKey) {
		return;
	}

	window.Pusher = Pusher;

	const echo = new Echo({
		broadcaster: 'reverb',
		key: runtimeConfig.public.reverbAppKey,
		wsHost: runtimeConfig.public.reverbHost,
		wsPort: runtimeConfig.public.reverbPort ?? 80,
		wssPort: runtimeConfig.public.reverbPort ?? 443,
		forceTLS: (runtimeConfig.public.reverbScheme ?? 'https') === 'https',
		enabledTransports: ['ws', 'wss'],
		namespace: 'App.Events',
	});

	nuxtApp.provide('echo', echo);
});