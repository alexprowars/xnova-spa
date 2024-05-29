<template>
	<div class="page-messages-write">
		<MessageForm :id="page['id']" :to="page['to']" :message="page['text']"/>
	</div>
</template>

<script setup>
	import MessageForm from '~/components/Page/Messages/Form.vue'
	import { definePageMeta, showError, useAsyncData, useHead, useRoute } from '#imports';
	import useStore from '~/store';

	definePageMeta({
		middleware: ['auth'],
		view: {
			resources: false,
		}
	});

	useHead({
		title: 'Отправка сообщения',
	});

	const { data: page, error } = await useAsyncData(async () => {
		return await useStore().loadPage();
	}, { watch: [() => useRoute().query] });

	if (error.value) {
		throw showError(error.value);
	}
</script>