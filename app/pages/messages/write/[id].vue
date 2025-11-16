<template>
	<div class="page-messages-write">
		<MessageForm :id="page['id']" :to="page['to']" :message="page['message']"/>
	</div>
</template>

<script setup>
	import MessageForm from '~/components/Page/Messages/Form.vue'
	import { definePageMeta, showError, useApiGet, useAsyncData, useHead, useRoute } from '#imports';

	definePageMeta({
		middleware: ['auth'],
		view: {
			resources: false,
		}
	});

	useHead({
		title: 'Отправка сообщения',
	});

	const route = useRoute();

	const { data: page, error } = await useAsyncData(
		async () =>  await useApiGet('/messages/write/' + route.params['id'], Object.assign({}, route.query)),
		{ watch: [() => useRoute().query] }
	);

	if (error.value) {
		throw showError(error.value);
	}
</script>