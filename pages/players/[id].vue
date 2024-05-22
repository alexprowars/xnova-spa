<template>
	<PlayerInfo :page="page"/>
</template>

<script setup>
	import PlayerInfo from '~/components/Page/Players/Info.vue';
	import { showError, useAsyncData, useHead, useRoute } from '#imports';
	import useStore from '~/store';
	import { watch } from 'vue';

	useHead({
		title: 'Информация о игроке',
	});

	const route = useRoute();

	const { data: page, error, refresh } = await useAsyncData(async () => {
		return await useStore().loadPage();
	});

	watch(() => route.query, () => refresh());

	if (error.value) {
		throw showError(error.value);
	}
</script>