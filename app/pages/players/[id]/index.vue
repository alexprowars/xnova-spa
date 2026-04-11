<template>
	<PlayerInfo :item="item"/>
</template>

<script setup>
	import PlayerInfo from '~/components/Page/Players/Info.vue';
	import { showError, useAsyncData, useHead, definePageMeta, useRoute, useApiGet, useI18n } from '#imports';

	definePageMeta({
		view: {
			resources: false,
		}
	});

	const { t } = useI18n();

	useHead({
		title: t('pages.players.meta_info_title'),
	});

	const { data: item, error } = await useAsyncData(async () => {
		return await useApiGet('/players/' + useRoute().params.id);
	});

	if (error.value) {
		throw showError({ data: { error: error.value } });
	}
</script>