<template>
	<div class="block">
		<div class="title">Отправка флота</div>
		<div class="content">
			<form v-if="page" ref="formRef" class="block-table text-center" method="post" @submit.prevent="send">
				<div class="grid grid-cols-2">
					<div class="th middle">Цель</div>
					<div class="th middle gap-2 fleet-coordinates-input">
						<input type="number" min="1" :max="page['galaxy_max']" v-model="page['target']['galaxy']">
						<input type="number" min="1" :max="page['system_max']" v-model="page['target']['system']">
						<input type="number" min="1" :max="page['planet_max']" v-model="page['target']['planet']">
						<select name="planet_type" v-model="page['target']['planet_type']">
							<option v-for="index in Object.keys($tm('planet_type'))" :value="index">{{ $t('planet_type.' + index) }}</option>
						</select>
					</div>
				</div>
				<div class="grid grid-cols-2">
					<div class="th middle">Скорость</div>
					<div class="th middle gap-2">
						<select name="speed" v-model="speed" @change="info">
							<option v-for="i in 10" :value="11 - i">{{ (11 - i) * 10 }}</option>
						</select> %
					</div>
				</div>
				<div class="grid grid-cols-2">
					<div class="th">Расстояние</div>
					<div class="th">{{ $formatNumber(distance) }}</div>
				</div>
				<div class="grid grid-cols-2">
					<div class="th">Продолжительность полёта (к цели)</div>
					<div class="th">{{ $formatTime(duration, ':', true) }}</div>
				</div>
				<div class="grid grid-cols-2">
					<div class="th">Время прибытия (к цели)</div>
					<div class="th">{{ $formatDate(target_time, 'DD MMM HH:mm:ss') }}</div>
				</div>
				<div class="grid grid-cols-2">
					<div class="th">Максимальная скорость</div>
					<div class="th">{{ $formatNumber(maxspeed) }}</div>
				</div>
				<div class="grid grid-cols-2">
					<div class="th">Потребление топлива</div>
					<div class="th"><span :class="[storage > consumption ? 'positive' : 'negative']">{{ $formatNumber(consumption) }}</span></div>
				</div>
				<div class="grid grid-cols-2">
					<div class="th">Грузоподъёмность</div>
					<div class="th"><span :class="[storage > consumption ? 'positive' : 'negative']">{{ $formatNumber(storage) }}</span></div>
				</div>
				<div class="grid">
					<div class="c">Ссылки <NuxtLink to="/fleet/shortcut">(Просмотр / Редактирование)</NuxtLink></div>
				</div>

				<div v-if="page['shortcuts'].length > 0" class="grid" :class="{'grid-cols-2': page['shortcuts'].length !== 1}">
					<div v-for="link in page['shortcuts']" class="th">
						<a @click.prevent="setTarget(link['galaxy'], link['system'], link['planet'], link['planet_type'])">
							{{ link['name'] }} {{ link['galaxy'] }}:{{ link['system'] }}:{{ link['planet'] }}
							<span v-if="link['planet_type'] === 1">(P)</span>
							<span v-if="link['planet_type'] === 2">(D)</span>
							<span v-if="link['planet_type'] === 3">(L)</span>
						</a>
					</div>
				</div>
				<div v-else class="grid">
					<div class="th">
						<NuxtLink to="/fleet/shortcut/create" class="button">Добавить</NuxtLink>
					</div>
				</div>

				<div v-if="page['planets'].length > 0" class="grid">
					<div class="c">Планеты</div>
				</div>
				<div v-if="page['planets'].length > 0" class="grid grid-cols-2">
					<div v-for="(planet, i) in page['planets']" class="th" :class="['col-span-'+(page['planets'].length % 2 > 0 && i === page['planets'].length - 1 ? 2 : 1)]">
						<a @click.prevent="setTarget(planet['galaxy'], planet['system'], planet['planet'], planet['planet_type'])">
							{{ planet['name'] }} {{ planet['galaxy'] }}:{{ planet['system'] }}:{{ planet['planet'] }}
						</a>
					</div>
				</div>

				<div v-if="page['moons'].length > 0" class="grid">
					<div class="c">
						Межгалактические врата
						<span v-if="page['gate_time']" class="small">(заряжено через {{ $formatTime((dayjs(page['gate_time']).diff(now) / 1000), ':', true) }})</span>
					</div>
				</div>
				<div v-if="page['moons'].length > 0" class="grid grid-cols-2">
					<div v-for="(item, i) in page['moons']" class="th" :class="['col-span-'+(page['moons'].length % 2 > 0 && i === page['moons'].length - 1 ? 2 : 1)]">
						<input type="radio" v-model="moon" :value="item['id']" :id="'moon'+item['id']">
						<label :for="'moon'+item['id']">
							{{ item['name'] }} [{{ item['galaxy'] }}:{{ item['system'] }}:{{ item['planet'] }}]
							<span v-if="item['jumpgate']">{{ $formatTime((dayjs(page['jumpgate']).diff(now) / 1000), ':', true) }}</span>
						</label>
					</div>
				</div>

				<div v-if="page['alliances'].length > 0" class="grid">
					<div class="c">Боевые союзы</div>
				</div>
				<div v-for="(row, index) in page['alliances']" class="grid">
					<div class="th">
						<a @click.prevent="allianceSet(index)">({{ row['name'] }})</a>
					</div>
				</div>

				<div class="grid grid-cols-2">
					<div class="th">
						<div class="block">
							<div class="title">Миссия</div>
							<div class="content">
								<div class="block-table">
									<div v-for="mission in page['missions']">
										<div class="th flex items-center gap-2" style="text-align: left !important">
											<input :id="'m_'+mission" type="radio" v-model="page['mission']" :value="mission">
											<label :for="'m_'+mission">{{ $t('fleet_mission.'+mission) }}</label>

											<span v-if="mission === 15" class="text-center negative">
												Внимание во время экспедиции возможна потеря флота!
											</span>
										</div>
									</div>
									<div v-if="page['missions'].length === 0">
										<div class="th negative">Миссия невозможна</div>
									</div>
									<div>
										<div class="th">Время прилёта: {{ $formatDate(target_time, 'DD MMM HH:mm:ss') }}</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="th">
						<div class="block">
							<div class="title">Ресурсы</div>
							<div class="content">
								<div class="block-table">
									<div class="grid grid-cols-5">
										<div class="th col-span-2 middle">{{ $t('resources.metal') }}</div>
										<div class="th middle"><a @click.prevent="maxRes('metal')">макс.</a></div>
										<div class="th col-span-2 middle"><input v-model="resource.metal" :alt="$t('resources.metal')" size="10" type="text"></div>
									</div>
									<div class="grid grid-cols-5">
										<div class="th col-span-2 middle">{{ $t('resources.crystal') }}</div>
										<div class="th middle"><a @click.prevent="maxRes('crystal')">макс.</a></div>
										<div class="th col-span-2 middle"><input v-model="resource.crystal" :alt="$t('resources.crystal')" size="10" type="text"></div>
									</div>
									<div class="grid grid-cols-5">
										<div class="th col-span-2 middle">{{ $t('resources.deuterium') }}</div>
										<div class="th middle"><a @click.prevent="maxRes('deuterium')">макс.</a></div>
										<div class="th col-span-2 middle"><input v-model="resource.deuterium" :alt="$t('resources.deuterium')" size="10" type="text"></div>
									</div>
									<div class="grid grid-cols-5">
										<div class="th col-span-2">Остаток</div>
										<div class="th col-span-3">
											<span :class="[capacity >= 0 ? 'positive' : 'negative']">{{ $formatNumber(capacity) }}</span>
										</div>
									</div>
									<div>
										<div class="th"><a @click.prevent="maxResAll">Все ресурсы</a> | <a @click.prevent="clearResAll">Обнулить</a></div>
									</div>
									<div>
										<div class="th">&nbsp;</div>
									</div>

									<div v-if="page['mission'] === 15 && page['missions'].indexOf(15) >= 0" class="mission m_15">
										<div class="c">Время экспедиции</div>
									</div>
									<div v-if="page['mission'] === 15 && page['missions'].indexOf(15) >= 0" class="mission m_15">
										<div class="th">
											<select name="expeditiontime">
												<option v-for="i in page['expedition_hours']" :value="i">{{ i }} ч.</option>
											</select>
										</div>
									</div>

									<div v-if="page['mission'] === 5 && page['missions'].indexOf(5) >= 0" class="mission m_5">
										<div class="c">Оставаться часов на орбите</div>
									</div>
									<div v-if="page['mission'] === 5 && page['missions'].indexOf(5) >= 0" class="mission m_5">
										<div class="th">
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
												<br>Потребуется <span class="positive">{{ $formatNumber(hold) }}</span> дейтерия
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div v-if="page['missions'].length > 0" class="grid">
					<div class="th">
						<button type="submit">Далее</button>
					</div>
				</div>
			</form>
		</div>
	</div>
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

	let { data } = useNuxtData('fleet.checkout');

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
			speed: speed.value,
			resource: resource.value,
		}, (result) => {
			const { data } = useNuxtData('fleet.send');
			data.value = result;

			store.loadState();

			navigateTo('/fleet/send');
		});
	}
</script>