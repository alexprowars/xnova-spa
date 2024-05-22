<template>
	<NuxtLinkLocale :to="'/galaxy/?galaxy=' + galaxy + '&system=' + system + '&planet=' + planet">
		[{{ galaxy }}:{{ system }}:{{ planet }}]
	</NuxtLinkLocale>
</template>

<script setup>
	defineProps({
		galaxy: {
			type: Number,
			default: 1
		},
		system: {
			type: Number,
			default: 1
		},
		planet: {
			type: Number,
			default: 1
		}
	});
</script>