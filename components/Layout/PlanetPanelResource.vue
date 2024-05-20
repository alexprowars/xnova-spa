<template>
	<div class="resource-panel-item">
		<InfoPopup :id="building[type]" class="resource-panel-item-icon">
			<Popper hover>
				<span class="sprite" :class="['skin_'+type]"></span>
				<span class="sprite" :class="['skin_s_'+type]"></span>
				<template #content>
					<resource-tooltip :resource="resource" :type="type"></resource-tooltip>
				</template>
			</Popper>
		</InfoPopup>
		<div class="neutral">{{ $t('RESOURCES.'+type+'') }}</div>
		<div title="Количество ресурса на планете">
			<span :class="[resource.capacity > resource.value ? 'positive' : 'negative']">
				{{ $number(resource.value) }}
			</span>
		</div>
	</div>
</template>

<script setup>
	import ResourceTooltip from './PlanetPanelResourceTooltip.vue'
	import InfoPopup from '~/components/Page/Info/Popup.vue'
	import Popper from 'vue3-popper';
	import { ref } from 'vue';

	defineProps({
		resource: {
			type: Object
		},
		type: {
			type: String,
			default: ''
		}
	})

	const building = ref({
		metal: 1,
		crystal: 2,
		deuterium: 3,
	});
</script>