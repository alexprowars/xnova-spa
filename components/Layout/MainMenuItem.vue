<template>
	<li>
		<NuxtLink :to="{ path: item.url, force: true }">{{ item.title }}</NuxtLink>
	</li>
</template>

<script setup>
	defineProps({
		item: {
			type: Object
		}
	});
</script>