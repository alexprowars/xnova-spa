import Echo from 'laravel-echo'
import Pusher from 'pusher-js';
import { defineNuxtPlugin, useRuntimeConfig } from '#imports';
import useStore from '~/store';
import useChatStore from '~/store/chat';

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
		namespace: 'Xnova.Events',
	});

	const store = useStore();

	if (store.isAuthorized) {
		const chatStore = useChatStore();

		echo.channel('chat')
			.listen('ChatMessage', ({ message }) => {
				chatStore.addMessage(message);
			});

		echo.private('user.' + store.user.id)
			.listen('ChatPrivateMessage', ({ message }) => {
				chatStore.addMessage(message);
			});
	}

	nuxtApp.provide('echo', echo);
});