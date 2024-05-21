<template>
	<div v-if="resources" class="building-price">
		<template v-for="(value, resource) in price">
			<div v-if="value > 0" class="building-price-item">
				<img :src="'/images/skin/s_'+resource+'.png'" v-tooltip="$t('RESOURCES.' + resource)" :alt="$t('RESOURCES.' + resource)">

				<span v-if="resources[resource]['value'] >= value" class="resYes">{{ $number(value) }}</span>
				<span v-else class="resNo" :v-tooltip="'Необходимо еще: '+$number(value - resources[resource]['value'])">{{ $number(value) }}</span>
			</div>
		</template>
	</div>
</template>

<script setup>
	import useStore from '~/store';
	import { computed } from 'vue';

	defineProps({
		price: {
			type: Object
		}
	})

	const resources = computed(() => {
		return useStore().planet.resources;
	});
</script>