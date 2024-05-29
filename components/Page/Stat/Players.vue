<template>
	<div class="block page-stat-players">
		<div class="content border-0">
			<div class="block-table middle">
				<div class="row">
					<div class="c col-sm-1 col-2 middle">Место</div>
					<div class="c col-sm-1 d-none d-sm-block middle">+/-</div>
					<div class="c col-sm-4 col-5 middle">Игрок</div>
					<div class="c col-sm-1 col-2 middle">&nbsp;</div>
					<div class="c col-sm-3 d-none d-sm-block middle">Альянс</div>
					<div class="c col-sm-2 col-3 middle">Очки</div>
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