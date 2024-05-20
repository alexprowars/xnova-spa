<template>
	<div>{{ $time(time, delimiter, true) }}</div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
	import useStore from '~/store';

	const props = defineProps({
		value: {
			type: Number,
			default: 0
		},
		delimiter: {
			type: String,
			default: ':'
		}
	});

	const store = useStore();
	const time = ref(store.getServerTime);

	let timeout = null;

	watch(time, () => {
		start();
	});

	onMounted(() => {
		stop();
		update();
	});

	onBeforeUnmount(() => {
		stop();
	});

	function update () {
		if (time.value < 0) {
			return;
		}

		time.value = time.value - store.getServerTime;
	}

	function stop () {
		clearTimeout(timeout);
	}

	function start () {
		timeout = setTimeout(update, 1000);
	}
</script>