<template>
	<div class="block start race">
		<div class="title">Выбор фракции</div>
		<div class="content border-0">
			<div class="block-table" id="tabs">
				<div class="row">
					<div v-for="(race, index) in Object.keys($tm('races'))" class="col-6 th">
						<input type="radio" @change="select(race)" :id="'f_'+race">
						<label :for="'f_'+race" class="race">
							<img :src="'/images/skin/race' + race + '.gif'" alt=""><br>
							<h3>{{ $t('races.' + race) }}</h3>
							<span v-html="$t('info.' + (701 + index))"></span>
						</label>
					</div>
				</div>
				<div class="row">
					<div class="col th">
						<button @click.prevent="save">Продолжить</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { useApiPost } from '~/composables/useApi.js';
	import useStore from '~/store/index.js';
	import { ref } from 'vue';
	import { navigateTo } from '#imports';

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

			navigateTo('/tutorial');
		} catch (e) {
			alert(e.data?.message || e.message);
		}
	}
</script>