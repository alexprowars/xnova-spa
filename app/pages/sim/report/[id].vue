<template>
	<div class="combar-report text-center">
		<div v-html="data['report']['html']"></div>
	</div>
</template>

<script setup>
	import { definePageMeta, showError, useAsyncData, useHead, useRoute, useApiPost } from '#imports';

	definePageMeta({
		layout: 'empty',
	});

	useHead({
		title: 'Симуляция',
	});

	const { data, error } = await useAsyncData(
		async () => await useApiPost('/sim/report/' + useRoute().params.id),
		{ watch: [() => useRoute().query] }
	);

	if (error.value) {
		throw showError(error.value);
	}
</script>