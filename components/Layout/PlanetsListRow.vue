<template>
	<div class="planet" :class="['type_' + item.type, (planet.id === item.id ? 'current' : '')]">
		<a @click.prevent="changePlanet" :title="item.name">
			<img :src="'/images/planeten/small/s_' + item.image + '.jpg'" height="40" width="40" :alt="item.name">
		</a>
		<span class="d-none d-sm-block d-md-none">
			<PlanetLink :galaxy="item.galaxy" :system="item.system" :planet="item.planet"/>
		</span>
		<div class="d-sm-none d-md-block">
			{{ item.name }}<br>
			<span>
				<PlanetLink :galaxy="item.galaxy" :system="item.system" :planet="item.planet"/>
			</span>
		</div>
		<div class="clear"></div>
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

	const { planet } = storeToRefs(useStore());

	async function changePlanet () {
		if (planet.value.id === item.id) {
			return;
		}

		await useApiPost('/user/planet/' + item.id, {});
		await refreshNuxtData();
	}
</script>