<template>
	<div class="block">
		<div class="title">Характеристики</div>
		<div class="content border-0">
			<div class="block-table">
				<div class="row">
					<div class="col th">Атака</div>
					<div class="col th">{{ $formatNumber(defence['attack']) }} ({{ $formatNumber(defence['attack_full']) }})</div>
				</div>
				<div class="row">
					<div class="col th">Броня</div>
					<div class="col th">{{ $formatNumber(defence['armor']) }}</div>
				</div>
				<div v-if="defence['shield'] > 0" class="row">
					<div class="col th">Щиты</div>
					<div class="col th">{{ $formatNumber(defence['shield']) }}</div>
				</div>
				<div v-if="defence['type_gun']" class="row">
					<div class="col th">Тип оружия</div>
					<div class="col th">{{ defence['type_gun'] }}</div>
				</div>
				<div v-if="defence['type_armour']" class="row">
					<div class="col th">Тип брони</div>
					<div class="col th">{{ defence['type_armour'] }}</div>
				</div>
			</div>
			<div class="separator"></div>
			<div class="block-table">
				<div class="row">
					<div class="col c">Затраты на производство</div>
				</div>
				<div class="row">
					<div class="col th">{{ $t('resources.metal') }}</div>
					<div class="col th">{{ $formatNumber(defence['resources']['metal']) }}</div>
				</div>
				<div class="row">
					<div class="col th">{{ $t('resources.crystal') }}</div>
					<div class="col th">{{ $formatNumber(defence['resources']['crystal']) }}</div>
				</div>
				<div class="row">
					<div class="col th">{{ $t('resources.deuterium') }}</div>
					<div class="col th">{{ $formatNumber(defence['resources']['deuterium']) }}</div>
				</div>
			</div>
			<template v-if="defence['rapidfire']" class="separator">
				<div class="separator"></div>
				<div class="block-table">
					<div class="row">
						<div class="col c">Скорострел</div>
					</div>
					<div class="row">
						<div class="col c text-start">Тип юнита</div>
						<div class="col c positive">Поражает флот</div>
						<div class="col c negative">Теряет флот</div>
					</div>
					<div v-for="(battle, fId) in defence['rapidfire']" class="row">
						<div class="col th text-start">
							<NuxtLink :to="'/info/'+fId+'/'">{{ $t('tech.'+fId) }}</NuxtLink>
						</div>
						<div class="col th positive">
							<span v-if="battle['TO']">{{ battle['TO'] }}</span>
							<span v-else>< 1</span>
						</div>
						<div class="col th negative">
							<span v-if="battle['FROM']">{{ battle['FROM'] }}</span>
							<span v-else>< 1</span>
						</div>
					</div>
				</div>
			</template>
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