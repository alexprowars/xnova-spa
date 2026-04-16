<template>
	<li>
		<NuxtLink :to="{ path: item.url, force: true }" :class="{ active: $route.path.startsWith(item.url) }" @click.native="handleClick">{{ item.title }}</NuxtLink>
	</li>
</template>

<script setup>
	import { refreshNuxtData, useRoute } from '#imports';

	const props = defineProps({
		item: {
			type: Object
		}
	});

	const route = useRoute();

	function handleClick(e) {
		if (route.path === props.item.url) {
			e.preventDefault();
			refreshNuxtData();
		}
	}
</script>