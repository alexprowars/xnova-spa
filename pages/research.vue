<template>
	<div class="page-building page-building-tech">
		<div class="block">
			<div class="title">Исследования</div>
			<div class="content page-building-items">
				<div class="row">
					<TechRow v-for="(item, i) in page.items" :key="i" :item="item"/>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import TechRow from '~/components/Page/Buildings/TechRow.vue'
	import { definePageMeta, showError, useAsyncData, useRoute } from '#imports';
	import { watch } from 'vue';
	import useStore from '~/store';

	definePageMeta({
		middleware: ['auth'],
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