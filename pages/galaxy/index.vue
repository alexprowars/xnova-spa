<template>
	<div v-if="page" class="page-galaxy">
		<GalaxySelector
			:shortcuts="page['shortcuts']"
			:galaxy="page['galaxy']"
			:galaxy-max="page['galaxy_max']"
			:system="page['system']"
			:system-max="page['system_max']"
			@change="changeCoordinates"
		/>

		<MissileAttack v-if="missile" :page="page" :planet="missilePlanet" @close="missile = false"/>

		<div class="table-responsive">
			<table class="table galaxy text-center">
				<tbody>
					<tr>
						<td class="c" colspan="9">Солнечная система {{ page['galaxy'] }}:{{ page['system'] }}</td>
					</tr>
					<tr>
						<td class="c" width="35">№</td>
						<td class="c" width="34">&nbsp;</td>
						<td class="c">Планета</td>
						<td class="c" width="34">&nbsp;</td>
						<td class="c" width="30">ПО</td>
						<td class="c" width="180">Игрок</td>
						<td class="c" width="30">&nbsp;</td>
						<td class="c" width="100">Альянс</td>
						<td class="c" width="135">Действия</td>
					</tr>

					<GalaxyRow v-for="(item, index) in rows"
						:key="page['galaxy'] + ':' + page['system'] + ':' + index"
						:item="item"
						:user="page['user']"
						:galaxy="page['galaxy']"
						:system="page['system']"
						:planet="index + 1"
						@sendMissile="sendMissile(item['planet'])"
					/>

					<tr v-if="user['technology']['expedition_tech']">
						<th width="30">16</th>
						<th colspan="8" class="c big">
							<NuxtLink :to="'/fleet/?galaxy=' + page['galaxy'] + '&system=' + page['system'] + '&planet=16&mission=15'">неизведанные дали</NuxtLink>
						</th>
					</tr>
					<tr>
						<td class="c" colspan="6">
							<span v-if="page.items.length === 0">нет заселённых планет</span>
							<span v-else>{{ page.items.length }} {{ $morph(page.items.length, 'заселённая планета', 'заселённые планеты', 'заселённых планет') }}</span>
						</td>
						<td class="c" colspan="3">
							<Popper>
								<template #content>
									<GalaxyLegend/>
								</template>
								<span>Легенда</span>
							</Popper>
						</td>
					</tr>
					<tr>
						<td class="c" colspan="3">{{ planet['units']['interplanetary_misil'] }} {{ $morph(planet['units']['interplanetary_misil'], 'ракета', 'ракеты', 'ракет') }}</td>
						<td class="c" colspan="3">{{ page['user']['fleets'] }} / {{ user['fleets_max'] }} {{ $morph(page['user']['fleets'], 'флот', 'флота', 'флотов') }}</td>
						<td class="c" colspan="3">
							<div>{{ $formatNumber(planet['units']['recycler']) }} {{ $morph(planet['units']['recycler'], 'переработчик', 'переработчика', 'переработчиков') }}</div>
							<div>{{ $formatNumber(planet['units']['spy_sonde']) }} {{ $morph(planet['units']['spy_sonde'], 'шпионский зонд', 'шпионских зонда', 'шпионских зондов') }}</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script setup>
	import GalaxyRow from '~/components/Page/Galaxy/Row.vue';
	import GalaxySelector from '~/components/Page/Galaxy/Selector.vue';
	import GalaxyLegend from '~/components/Page/Galaxy/Legend.vue';
	import MissileAttack from '~/components/Page/Galaxy/MissileAttack.vue';
	import { definePageMeta, showError, useApiGet, useAsyncData, useHead, useRoute } from '#imports';
	import useStore from '~/store';
	import { computed, ref } from 'vue';
	import { storeToRefs } from 'pinia';

	definePageMeta({
		middleware: ['auth'],
		view: {
			resources: false,
		}
	});

	useHead({
		title: 'Галактика',
	});

	const store = useStore();
	const route = useRoute();

	const galaxy = ref(route.params['galaxy'] || route.query['galaxy'] || null);
	const system = ref(route.params['system'] || route.query['system'] || null);

	const { data: page, error } = await useAsyncData(
		async () => await useApiGet('/galaxy', { galaxy: galaxy.value, system: system.value }),
		{ watch: [() => useRoute().query, galaxy, system] }
	);

	if (error.value) {
		throw showError(error.value);
	}

	const missile = ref(false);
	const missilePlanet = ref(0);
	const { user, planet } = storeToRefs(store);

	const rows = computed(() => {
		let result = [];

		for (let i = 1; i <= 15; i++) {
			result.push(page.value.items.find(item => item.position.planet === i) || null);
		}

		return result;
	});

	function sendMissile (planet) {
		missile.value = true
		missilePlanet.value = planet
	}

	function changeCoordinates(value) {
		galaxy.value = value.galaxy || 1;
		system.value = value.system || 1;
	}
</script>