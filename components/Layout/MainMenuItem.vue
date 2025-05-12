<template>
	<li>
		<NuxtLink :to="{ path: $localePath(item.url), force: true }">{{ item.title }}</NuxtLink>
	</li>
</template>

<script setup>
	defineProps({
		item: {
			type: Object
		}
	});
</script>