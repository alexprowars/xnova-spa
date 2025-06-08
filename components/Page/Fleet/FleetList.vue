<template>
	<div class="block-table">
		<div v-if="fleets.length > 0" class="grid grid-cols-12 divide-x">
			<div class="col-span-3 sm:col-span-1 th">№</div>
			<div class="col-span-6 sm:col-span-2 th">Миссия</div>
			<div class="col-span-3 sm:col-span-1 th">Кол-во</div>
			<div class="col-span-4 sm:col-span-3 th hidden sm:block">Цель</div>
			<div class="col-span-2 sm:col-span-3 th hidden sm:block">Возврат</div>
			<div class="col-span-2 th hidden sm:block">Приказы</div>
		</div>

		<FleetRow v-for="(item, index) in fleets" :key="index" :i="index" :item="item"/>

		<div class="grid" v-if="fleets.length === 0">
			<div class="th text-center">нет активности флота</div>
		</div>

		<div class="grid" v-if="fleets.length >= user['fleets_max']">
			<div class="th negative text-center">Все слоты заняты!</div>
		</div>
	</div>
</template>

<script setup>
	import FleetRow from '~/components/Page/Fleet/FleetRow.vue';
	import { storeToRefs } from 'pinia';
	import useStore from '~/store/index.js';

	defineProps({
		fleets: Array,
	});

	const { user } = storeToRefs(useStore());
</script>