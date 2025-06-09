<template>
	<div class="block">
		<div class="title">Создать новый ранг</div>
		<div class="content">
			<form class="block-table text-center" @submit.prevent="save">
				<div class="grid grid-cols-2">
					<div class="th">Имя ранга</div>
					<div class="th"><input type="text" v-model="name" :class="{error: v$.name.$error}" size="20" maxlength="30"></div>
				</div>
				<div>
					<div class="c"><button type="submit">Создать</button></div>
				</div>
			</form>
		</div>
	</div>
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