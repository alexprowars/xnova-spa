<template>
	<div class="block">
		<div class="title">
			{{ pageType === 'ally' ? 'Альянс' : 'Игрок' }} "{{ page['name'] }}"
		</div>
		<div class="content !border-0">
			<div class="block-table">
				<div class="grid">
					<div class="c"><b>Статистика по месту</b></div>
				</div>
				<div class="grid">
					<div class="th" style="padding: 10px;">
						<canvas ref="rankChartRef"></canvas>
					</div>
				</div>
				<div class="grid">
					<div class="c"><b>Статистика по очкам</b></div>
				</div>
				<div class="grid">
					<div class="th p-4">
						<input type="radio" id="show_builds" v-model="typeChart" value="build">
						<label for="show_builds">Постройки</label>

						<input type="radio" id="show_tech" v-model="typeChart" value="tech">
						<label for="show_tech">Технологии</label>

						<input type="radio" id="show_defs" v-model="typeChart" value="defs">
						<label for="show_defs">Оборона</label>

						<input type="radio" id="show_fleet" v-model="typeChart" value="fleet">
						<label for="show_fleet">Флот</label>

						<input type="radio" id="show_total" v-model="typeChart" value="total">
						<label for="show_total">Всего</label>

						<canvas ref="pointChartRef"></canvas>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { definePageMeta, showError, useApiGet, useAsyncData, useHead, useRoute } from '#imports';
	import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
	import { Chart, CategoryScale, LinearScale, LineController, PointElement, LineElement, Legend, Tooltip } from 'chart.js';
	import { number } from '~/utils/format';
	import dayjs from 'dayjs';

	definePageMeta({
		view: {
			resources: false,
		}
	});

	useHead({
		title: 'Статистика игрока',
	});

	const route = useRoute();

	const { data: page, error } = await useAsyncData(async () => {
		return await useApiGet('players/stat/' + useRoute().params.id);
	}, { watch: [() => useRoute().query] });

	if (error.value) {
		throw showError(error.value);
	}

	const pointChartRef = ref(null);
	const rankChartRef = ref(null);
	const pageType = ref(typeof route.params['ally_id'] !== 'undefined' ? 'ally' : 'user');
	const typeChart = ref('total');
	const typeChartColors = ref({
		build: 'rgb(255, 99, 132)',
		tech: 'rgb(255, 159, 64)',
		defs: 'rgb(255, 205, 86)',
		fleet: 'rgb(75, 192, 192)',
		total: 'rgb(54, 162, 235)',
	});
	const typeChartLabels = ref({
		build: 'Постройки',
		tech: 'Технологии',
		defs: 'Оборона',
		fleet: 'Флот',
		total: 'Всего',
	});

	let pointsChart = null;

	watch(typeChart, () => {
		updatePointChart()
	});

	onMounted(() => {
		Chart.defaults.color = '#e0e0e0';
		Chart.register(CategoryScale, LinearScale, LineController, PointElement, LineElement, Legend, Tooltip);

		let labels = [];

		let ranks = {
			'build': [],
			'tech': [],
			'defs': [],
			'fleet': [],
			'total': [],
		};

		page.value.points.forEach((item) => {
			labels.push(dayjs(item.date).tz().format('DD MMM'));

			ranks.build.push(item.rank.build);
			ranks.tech.push(item.rank.tech);
			ranks.defs.push(item.rank.defs);
			ranks.fleet.push(item.rank.fleet);
			ranks.total.push(item.rank.total);
		});

		new Chart(rankChartRef.value, {
			type: 'line',
			data: {
				labels: labels,
				datasets: [{
					label: 'Постройки',
					fill: false,
					borderColor: typeChartColors.value.build,
					backgroundColor: typeChartColors.value.build,
					data: ranks.build,
				}, {
					label: 'Технологии',
					fill: false,
					borderColor: typeChartColors.value.tech,
					backgroundColor: typeChartColors.value.tech,
					data: ranks.tech
				}, {
					label: 'Оборона',
					fill: false,
					borderColor: typeChartColors.value.defs,
					backgroundColor: typeChartColors.value.defs,
					data: ranks.defs
				}, {
					label: 'Флот',
					fill: false,
					borderColor: typeChartColors.value.fleet,
					backgroundColor: typeChartColors.value.fleet,
					data: ranks.fleet
				}, {
					label: 'Место',
					fill: false,
					borderColor: typeChartColors.value.total,
					backgroundColor: typeChartColors.value.total,
					data: ranks.total
				}, ]
			},
			options: {
				scales: {
					x: {
						display: true,
						title: {
							display: true,
							text: 'Дни'
						}
					},
					y: {
						display: true,
						title: {
							display: true,
							text: 'Место'
						},
						reverse: true,
						min: 1
					}
				}
			}
		});

		updatePointChart();
	});

	onBeforeUnmount(() => {
		pointsChart?.destroy();
	})

	function updatePointChart () {
		let labels = [];
		let points = [];

		page.value.points.forEach((item) => {
			labels.push(dayjs(item.date).tz().format('DD MMM'));
			points.push(item.point[typeChart.value]);
		});

		let config = {
			type: 'line',
			data: {
				labels: labels,
				datasets: [{
					label: typeChartLabels.value[typeChart.value],
					fill: false,
					borderColor: typeChartColors.value[typeChart.value],
					backgroundColor: typeChartColors.value[typeChart.value],
					data: points
				}]
			},
			options: {
				plugins: {
					legend: {
						display: false,
					},
					tooltip: {
						callbacks: {
							label: (context) => {
								return number(context.parsed.y);
							}
						}
					},
				},
				scales: {
					x: {
						display: true,
						title: {
							display: true,
							text: 'Дни'
						}
					},
					y: {
						display: true,
						title: {
							display: true,
							text: 'Очки'
						},
						ticks: {
							callback: (value) => {
								return number(value);
							}
						}
					}
				}
			}
		};

		if (pointsChart === null) {
			pointsChart = new Chart(pointChartRef.value, config);
		} else {
			pointsChart.data = config.data;
			pointsChart.update('none');
		}
	}
</script>