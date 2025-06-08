<template>
	<div class="block page-stat-races">
		<div class="content !border-0">
			<div class="block-table text-center">
				<div class="grid grid-cols-12">
					<div class="c col-span-2">Место</div>
					<div class="c col-span-1">&nbsp;</div>
					<div class="c col-span-3">Игроков</div>
					<div class="c col-span-3">Очков</div>
					<div class="c col-span-3">Очки на игрока</div>
				</div>
				<div v-for="item in items" class="page-stat-races-row grid grid-cols-12">
					<div class="th col-span-2 middle">{{ item['place'] }}</div>
					<div class="th col-span-1 middle">
						<img :src="'/images/skin/race' + item['race'] + '.gif'" width="30" height="30">
					</div>
					<div class="th col-span-3 middle">{{ $formatNumber(item['count']) }}</div>
					<div class="th col-span-3 middle">{{ $formatNumber(item['points']) }}</div>
					<div class="th col-span-3 middle">
						{{ $formatNumber(Math.floor(item['points'] / item['count'])) }}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "stat-races",
		props: {
			items: Array
		}
	}
</script>