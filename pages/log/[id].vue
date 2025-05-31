<template>
	<div id="report" class="table-responsive" v-html="page['raport']"></div>
</template>

<script setup>
	import { definePageMeta, showError, useApiGet, useAsyncData, useHead, useRoute } from '#imports';

	definePageMeta({
		middleware: ['auth'],
		layout: 'empty',
		view: {
			resources: false,
		}
	});

	useHead({
		title: 'Боевой доклад',
	});

	const { data: page, error } = await useAsyncData(async () => {
		return await useApiGet('/log/' + useRoute().params.id);
	}, { watch: [() => useRoute().query] });

	if (error.value) {
		throw showError(error.value);
	}
</script>