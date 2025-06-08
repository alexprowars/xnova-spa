<template>
	<div class="block-table">
		<div class="grid" v-if="data['title'] && data['title'].length">
			<div class="c error" v-html="data['title']"></div>
		</div>
		<div class="grid">
			<div class="th error-message" v-html="data['message']"></div>
		</div>
	</div>
</template>

<script setup>
	import { navigateTo } from '#imports';
	import { onBeforeUnmount, onMounted } from 'vue';

	const props = defineProps({
		data: Object,
	});

	let timeout;

	onMounted(() => {
		if (props.data['timeout'] > 0 && props.data['redirect']) {
			timeout = setTimeout(() => {
				navigateTo(props.data['redirect'])
			}, props.data['timeout'] * 1000);
		}
	});

	onBeforeUnmount(() => {
		clearTimeout(timeout);
	});
</script>