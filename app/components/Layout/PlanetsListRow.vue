<template>
	<div class="planet" :class="['type_' + item.planet_type, (planet.id === item.id ? 'current' : '')]"  @click.prevent="changePlanet">
		<div class="planet-image" :title="item.name">
			<img :src="'/images/planeten/small/s_' + item.image + '.jpg'" height="40" width="40" :alt="item.name">
		</div>
		<div class="planet-name">
			<div>{{ item.name }}</div>
			<span>
				<PlanetLink :galaxy="item.galaxy" :system="item.system" :planet="item.planet"/>
			</span>
		</div>
	</div>
</template>

<script setup>
	import { useApiPost, refreshNuxtData } from '#imports';
	import useStore from '~/store';
	import { storeToRefs } from 'pinia';

	const { item } = defineProps({
		item: {
			type: Object
		}
	});

	const store = useStore();
	const { planet } = storeToRefs(store);

	async function changePlanet () {
		if (planet.value.id === item.id) {
			return;
		}

		await useApiPost('/user/planet/' + item.id, {});

		await Promise.all([
			refreshNuxtData(),
			store.loadState(),
		]);
	}
</script>