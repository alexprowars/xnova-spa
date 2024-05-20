<template>
	<div></div>
</template>

<script setup>
	import { showError, useAsyncData } from '#imports';
	import useStore from '~/store';

	const { data, error } = await useAsyncData(async () => {
		return await useStore().loadPage();
	});

	if (error.value) {
		throw showError(error.value);
	}
</script>