<template>
	<li>
		<NuxtLinkLocale :to="item.url">{{ item.title }}</NuxtLinkLocale>
	</li>
</template>

<script setup>
	defineProps({
		item: {
			type: Object
		}
	});
</script>