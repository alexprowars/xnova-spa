<template>
	<div v-if="queue.length" class="block page-building-unit-queue">
		<div class="title">{{ $t('building.unit_queue') }}</div>
		<div class="content !border-0">
			<div class="block-table">
				<div v-for="item in queue" class="grid grid-cols-2">
					<div class="text-left k">
						<span class="positive">{{ item.count }}</span> {{ $t('tech.' + item.item) }}
					</div>
					<div class="text-right k">
						{{ $formatTime(dayjs(item['date']).diff(now) / 1000) }}
					</div>
				</div>
				<div class="grid">
					<div class="c text-center">
						{{ $t('building.unit_queue_left') }} {{ $formatTime(left_time) }}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { computed, watch } from 'vue';
	import { useNow } from '@vueuse/core';
	import dayjs from 'dayjs';

	const props = defineProps({
		queue: {
			type: Array,
			default: () => []
		}
	});

	const now = useNow({ interval: 1000 });
	const left_time = computed(() => dayjs(props.queue[props.queue.length - 1]['date']).diff(now.value) / 1000);

	watch(now, () => {
		update();
	});

	function update () {
		if (props.queue.length === 0) {
			return;
		}

		let first = props.queue[0];

		const diff = dayjs(first['date']).diff(now.value) / 1000;

		if (diff <= 0) {
			props.queue.splice(0, 1);
		} else {
			props.queue[0]['count'] = Math.ceil(diff / first['time']);
		}
	}
</script>