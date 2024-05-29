<template>
	<div class="block page-building-unit-queue">
		<div class="title">Текущее производство</div>
		<div class="content border-0">
			<div class="block-table">
				<div v-for="item in queue" class="row">
					<div class="col-6 text-start k">
						<span class="positive">{{ item.count }}</span> {{ $t('tech.' + item.id) }}
					</div>
					<div class="col-6 text-end k border-left-0">
						{{ $time(item.end - getServerTime) }}
					</div>
				</div>
				<div class="row">
					<div class="col-12 c">
						Оставшееся время {{ $time(left_time) }}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, onUpdated, ref, watch } from 'vue';
	import { storeToRefs } from 'pinia';
	import useStore from '~/store';

	const props = defineProps({
		queue: {
			type: Array,
			default: () => {
				return []
			}
		}
	});

	const left_time = ref(0);
	const { getServerTime } = storeToRefs(useStore());

	let timeout;

	watch(left_time, () => {
		start();
	});

	onUpdated(() => {
		stop();
		update();
		start();
	});

	onMounted(() => {
		stop();
		update();
	});

	onBeforeUnmount(() => {
		stop();
	});

	function start () {
		timeout = setTimeout(update, 1000);
	}

	function stop () {
		clearTimeout(timeout);
	}

	function update () {
		if (props.queue.length === 0) {
			return;
		}

		let last = props.queue[props.queue.length - 1];
		left_time.value = last.end - getServerTime.value

		let first = props.queue[0];

		if (first.end <= getServerTime.value) {
			props.queue.splice(0, 1);
		} else {
			let cnt = Math.ceil((first.end - getServerTime.value) / first.time);

			if (cnt !== props.queue[0]['count']) {
				props.queue[0]['count'] = cnt;
			}
		}
	}
</script>