import { reformat } from '~/utils/chat'

export default {
	addMessage (state, message) {
		state.messages.push(reformat(message))
		state.unread++
	},
	setMessages (state, messages) {
		state.messages = messages.map((message) => reformat(message))
	},
	clearUnread (state) {
		state.unread = 0
	},
	incrementUnread (state) {
		state.unread++
	}
}