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

	const route = useRoute();

	const { data: page, error } = await useAsyncData('content-' + route.params.id, async () => {
		return await useApiGet('/content/' + route.params.id);
	});

	if (error.value) {
		throw showError({ data: { error: error.value } });
	}

	useHead({
		title: page.value?.title,
	});
</script>