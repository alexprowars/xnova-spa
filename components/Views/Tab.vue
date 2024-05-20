<template>
	<section v-show="active" :aria-hidden="!active" class="tabs-component-panel" :id="hash" role="tabpanel">
		<slot/>
	</section>
</template>

<script setup>
	import { computed, ref } from 'vue';

	const props = defineProps({
		id: {
			default: null
		},
		name: {
			required: true
		},
	})

	const active = ref(false);

	const header = computed(() => {
		return props.name;
	});

	const hash = computed(() => {
		return props.id ?
			'#' + props.id :
			'#' + props.name.toLowerCase().replace(/ /g, '-');
	});

	defineExpose({
		active, header, hash
	});
</script>

<script>
	export default {
		name: 'Tab'
	}
</script>