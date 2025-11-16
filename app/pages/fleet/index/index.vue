<template>
	<div class="page-fleet">
		<div class="page-fleet-fly block">
			<div class="title">
				<div class="grid grid-cols-2">
					<div class="text-left">
						Флоты <span :class="[page.fleets.length < user['fleets_max'] ? 'positive' : 'negative']">{{ page.fleets.length }}</span> из <span class="negative">{{ user['fleets_max'] }}</span>
					</div>
					<div v-if="page['maxExpeditions'] > 0" class="text-right">
						Экспедиции {{ page['curExpeditions'] }}/{{ page['maxExpeditions'] }}
					</div>
				</div>
			</div>
			<div class="content">
				<FleetList :fleets="page.fleets"/>
			</div>
		</div>
		<template v-if="!isVacation">
			<div v-if="page.ships.length" class="block page-fleet-select">
				<div class="title">
					<div class="grid">
						Выбрать корабли<template v-if="page['selected']['mission'] > 0"> для миссии "{{ $t('fleet_mission.'+page['selected']['mission']) }}"</template><template v-if="page['selected']['galaxy'] > 0"> на координаты [{{ page['selected']['galaxy'] }}:{{ page['selected']['system'] }}:{{ page['selected']['planet'] }}]</template>
					</div>
				</div>
				<div class="content">
					<form method="post" class="block-table text-center fleet_ships" @submit.prevent="checkout">
						<div class="grid grid-cols-12 divide-x">
							<div class="col-span-6 sm:col-span-7 th">Тип корабля</div>
							<div class="col-span-2 sm:col-span-2 th">Кол-во</div>
							<div class="col-span-4 sm:col-span-3 th">&nbsp;</div>
						</div>
						<div v-for="ship in page.ships" class="grid grid-cols-12 divide-x">
							<div class="col-span-6 sm:col-span-7 th middle">
								<a :title="$t('tech.'+ship.id)">{{ $t('tech.'+ship.id) }}</a>
							</div>
							<div class="col-span-2 sm:col-span-2 th middle">
								<a @click.prevent="maxShips(ship['id'])">{{ $formatNumber(ship['count']) }}</a>
							</div>
							<div v-if="ship.id === 212" class="col-span-4 sm:col-span-3 th"></div>
							<div v-else class="col-span-4 sm:col-span-3 th">
								<a @click.prevent="diffShips(ship['id'], -1)" title="Уменьшить на 1" style="color:#FFD0D0">- </a>
								<input type="number" min="0" :max="ship['count']" v-model.number="fleets[ship['id']]" style="width:60%" :title="$t('tech.'+ship.id)+': '+ship['count']" placeholder="0" @change.prevent="calculateShips" @keyup="calculateShips">
								<a @click.prevent="diffShips(ship['id'], 1)" title="Увеличить на 1" style="color:#D0FFD0"> +</a>
							</div>
						</div>
						<div class="grid grid-cols-12 divide-x">
							<div class="col-span-12 sm:col-span-7 th"></div>
							<div class="col-span-12 sm:col-span-5 th">
								<a class="button" @click.prevent="allShips">Выбрать все</a>
								<a v-if="count" class="button" @click.prevent="clearShips">Очистить</a>
							</div>
						</div>
						<div v-if="count" class="grid grid-cols-12 divide-x">
							<div class="col-span-4 sm:col-span-7 th">&nbsp;</div>
							<div class="col-span-4 sm:col-span-2 th">Вместимость</div>
							<div class="col-span-4 sm:col-span-3 th">{{ allCapacity ? $formatNumber(allCapacity) : '-' }}</div>
						</div>
						<div v-if="count" class="grid grid-cols-12 divide-x">
							<div class="col-span-4 sm:col-span-7 th">&nbsp;</div>
							<div class="col-span-4 sm:col-span-2 th">Скорость</div>
							<div class="col-span-4 sm:col-span-3 th">{{ allSpeed ? $formatNumber(allSpeed) : '-'}}</div>
						</div>
						<div v-if="count && page.fleets.length < user['fleets_max']" class="grid">
							<div class="th"><button type="submit">Далее</button></div>
						</div>
					</form>
				</div>
			</div>
			<div v-else class="block page-fleet-select">
				<div class="block-table fleet_ships container">
					<div class="grid">
						<div class="th">
							Нет кораблей на планете
							<div>
								<div class="separator"></div>
								<NuxtLink to="/shipyard" class="button">Перейти в верфь</NuxtLink>
							</div>
						</div>
					</div>
				</div>
			</div>
		</template>
	</div>
</template>

<script setup>
	import FleetList from '~/components/Page/Fleet/FleetList.vue';
	import { definePageMeta, showError, useAsyncData, useHead, navigateTo, useRoute, useApiSubmit, useNuxtData, useApiGet } from '#imports';
	import useStore from '~/store/index.js';
	import { computed, ref, watch } from 'vue';
	import { storeToRefs } from 'pinia';

	definePageMeta({
		middleware: ['auth'],
	});

	useHead({
		title: 'Флот',
	});

	const store = useStore();
	const route = useRoute();

	const { data: page, error } = await useAsyncData(
		async () => await Promise.all([
			useApiGet('/fleet', Object.assign({}, route.params, route.query)),
			store.loadState()
		]).then(([result]) => result),
		{ watch: [() => useRoute().query] }
	);

	if (error.value) {
		throw showError(error.value);
	}

	const fleets = ref({});
	const allCapacity = ref(0);
	const allSpeed = ref(0);
	const { user, isVacation } = storeToRefs(store);

	const count = computed(() => {
		return page.value['ships'].reduce((total, ship) => {
			let cnt = fleets.value[ship.id] || 0;
			return (total + cnt);
		}, 0);
	});

	watch(() => page.value.ships, () => {
		init();
	});

	watch(fleets, () => {
		calculateShips();
	}, { deep: true });

	function init () {
		if (!page.value || !page.value.ships)
			return;

		fleets.value = {};
	}

	function maxShips (shipId) {
		let ship = page.value['ships'].find((item) => {
			return item.id === shipId
		})

		if (typeof fleets.value[ship['id']] !== "undefined" && fleets.value[ship['id']] === ship['count']) {
			fleets.value[ship['id']] = '';
		} else {
			fleets.value[ship['id']] = ship['count'];
		}
	}

	function clearShips () {
		page.value.ships.forEach((ship) => {
			fleets.value[ship['id']] = '';
		})
	}

	function allShips () {
		page.value.ships.forEach((ship) => {
			if (ship['id'] !== 212) {
				fleets.value[ship['id']] = ship['count'];
			}
		})
	}

	function diffShips (shipId, val) {
		if (typeof fleets.value[shipId] === "undefined") {
			fleets.value[shipId] = 0;
		}

		if (!parseInt(fleets.value[shipId]))
			fleets.value[shipId] = 0;

		fleets.value[shipId] += val;

		if (fleets.value[shipId] <= 0)
			fleets.value[shipId] = '';

		let ship = page.value['ships'].find((item) => {
			return item.id === shipId
		})

		if (fleets.value[shipId] > ship.count)
			fleets.value[shipId] = ship.count;
	}

	function calculateShips () {
		let maxSpeed = 1000000000;
		let capacity = 0;
		let speed = maxSpeed;

		page.value['ships'].forEach((ship) => {
			let cnt = fleets.value[ship.id] || 0;
			cnt = parseInt(cnt);

			if (isNaN(cnt))
				return;

			capacity += cnt * ship['capacity'];

			if (cnt > 0 && ship['speed'] > 0 && ship['speed'] < speed)
				speed = ship['speed'];
		})

		if ((speed <= 0) || (speed >= maxSpeed))
			speed = 0;

		allSpeed.value = speed;
		allCapacity.value = capacity;
	}

	function checkout() {
		useApiSubmit('/fleet/checkout', {
			ships: fleets.value,
			...page.value['selected']
		}, (result) => {
			const { data } = useNuxtData('fleet.checkout');
			data.value = result;

			navigateTo('/fleet/checkout');
		});
	}
</script>