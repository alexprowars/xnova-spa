<template>
	<div class="block">
		<div class="title">Производство</div>
		<div class="content block-table !border-t text-center">
			<template v-if="item === 42">
				<div class="grid grid-cols-2">
					<div class="c">Уровень</div>
					<div class="c">Дальность</div>
				</div>
				<div v-for="row in production" class="grid grid-cols-2">
					<div class="th"><span :class="{neutral: row['value']}">{{ row['level'] }}</span></div>
					<div class="th">{{ row['range'] }}</div>
				</div>
			</template>
			<template v-else-if="item === 22 || item === 23 || item === 24">
				<div class="grid grid-cols-2">
					<div class="c">Уровень</div>
					<div class="c">Вместимость</div>
				</div>
				<div v-for="row in production" class="grid grid-cols-2">
					<div class="th"><span :class="{neutral: row['value']}">{{ row['level'] }}</span></div>
					<div class="th">{{ row['range'] }}k</div>
				</div>
			</template>
			<template v-else-if="item !== 4">
				<div class="grid grid-cols-5">
					<div class="c">Уровень</div>
					<div class="c">Выработка</div>
					<div class="c">Разница</div>
					<div class="c">Энергия</div>
					<div class="c">Разница</div>
				</div>
				<div v-for="row in production" class="grid grid-cols-5">
					<div class="th"><span :class="{neutral: row['value']}">{{ row['level'] }}</span></div>
					<div class="th">{{ $formatNumber(row['prod']) }}</div>
					<div class="th"><Colored :value="row['prod_diff']"/></div>
					<div class="th"><Colored :value="row['need']"/></div>
					<div class="th"><Colored :value="row['need_diff']"/></div>
				</div>
			</template>
			<template v-else>
				<div class="grid grid-cols-3">
					<div class="c">Уровень</div>
					<div class="c">Выработка</div>
					<div class="c">Разница</div>
				</div>
				<div v-for="row in production" class="grid grid-cols-3">
					<div class="th"><span :class="{neutral: row['value']}">{{ row['level'] }}</span></div>
					<div class="th">{{ $formatNumber(row['prod']) }}</div>
					<div class="th"><Colored :value="row['prod_diff']"/></div>
				</div>
			</template>
		</div>
	</div>
</template>

<script setup>
	defineProps({
		production: {
			type: Array,
			default: () => []
		},
		item: {
			type: Number,
			default: 0,
		}
	})
</script>