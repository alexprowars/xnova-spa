<template>
	<InfoContent :page="page"/>
</template>

<script setup>
	import InfoContent from '~/components/Page/Info/Content.vue';
	import { definePageMeta, showError, useAsyncData, useHead, useRoute, useI18n } from '#imports';
	import useStore from '~/store';
	import { watch } from 'vue';

	definePageMeta({
		middleware: ['auth'],
		view: {
			resources: false,
		}
	});

	const route = useRoute();
	const { t } = useI18n();

	const { data: page, error, refresh } = await useAsyncData(async () => {
		return await useStore().loadPage();
	});

	watch(() => route.query, () => refresh());

	if (error.value) {
		throw showError(error.value);
	}

	useHead({
		title: t('tech.' + page.value['i']),
	});
</script>