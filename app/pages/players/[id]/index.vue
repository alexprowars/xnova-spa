<template>
	<PlayerInfo :item="item"/>
</template>

<script setup>
	import PlayerInfo from '~/components/Page/Players/Info.vue';
	import { showError, useAsyncData, useHead, definePageMeta, useRoute, useApiGet } from '#imports';

	useHead({
		title: 'Информация о игроке',
	});

	definePageMeta({
		view: {
			resources: false,
		}
	});

	const { data: item, error } = await useAsyncData(async () => {
		return await useApiGet('/players/' + useRoute().params.id);
	});

	if (error.value) {
		throw showError(error.value);
	}
</script>