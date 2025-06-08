<template>
	<div class="page-building page-building-tech">
		<div class="block">
			<div class="title">Исследования</div>
			<div class="content page-building-items">
				<div class="grid grid-cols-1 sm:grid-cols-2 gap-1">
					<TechRow v-for="item in items" :key="item['id']" :item="item"/>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import TechRow from '~/components/Page/Buildings/TechRow.vue'
	import { definePageMeta, showError, useApiGet, useAsyncData, useHead, useRoute } from '#imports';
	import useStore from '~/store';

	definePageMeta({
		middleware: ['auth'],
	});

	useHead({
		title: 'Исследования',
	});

	const store = useStore();

	const { data: items, error } = await useAsyncData(
		async () => await Promise.all([
			useApiGet('/research'),
			store.loadState()
		]).then(([result]) => result),
		{ watch: [() => useRoute().query] }
	);

	if (error.value) {
		throw showError(error.value);
	}
</script>