<template>
	<div class="row overview-fleets-row">
		<div class="col-3 col-sm-2 th">
			<div class="z">
				<Timer :value="item['date']"/>
			</div>
			<div class="positive">{{ $formatDate(item['date'], 'DD MMM') }}</div>
		</div>
		<div class="col-9 col-sm-10 th text-start" :class="[fleetStatus[item['status']], item['owner'] ? 'own' : '', fleetStyle[item['mission']]]">
			<template v-if="item['owner']">Ваш</template>
			<template v-else>{{ item['assault'] ? 'Союзный ' : 'Чужой' }}</template>

			<Popper>
				<template #content>
					<table width="200">
						<tbody>
						<template v-if="!Object.keys(item['units']).length">
							<tr><td width=100% align=center><span style="color: white">Нет информации</span></td></tr>
						</template>
						<template v-else>
							<tr v-for="(count, unit) in item['units']">
								<td v-if="count === null" width=100% align=center colspan=2><span style="color: white">{{ $t('tech.' + unit) }}</span></td>
								<td v-if="count !== null" width=75% align=left><span style="color: white">{{ $t('tech.' + unit) }}:</span></td>
								<td v-if="count !== null" width=25% align=right><span style="color: white">{{ $formatNumber(count) }}</span></td>
							</tr>
							<tr v-if="item['total']"><td width=50% align=left><span style="color: white">Численность:</span></td><td width=50% align=right><span style="color: white">{{ $formatNumber(item['total']) }}</span></td></tr>
						</template>
						</tbody>
					</table>
				</template>

				<template v-if="units.length && item['mission'] === 1">
					<NuxtLink :to="'/sim?units=' + units">флот</NuxtLink>
				</template>
				<a v-else>флот</a>
			</Popper>

			<template v-if="!item['owner']">
				игрока
				<template v-if="item['user']">
					{{ item['user']['name'] }} <NuxtLink :to="'/messages/write/' + item['user']['id']" title="Отправить сообщение"><span class="sprite skin_m"></span></NuxtLink>
				</template>
			</template>

			<template v-if="item['status'] === 0">
				отправленный
				{{ start }} <NuxtLink :to="'/galaxy?galaxy=' + item['start']['galaxy'] + '&system=' + item['start']['system']">[{{ item['start']['galaxy'] }}:{{ item['start']['system'] }}:{{ item['start']['planet'] }}]</NuxtLink>
				направляется к
				{{ target }} <NuxtLink :to="'/galaxy?galaxy=' + item['target']['galaxy'] + '&system=' + item['target']['system']">[{{ item['target']['galaxy'] }}:{{ item['target']['system'] }}:{{ item['target']['planet'] }}]</NuxtLink>
			</template>
			<template v-else-if="item['status'] === 1">
				отправленный
				{{ start }} <NuxtLink :to="'/galaxy?galaxy=' + item['start']['galaxy'] + '&system=' + item['start']['system']">[{{ item['start']['galaxy'] }}:{{ item['start']['system'] }}:{{ item['start']['planet'] }}]</NuxtLink>

				<template v-if="item['mission'] === 5">защищает</template>
				<template v-else>исследует</template>

				{{ target }} <NuxtLink :to="'/galaxy?galaxy=' + item['target']['galaxy'] + '&system=' + item['target']['system']">[{{ item['target']['galaxy'] }}:{{ item['target']['system'] }}:{{ item['target']['planet'] }}]</NuxtLink>
			</template>
			<template v-else>
				отправленный
				{{ target }} <NuxtLink :to="'/galaxy?galaxy=' + item['target']['galaxy'] + '&system=' + item['target']['system']">[{{ item['target']['galaxy'] }}:{{ item['target']['system'] }}:{{ item['target']['planet'] }}]</NuxtLink>
				{{ start }} <NuxtLink :to="'/galaxy?galaxy=' + item['start']['galaxy'] + '&system=' + item['start']['system']">[{{ item['start']['galaxy'] }}:{{ item['start']['system'] }}:{{ item['start']['planet'] }}]</NuxtLink>
			</template>.
			Задание:
			<template v-if="item['resources']['metal'] > 0 || item['resources']['crystal'] > 0 || item['resources']['deuterium'] > 0">
				<Popper>
					<template #content>
						<table width=200>
							<tbody>
							<tr>
								<td width=50% align=left>{{ $t('resources.metal') }}</td>
								<td width=50% align=right>{{ $formatNumber(item['resources']['metal']) }}</td>
							</tr>
							<tr>
								<td width=50% align=left>{{ $t('resources.crystal') }}</td>
								<td width=50% align=right>{{ $formatNumber(item['resources']['crystal']) }}</td>
							</tr>
							<tr>
								<td width=50% align=left>{{ $t('resources.deuterium') }}</td>
								<td width=50% align=right>{{ $formatNumber(item['resources']['deuterium']) }}</td>
							</tr>
							</tbody>
						</table>
					</template>
					<span>{{ $t('fleet_mission.' + item.mission) }}</span>
				</Popper>
			</template>
			<template v-else>
				{{ $t('fleet_mission.' + item.mission) }}
			</template>
		</div>
	</div>
</template>

<script setup>
	import { computed } from 'vue';

	const { item } = defineProps({
		item: Object
	});

	const units = computed(() => {
		let result = '';

		for (let init in item['units']) {
			if (init === 'total' || item['units'][init] === null) {
				continue;
			}

			result += init + ',' + item['units'][init] + ';';
		}

		return result;
	});

	const start = computed(() => {
		let result = '';

		if (item['status'] !== 2) {
			if (item['start_name'] === null || item['start_name'] === '') {
				result = ' с координат ';
			} else {
				if (item['start']['planet_type'] === 1) {
					result = 'с планеты';
				} else if (item['start']['planet_type'] === 3) {
					result = 'с луны';
				} else if (item['start']['planet_type'] === 5) {
					result = 'с военной базы';
				}

				result += ' ' + item['start_name'] + ' ';
			}
		} else {
			if (item['start_name'] === null || item['start_name'] === '') {
				result = ' на координаты ';
			} else {
				if (item['start']['planet_type'] === 1) {
					result = 'возвращается на планету';
				} else if (item['start']['planet_type'] === 3) {
					result = 'возвращается на луну';
				} else if (item['start']['planet_type'] === 5) {
					result = 'возвращается на военную базу';
				}

				result += ' ' + item['start_name'] + ' ';
			}
		}

		return result;
	});

	const target = computed(() => {
		let result = '';

		if (item['status'] !== 2) {
			if (item['target_name'] === null || item['target_name'] === '') {
				result = ' координаты ';
			} else {
				if (item['mission'] !== 15 && item['mission'] !== 5) {
					if (item['target']['planet_type'] === 1) {
						result = 'планете';
					} else if (item['target']['planet_type'] === 2) {
						result = 'луне';
					} else if (item['target']['planet_type'] === 3) {
						result = 'полю обломков';
					} else if (item['target']['planet_type'] === 5) {
						result = ' военной базе ';
					}
				} else {
					result = 'координатам';
				}

				result += ' ' + item['target_name'] + ' ';
			}
		} else {
			if (item['target_name'] === null || item['target_name'] === '') {
				result = ' с координат ';
			} else {
				if (item['mission'] !== 15) {
					if (item['target']['planet_type'] === 1) {
						result = 'с планеты';
					} else if (item['target']['planet_type'] === 2) {
						result = 'с луны';
					} else if (item['target']['planet_type'] === 3) {
						result = 'с поля обломков';
					} else if (item['target']['planet_type'] === 5) {
						result = ' с военной базы ';
					}
				} else {
					result = 'с позиции';
				}

				result += ' ' + item['target_name'] + ' ';
			}
		}

		return result;
	});

	const fleetStyle = {
		1: 'attack',
		2: 'federation',
		3: 'transport',
		4: 'deploy',
		5: 'transport',
		6: 'espionage',
		7: 'colony',
		8: 'harvest',
		9: 'destroy',
		10: 'missile',
		15: 'transport',
		20: 'attack',
	};

	const fleetStatus = {
		0: 'flight',
		1: 'holding',
		2: 'return',
	};
</script>