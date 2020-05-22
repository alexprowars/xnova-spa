export default {
	async sendMessage ({ commit }, message) {
		while (message.indexOf('\'') >= 0)
			message = message.replace('\'', '`')

		await this.$post('/chat/send', {
			message,
		})
		.then(({ page }) => {
			commit('addMessage', page.message)
			commit('incrementUnread')
		})
	},
	async loadMessages ({ commit })
	{
		await this.$get('/chat/last')
			.then(({ page }) => {
				page.messages.forEach((message) => {
					commit('addMessage', message)
				})

				commit('clearUnread')
			})
	},
	clear ({ commit }) {
		commit('setMessages', [])
		commit('clearUnread')
	},
}