<template>
	<form @submit.prevent="save">
		<div class="block-table text-center">
			<div class="grid">
				<div class="c">Создать новый ранг</div>
			</div>
			<div class="grid grid-cols-2">
				<div class="th">Имя ранга</div>
				<div class="th"><input type="text" v-model="name" :class="{error: v$.name.$error}" size="20" maxlength="30"></div>
			</div>
			<div class="grid">
				<div class="th"><button type="submit">Создать</button></div>
			</div>
		</div>
	</form>
</template>

<script setup>
	import { useApiSubmit, refreshNuxtData } from '#imports';
	import { ref } from 'vue';
	import { useVuelidate } from '@vuelidate/core';
	import { required, sameAs } from '@vuelidate/validators';

	const name = ref('');

	const validations = {
		name: {
			required
		},
	}

	const v$ = useVuelidate(
		validations,
		{ name },
		{ $autoDirty: true }
	);

	async function save() {
		if (!await v$.value.$validate()) {
			return
		}

		await useApiSubmit('alliance/admin/ranks/create', {
			name: name.value,
		}, () => {
			name.value = '';

			refreshNuxtData();
		});
	}
</script>