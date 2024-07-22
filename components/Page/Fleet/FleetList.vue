<template>
	<div class="block-table">
		<div v-if="fleets.length > 0" class="row">
			<div class="col-3 col-sm-1 th">№</div>
			<div class="col-6 col-sm-2 th">Миссия</div>
			<div class="col-3 col-sm-1 th">Кол-во</div>
			<div class="col-4 col-sm-3 th d-none d-sm-block">Цель</div>
			<div class="col-2 col-sm-3 th d-none d-sm-block">Возврат</div>
			<div class="col-2 th d-none d-sm-block">Приказы</div>
		</div>

		<FleetRow class="row page-fleet-fly-item" v-for="(item, index) in fleets" :key="index" :i="index" :item="item"/>

		<div class="row" v-if="fleets.length === 0">
			<div class="th col text-center">нет активности флота</div>
		</div>

		<div class="row" v-if="fleets.length >= user['fleets_max']">
			<div class="th col negative text-center">Все слоты заняты!</div>
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