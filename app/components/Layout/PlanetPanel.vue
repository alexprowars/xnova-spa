<template>
	<div v-if="planet" class="grid grid-cols-5 resource-panel">
		<div class="text-center">
			<PanelResource :type="'metal'" :resource="planet['resources']['metal']"/>
		</div>
		<div class="text-center">
			<PanelResource :type="'crystal'" :resource="planet['resources']['crystal']"/>
		</div>
		<div class="text-center">
			<PanelResource :type="'deuterium'" :resource="planet['resources']['deuterium']"/>
		</div>
		<div class="text-center">
			<PlanetPanelEnergy/>
		</div>
		<div class="text-center">
			<div class="resource-panel-item">
				<NuxtLink to="/officiers" class="sm:inline-block resource-panel-item-icon">
					<Popper>
						<template #content>
							<div class="resource-panel-officiers">
								<div class="resource-panel-officiers-row">
									<div v-for="officier in user['officiers']" class="text-center">
										<span class="officier" :class="['of' + officier['id'] + (officier['date'] ? '_ikon' : '')]"></span>
									</div>
								</div>
								<div class="resource-panel-officiers-row">
									<div v-for="officier in user['officiers']" class="text-center">
										<span v-if="officier['date']">{{ $t('pages.overview.officier_active_until') }}<br><span class="positive">{{ $formatDate(officier['date'], 'DD MMM HH:mm') }}</span></span>
										<span v-else><span class="negative">{{ $t('pages.overview.officier_noactive') }}</span></span>
									</div>
								</div>
							</div>
						</template>
						<span class="sprite skin_kredits"></span>
					</Popper>
				</NuxtLink>
				<div class="neutral">{{ $t('credits') }}</div>
				{{ $formatNumber(user['credits']) }}
			</div>
		</div>
	</div>
</template>

<script setup>
	import PanelResource from './PlanetPanelResource.vue';
	import PlanetPanelEnergy from './PlanetPanelEnergy.vue';
	import useStore from '~/store';
	import { onBeforeUnmount, onUpdated, ref } from 'vue';
	import { storeToRefs } from 'pinia';

	const updated = ref(0);

	let timer = null;

	const store = useStore();
	const { user, planet } = storeToRefs(store);

	update();

	onUpdated(() => {
		clearTimeout(timer);
		update();
	});

	onBeforeUnmount(() => {
		clearTimeout(timer);
	});

	function update () {
		if (!planet.value) {
			return;
		}

		if (updated.value === 0) {
			updated.value = (new Date).getTime();
		}

		let factor = ((new Date).getTime() - updated.value) / 1000;

		if (factor < 0) {
			return;
		}

		updated.value = (new Date).getTime();

		['metal', 'crystal', 'deuterium']
			.filter(res => typeof planet.value['resources'][res] !== 'undefined')
			.forEach(res => {
				let power = (planet.value['resources'][res]['value'] >= planet.value['resources'][res]['capacity']) ? 0 : 1;

				planet.value['resources'][res]['value'] += ((planet.value['resources'][res]['production'] / 3600) * power * factor);
			});

		timer = setTimeout(update, 1000);
	}
</script>