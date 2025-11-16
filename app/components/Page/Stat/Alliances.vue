<template>
	<div class="block page-stat-alliances">
		<div class="content">
			<div class="block-table text-center">
				<div class="grid grid-cols-12">
					<div class="c col-span-2 sm:col-span-1">Место</div>
					<div class="c sm:col-span-1 hidden sm:block">+/-</div>
					<div class="c col-span-4 sm:col-span-5">Альянс</div>
					<div class="c col-span-2 sm:col-span-1">Игроки</div>
					<div class="c sm:col-span-2 hidden sm:block">Очки</div>
					<div class="c sm:col-span-2 hidden sm:block">Очки на игрока</div>
					<div class="c col-span-4 sm:hidden">Очки / Очки на игрока</div>
				</div>
				<div v-for="item in items" class="page-stat-alliances-row grid grid-cols-12">
					<div class="col-span-2 sm:col-span-1 th">
						{{ item['place'] }}
						<div class="sm:hidden">
							<div v-if="item['diff'] === 0" :style="{color: '#87CEEB'}">*</div>
							<span v-else-if="item['diff'] < 0" class="negative">{{ item['diff'] }}</span>
							<span v-else-if="item['diff'] > 0" class="positive">+{{ item['diff'] }}</span>
						</div>
					</div>
					<div class="sm:col-span-1 th hidden sm:block">
						<div v-if="item['diff'] === 0" :style="{color: '#87CEEB'}">*</div>
						<span v-else-if="item['diff'] < 0" class="negative">{{ item['diff'] }}</span>
						<span v-else-if="item['diff'] > 0" class="positive">+{{ item['diff'] }}</span>
					</div>
					<div class="col-span-4 sm:col-span-5 th middle">
						<NuxtLink :class="{neutral: item['name_marked']}" :to="'/alliance/info/' + item['id']">{{ item['name'] }}</NuxtLink>
					</div>
					<div class=" col-span-2 sm:col-span-1 th middle">
						{{ item['members'] }}
					</div>
					<div class="sm:col-span-2 th hidden sm:block">
						<NuxtLink :to="'/alliance/stat/' + item['id']">{{ $formatNumber(item['points']) }}</NuxtLink>
					</div>
					<div class="sm:col-span-2 th hidden sm:block">
						{{ $formatNumber(Math.floor(item['points'] / item['members'])) }}
					</div>
					<div class="col-span-4 th sm:hidden">
						<NuxtLink :to="'/alliance/stat/' + item['id']">{{ $formatNumber(item['points']) }}</NuxtLink>
						<br>
						{{ $formatNumber(Math.floor(item['points'] / item['members'])) }}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	defineProps({
		items: Array
	});
</script>