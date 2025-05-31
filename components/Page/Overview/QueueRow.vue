<template>
	<div class="row flight">
		<div class="th col-4 col-sm-2">
			<div class="z">
				<Timer :value="item['date']"/>
			</div>
			<span class="positive d-sm-none">{{ $date(item['date'], 'DD MMM HH:mm:ss') }}</span>
		</div>
		<div class="th col-sm-10 col-8 text-start">
			<span class="flight owndeploy">
				<a v-if="item['planet_id'] !== planet.id" href="" @click.prevent="changePlanet" style="color:#33ff33;">{{ planetItem?.['name'] }}</a><span v-else>{{ planetItem?.['name'] }}</span>:
			</span>
			<span v-if="item['level']" class="holding colony">{{ $t('tech.' + item['item']) }} ({{ item['level'] }})</span>
			<span v-if="item['count']" class="holding colony">{{ $t('tech.' + item['item']) }} ({{ item['count'] }})</span>
			<span class="positive float-sm-end d-none d-sm-inline">{{ $date(item['date'], 'DD MMM HH:mm:ss') }}</span>
		</div>
	</div>
</template>

<script setup>
	import useStore from '~/store';
	import { storeToRefs } from 'pinia';
	import { computed } from 'vue';
	import { refreshNuxtData, useApiPost } from '#imports';

	const { item } = defineProps({
		item: Object
	});

	const store = useStore();
	const { user, planet } = storeToRefs(store);

	const planetItem = computed(() => {
		return user.value['planets'].find((p) => p['id'] === item['planet_id']);
	});

	async function changePlanet () {
		await useApiPost('/user/planet/' + item.planet_id, {});
		await refreshNuxtData();
	}
</script>