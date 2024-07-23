<template>
	<form method="post" @submit.prevent="changeRace">
		<select v-model="race">
			<option value="">выбрать...</option>
			<option value="1">Конфедерация</option>
			<option value="2">Бионики</option>
			<option value="3">Сайлоны</option>
			<option value="4">Древние</option>
		</select>
		<br><br>
		<button v-if="race" type="submit">Сменить фракцию</button>
	</form>
</template>

<script setup>
	import { useApiSubmit, navigateTo } from '#imports';
	import { ref } from 'vue';
	import { toast } from 'vue3-toastify';

	const race = ref('');

	function changeRace() {
		useApiSubmit('/race/change', {
			race: race.value,
		}, () => {
			toast('Фракция изменена', {
				type: 'success'
			})

			navigateTo('/overview');
		});
	}
</script>