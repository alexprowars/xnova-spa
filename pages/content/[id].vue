<template>
	<div v-html="page.html"></div>
</template>

<script setup>
	import { definePageMeta, showError, useApiGet, useAsyncData, useHead, useRoute } from '#imports';

	definePageMeta({
		view: {
			resources: false,
		}
	});

	const props = defineProps({
		popup: {
			type: Object
		}
	})

	const { data: page, error } = await useAsyncData(async () => {
		return await useApiGet('/content/' + useRoute().params.id);
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