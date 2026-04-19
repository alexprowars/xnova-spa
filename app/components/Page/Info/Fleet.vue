<template>
	<div class="block">
		<div class="title">{{ $t('pages.info.fleet.characteristics') }}</div>
		<div class="content">
			<div class="block-table text-center">
				<div v-if="item !== 212" class="grid grid-cols-2">
					<div class="th">{{ $t('pages.info.fleet.attack') }}</div>
					<div class="th">{{ $formatNumber(fleet['attack']) }} ({{ $formatNumber(fleet['attack_full']) }})</div>
				</div>
				<div class="grid grid-cols-2">
					<div class="th">{{ $t('pages.info.fleet.armor') }}</div>
					<div class="th">{{ $formatNumber(fleet['armor']) }} ({{ $formatNumber(fleet['armor_full']) }})</div>
				</div>
				<template v-if="item !== 212">
					<div class="grid grid-cols-2">
						<div class="th">{{ $t('pages.info.fleet.shield') }}</div>
						<div class="th">{{ $formatNumber(fleet['shield']) }}</div>
					</div>
					<div class="grid grid-cols-2">
						<div class="th">{{ $t('pages.info.fleet.capacity') }}</div>
						<div class="th">{{ $formatNumber(fleet['capacity']) }}</div>
					</div>
					<div class="grid grid-cols-2">
						<div class="th">{{ $t('pages.info.fleet.speed') }}</div>
						<div class="th">{{ $formatNumber(fleet['speed']) }} ({{ $formatNumber(fleet['speed_full']) }})</div>
					</div>
					<div class="grid grid-cols-2">
						<div class="th">{{ $t('pages.info.fleet.fuel_consumption') }}</div>
						<div class="th">{{ $formatNumber(fleet['consumption']) }}</div>
					</div>
					<div v-if="fleet['type_engine']" class="grid grid-cols-2">
						<div class="th">{{ $t('pages.info.fleet.engine_type') }}</div>
						<div class="th">{{ $t('engine_type.' + fleet['type_engine']) }}</div>
					</div>
					<div v-if="fleet['type_weapon']" class="grid grid-cols-2">
						<div class="th">{{ $t('pages.info.fleet.weapon_type') }}</div>
						<div class="th">{{ $t('weapon_type.' + fleet['type_weapon']) }}</div>
					</div>
					<div v-if="fleet['type_armour']" class="grid grid-cols-2">
						<div class="th">{{ $t('pages.info.fleet.armor_type') }}</div>
						<div class="th">{{ $t('armor_type.' + fleet['type_armour']) }}</div>
					</div>
				</template>
			</div>
		</div>
	</div>
	<RapidfireBlock :rapidfire="fleet['rapidfire']"/>
	<CostBlock :resources="fleet['resources']"/>
</template>

<script setup>
	import RapidfireBlock from '~/components/Page/Info/RapidfireBlock.vue';
	import CostBlock from '~/components/Page/Info/CostBlock.vue';

	defineProps({
		fleet: {
			type: Object,
		},
		item: {
			type: Number,
		}
	})
</script>