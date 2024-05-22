<template>
	<div v-html="page.html"></div>
</template>

<script setup>
	import { definePageMeta, showError, useAsyncData, useRoute } from '#imports';
	import useStore from '~/store';
	import { watch } from 'vue';

	definePageMeta({
		middleware: ['auth'],
	});

	const route = useRoute();
	const store = useStore();

	const props = defineProps({
		popup: {
			type: Object
		}
	})

	const { data: page, error, refresh } = await useAsyncData(async () => {
		return await store.loadPage();
	});

	watch(() => route.query, () => refresh());

	if (error.value) {
		throw showError(error.value);
	}

	if (props.popup !== undefined) {
		page.value = props.popup;
	}
</script>