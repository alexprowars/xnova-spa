<template>
	<div class="block page-stat-players">
		<div class="content !border-0">
			<div class="block-table text-center middle">
				<div class="grid grid-cols-12">
					<div class="c sm:col-span-1 col-span-2 middle">Место</div>
					<div class="c sm:col-span-1 hidden sm:block middle">+/-</div>
					<div class="c sm:col-span-4 col-span-5 middle">Игрок</div>
					<div class="c sm:col-span-1 col-span-2 middle">&nbsp;</div>
					<div class="c sm:col-span-3 hidden sm:block middle">Альянс</div>
					<div class="c sm:col-span-2 col-span-3 middle">Очки</div>
				</div>
				<PlayersRow v-for="item in items" :key="item['id']" :item="item"/>
			</div>
		</div>
	</div>
</template>

<script setup>
	import PlayersRow from '~/components/Page/Stat/PlayersRow.vue';

	defineProps({
		items: Array
	});
</script>