export default {
	messages: state => {
		return state.messages.sort((a , b) => {
			return a['time'] < b['time'] ? -1 : 1
		})
	}
}