<template>
	<input v-model="formatValue" type="number">
</template>

<script setup>
	import { computed, watch } from 'vue';

	const modelValue = defineModel();
	const formatValue = computed(() => modelValue.value);

	watch(formatValue, (value) => {
		formatValue.value = parseInt(value) === 0 ? '' : value;

		update();
	}, { immediate: true });

	function update (value) {
		value = parseInt(value);

		if (isNaN(value)) {
			value = 0;
		}

		modelValue.value = value;
	}
</script>