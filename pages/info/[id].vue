<template>
	<InfoContent :page="page"/>
</template>

<script setup>
	import InfoContent from '~/components/Page/Info/Content.vue';
	import { definePageMeta, showError, useAsyncData, useHead, useI18n, useRoute } from '#imports';
	import useStore from '~/store';

	definePageMeta({
		middleware: ['auth'],
		view: {
			resources: false,
		}
	});

	const { t } = useI18n();

	const { data: page, error } = await useAsyncData(async () => {
		return await useStore().loadPage();
	}, { watch: [() => useRoute().query] });

	if (error.value) {
		throw showError(error.value);
	}

	useHead({
		title: t('tech.' + page.value['i']),
	});
</script>