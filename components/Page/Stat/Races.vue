<template>
	<div class="block page-stat-races">
		<div class="content border-0">
			<div class="block-table middle">
				<div class="row">
					<div class="c col-2">Место</div>
					<div class="c col-1">&nbsp;</div>
					<div class="c col-3">Игроков</div>
					<div class="c col-3">Очков</div>
					<div class="c col-3">Очки на игрока</div>
				</div>
				<div v-for="item in items" class="row page-stat-races-row">
					<div class="th col-2">{{ item['place'] }}</div>
					<div class="th col-1 text-center">
						<img :src="'/images/skin/race'+item['race']+'.gif'" width="30" height="30">
					</div>
					<div class="th col-3">{{ $formatNumber(item['count']) }}</div>
					<div class="th col-3">{{ $formatNumber(item['points']) }}</div>
					<div class="th col-3">
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