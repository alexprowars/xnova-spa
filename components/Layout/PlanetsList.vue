<template>
	<div class="main-planets flex">
		<a :class="{ active: active }" class="planet-toggle sm:hidden" @click.prevent="emit('toggle')">
			<span>
				<span class="first"></span>
				<span class="second"></span>
				<span class="third"></span>
			</span>
		</a>
		<div :class="{ active: active }" class="planet-sidebar">
			<div class="list">
				<PlanetRow v-for="item in items" :key="item['id']" :item="item"></PlanetRow>
			</div>
		</div>
	</div>
</template>

<script setup>
	import PlanetRow from './PlanetsListRow.vue';
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