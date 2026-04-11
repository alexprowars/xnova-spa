import { defineStore } from 'pinia';
import { reformat } from '~/utils/chat';
import { useApiGet, useApiPost } from '~/composables/useApi';

export const useChatStore = defineStore('chat', {
	state: () => ({
		messages: [] as any[],
		unread: 0 as number,
	}),
	getters: {
		sortedMessages: state => {
			return state.messages.sort((a, b) => a['time'] < b['time'] ? -1 : 1);
		}
	},
	actions: {
		async sendMessage (message: string) {
			while (message.indexOf('\'') >= 0) {
				message = message.replace('\'', '`');
			}

			await useApiPost('/chat', { message });
		},
		async loadMessages () {
			if (this.messages.length) {
				return;
			}

			this.messages = await useApiGet('/chat/last')
				.then((messages) => messages);

			this.clearUnread();
		},
		clear () {
			this.setMessages([]);
			this.clearUnread();
		},
		addMessage (message: any) {
			this.messages.push(reformat(message));
			this.unread += 1;
		},
		setMessages (messages: any) {
			this.messages = messages.map((message: any) => reformat(message));
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