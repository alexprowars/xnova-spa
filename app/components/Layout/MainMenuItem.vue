<template>
	<li>
		<NuxtLink :to="{ path: item.url, force: true }" :class="{ active: $route.path.startsWith(item.url) }">{{ item.title }}</NuxtLink>
	</li>
</template>

<script setup>
	defineProps({
		item: {
			type: Object
		}
	});
</script>