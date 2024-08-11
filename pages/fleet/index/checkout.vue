<template>
	<form v-if="page" ref="formRef" method="post" @submit.prevent="send">
		<div class="block-table">
			<div class="row">
				<div class="c col-12">Отправка флота</div>
			</div>
			<div class="row">
				<div class="th col-6">Цель</div>
				<div class="th col-6 fleet-coordinates-input">
					<input type="number" min="1" :max="page['galaxy_max']" v-model="page['target']['galaxy']">
					<input type="number" min="1" :max="page['system_max']" v-model="page['target']['system']">
					<input type="number" min="1" :max="page['planet_max']" v-model="page['target']['planet']">
					<select name="planet_type" v-model="page['target']['planet_type']">
						<option v-for="index in Object.keys($tm('planet_type'))" :value="index">{{ $t('planet_type.' + index) }}</option>
					</select>
				</div>
			</div>
			<div class="row">
				<div class="th col-6">Скорость</div>
				<div class="th col-6">
					<select name="speed" v-model="speed" @change="info">
						<option v-for="i in 10" :value="11 - i">{{ (11 - i) * 10 }}</option>
					</select> %
				</div>
			</div>
			<div class="row">
				<div class="th col-6">Расстояние</div>
				<div class="th col-6">{{ $number(distance) }}</div>
			</div>
			<div class="row">
				<div class="th col-6">Продолжительность полёта (к цели)</div>
				<div class="th col-6">{{ $time(duration, ':', true) }}</div>
			</div>
			<div class="row">
				<div class="th col-6">Время прибытия (к цели)</div>
				<div class="th col-6">{{ $date(target_time, 'DD MMM HH:mm:ss') }}</div>
			</div>
			<div class="row">
				<div class="th col-6">Максимальная скорость</div>
				<div class="th col-6">{{ $number(maxspeed) }}</div>
			</div>
			<div class="row">
				<div class="th col-6">Потребление топлива</div>
				<div class="th col-6"><span :class="[storage > consumption ? 'positive' : 'negative']">{{ $number(consumption) }}</span></div>
			</div>
			<div class="row">
				<div class="th col-6">Грузоподъёмность</div>
				<div class="th col-6"><span :class="[storage > consumption ? 'positive' : 'negative']">{{ $number(storage) }}</span></div>
			</div>
			<div class="row">
				<div class="c col-12">Ссылки <NuxtLinkLocale to="/fleet/shortcut/">(Просмотр / Редактирование)</NuxtLinkLocale></div>
			</div>

			<div v-if="page['shortcuts'].length > 0" class="row">
				<div v-for="link in page['shortcuts']" class="th col-6" :class="{'col-12': page['shortcuts'].length === 1}">
					<a @click.prevent="setTarget(link['galaxy'], link['system'], link['planet'], link['planet_type'])">
						{{ link['name'] }} {{ link['galaxy'] }}:{{ link['system'] }}:{{ link['planet'] }}
						<span v-if="link['planet_type'] === 1">(P)</span>
						<span v-if="link['planet_type'] === 2">(D)</span>
						<span v-if="link['planet_type'] === 3">(L)</span>
					</a>
				</div>
			</div>
			<div v-else class="row">
				<div class="th col-12"><NuxtLinkLocale to="/fleet/shortcut/add/" class="button">Добавить</NuxtLinkLocale></div>
			</div>

			<div v-if="page['planets'].length > 0" class="row">
				<div class="c col-12">Планеты</div>
			</div>
			<div v-if="page['planets'].length > 0" class="row">
				<div v-for="(planet, i) in page['planets']" class="th" :class="['col-'+(page['planets'].length % 2 > 0 && i === page['planets'].length - 1 ? 12 : 6)]">
					<a @click.prevent="setTarget(planet['galaxy'], planet['system'], planet['planet'], planet['planet_type'])">
						{{ planet['name'] }} {{ planet['galaxy'] }}:{{ planet['system'] }}:{{ planet['planet'] }}
					</a>
				</div>
			</div>

			<div v-if="page['moons'].length > 0" class="row">
				<div class="c col-12">
					Межгалактические врата
					<span v-if="page['gate_time']" class="small">(заряжено через {{ $time((dayjs(page['gate_time']).diff(now) / 1000), ':', true) }})</span>
				</div>
			</div>
			<div v-if="page['moons'].length > 0" class="row">
				<div v-for="(item, i) in page['moons']" class="th" :class="['col-'+(page['moons'].length % 2 > 0 && i === page['moons'].length - 1 ? 12 : 6)]">
					<input type="radio" v-model="moon" :value="item['id']" :id="'moon'+item['id']">
					<label :for="'moon'+item['id']">
						{{ item['name'] }} [{{ item['galaxy'] }}:{{ item['system'] }}:{{ item['planet'] }}]
						<span v-if="item['jumpgate']">{{ $time((dayjs(page['jumpgate']).diff(now) / 1000), ':', true) }}</span>
					</label>
				</div>
			</div>

			<div v-if="page['alliances'].length > 0" class="row">
				<div class="c col-12">Боевые союзы</div>
			</div>
			<div v-for="(row, index) in page['alliances']" class="row">
				<div class="th col-12">
					<a @click.prevent="allianceSet(index)">({{ row['name'] }})</a>
				</div>
			</div>

			<div class="row">
				<div class="th col-6">
					<table class="table">
						<tr>
							<td class="c" colspan="2">Миссия</td>
						</tr>
						<tr v-for="mission in page['missions']">
							<th style="text-align: left !important">
								<input :id="'m_'+mission" type="radio" v-model="page['mission']" :value="mission">
								<label :for="'m_'+mission">{{ $t('fleet_mission.'+mission) }}</label>

								<span v-if="mission === 15" class="text-center negative">
									Внимание во время экспедиции возможна потеря флота!
								</span>
							</th>
						</tr>
						<tr v-if="page['missions'].length === 0">
							<th class="negative">Миссия невозможна</th>
						</tr>
						<tr>
							<th>Время прилёта: {{ $date(target_time, 'DD MMM HH:mm:ss') }}</th>
						</tr>
					</table>
				</div>
				<div class="th col-6">
					<table class="table">
						<tr>
							<td colspan="3" class="c">Сырьё</td>
						</tr>
						<tr>
							<th>Металл</th>
							<th><a @click.prevent="maxRes('metal')">макс.</a></th>
							<th><input v-model="resource.metal" alt="Металл" size="10" type="text"></th>
						</tr>
						<tr>
							<th>Кристалл</th>
							<th><a @click.prevent="maxRes('crystal')">макс.</a></th>
							<th><input v-model="resource.crystal" alt="Кристалл" size="10" type="text"></th>
						</tr>
						<tr>
							<th>Дейтерий</th>
							<th><a @click.prevent="maxRes('deuterium')">макс.</a></th>
							<th><input v-model="resource.deuterium" alt="Дейтерий" size="10" type="text"></th>
						</tr>
						<tr>
							<th>Остаток</th>
							<th colspan="2">
								<span :class="[capacity >= 0 ? 'positive' : 'negative']">{{ $number(capacity) }}</span>
							</th>
						</tr>
						<tr>
							<th colspan="3"><a @click.prevent="maxResAll">Всё сырьё</a> | <a @click.prevent="clearResAll">Обнулить</a></th>
						</tr>
						<tr>
							<th colspan="3">&nbsp;</th>
						</tr>

						<tr v-if="page['mission'] === 15 && page['missions'].indexOf(15) >= 0" class="mission m_15">
							<td class="c" colspan="3">Время экспедиции</td>
						</tr>
						<tr v-if="page['mission'] === 15 && page['missions'].indexOf(15) >= 0" class="mission m_15">
							<th colspan="3">
								<select name="expeditiontime">
									<option v-for="i in page['expedition_hours']" :value="i">{{ i }} ч.</option>
								</select>
							</th>
						</tr>

						<tr v-if="page['mission'] === 5 && page['missions'].indexOf(5) >= 0" class="mission m_5">
							<td class="c" colspan="3">Оставаться часов на орбите</td>
						</tr>
						<tr v-if="page['mission'] === 5 && page['missions'].indexOf(5) >= 0" class="mission m_5">
							<th colspan="3">
								<select name="holdingtime" v-model="hold_hours">
									<option value="0">0</option>
									<option value="1">1</option>
									<option value="2">2</option>
									<option value="4">4</option>
									<option value="8">8</option>
									<option value="16">16</option>
									<option value="32">32</option>
								</select>
								<div v-if="hold > 0">
									<br>Потребуется <span class="positive">{{ $number(hold) }}</span> дейтерия
								</div>
							</th>
						</tr>
					</table>
				</div>
			</div>
			<div v-if="page['missions'].length > 0" class="row">
				<div class="th col-12">
					<button type="submit">Далее</button>
				</div>
			</div>
		</div>
	</form>
</template>

<script setup>
	import { definePageMeta, getConsumption, getDistance, getDuration, getSpeed, getStorage, navigateTo, useApiPost, useApiSubmit, useNuxtData } from '#imports';
	import useStore from '~/store/index.js';
	import { computed, onMounted, ref, toRef, watch } from 'vue';
	import { storeToRefs } from 'pinia';
	import dayjs from 'dayjs';
	import { useNow } from '@vueuse/core';

	definePageMeta({
		middleware: ['auth'],
	});

	let { data } = useNuxtData('page-fleet.checkout');

	if (data.value === null) {
		await navigateTo('/fleet');
	}

	const page = toRef(data.value);

	const store = useStore();

	const formRef = ref();
	const resource = ref({
		metal: 0, crystal: 0, deuterium: 0,
	});
	const speed = ref(10);
	const distance = ref(0);
	const duration = ref(0);
	const storage = ref(0);
	const maxspeed = ref(0);
	const consumption = ref(0);
	const moon = ref();

	const now = useNow({ interval: 1000 });
	const target_time = computed(() => now.value.getTime() + (duration.value * 1000));

	const alliance = ref(0);
	const hold_hours = ref(1);

	const { planet } = storeToRefs(store);

	const hold = computed(() => {
		let hold = 0;

		if (page.value['mission'] === 5) {
			hold = page.value['ships'].reduce((summ, item) => item['stay'] * hold_hours.value, 0);
		}

		return hold;
	})

	const capacity = computed(() => {
		return storage.value - resource.value.metal - resource.value.crystal - resource.value.deuterium - hold.value;
	})

	onMounted(() => {
		info();
	});

	watch(() => page.value?.target, async () => {
		let ships = {}
		page.value['ships'].forEach((item) => ships[item['id']] = item['count']);

		let result = await useApiPost('/fleet/checkout', {
			...page.value['target'], ships,
		});

		delete result['target'];

		page.value = Object.assign(page.value, result);

		info();
	}, { deep: true });

	function info () {
		distance.value = getDistance(planet.value['coordinates'], page.value['target']);
		maxspeed.value = getSpeed(page.value['ships']);

		duration.value = getDuration({
			factor: speed.value,
			distance: distance.value,
			max_speed: maxspeed.value,
			universe_speed: store['speed']['fleet']
		});

		consumption.value = getConsumption({
			ships: page.value['ships'],
			duration: duration.value,
			distance: distance.value,
			universe_speed: store['speed']['fleet']
		});

		storage.value = getStorage(page.value['ships']) - consumption.value;
	}

	function setTarget (galaxy, system, planet, type) {
		page.value['target']['galaxy'] = galaxy
		page.value['target']['system'] = system
		page.value['target']['planet'] = planet

		if (typeof type === 'undefined')
			type = 1

		page.value['target']['planet_type'] = type
	}

	function allianceSet (index) {
		let al = page.value['alliances'][index]

		alliance.value = al['id']
		setTarget(al['galaxy'], al['system'], al['planet'], al['planet_type'])
	}

	function maxRes (type) {
		let current = resource.value.metal + resource.value.crystal + resource.value.deuterium
		current -= resource.value[type]

		let free = storage.value - current

		if (type === 'deuterium') {
			resource.value[type] = Math.max(Math.min(Math.floor(planet.value['resources'][type]['value'] - consumption.value), free), 0)
		} else {
			resource.value[type] = Math.max(Math.min(Math.floor(planet.value['resources'][type]['value']), free), 0)
		}
	}

	function maxResAll () {
		let free = storage.value - Math.floor(planet.value['resources']['metal']['value']) - Math.floor(planet.value['resources']['crystal']['value']) - Math.floor(planet.value['resources']['deuterium']['value'] - consumption.value)

		if (free < 0) {
			resource.value.metal = Math.max(Math.min(Math.floor(planet.value['resources']['metal']['value']), storage.value), 0)
			resource.value.crystal = Math.max(Math.min(Math.floor(planet.value['resources']['crystal']['value']), storage.value - resource.value.metal), 0)
			resource.value.deuterium = Math.max(Math.min(Math.floor(planet.value['resources']['deuterium']['value'] - consumption.value), storage.value - resource.value.metal - resource.value.crystal), 0)
		} else {
			resource.value.metal = Math.max(Math.floor(planet.value['resources']['metal']['value']), 0)
			resource.value.crystal = Math.max(Math.floor(planet.value['resources']['crystal']['value']), 0)
			resource.value.deuterium = Math.max(Math.floor(planet.value['resources']['deuterium']['value'] - consumption.value), 0)
		}
	}

	function clearResAll () {
		resource.value.metal = resource.value.crystal = resource.value.deuterium = 0
	}

	function send() {
		let ships = {};
		page.value.ships.forEach((ship) => ships[ship.id] = ship.count);

		useApiSubmit('/fleet/send', {
			ships,
			...page.value['target'],
			alliance: alliance.value,
			fleet: page.value['fleet'],
			mission: page.value['mission'],
			moon: moon.value,
			...resource.value,
		}, (result) => {
			const { data } = useNuxtData('page-fleet.send');
			data.value = result;

			store.loadState();

			navigateTo('/fleet/send');
		});
	}
</script>