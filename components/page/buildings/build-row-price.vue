<template>
	<div v-if="resources" class="building-price">
		<div v-for="(title, resource) in $t('RESOURCES')" v-if="price[resource] > 0" class="building-price-item">
			<img :src="'/images/skin/s_'+resource+'.png'" v-tooltip="title" :alt="title">

			<span v-if="resources[resource]['value'] >= price[resource]" class="resYes">{{ price[resource] | number }}</span>
			<span v-else class="resNo" :v-tooltip="'Необходимо еще: '+$options.filters.number(price[resource] - resources[resource]['value'])">{{ price[resource] | number }}</span>
		</div>
	</div>
</template>

<script>
	import { mapState } from 'pinia'
	import useStore from '~/store';

	export default {
		name: 'build-row-price',
		props: {
			price: {
				type: Object
			}
		},
		computed: {
			...mapState(useStore, {
				resources: state => state.planet.resources,
			}),
		}
	}
</script>