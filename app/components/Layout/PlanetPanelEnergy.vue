<template>
	<div class="resource-panel-item">
		<InfoPopup :id="4" title="$t('resources.energy')" class="resource-panel-item-icon">
			<Popper>
				<div>
					<span class="sprite skin_energy"></span>
					<span class="sprite skin_s_energy"></span>
				</div>
				<template #content>
					<div class="resource-panel-item-tooltip">
						<div class="resource-panel-item-tooltip-title">{{ $t('resources.energy') }}</div>
						<div class="resource-panel-item-tooltip-info">
							<div>
								<div>Доступно:</div>
								<div>{{ $formatNumber(planet['resources']['energy']['value']) }}</div>
							</div>
							<div>
								<div>Производство:</div>
								<div>{{ $formatNumber(planet['resources']['energy']['capacity']) }}</div>
							</div>
							<div>
								<div>Потребление:</div>
								<div>{{ $formatNumber(planet['resources']['energy']['capacity'] - planet['resources']['energy']['value']) }}</div>
							</div>
						</div>
					</div>
				</template>
			</Popper>
		</InfoPopup>
		<div class="neutral">{{ $t('resources.energy') }}</div>
		<div title="Доступно энергии">
			<span :class="[planet['resources']['energy']['value'] >= 0 ? 'positive' : 'negative']">{{ $formatNumber(planet['resources']['energy']['value']) }}</span>
		</div>
	</div>
</template>

<script setup>
	import InfoPopup from '~/components/Page/Info/Popup.vue';
	import useStore from '~/store/index.js';
	import { storeToRefs } from 'pinia';

	const { planet } = storeToRefs(useStore());
</script>