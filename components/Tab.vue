<template>
	<section v-show="active" :aria-hidden="!active" class="tabs-component-panel" :id="hash" role="tabpanel">
		<slot/>
	</section>
</template>

<script setup>
	import { computed, ref, inject } from 'vue';

	const props = defineProps({
		id: {
			default: null
		},
		name: {
			required: true
		},
	})

	const addTab = inject('addTab');
	const activeTab = inject('activeTab');

	const active = computed(() => {
		return activeTab.value === hash.value;
	});

	const header = computed(() => {
		return props.name;
	});

	const hash = computed(() => {
		return props.id ?
			'#' + props.id :
			'#' + props.name.toLowerCase().replace(/ /g, '-');
	});

	addTab({
		header: header.value,
		hash: hash.value,
	});
</script>

<script>
	export default {
		name: 'Tab'
	}
</script>