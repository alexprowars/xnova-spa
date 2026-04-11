<template>
	<div class="block start race">
		<div class="title">{{ $t('pages.start.race_selection') }}</div>
		<div class="content">
			<div class="block-table">
				<div class="grid grid-cols-2">
					<div v-for="(race_id, index) in Object.keys($tm('races'))" class="th">
						<div class="race-item" :class="{ selected: race === race_id }" @click="select(race_id)">
							<img :src="'/images/skin/race' + race_id + '.gif'" alt=""><br>
							<h3>{{ $t('races.' + race_id) }}</h3>
							<span v-html="$t('info.' + (701 + index))"></span>
						</div>
					</div>
				</div>
				<div class="grid">
					<div class="th">
						<button @click.prevent="save">{{ $t('pages.start.continue') }}</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import useStore from '~/store/index.js';
	import { ref } from 'vue';
	import { useApiPost, navigateTo } from '#imports';

	const race = ref(null);

	function select(val) {
		race.value = val;
	}

	async function save() {
		try {
			await useApiPost('/start/race', {
				race: race.value,
			});

			await useStore().loadState();

			navigateTo('/quests');
		} catch (e) {
			alert(e.item?.message || e.message);
		}
	}
</script>