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
					<div class="grid grid-cols-2">
						<div class="th">{{ $t('pages.info.fleet.engine_type') }}</div>
						<div class="th">{{ fleet['type_engine'] }}</div>
					</div>
					<div class="grid grid-cols-2">
						<div class="th">{{ $t('pages.info.fleet.weapon_type') }}</div>
						<div class="th">{{ fleet['type_gun'] }}</div>
					</div>
					<div class="grid grid-cols-2">
						<div class="th">{{ $t('pages.info.fleet.armor_type') }}</div>
						<div class="th">{{ fleet['type_armour'] }}</div>
					</div>
				</template>
			</div>
		</div>
	</div>
	<div class="block">
		<div class="title">{{ $t('pages.info.fleet.rapidfire') }}</div>
		<div class="content">
			<div class="block-table text-center">
				<div class="grid">
					<div class="th" v-html="fleet['rapidfire']['to']"></div>
				</div>
				<div class="grid">
					<div class="th" v-html="fleet['rapidfire']['from']"></div>
				</div>
			</div>
		</div>
	</div>
	<div class="block">
		<div class="title">{{ $t('pages.info.fleet.production_costs') }}</div>
		<div class="content">
			<div class="block-table text-center">
				<div class="grid grid-cols-2">
					<div class="th">{{ $t('resources.metal') }}</div>
					<div class="th">{{ $formatNumber(fleet['resources']['metal']['base']) }} ({{ $formatNumber(fleet['resources']['metal']['full']) }})</div>
				</div>
				<div class="grid grid-cols-2">
					<div class="th">{{ $t('resources.crystal') }}</div>
					<div class="th">{{ $formatNumber(fleet['resources']['crystal']['base']) }} ({{ $formatNumber(fleet['resources']['crystal']['full']) }})</div>
				</div>
				<div class="grid grid-cols-2">
					<div class="th">{{ $t('resources.deuterium') }}</div>
					<div class="th">{{ $formatNumber(fleet['resources']['deuterium']['base']) }} ({{ $formatNumber(fleet['resources']['deuterium']['full']) }})</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	defineProps({
		fleet: {
			type: Object,
		},
		item: {
			type: Number,
		}
	})
</script>