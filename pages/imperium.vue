<template>
	<div class="page-imperium table-responsive">
		<table class="table">
			<tbody>
			<tr valign="left">
				<td class="c" :colspan="rows">Обзор империи</td>
			</tr>
			<tr>
				<th>&nbsp;</th>
				<th v-for="planet in page['planets']" width="75">
					<NuxtLinkLocale :to="'/overview/?chpl='+planet['id']">
						<img :src="'/images/planeten/small/s_'+planet['image']+'.jpg'" height="75" width="75" alt="">
					</NuxtLinkLocale>
				</th>
				<th width="100">Сумма</th>
			</tr>
			<tr>
				<th>Название</th>
				<th v-for="planet in page['planets']">
					<NuxtLinkLocale :to="'/overview/?chpl='+planet['id']">{{ planet['name'] }}</NuxtLinkLocale>
				</th>
				<th>&nbsp;</th>
			</tr>
			<tr>
				<th>Координаты</th>
				<th v-for="planet in page['planets']">
					[<NuxtLinkLocale :to="'/galaxy/'+planet['position']['galaxy']+'/'+planet['position']['system']+'/'">{{ planet['position']['galaxy'] }}:{{ planet['position']['system'] }}:{{ planet['position']['planet'] }}</NuxtLinkLocale>]
				</th>
				<th>&nbsp;</th>
			</tr>
			<tr>
				<th>Поля</th>
				<th v-for="planet in page['planets']">
					{{ planet['fields'] }} / {{ planet['fields_max'] }}
				</th>
				<th>{{ total.fields }} / {{ total.fields_max }}</th>
			</tr>
			<tr>
				<th>Кредиты</th>
				<th :colspan="rows - 2">&nbsp;</th>
				<th>
					<span class="neutral">{{ $number(page['credits']) }}</span>
				</th>
			</tr>
			<tr>
				<td class="c" :colspan="rows" align="left">Ресурсы на планете</td>
			</tr>
			<tr v-for="res in Object.keys($tm('RESOURCES')).filter((r) => r !== 'energy')">
				<th>{{ $t('RESOURCES.' + res) }}</th>
				<th v-for="planet in page['planets']">
					<span :class="[planet['resources'][res]['current'] < planet['resources'][res]['storage'] ? 'positive' : 'negative']">{{ $number(planet['resources'][res]['current']) }}</span>
				</th>
				<th>{{ $number(total['resources'][res]) }}</th>
			</tr>
			<tr>
				<th>{{ $t('RESOURCES.energy') }}</th>
				<th v-for="planet in page['planets']">
					<span :class="[planet['resources']['energy']['current'] >= 0 ? 'positive' : 'negative']">{{ $number(planet['resources']['energy']['current']) }}</span>
				</th>
				<th>{{ $number(total['resources']['energy']) }}</th>
			</tr>
			<tr>
				<th>Заряд</th>
				<th v-for="planet in page['planets']">
					<span :class="[planet['resources']['energy']['storage'] === 100 ? 'positive' : 'negative']">{{ $number(planet['resources']['energy']['storage']) }}</span>%
				</th>
				<th>&nbsp;</th>
			</tr>

			<tr>
				<td class="c" :colspan="rows" align="left">Производство в час</td>
			</tr>
			<tr v-for="res in Object.keys($tm('RESOURCES')).filter((r) => r !== 'energy')">
				<th>{{ $t('RESOURCES.'+res) }}</th>
				<th v-for="planet in page['planets']">{{ $number(planet['resources'][res]['production']) }}</th>
				<th>{{ $number(total['production'][res]) }}</th>
			</tr>

			<tr>
				<td class="c" :colspan="rows" align="left">Уровень производства</td>
			</tr>
			<tr v-for="(item, i) in [1, 2, 3, 4, 12, 212]">
				<th>{{ $t('TECH.'+item) }}</th>
				<th v-for="planet in page['planets']">
					<span :class="[planet['factor'][item] >= 100 ? 'positive' : 'negative']">{{ $number(planet['factor'][item]) }}</span>%
				</th>
				<th v-if="i === 0" rowspan="6">&nbsp;</th>
			</tr>
			<tr>
				<td class="c" :colspan="rows" align="left">Постройки</td>
			</tr>
			<tr v-for="id in Object.keys($tm('TECH')).filter((r) => r < 100)">
				<th>{{ $t('TECH.' + id) }}</th>
				<th v-for="planet in page['planets']">
					<span v-if="planet['elements'][id]?.['current'] > 0 || planet['elements'][id]?.['build'] > 0">
						{{ $number(planet['elements'][id]['current']) }}
					</span>
					<span v-else>-</span>
					<span v-if="planet['elements'][id]?.['build'] > 0" class="positive">-> {{ $number(planet['elements'][id]['build']) }}</span>
				</th>
				<th>
					<span>
						{{ $number(total['elements'][id]['current']) }}
					</span>
					<span v-if="total['elements'][id]['build'] > 0" class="positive">
						-> {{ $number(total['elements'][id]['build']) }}
					</span>
				</th>
			</tr>
			<tr>
				<td class="c" :colspan="rows" align="left">Флот</td>
			</tr>
			<tr v-for="id in Object.keys($tm('TECH')).filter((r) => r > 200 && r < 300)">
				<th>{{ $t('TECH.' + id) }}</th>
				<th v-for="planet in page['planets']">
					<span v-if="planet['elements'][id]?.['current'] > 0 || planet['elements'][id]?.['build'] > 0 || planet['elements'][id]?.['fly'] > 0">
						{{ $number(planet['elements'][id]?.['current']) }}
					</span>
					<span v-else>-</span>
					<span v-if="planet['elements'][id]?.['build'] > 0" class="positive">
						+ {{ $number(planet['elements'][id]['build']) }}
					</span>
					<span v-if="planet['elements'][id]?.['fly'] > 0" class="neutral">
						+ {{ $number(planet['elements'][id]['fly']) }}
					</span>
				</th>
				<th>
					<span>
						{{ $number(total['elements'][id]?.['current']) }}
					</span>
					<span v-if="total['elements'][id]?.['build'] > 0" class="positive">
						+ {{ $number(total['elements'][id]['build']) }}
					</span>
					<span v-if="total['elements'][id]?.['fly'] > 0" class="neutral">
						+ {{ $number(total['elements'][id]['fly']) }}
					</span>
				</th>
			</tr>
			<tr>
				<td class="c" :colspan="rows" align="left">Оборона</td>
			</tr>
			<tr v-for="id in Object.keys($tm('TECH')).filter((r) => r > 400 && r < 600)">
				<th>{{ $t('TECH.' + id) }}</th>
				<th v-for="planet in page['planets']">
					<span v-if="planet['elements'][id]?.['current'] > 0 || planet['elements'][id]?.['build'] > 0">
						{{ $number(planet['elements'][id]['current']) }}
					</span>
					<span v-else>-</span>
					<span v-if="planet['elements'][id]?.['build'] > 0" class="positive">
						+ {{ $number(planet['elements'][id]['build']) }}
					</span>
				</th>
				<th>
					<span>
						{{ $number(total['elements'][id]?.['current']) }}
					</span>
					<span v-if="total['elements'][id]?.['build'] > 0" class="positive">
						+ {{ $number(total['elements'][id]['build']) }}
					</span>
				</th>
			</tr>
			<tr>
				<td class="c" :colspan="rows" align="left">Технологии</td>
			</tr>
			<tr v-for="(item, id) in page['tech']">
				<th :colspan="rows - 1">{{ $t('TECH.'+id) }}</th>
				<th>
					<span class="neutral">{{ item['current'] }}</span>
					<span v-if="item['build'] > 0" class="positive">
						-> {{ item['build'] }}
					</span>
				</th>
			</tr>
			</tbody>
		</table>
	</div>
</template>

<script setup>
	import { definePageMeta, showError, useAsyncData, useI18n, useRoute } from '#imports';
	import useStore from '~/store';
	import { computed, toRefs, watch } from 'vue';

	definePageMeta({
		middleware: ['auth'],
	});

	const route = useRoute();
	const store = useStore();

	const { data, error, refresh } = await useAsyncData(async () => {
		return await store.loadPage();
	});

	watch(() => route.query, () => refresh());

	if (error.value) {
		throw showError(error.value);
	}

	const { tm } = useI18n();
	const { page } = toRefs(data.value);

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

		let resources = Object.keys(tm('RESOURCES'));
		let elements = Object.keys(tm('TECH'));

		for (let res of resources) {
			result.resources[res] = 0
			result.production[res] = 0
		}

		for (let id of elements) {
			result.elements[id] = {
				current: 0,
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
				result.resources[res] += planet['resources'][res]['current']
				result.production[res] += planet['resources'][res]['production']
			}

			for (let id of elements) {
				if (id < 100) {
					if (result.elements[id].current < planet['elements']['e' + id]['current'])
						result.elements[id].current = planet['elements']['e' + id]['current']

					if (result.elements[id].build < planet['elements']['e' + id]['build'])
						result.elements[id].build = planet['elements']['e' + id]['build']
				} else if (id > 200 && id < 300) {
					result.elements[id].current += planet['elements']['e' + id]['current']
					result.elements[id].build += planet['elements']['e' + id]['build']
					result.elements[id].fly += planet['elements']['e' + id]['fly']
				} else if (id > 400 && id < 600) {
					result.elements[id].current += planet['elements']['e' + id]['current']
					result.elements[id].build += planet['elements']['e' + id]['build']
				}
			}
		})

		for (let id of elements) {
			if (id < 100) {
				if (result.elements[id].current > result.elements[id].build - 1)
					result.elements[id].build = 0
			}
		}

		return result;
	});
</script>