<template>
	<div>{{ $date(time, 'd.m.Y H:i:s') }}</div>
</template>

<script setup>
	import useStore from '~/store';
	import { onBeforeUnmount, onMounted, ref, watch } from 'vue';

	const time = ref(0);
	let timeout = null;

	clockUpdate();

	watch(time,() => {
		clockStart();
	}, { immediate: true });

	onMounted(() => {
		clockUpdate();
	})

	onBeforeUnmount(() => {
		clockStop();
	});

	function clockUpdate () {
		time.value = useStore().getServerTime;
	}

	function clockStop () {
		clearTimeout(timeout);
	}

	function clockStart () {
		timeout = setTimeout(clockUpdate, 1000);
	}
</script>