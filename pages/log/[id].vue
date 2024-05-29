<template>
	<div id="report" class="table-responsive" v-html="page['raport']"></div>
</template>

<script setup>
	import { definePageMeta, showError, useAsyncData, useHead, useRoute } from '#imports';
	import useStore from '~/store';

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
		return await useStore().loadPage();
	}, { watch: [() => useRoute().query] });

	if (error.value) {
		throw showError(error.value);
	}
</script>