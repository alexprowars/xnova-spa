<template>
	<div class="page-messages-write">
		<MessageForm :id="page['id']" :to="page['to']" :message="page['text']"/>
	</div>
</template>

<script>
	import MessageForm from '~/components/page/messages/form.vue'
	import { defineNuxtComponent } from '#imports';
	import useStore from '~/store';

	export default defineNuxtComponent({
		name: "messages-write",
		components: {
			MessageForm,
		},
		async asyncData () {
			await useStore().loadPage();

			return {}
		},
		watchQuery: true,
		middleware: 'auth',
	})
</script>