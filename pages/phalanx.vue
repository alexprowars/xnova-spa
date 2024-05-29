<template>
	<table class="table">
		<tr>
			<td class="c" colspan="2">
				Обнаружена следующая активность на планете:
			</td>
		</tr>
		<tr v-if="page['items'].length === 0">
			<th colspan="2">На этой планете нет движения флотов.</th>
		</tr>
		<tr v-for="(item, index) in page['items']">
			<th>
				<div class="z">{{ $time(times[index], ':', true) }}</div>
				<font :color="item['direction'] === 1 ? 'lime' : 'green'">{{ $date(item['time'], 'H:i:s') }}</font>
			</th>
			<th>
				<font :color="item['color']">
					Игрок (<span v-html="item['fleet']"></span>) с {{ item['type_1'] }} {{ item['planet_name'] }}
					<font color="white">[<span v-html="item['planet_position']"></span>]</font>
					{{ item['direction'] === 1 ? 'летит' : 'возвращается' }} на {{ item['type_2'] }} {{ item['target_name'] }}
					<font color="white">[<span v-html="item['target_position']"></span>]</font>.
					Задание: <font color="white">{{ item['mission'] }}</font>
				</font>
			</th>
		</tr>
	</table>
</template>

<script setup>
	import { definePageMeta, showError, useAsyncData, useHead, useRoute } from '#imports';
	import useStore from '~/store';
	import { onBeforeUnmount, onMounted, ref } from 'vue';

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

	const { data: page, error } = await useAsyncData(async () => {
		return await useStore().loadPage();
	}, { watch: [() => useRoute().query] });

	if (error.value) {
		throw showError(error.value);
	}

	const times = ref([]);

	let timer;

	onMounted(() => {
		updateTimes();
	});

	onBeforeUnmount(() => {
		stopTimer();
	});

	function updateTimes () {
		times.value = page.value['items']
			.map((item) => item['time'] - useStore().getServerTime);

		startTimer();
	}

	function startTimer () {
		timer = setTimeout(updateTimes, 1000);
	}

	function stopTimer () {
		clearTimeout(timer);
	}
</script>