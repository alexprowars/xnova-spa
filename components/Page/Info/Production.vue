<template>
	<div class="block">
		<div class="title">Производство</div>
		<div class="content table border-0">
			<template v-if="item === 42">
				<div class="row">
					<div class="col c">Уровень</div>
					<div class="col c">Дальность</div>
				</div>
				<div v-for="row in production" class="row">
					<div class="col th"><span :class="{neutral: row['value']}">{{ row['level'] }}</span></div>
					<div class="col th">{{ row['range'] }}</div>
				</div>
			</template>
			<template v-else-if="item === 22 || item === 23 || item === 24">
				<div class="row">
					<div class="col c">Уровень</div>
					<div class="col c">Вместимость</div>
				</div>
				<div v-for="row in production" class="row">
					<div class="col th"><span :class="{neutral: row['value']}">{{ row['level'] }}</span></div>
					<div class="col th">{{ row['range'] }}k</div>
				</div>
			</template>
			<template v-else-if="item !== 4">
				<div class="row">
					<div class="col c">Уровень</div>
					<div class="col c">Выработка</div>
					<div class="col c">Разница</div>
					<div class="col c">Энергия</div>
					<div class="col c">Разница</div>
				</div>
				<div v-for="row in production" class="row">
					<div class="col th"><span :class="{neutral: row['value']}">{{ row['level'] }}</span></div>
					<div class="col th">{{ $number(row['prod']) }}</div>
					<div class="col th"><Colored :value="row['prod_diff']"></Colored></div>
					<div class="col th"><Colored :value="row['need']"></Colored></div>
					<div class="col th"><Colored :value="row['need_diff']"></Colored></div>
				</div>
			</template>
			<template v-else>
				<div class="row">
					<div class="col c">Уровень</div>
					<div class="col c">Выработка</div>
					<div class="col c">Разница</div>
				</div>
				<div v-for="row in production" class="row">
					<div class="col th"><span :class="{neutral: row['value']}">{{ row['level'] }}</span></div>
					<div class="col th">{{ $number(row['prod']) }}</div>
					<div class="col th"><Colored :value="row['prod_diff']"></Colored></div>
				</div>
			</template>
		</div>
	</div>
</template>

<script>
	export default {
		name: "info-production",
		props: {
			production: {
				type: Array,
				default: () => {
					return []
				}
			},
			item: {
				type: Number,
				default: 0,
			}
		}
	}
</script>