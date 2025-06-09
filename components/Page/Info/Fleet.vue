<template>
	<div class="block">
		<div class="title">Характеристики</div>
		<div class="content">
			<div class="block-table text-center">
				<div v-if="item !== 212" class="grid grid-cols-2">
					<div class="th">Атака</div>
					<div class="th">{{ $formatNumber(fleet['attack']) }} ({{ $formatNumber(fleet['attack_full']) }})</div>
				</div>
				<div class="grid grid-cols-2">
					<div class="th">Броня</div>
					<div class="th">{{ $formatNumber(fleet['armor']) }} ({{ $formatNumber(fleet['armor_full']) }})</div>
				</div>
				<template v-if="item !== 212">
					<div class="grid grid-cols-2">
						<div class="th">Щиты</div>
						<div class="th">{{ $formatNumber(fleet['shield']) }}</div>
					</div>
					<div class="grid grid-cols-2">
						<div class="th">Грузоподъёмность</div>
						<div class="th">{{ $formatNumber(fleet['capacity']) }}</div>
					</div>
					<div class="grid grid-cols-2">
						<div class="th">Скорость</div>
						<div class="th">{{ $formatNumber(fleet['speed']) }} ({{ $formatNumber(fleet['speed_full']) }})</div>
					</div>
					<div class="grid grid-cols-2">
						<div class="th">Потребление топлива (дейтерий)</div>
						<div class="th">{{ $formatNumber(fleet['consumption']) }}</div>
					</div>
					<div class="grid grid-cols-2">
						<div class="th">Тип двигателя</div>
						<div class="th">{{ fleet['type_engine'] }}</div>
					</div>
					<div class="grid grid-cols-2">
						<div class="th">Тип оружия</div>
						<div class="th">{{ fleet['type_gun'] }}</div>
					</div>
					<div class="grid grid-cols-2">
						<div class="th">Тип брони</div>
						<div class="th">{{ fleet['type_armour'] }}</div>
					</div>
				</template>
			</div>
		</div>
	</div>
	<div class="block">
		<div class="title">Скорострел</div>
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
		<div class="title">Затраты на производство</div>
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