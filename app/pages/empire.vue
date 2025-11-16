<template>
	<div class="page-empire table-responsive">
		<table class="table">
			<tbody>
			<tr valign="left">
				<td class="c" :colspan="rows">{{ $t('pages.empire.title') }}</td>
			</tr>
			<tr>
				<td class="th">&nbsp;</td>
				<td class="th text-center" v-for="planet in page['planets']" width="75">
					<a href="" @click.prevent="toPlanet(planet['id'])">
						<img :src="'/images/planeten/small/s_'+planet['image']+'.jpg'" height="75" width="75" alt="">
					</a>
				</td>
				<td class="th text-center" width="100">{{ $t('pages.empire.total') }}</td>
			</tr>
			<tr>
				<td class="th">{{ $t('pages.empire.planet_name') }}</td>
				<td class="th text-center" v-for="planet in page['planets']">
					<a href="" @click.prevent="toPlanet(planet['id'])">{{ planet['name'] }}</a>
				</td>
				<td class="th">&nbsp;</td>
			</tr>
			<tr>
				<td class="th">{{ $t('pages.empire.planet_coordinates') }}</td>
				<td class="th text-center" v-for="planet in page['planets']">
					[<NuxtLink :to="'/galaxy/'+planet['position']['galaxy']+'/'+planet['position']['system']+'/'">{{ planet['position']['galaxy'] }}:{{ planet['position']['system'] }}:{{ planet['position']['planet'] }}</NuxtLink>]
				</td>
				<td class="th">&nbsp;</td>
			</tr>
			<tr>
				<td class="th">{{ $t('pages.empire.planet_fields') }}</td>
				<td class="th text-center" v-for="planet in page['planets']">
					{{ planet['fields'] }} / {{ planet['fields_max'] }}
				</td>
				<td class="th text-center">{{ total.fields }} / {{ total.fields_max }}</td>
			</tr>
			<tr>
				<td class="th">{{ $t('credits') }}</td>
				<td class="th" :colspan="rows - 2">&nbsp;</td>
				<td class="th text-center">
					<span class="neutral">{{ $formatNumber(user['credits']) }}</span>
				</td>
			</tr>
			<tr>
				<td class="c" :colspan="rows" align="left">{{ $t('pages.empire.resources') }}</td>
			</tr>
			<tr v-for="res in Object.keys($tm('resources')).filter((r) => r !== 'energy')">
				<td class="th">{{ $t('resources.' + res) }}</td>
				<td class="th text-center" v-for="planet in page['planets']">
					<span :class="[planet['resources'][res]['value'] < planet['resources'][res]['storage'] ? 'positive' : 'negative']">{{ $formatNumber(planet['resources'][res]['value']) }}</span>
				</td>
				<td class="th text-center">{{ $formatNumber(total['resources'][res]) }}</td>
			</tr>
			<tr>
				<td class="th">{{ $t('resources.energy') }}</td>
				<td class="th text-center" v-for="planet in page['planets']">
					<span :class="[planet['resources']['energy']['value'] >= 0 ? 'positive' : 'negative']">{{ $formatNumber(planet['resources']['energy']['value']) }}</span>
				</td>
				<td class="th text-center">{{ $formatNumber(total['resources']['energy']) }}</td>
			</tr>

			<tr>
				<td class="c" :colspan="rows" align="left">{{ $t('pages.empire.production_per_hour') }}</td>
			</tr>
			<tr v-for="res in Object.keys($tm('resources')).filter((r) => r !== 'energy')">
				<td class="th">{{ $t('resources.'+res) }}</td>
				<td class="th text-center" v-for="planet in page['planets']">{{ $formatNumber(planet['resources'][res]['production']) }}</td>
				<td class="th text-center">{{ $formatNumber(total['production'][res]) }}</td>
			</tr>

			<tr>
				<td class="c" :colspan="rows" align="left">{{ $t('pages.empire.production_level') }}</td>
			</tr>
			<tr v-for="(item, i) in [1, 2, 3, 4, 12, 212]">
				<td class="th">{{ $t('tech.'+item) }}</td>
				<td class="th text-center" v-for="planet in page['planets']">
					<span :class="[planet['factor'][item] >= 100 ? 'positive' : 'negative']">{{ $formatNumber(planet['factor'][item]) }}</span>%
				</td>
				<td class="th text-center" v-if="i === 0" rowspan="6">&nbsp;</td>
			</tr>
			<tr>
				<td class="c" :colspan="rows" align="left">{{ $t('pages.empire.list_buildings') }}</td>
			</tr>
			<tr v-for="id in Object.keys($tm('tech')).filter((r) => r < 100)">
				<td class="th">{{ $t('tech.' + id) }}</td>
				<td class="th text-center" v-for="planet in page['planets']">
					<span v-if="planet['elements'][id]?.['value'] > 0 || planet['elements'][id]?.['build'] > 0">
						{{ $formatNumber(planet['elements'][id]['value']) }}
					</span>
					<span v-else>-</span>
					<span v-if="planet['elements'][id]?.['build'] > 0" class="positive">-> {{ $formatNumber(planet['elements'][id]['build']) }}</span>
				</td>
				<td class="th text-center">
					<span>
						{{ $formatNumber(total['elements'][id]['value']) }}
					</span>
					<span v-if="total['elements'][id]['build'] > 0" class="positive">
						-> {{ $formatNumber(total['elements'][id]['build']) }}
					</span>
				</td>
			</tr>
			<tr>
				<td class="c" :colspan="rows" align="left">{{ $t('pages.empire.list_fleets') }}</td>
			</tr>
			<tr v-for="id in Object.keys($tm('tech')).filter((r) => r > 200 && r < 300)">
				<td class="th">{{ $t('tech.' + id) }}</td>
				<td class="th text-center" v-for="planet in page['planets']">
					<span v-if="planet['elements'][id]?.['value'] > 0 || planet['elements'][id]?.['build'] > 0 || planet['elements'][id]?.['fly'] > 0">
						{{ $formatNumber(planet['elements'][id]?.['value']) }}
					</span>
					<span v-else>-</span>
					<span v-if="planet['elements'][id]?.['build'] > 0" class="positive">
						+ {{ $formatNumber(planet['elements'][id]['build']) }}
					</span>
					<span v-if="planet['elements'][id]?.['fly'] > 0" class="neutral">
						+ {{ $formatNumber(planet['elements'][id]['fly']) }}
					</span>
				</td>
				<td class="th text-center">
					<span>
						{{ $formatNumber(total['elements'][id]?.['value']) }}
					</span>
					<span v-if="total['elements'][id]?.['build'] > 0" class="positive">
						+ {{ $formatNumber(total['elements'][id]['build']) }}
					</span>
					<span v-if="total['elements'][id]?.['fly'] > 0" class="neutral">
						+ {{ $formatNumber(total['elements'][id]['fly']) }}
					</span>
				</td>
			</tr>
			<tr>
				<td class="c" :colspan="rows" align="left">{{ $t('pages.empire.list_defense') }}</td>
			</tr>
			<tr v-for="id in Object.keys($tm('tech')).filter((r) => r > 400 && r < 600)">
				<td class="th">{{ $t('tech.' + id) }}</td>
				<td class="th text-center" v-for="planet in page['planets']">
					<span v-if="planet['elements'][id]?.['value'] > 0 || planet['elements'][id]?.['build'] > 0">
						{{ $formatNumber(planet['elements'][id]['value']) }}
					</span>
					<span v-else>-</span>
					<span v-if="planet['elements'][id]?.['build'] > 0" class="positive">
						+ {{ $formatNumber(planet['elements'][id]['build']) }}
					</span>
				</td>
				<td class="th text-center">
					<span>
						{{ $formatNumber(total['elements'][id]?.['value']) }}
					</span>
					<span v-if="total['elements'][id]?.['build'] > 0" class="positive">
						+ {{ $formatNumber(total['elements'][id]['build']) }}
					</span>
				</td>
			</tr>
			<tr>
				<td class="c" :colspan="rows" align="left">{{ $t('pages.empire.list_techs') }}</td>
			</tr>
			<tr v-for="item in page['tech']">
				<td class="th" :colspan="rows - 1">{{ $t('tech.' + item['id']) }}</td>
				<td class="th text-center">
					<span class="neutral">{{ item['value'] }}</span>
					<span v-if="item['build'] > 0" class="positive">
						-> {{ item['build'] }}
					</span>
				</td>
			</tr>
			</tbody>
		</table>
	</div>
</template>

<script setup>
	import { definePageMeta, showError, useApiPost, useAsyncData, useHead, useI18n, useRoute, navigateTo, useApiGet } from '#imports';
	import useStore from '~/store';
	import { computed } from 'vue';
	import { storeToRefs } from 'pinia';

	definePageMeta({
		middleware: ['auth'],
		view: {
			resources: false,
		}
	});

	useHead({
		title: 'Империя',
	});

	const { data: page, error } = await useAsyncData(async () => {
		return await useApiGet('/empire');
	}, { watch: [() => useRoute().query] });

	if (error.value) {
		throw showError(error.value);
	}

	const { tm } = useI18n();
	const { user } = storeToRefs(useStore());

	const rows = computed(() => {
		if (!page.value) {
			return 2;
		}

		return page.value['planets'].length + 2
	});

	const total = computed(() => {
		let result = {
			fields: 0,
			fields_max: 0,
			resources: {},
			production: {},
			elements: {},
		};

		let resources = Object.keys(tm('resources'));
		let elements = Object.keys(tm('tech'));

		for (let res of resources) {
			result.resources[res] = 0
			result.production[res] = 0
		}

		for (let id of elements) {
			result.elements[id] = {
				value: 0,
				build: 0,
				fly: 0
			};
		}

		if (!page.value) {
			return result
		}

		page.value['planets'].forEach((planet) => {
			result.fields += planet['fields']
			result.fields_max += planet['fields_max']

			for (let res of resources) {
				if (typeof planet['resources'][res] === 'undefined') {
					return;
				}

				result.resources[res] += planet['resources'][res]['value']
				result.production[res] += planet['resources'][res]['production']
			}

			for (let id of elements) {
				if (typeof planet['elements'][id] === 'undefined') {
					continue;
				}

				if (id < 100) {
					if (result.elements[id].value < planet['elements'][id]['value'])
						result.elements[id].value = planet['elements'][id]['value']

					if (result.elements[id].build < planet['elements'][id]['build'])
						result.elements[id].build = planet['elements'][id]['build']
				} else if (id > 200 && id < 300) {
					result.elements[id].value += planet['elements'][id]['value']
					result.elements[id].build += planet['elements'][id]['build']
					result.elements[id].fly += planet['elements'][id]['fly']
				} else if (id > 400 && id < 600) {
					result.elements[id].value += planet['elements'][id]['value']
					result.elements[id].build += planet['elements'][id]['build']
				}
			}
		})

		for (let id of elements) {
			if (id < 100) {
				if (result.elements[id].value > result.elements[id].build - 1)
					result.elements[id].build = 0
			}
		}

		return result;
	});

	async function toPlanet(id) {
		await useApiPost('/user/planet/' + id, {});

		navigateTo('/overview');
	}
</script>