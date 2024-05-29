<template>
	<div v-if="page" v-html="page['raport']"></div>
</template>

<script setup>
	import { definePageMeta, showError, useAsyncData, useHead, useRoute } from '#imports';
	import useStore from '~/store';

	definePageMeta({
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

	if (useStore().user !== null && !page.value) {
		definePageMeta({
			layout: 'default',
		});
	}
</script>