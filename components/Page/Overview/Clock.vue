<template>
	<div>{{ dayjs(now).tz().format('DD MMM HH:mm:ss') }}</div>
</template>

<script setup>
	import { useNow } from '@vueuse/core';
	import dayjs from 'dayjs';

	const now = useNow({ interval: 1000 });
</script>