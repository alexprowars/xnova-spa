<template>
	<PlayerInfo :page="page"/>
</template>

<script setup>
	import PlayerInfo from '~/components/Page/Players/Info.vue';
	import { showError, useAsyncData, useHead, useRoute, definePageMeta } from '#imports';
	import useStore from '~/store';
	import { watch } from 'vue';

	useHead({
		title: 'Информация о игроке',
	});

	definePageMeta({
		view: {
			resources: false,
		}
	});

	const route = useRoute();
	const store = useStore();

	const { data: page, error, refresh } = await useAsyncData(async () => {
		return await store.loadPage();
	});

	watch(() => route.query, () => refresh());

	if (error.value) {
		throw showError(error.value);
	}
</script>