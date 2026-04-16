<template>
	<ClientOnly>
		<div>{{ $formatDate(now, 'DD MMM HH:mm:ss') }}</div>
	</ClientOnly>
</template>

<script setup>
	import { useNow } from '@vueuse/core';

	const now = useNow({ interval: 1000 });
</script>