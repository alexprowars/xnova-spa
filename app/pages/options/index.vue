<template>
	<div>
		<VacationTab v-if="page['vacation']" :data="page"/>
		<OptionsTab v-else :data="page"/>
	</div>
</template>

<script setup>
	import { definePageMeta, showError, useApiGet, useAsyncData, useHead, useRoute } from '#imports';
	import VacationTab from '~/components/Page/Options/VacationTab.vue';
	import OptionsTab from '~/components/Page/Options/OptionsTab.vue';

	definePageMeta({
		middleware: ['auth'],
		view: {
			resources: false,
		}
	});

	useHead({
		title: 'Hacтpoйки',
	});

	const { data: page, error } = await useAsyncData(
		async () => await useApiGet('/options'),
		{ watch: [() => useRoute().query] }
	);

	if (error.value) {
		throw showError(error.value);
	}
</script>