<template>
	<div class="page-fleet">
		<div class="page-fleet-fly block">
			<div class="title">
				<div class="row">
					<div class="col text-start">
						Флоты <span :class="[page['curFleets'] < page['maxFleets'] ? 'positive' : 'negative']">{{ page['curFleets'] }}</span> из <span class="negative">{{ page['maxFleets'] }}</span>
					</div>
					<div v-if="page['maxExpeditions'] > 0" class="col text-end">
						Экспедиции {{ page['curExpeditions'] }}/{{ page['maxExpeditions'] }}
					</div>
				</div>
			</div>

			<div class="content">
				<div class="block-table">
					<div v-if="page.fleets.length > 0" class="row">
						<div class="col-3 col-sm-1 th">№</div>
						<div class="col-6 col-sm-2 th">Миссия</div>
						<div class="col-3 col-sm-1 th">Кол-во</div>
						<div class="col-4 col-sm-3 th d-none d-sm-block">Цель</div>
						<div class="col-2 col-sm-3 th d-none d-sm-block">Возврат</div>
						<div class="col-2 th d-none d-sm-block">Приказы</div>
					</div>

					<FlyRow class="row page-fleet-fly-item" v-for="(item, index) in page.fleets" :key="index" :i="index" :item="item"></FlyRow>

					<div class="row" v-if="page.fleets.length === 0">
						<div class="th col text-center">нет активности флота</div>
					</div>

					<div class="row" v-if="page['curFleets'] >= page['maxFleets']">
						<div class="th col negative text-center">Все слоты заняты!</div>
					</div>
				</div>
			</div>
		</div>
		<div v-if="page.ships.length" class="block page-fleet-select">
			<div class="title">
				<div class="row">
					<div class="col-12 text-center">
						Выбрать корабли<template v-if="page['selected']['mission'] > 0"> для миссии "{{ $t('fleet_mission.'+page['selected']['mission']) }}"</template><template v-if="page['selected']['galaxy'] > 0"> на координаты [{{ page['selected']['galaxy'] }}:{{ page['selected']['system'] }}:{{ page['selected']['planet'] }}]</template>:
					</div>
				</div>
			</div>
			<div class="content">
				<RouterForm action="/fleet/checkout/">
					<div class="block-table fleet_ships container">
						<div class="row">
							<div class="th col-sm-7 col-6">Тип корабля</div>
							<div class="th col-sm-2 col-2">Кол-во</div>
							<div class="th col-sm-3 col-4">&nbsp;</div>
						</div>

						<div v-for="ship in page.ships" class="row">
							<div class="th col-sm-7 col-6 middle">
								<a :title="$t('tech.'+ship.id)">{{ $t('tech.'+ship.id) }}</a>
							</div>
							<div class="th col-sm-2 col-2 middle">
								<a @click.prevent="maxShips(ship['id'])">{{ $number(ship['count']) }}</a>
							</div>
							<div v-if="ship.id === 212" class="th col-sm-3 col-4"></div>
							<div v-else class="th col-sm-3 col-4">
								<a @click.prevent="diffShips(ship['id'], -1)" title="Уменьшить на 1" style="color:#FFD0D0">- </a>
								<input type="number" min="0" :max="ship['count']" :name="'ship['+ship['id']+']'" v-model.number="fleets[ship['id']]" style="width:60%" :title="$t('tech.'+ship.id)+': '+ship['count']" placeholder="0" @change.prevent="calculateShips" @keyup="calculateShips">
								<a @click.prevent="diffShips(ship['id'], 1)" title="Увеличить на 1" style="color:#D0FFD0"> +</a>
							</div>
						</div>
						<div class="row">
							<div class="col-12 col-sm-7 th"></div>
							<div class="col-12 col-sm-5 th">
								<a class="button" @click.prevent="allShips">Выбрать все</a>
								<a v-if="count" class="button" @click.prevent="clearShips">Очистить</a>
							</div>
						</div>
						<div v-if="count" class="row">
							<div class="th col-4 col-sm-7">&nbsp;</div>
							<div class="th col-4 col-sm-2">Вместимость</div>
							<div class="th col-4 col-sm-3">{{ allCapacity ? $number(allCapacity) : '-' }}</div>
						</div>
						<div v-if="count" class="row">
							<div class="th col-4 col-sm-7">&nbsp;</div>
							<div class="th col-4 col-sm-2">Скорость</div>
							<div class="th col-4 col-sm-3">{{ allSpeed ? $number(allSpeed) : '-'}}</div>
						</div>
						<div v-if="count && page['curFleets'] < page['maxFleets']" class="row">
							<div class="th col-12"><input type="submit" value=" Далее "></div>
						</div>
					</div>
					<input type="hidden" name="galaxy" :value="page['selected']['galaxy']">
					<input type="hidden" name="system" :value="page['selected']['system']">
					<input type="hidden" name="planet" :value="page['selected']['planet']">
					<input type="hidden" name="planet_type" :value="page['selected']['planet_type']">
					<input type="hidden" name="mission" :value="page['selected']['mission']">
				</RouterForm>
			</div>
		</div>
		<div v-else class="block page-fleet-select">
			<div class="block-table fleet_ships container">
				<div class="row">
					<div class="th col-12">
						Нет кораблей на планете
						<div>
							<div class="separator"></div>
							<NuxtLinkLocale to="/shipyard/" class="button">Перейти в верфь</NuxtLinkLocale>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import FlyRow from '~/components/Page/Fleet/FlyRow.vue'
	import { definePageMeta, showError, useAsyncData, useHead, useRoute } from '#imports';
	import useStore from '~/store';
	import { computed, ref, watch } from 'vue';

	definePageMeta({
		middleware: ['auth'],
	});

	useHead({
		title: 'Флот',
	});

	const route = useRoute();

	const { data: page, error, refresh } = await useAsyncData(async () => {
		return await useStore().loadPage();
	});

	watch(() => route.query, () => refresh());

	if (error.value) {
		throw showError(error.value);
	}

	const fleets = ref({});
	const allCapacity = ref(0);
	const allSpeed = ref(0);

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
</script>