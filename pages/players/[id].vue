<template>
	<PlayerInfo :page="page"/>
</template>

<script setup>
	import PlayerInfo from '~/components/Page/Players/Info.vue';
	import { showError, useAsyncData, useHead, definePageMeta, useRoute } from '#imports';
	import useStore from '~/store';

	useHead({
		title: 'Информация о игроке',
	});

	definePageMeta({
		view: {
			resources: false,
		}
	});

	const { data: page, error } = await useAsyncData(async () => {
		return await useStore().loadPage();
	}, { watch: [() => useRoute().query] });

	if (error.value) {
		throw showError(error.value);
	}
</script>