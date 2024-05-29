<template>
	<div class="page-building page-building-tech">
		<div class="block">
			<div class="title">Исследования</div>
			<div class="content page-building-items">
				<div class="row">
					<TechRow v-for="item in page.items" :key="item['id']" :item="item"/>
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

	const { data: page, error } = await useAsyncData('page-research', async () => {
		return await useStore().loadPage();
	}, { watch: [() => useRoute().query] });

	if (error.value) {
		throw showError(error.value);
	}
</script>