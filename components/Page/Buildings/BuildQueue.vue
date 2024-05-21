<template>
	<div class="page-building-build-queue">
		<div class="block-table">
			<BuildQueueRow v-for="(item, index) in queue" :key="index" :index="index" :item="item"></BuildQueueRow>
		</div>
	</div>
</template>

<script setup>
	import BuildQueueRow from './BuildQueueRow.vue'
	import { navigateTo } from '#imports';
	import useStore from '~/store';
	import { storeToRefs } from 'pinia';
	import { onBeforeUnmount, onMounted, watch } from 'vue';

	const props = defineProps({
		queue: Array
	});

	const store = useStore();
	const { planet } = storeToRefs(store);

	let timeout;

	onMounted(() => {
		init();
	});

	onBeforeUnmount(() => {
		clearTimeout(timeout);
	});

	watch(() => props.queue, () => {
		init();
	});

	function init () {
		clearTimeout(timeout);

		if (props.queue.length > 0) {
			timeout = setTimeout(timer, 1000);
		}
	}

	function timer () {
		props.queue[0]['time'] -= 1;

		if (props.queue[0]['time'] <= 0) {
			timeout = setTimeout(() => {
				navigateTo('/buildings/?planet=' + planet.value.id);
			}, 5000);
		} else {
			timeout = setTimeout(timer, 1000);
		}
	}
</script>