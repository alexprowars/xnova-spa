<template>
	<table class="table">
		<tbody>
		<tr>
			<td class="c" colspan="2">
				Обнаружена следующая активность на планете:
			</td>
		</tr>
		<tr v-if="items.length === 0">
			<th colspan="2">На этой планете нет движения флотов.</th>
		</tr>
		<tr v-for="item in items">
			<th>
				<div class="z">{{ $formatTime(dayjs(item['time']).diff(now) / 1000, ':', true) }}</div>
				<span :style="{ color: item['direction'] === 1 ? 'lime' : 'green' }">{{ $formatDate(item['time'], 'HH:mm:ss') }}</span>
			</th>
			<th>
				<span :style="{ color: item['mission'] !== 6 ? 'lime' : 'orange' }">
					Игрок (<span v-html="item['fleet']"></span>) с {{ item['type_1'] }} {{ item['planet_name'] }}
					<span style="color: white">[<span v-html="item['planet_position']"></span>]</span>
					{{ item['direction'] === 1 ? 'летит' : 'возвращается' }} на {{ item['type_2'] }} {{ item['target_name'] }}
					<span style="color: white">[<span v-html="item['target_position']"></span>]</span>.
					Задание: <span style="color: white">{{ $t('fleet_mission.' + item['mission']) }}</span>
				</span>
			</th>
		</tr>
		</tbody>
	</table>
</template>

<script setup>
	import { definePageMeta, showError, useApiGet, useAsyncData, useHead, useRoute } from '#imports';
	import { useNow } from '@vueuse/core';
	import dayjs from 'dayjs';

	definePageMeta({
		middleware: ['auth'],
		layout: 'empty',
		view: {
			resources: false,
		}
	});

	useHead({
		title: 'Сенсорная фаланга',
	});

	const { data: items, error } = await useAsyncData(async () => {
		return await useApiGet('/phalanx');
	}, { watch: [() => useRoute().query] });

	if (error.value) {
		throw showError(error.value);
	}

	const now = useNow({ interval: 1000 });
</script>