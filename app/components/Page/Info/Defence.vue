<template>
	<div class="block">
		<div class="title">{{ $t('pages.info.defence.characteristics') }}</div>
		<div class="content">
			<div class="block-table">
				<div class="grid grid-cols-2">
					<div class="th">{{ $t('pages.info.defence.attack') }}</div>
					<div class="th">{{ $formatNumber(defence['attack']) }} ({{ $formatNumber(defence['attack_full']) }})</div>
				</div>
				<div class="grid grid-cols-2">
					<div class="th">{{ $t('pages.info.defence.armor') }}</div>
					<div class="th">{{ $formatNumber(defence['armor']) }}</div>
				</div>
				<div v-if="defence['shield'] > 0" class="grid grid-cols-2">
					<div class="th">{{ $t('pages.info.defence.shield') }}</div>
					<div class="th">{{ $formatNumber(defence['shield']) }}</div>
				</div>
				<div v-if="defence['type_weapon']" class="grid grid-cols-2">
					<div class="th">{{ $t('pages.info.fleet.weapon_type') }}</div>
					<div class="th">{{ $t('weapon_type.' + defence['type_weapon']) }}</div>
				</div>
				<div v-if="defence['type_armour']" class="grid grid-cols-2">
					<div class="th">{{ $t('pages.info.fleet.armor_type') }}</div>
					<div class="th">{{ $t('armor_type.' + defence['type_armour']) }}</div>
				</div>
			</div>
		</div>
	</div>
	<RapidfireBlock :rapidfire="defence['rapidfire']"/>
	<CostBlock :resources="defence['resources']"/>
</template>

<script setup>
	import RapidfireBlock from '~/components/Page/Info/RapidfireBlock.vue';
	import CostBlock from '~/components/Page/Info/CostBlock.vue';

	defineProps({
		defence: {
			type: Object,
		},
		item: {
			type: Number,
		}
	})
</script>