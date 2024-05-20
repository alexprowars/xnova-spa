import { defineStore } from 'pinia';
import { reformat } from '~/utils/chat';
import { useApiGet, useApiPost } from '~/composables/useApi';

export const useChatStore = defineStore('chat', {
	state: () => ({
		messages: [],
		unread: 0,
	}),
	getters: {
		sortedMessages: state => {
			return state.messages.sort((a , b) => {
				return a['time'] < b['time'] ? -1 : 1
			})
		}
	},
	actions: {
		async sendMessage (message) {
			while (message.indexOf('\'') >= 0)
				message = message.replace('\'', '`')

			await useApiPost('/chat/send', {
				message,
			})
			.then(({ page }) => {
				this.addMessage(page.message);
				this.incrementUnread();
			})
		},
		async loadMessages () {
			await useApiGet('/chat/last')
				.then(({ page }) => {
					page.messages.forEach((message) => {
						this.addMessage(message)
					})

					this.clearUnread()
				})
		},
		clear () {
			this.setMessages([]);
			this.clearUnread();
		},
		addMessage (message) {
			this.messages.push(reformat(message));
			this.unread += 1;
		},
		setMessages (messages) {
			this.messages = messages.map((message) => reformat(message));
		},
		clearUnread () {
			this.unread = 0;
		},
		incrementUnread () {
			this.unread += 1;
		}
	}
});

export default useChatStore;