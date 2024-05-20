<template>
	<div v-if="page" class="page-galaxy">
		<GalaxySelector :shortcuts="page['shortcuts']" :galaxy="page['galaxy']" :system="page['system']"/>
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

					<GalaxyRow v-for="(item, index) in page['items']"
						:key="index"
						:item="item"
						:user="page['user']"
						:galaxy="page['galaxy']"
						:system="page['system']"
						:planet="index + 1"
						@sendMissile="sendMissile(item['planet'])"
					></GalaxyRow>

					<tr v-if="page['user']['allowExpedition']">
						<th width="30">16</th>
						<th colspan="8" class="c big">
							<NuxtLinkLocale :to="'/fleet/?galaxy='+page['galaxy']+'&system='+page['system']+'&planet=16&mission=15'">неизведанные дали</NuxtLinkLocale>
						</th>
					</tr>
					<tr>
						<td class="c" colspan="6">
							<span v-if="planets === 0">нет заселённых планет</span>
							<span v-else>{{ planets }} {{ $morph(planets, 'заселённая планета', 'заселённые планеты', 'заселённых планет') }}</span>
						</td>
						<td class="c" colspan="3">
							<Popper hover>
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
	import GalaxyRow from '~/components/Page/Galaxy/row.vue';
	import GalaxySelector from '~/components/Page/Galaxy/selector.vue';
	import GalaxyLegend from '~/components/Page/Galaxy/legend.vue';
	import MissileAttack from '~/components/Page/Galaxy/missile-attack.vue';
	import { definePageMeta, showError, useAsyncData, useRoute } from '#imports';
	import useStore from '~/store';
	import Popper from 'vue3-popper';
	import { computed, ref, toRefs, watch } from 'vue';

	definePageMeta({
		middleware: ['auth'],
	});

	const route = useRoute();

	const { data, error, refresh } = await useAsyncData(async () => {
		return await useStore().loadPage();
	});

	watch(() => route.query, () => refresh());

	if (error.value) {
		throw showError(error.value);
	}

	const { page } = toRefs(data.value);

	const missile = ref(false);
	const missilePlanet = ref(0);

	const planets= computed(() => {
		if (!page.value.items)
			return 0;

		return page.value.items.filter(item => item !== false).length
	})

	function sendMissile (planet) {
		missile.value = true
		missilePlanet.value = planet
	}
</script>