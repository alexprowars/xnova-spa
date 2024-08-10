<template>
	<div class="page-building page-building-tech">
		<div class="block">
			<div class="title">Исследования</div>
			<div class="content page-building-items">
				<div class="row">
					<TechRow v-for="item in items" :key="item['id']" :item="item"/>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import TechRow from '~/components/Page/Buildings/TechRow.vue'
	import { definePageMeta, showError, useAsyncData, useHead, useRoute } from '#imports';
	import useStore from '~/store';

	definePageMeta({
		middleware: ['auth'],
	});

	useHead({
		title: 'Исследования',
	});

	const store = useStore();

	const { data: items, error } = await useAsyncData('page-research',
		async () => await store.loadPage(),
		{ watch: [() => useRoute().query] }
	);

	if (error.value) {
		throw showError(error.value);
	}
</script>