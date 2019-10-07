<template>
	<div class="page-messages-write">
		<MessageForm :id="page['id']" :to="page['to']" :message="page['text']"/>
	</div>
</template>

<script>
	import MessageForm from '~/components/page/messages/form.vue'

	export default {
		name: "messages-write",
		components: {
			MessageForm,
		},
		async asyncData ({ store }) {
			return await store.dispatch('loadPage')
		},
		watchQuery: true,
		middleware: 'auth',
	}
</script>