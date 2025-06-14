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

		<div class="block">
			<div class="title">
				{{ $t('pages.galaxy.title', [page['galaxy'], page['system']]) }}
			</div>
			<div class="content">
				<div class="table-responsive">
					<table class="table galaxy text-center">
						<tbody>
							<tr>
								<td class="c" width="35">№</td>
								<td class="c" width="34">&nbsp;</td>
								<td class="c">{{ $t('pages.galaxy.column_planet') }}</td>
								<td class="c" width="34">&nbsp;</td>
								<td class="c" width="30">{{ $t('pages.galaxy.column_debris') }}</td>
								<td class="c" width="180">{{ $t('pages.galaxy.column_player') }}</td>
								<td class="c" width="30">&nbsp;</td>
								<td class="c" width="100">{{ $t('pages.galaxy.column_alliance') }}</td>
								<td class="c" width="135">{{ $t('pages.galaxy.column_actions') }}</td>
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
								<td class="th" width="30">16</td>
								<td class="c big" colspan="8">
									<NuxtLink :to="'/fleet?galaxy=' + page['galaxy'] + '&system=' + page['system'] + '&planet=16&mission=15'">
										{{ $t('pages.galaxy.planet_16') }}
									</NuxtLink>
								</td>
							</tr>
							<tr>
								<td class="c" colspan="6">
									{{ $t('pages.galaxy.no_planets', page.items.length) }}
								</td>
								<td class="c" colspan="3">
									<Popper>
										<template #content>
											<GalaxyLegend/>
										</template>
										<span>{{ $t('pages.galaxy.legend_text') }}</span>
									</Popper>
								</td>
							</tr>
							<tr>
								<td class="c" colspan="3">{{ $t('pages.galaxy.rockets', planet['units']['interplanetary_misil']) }}</td>
								<td class="c" colspan="3">{{ page['user']['fleets'] }} / {{ $t('pages.galaxy.fleets', user['fleets_max']) }}</td>
								<td class="c" colspan="3">
									<div>{{ $t('pages.galaxy.recyclers', planet['units']['recycler']) }}</div>
									<div>{{ $t('pages.galaxy.spy_probes', planet['units']['spy_sonde']) }}</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
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