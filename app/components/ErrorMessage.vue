<template>
	<div class="block-table">
		<div class="grid" v-if="item['title'] && item['title'].length">
			<div class="c error" v-html="item['title']"></div>
		</div>
		<div class="grid">
			<div class="th error-message text-center" v-html="item['message']"></div>
		</div>
	</div>
</template>

<script setup>
	import { navigateTo } from '#imports';
	import { onBeforeUnmount, onMounted } from 'vue';

	const props = defineProps({
		item: Object,
	});

	let timeout;

	onMounted(() => {
		if (props.item['timeout'] > 0 && props.item['redirect']) {
			timeout = setTimeout(() => {
				navigateTo(props.item['redirect'])
			}, props.item['timeout'] * 1000);
		}
	});

	onBeforeUnmount(() => {
		clearTimeout(timeout);
	});
</script>