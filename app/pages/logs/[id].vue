<template>
	<div id="report" class="table-responsive" v-html="page['raport']"></div>
</template>

<script setup>
	import { definePageMeta, showError, useApiGet, useAsyncData, useHead, useRoute, useI18n } from '#imports';

	const { t } = useI18n();

	definePageMeta({
		middleware: ['auth'],
		layout: 'empty',
		view: {
			resources: false,
		}
	});

	useHead({
		title: t('pages.logs.view.page_title'),
	});

	const { data: page, error } = await useAsyncData(async () => {
		return await useApiGet('/logs/' + useRoute().params.id);
	}, { watch: [() => useRoute().query] });

	if (error.value) {
		throw showError(error.value);
	}
</script>