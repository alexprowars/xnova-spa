<template>
	<div class="resource-panel-item">
		<InfoPopup :id="building[type]" class="resource-panel-item-icon">
			<Popper>
				<client-only>
					<resource-tooltip :resource="resource" :type="type"></resource-tooltip>
				</client-only>
				<template slot="reference">
					<span class="sprite" :class="['skin_'+type]"></span>
					<span class="sprite" :class="['skin_s_'+type]"></span>
				</template>
			</Popper>
		</InfoPopup>
		<div class="neutral">{{ $t('RESOURCES.'+type+'') }}</div>
		<div title="Количество ресурса на планете">
			<span :class="[resource.max > resource.current ? 'positive' : 'negative']">
				{{ resource.current | number }}
			</span>
		</div>
	</div>
</template>

<script>
	import ResourceTooltip from './planet-panel-resource-tooltip.vue'
	import InfoPopup from '~/components/page/info/popup.vue'

	export default {
		name: "planet-panel-resource",
		components: {
			ResourceTooltip,
			InfoPopup,
		},
		props: {
			resource: {
				type: Object
			},
			type: {
				type: String,
				default: ''
			}
		},
		data () {
			return {
				building: {
					metal: 1,
					crystal: 2,
					deuterium: 3,
				}
			}
		},
	}
</script>