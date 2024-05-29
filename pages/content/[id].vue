<template>
	<div v-html="page.html"></div>
</template>

<script setup>
	import { definePageMeta, showError, useAsyncData, useHead, useRoute } from '#imports';
	import useStore from '~/store';

	definePageMeta({
		middleware: ['auth'],
		view: {
			resources: false,
		}
	});

	const store = useStore();

	const props = defineProps({
		popup: {
			type: Object
		}
	})

	const { data: page, error } = await useAsyncData(async () => {
		return await store.loadPage();
	}, { watch: [() => useRoute().query] });

	if (error.value) {
		throw showError(error.value);
	}

	if (props.popup !== undefined) {
		page.value = props.popup;
	}

	useHead({
		title: page.value?.title,
	});
</script>