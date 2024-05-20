<template>
	<div class="main-planets">
		<a :class="{ active: active }" class="planet-toggle d-sm-none" @click.prevent="emit('toggle')">
			<span>
				<span class="first"></span>
				<span class="second"></span>
				<span class="third"></span>
			</span>
		</a>
		<div :class="{ active: active }" class="planet-sidebar">
			<div class="list">
				<PlanetRow v-for="item in items" :key="item['id']" :item="item"></PlanetRow>
				<div class="clearfix"></div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import PlanetRow from './planets-list-row.vue';
	import { computed } from 'vue';
	import useStore from '~/store';
	import { storeToRefs } from 'pinia';

	const props = defineProps({
		active: {
			type: Boolean,
			default: true,
		}
	});

	const { user } = storeToRefs(useStore());
	const emit = defineEmits(['toggle']);

	const items = computed(() => {
		return user.value.planets || [];
	})
</script>