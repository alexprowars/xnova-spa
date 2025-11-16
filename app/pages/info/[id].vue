<template>
	<InfoContent :page="page"/>
</template>

<script setup>
	import InfoContent from '~/components/Page/Info/Content.vue';
	import { definePageMeta, showError, useApiGet, useAsyncData, useHead, useI18n, useRoute } from '#imports';

	definePageMeta({
		middleware: ['auth'],
		view: {
			resources: false,
		}
	});

	const { t } = useI18n();

	const { data: page, error } = await useAsyncData(async () => {
		return await useApiGet('/info/' + useRoute().params.id);
	}, { watch: [() => useRoute().query] });

	if (error.value) {
		throw showError(error.value);
	}

	useHead({
		title: t('tech.' + page.value['i']),
	});
</script>