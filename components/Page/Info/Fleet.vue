<template>
	<div class="block">
		<div class="title">Характеристики</div>
		<div class="content border-0">
			<div class="block-table">
				<div v-if="item !== 212" class="row">
					<div class="col th">Атака</div>
					<div class="col th">{{ $number(fleet['attack']) }} ({{ $number(fleet['attack_full']) }})</div>
				</div>
				<div class="row">
					<div class="col th">Броня</div>
					<div class="col th">{{ $number(fleet['armor']) }} ({{ $number(fleet['armor_full']) }})</div>
				</div>
				<template v-if="item !== 212">
					<div class="row">
						<div class="col th">Щиты</div>
						<div class="col th">{{ $number(fleet['shield']) }}</div>
					</div>
					<div class="row">
						<div class="col th">Грузоподъёмность</div>
						<div class="col th">{{ $number(fleet['capacity']) }}</div>
					</div>
					<div class="row">
						<div class="col th">Скорость</div>
						<div class="col th">{{ $number(fleet['speed']) }} ({{ $number(fleet['speed_full']) }})</div>
					</div>
					<div class="row">
						<div class="col th">Потребление топлива (дейтерий)</div>
						<div class="col th">{{ $number(fleet['consumption']) }}</div>
					</div>
					<div class="row">
						<div class="col th">Тип двигателя</div>
						<div class="col th">{{ fleet['type_engine'] }}</div>
					</div>
					<div class="row">
						<div class="col th">Тип оружия</div>
						<div class="col th">{{ fleet['type_gun'] }}</div>
					</div>
					<div class="row">
						<div class="col th">Тип брони</div>
						<div class="col th">{{ fleet['type_armour'] }}</div>
					</div>
				</template>
			</div>
			<div class="separator"></div>
			<div class="block-table">
				<div class="row">
					<div class="col c text-start">Скорострел</div>
				</div>
				<div class="row">
					<div class="col th" v-html="fleet['rapidfire']['to']"></div>
				</div>
				<div class="row">
					<div class="col th" v-html="fleet['rapidfire']['from']"></div>
				</div>
			</div>
			<div class="separator"></div>
			<div class="block-table">
				<div class="row">
					<div class="col c text-start">Затраты на производство</div>
				</div>
				<div class="row">
					<div class="col th">Металл</div>
					<div class="col th">{{ $number(fleet['resources']['metal']['base']) }} ({{ $number(fleet['resources']['metal']['full']) }})</div>
				</div>
				<div class="row">
					<div class="col th">Кристалл</div>
					<div class="col th">{{ $number(fleet['resources']['crystal']['base']) }} ({{ $number(fleet['resources']['crystal']['full']) }})</div>
				</div>
				<div class="row">
					<div class="col th">Дейтерий</div>
					<div class="col th">{{ $number(fleet['resources']['deuterium']['base']) }} ({{ $number(fleet['resources']['deuterium']['full']) }})</div>
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