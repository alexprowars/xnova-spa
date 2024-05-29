<template>
	<div v-if="page" class="page-galaxy">
		<GalaxySelector :shortcuts="page['shortcuts']" :galaxy="page['galaxy']" :system="page['system']" @change="changeCoordinates"/>
		<div class="separator"></div>

		<MissileAttack v-if="missile" :page="page" :planet="missilePlanet" @close="missile = false"/>

		<div class="table-responsive">
			<table class="table galaxy">
				<tbody>
					<tr>
						<td class="c" colspan="9">Солнечная система {{ page['galaxy'] }}:{{ page['system'] }}</td>
					</tr>
					<tr>
						<td class="c">№</td>
						<td class="c">&nbsp;</td>
						<td class="c">Планета</td>
						<td class="c">&nbsp;</td>
						<td class="c">ПО</td>
						<td class="c">Игрок</td>
						<td class="c">&nbsp;</td>
						<td class="c">Альянс</td>
						<td class="c">Действия</td>
					</tr>

					<GalaxyRow v-for="(item, index) in rows"
						:key="rows['p_id']"
						:item="item"
						:user="page['user']"
						:planet="index + 1"
						@sendMissile="sendMissile(item['planet'])"
					/>

					<tr v-if="page['user']['allowExpedition']">
						<th width="30">16</th>
						<th colspan="8" class="c big">
							<NuxtLinkLocale :to="'/fleet/?galaxy='+page['galaxy']+'&system='+page['system']+'&planet=16&mission=15'">неизведанные дали</NuxtLinkLocale>
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
								Легенда
							</Popper>
						</td>
					</tr>
					<tr>
						<td class="c" colspan="3">{{ page['user']['interplanetary_misil'] }} {{ $morph(page['user']['interplanetary_misil'], 'ракета', 'ракеты', 'ракет') }}</td>
						<td class="c" colspan="3">{{ page['user']['fleets'] }} / {{ page['user']['max_fleets'] }} {{ $morph(page['user']['fleets'], 'флот', 'флота', 'флотов') }}</td>
						<td class="c" colspan="3">
							<div>{{ $number(page['user']['recycler']) }} {{ $morph(page['user']['recycler'], 'переработчик', 'переработчика', 'переработчиков') }}</div>
							<div>{{ $number(page['user']['spy_sonde']) }} {{ $morph(page['user']['spy_sonde'], 'шпионский зонд', 'шпионских зонда', 'шпионских зондов') }}</div>
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
	import { definePageMeta, showError, useApiPost, useAsyncData, useHead, useRoute, useNuxtData } from '#imports';
	import useStore from '~/store';
	import { computed, ref } from 'vue';

	definePageMeta({
		middleware: ['auth'],
		view: {
			resources: false,
		}
	});

	useHead({
		title: 'Галактика',
	});

	const { data: page, error } = await useAsyncData('page-galaxy', async () => {
		return await useStore().loadPage();
	}, { watch: [() => useRoute().query] });

	if (error.value) {
		throw showError(error.value);
	}

	const missile = ref(false);
	const missilePlanet = ref(0);

	const rows = computed(() => {
		let result = [];

		for (let i = 1; i <= 15; i++) {
			result.push(page.value.items.find(item => item.planet === i) || null);
		}

		return result;
	});

	function sendMissile (planet) {
		missile.value = true
		missilePlanet.value = planet
	}

	async function changeCoordinates(value) {
		const result = await useApiPost('/galaxy', value);

		const { data } = useNuxtData('page-galaxy');
		data.value = result['data'];

		delete result['data'];

		useStore().PAGE_LOAD(result);
	}
</script>