import Echo from 'laravel-echo'
import io from 'socket.io-client'
import { defineNuxtPlugin } from '#imports';
import useStore from '~/store';
import useChatStore from '~/store/chat';

export default defineNuxtPlugin((nuxtApp) => {
	return;
	const echo = new Echo({
		broadcaster: 'socket.io',
		client: io,
		host: window.location.protocol + '//' + window.location.hostname,
		namespace: 'Xnova.Events',
		withoutInterceptors: true,
	})

	/*$axios.interceptors.request.use((config) => {
		if (echo.socketId()) {
			config.headers['X-Socket-Id'] = echo.socketId()
		}

		return config
	})*/

	const store = useStore();

	if (store.isAuthorized) {
		const chatStore = useChatStore();

		echo.channel('chat')
			.listen('ChatMessage', ({ message }) => {
				chatStore.addMessage(message);
			});

		echo.private('game.' + store.user.id)
			.listen('ChatPrivateMessage', ({ message }) => {
				chatStore.addMessage(message);
			});
	}

	nuxtApp.provide('echo', echo);
});