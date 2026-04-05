<template>
	<InfoContent :item="item"/>
</template>

<script setup>
	import InfoContent from '~/components/Page/Info/Content.vue';
	import { definePageMeta, showError, useApiGet, useAsyncData, useHead, useRoute } from '#imports';

	definePageMeta({
		middleware: ['auth'],
		view: {
			resources: false,
		}
	});

	const { data: item, error } = await useAsyncData(async () => {
		return await useApiGet('/info/' + useRoute().params.id);
	});

	if (error.value) {
		throw showError(error.value);
	}

	useHead({
		title: item.value['name'],
	});
</script>