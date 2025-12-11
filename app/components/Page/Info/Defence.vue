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
				<div v-if="defence['type_gun']" class="grid grid-cols-2">
					<div class="th">{{ $t('pages.info.defence.weapon_type') }}</div>
					<div class="th">{{ defence['type_gun'] }}</div>
				</div>
				<div v-if="defence['type_armour']" class="grid grid-cols-2">
					<div class="th">{{ $t('pages.info.defence.armor_type') }}</div>
					<div class="th">{{ defence['type_armour'] }}</div>
				</div>
			</div>
		</div>
	</div>
	<div class="block">
		<div class="title">{{ $t('pages.info.defence.production_costs') }}</div>
		<div class="content">
			<div class="block-table">
				<div class="grid grid-cols-2">
					<div class="th">{{ $t('resources.metal') }}</div>
					<div class="th">{{ $formatNumber(defence['resources']['metal']) }}</div>
				</div>
				<div class="grid grid-cols-2">
					<div class="th">{{ $t('resources.crystal') }}</div>
					<div class="th">{{ $formatNumber(defence['resources']['crystal']) }}</div>
				</div>
				<div class="grid grid-cols-2">
					<div class="th">{{ $t('resources.deuterium') }}</div>
					<div class="th">{{ $formatNumber(defence['resources']['deuterium']) }}</div>
				</div>
			</div>
		</div>
	</div>
	<div v-if="defence['rapidfire']" class="block">
		<div class="title">{{ $t('pages.info.defence.rapidfire') }}</div>
		<div class="content">
			<div class="block-table">
				<div class="grid grid-cols-3">
					<div class="c text-left">{{ $t('pages.info.defence.unit_type') }}</div>
					<div class="c positive">{{ $t('pages.info.defence.hits_fleet') }}</div>
					<div class="c negative">{{ $t('pages.info.defence.loses_fleet') }}</div>
				</div>
				<div v-for="(battle, fId) in defence['rapidfire']" class="grid grid-cols-3">
					<div class="th text-left">
						<NuxtLink :to="'/info/' + fId">{{ $t('tech.'+fId) }}</NuxtLink>
					</div>
					<div class="th positive">
						<span v-if="battle['TO']">{{ battle['TO'] }}</span>
						<span v-else>< 1</span>
					</div>
					<div class="th negative">
						<span v-if="battle['FROM']">{{ battle['FROM'] }}</span>
						<span v-else>< 1</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	defineProps({
		defence: {
			type: Object,
		},
		item: {
			type: Number,
		}
	})
</script>