<template>
	<div></div>
</template>

<script setup>
	import { definePageMeta, showError, useAsyncData } from '#imports';
	import useStore from '~/store';

	definePageMeta({
		view: {
			header: false,
			footer: false,
			planets: false,
			menu: false,
			resources: false,
			chat: false,
		}
	});

	const { error } = await useAsyncData(async () => {
		return await useStore().loadPage();
	});

	if (error.value) {
		throw showError(error.value);
	}
</script>