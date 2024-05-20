import Echo from 'laravel-echo'
import io from 'socket.io-client'

export default ({ $axios, store }, inject) =>
{
	const echo = new Echo({
		broadcaster: 'socket.io',
		client: io,
		host: window.location.protocol + '//' + window.location.hostname,
		namespace: 'Xnova.Events',
		withoutInterceptors: true,
	})

	$axios.interceptors.request.use((config) => {
		if (echo.socketId()) {
			config.headers['X-Socket-Id'] = echo.socketId()
		}

		return config
	})

	if (store.getters.isAuthorized) {
		echo.channel('chat')
			.listen('ChatMessage', ({ message }) => {
				store.commit('chat/addMessage', message)
			})

		echo.private('game.' + store.state.user.id)
			.listen('ChatPrivateMessage', ({ message }) => {
				store.commit('chat/addMessage', message)
			})
	}

	inject('echo', echo)
}