<template>
	<div v-if="planet" class="row resource-panel">
		<div class="col-md-10 col-sm-10 col-12">
			<div class="row">
				<div class="col-3 text-center">
					<PanelResource :type="'metal'" :resource="planet['resources']['metal']"/>
				</div>
				<div class="col-3 text-center">
					<PanelResource :type="'crystal'" :resource="planet['resources']['crystal']"/>
				</div>
				<div class="col-3 text-center">
					<PanelResource :type="'deuterium'" :resource="planet['resources']['deuterium']"/>
				</div>
				<div class="col-3 text-center">
					<div class="resource-panel-item">
						<InfoPopup :id="4" title="Солнечная батарея" class="resource-panel-item-icon">
							<Popper>
								<div>
									<span class="sprite skin_energy"></span>
									<span class="sprite skin_s_energy"></span>
								</div>
								<template #content>
									<div class="resource-panel-item-tooltip">
										<h1>Энергия</h1>
										<div class="line"></div>
										<table>
											<tbody>
											<tr>
												<td>Доступно:</td>
												<td class="text-end">{{ $number(planet['resources']['energy']['value']) }}</td>
											</tr>
											<tr>
												<td>Производится:</td>
												<td class="text-end">{{ $number(planet['resources']['energy']['capacity']) }}</td>
											</tr>
											<tr>
												<td>Потребление:</td>
												<td class="text-end">{{ $number(planet['resources']['energy']['capacity'] - planet['resources']['energy']['value']) }}</td>
											</tr>
											</tbody>
										</table>
									</div>
								</template>
							</Popper>
						</InfoPopup>
						<div class="neutral">{{ $t('resources.energy') }}</div>
						<div title="Доступно энергии">
							<span :class="[planet['resources']['energy']['value'] >= 0 ? 'positive' : 'negative']">{{ $number(planet['resources']['energy']['value']) }}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="col-md-2 col-sm-2 col-12">
			<div class="row">
				<div class="col text-center">
					<div class="resource-panel-item">
						<NuxtLinkLocale to="/credits" class="d-sm-inline-block resource-panel-item-icon">
							<Popper>
								<template #content>
									<table width="550">
										<tbody>
										<tr>
											<td v-for="officier in user['officiers']" class="text-center">
												<div class="separator"></div>
												<span class="officier" :class="['of' + officier['id'] + (officier['date'] && dayjs(officier['date']).diff() > 0 ? '_ikon' : '')]"></span>
											</td>
										</tr>
										<tr>
											<td v-for="officier in user['officiers']" class="text-center">
												<span v-if="officier['date'] && dayjs(officier['date']).diff() > 0">Нанят до<br><span class="positive">{{ $date(officier['date'], 'DD MMM HH:mm') }}</span></span>
												<span v-else><span class="positive">Не нанят</span></span>
											</td>
										</tr>
										</tbody>
									</table>
								</template>
								<span class="sprite skin_kredits"></span>
							</Popper>
						</NuxtLinkLocale>
						<div class="neutral">Кредиты</div>
						{{ $number(user['credits']) }}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import PanelResource from './PlanetPanelResource.vue';
	import InfoPopup from '~/components/Page/Info/Popup.vue';
	import useStore from '~/store';
	import { onBeforeUnmount, onUpdated, ref } from 'vue';
	import { storeToRefs } from 'pinia';
	import dayjs from 'dayjs';

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