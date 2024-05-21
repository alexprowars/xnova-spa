<template>
	<div class="planet" :class="['type_'+item.type, (store.planet === item.id ? 'current' : '')]">
		<a @click.prevent="changeItem" :title="item.name">
			<img :src="'/images/planeten/small/s_'+item.image+'.jpg'" height="40" width="40" :alt="item.name">
		</a>
		<span class="d-none d-sm-block d-md-none">
			<PlanetLink :galaxy="item.galaxy" :system="item.system" :planet="item.position"/>
		</span>
		<div class="d-sm-none d-md-block">
			{{ item.name }}<br>
			<span>
				<PlanetLink :galaxy="item.galaxy" :system="item.system" :planet="item.position"/>
			</span>
		</div>
		<div class="clear"></div>
	</div>
</template>

<script setup>
	import { navigateTo } from '#imports';
	import useStore from '~/store';

	const props = defineProps({
		item: {
			type: Object
		}
	});

	const store = useStore();

	function changeItem () {
		let path = window.location.pathname.replace(store.path, '').split('/');

		if (path[0] === '') {
			path.splice(0, 1);
		}

		let url = '/'+path[0]+(path[1] !== undefined && path[1] !== '' && path[0] !== 'galaxy' && path[0] !== 'fleet' ? '/'+path[1] : '')+'/?chpl='+this.item.id;

		navigateTo(url, { replace: true });
	}
</script>