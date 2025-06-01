<template>
	<form method="post" @submit.prevent="update">
		<table class="table">
			<tbody>
			<tr>
				<td class="c" colspan="2">Смена адреса электронной почты</td>
			</tr>
			<tr>
				<th>Текущий пароль</th>
				<th><input type="password" name="password" v-model="password" :class="{error: v$.password.$error}" size="20"></th>
			</tr>
			<tr>
				<th>Новый Email адрес</th>
				<th><input type="email" name="email" v-model="email" :class="{error: v$.email.$error}" size="20" autocomplete="off"></th>
			</tr>
			<tr>
				<td colspan="2" class="c"><button type="submit">Сменить</button></td>
			</tr>
			</tbody>
		</table>
	</form>
</template>

<script setup>
	import { definePageMeta, navigateTo, showError, useApiSubmit, useAsyncData, useHead, useRoute, useSuccessNotification } from '#imports';
	import { useVuelidate } from '@vuelidate/core'
	import { required, email as emailValidation } from '@vuelidate/validators'
	import useStore from '~/store';
	import { ref } from 'vue';

	definePageMeta({
		middleware: ['auth'],
		view: {
			resources: false,
		}
	});

	useHead({
		title: 'Смена Email',
	});

	const store = useStore();

	const { error } = await useAsyncData(async () => {
		await store.loadState(); return {}
	}, { watch: [() => useRoute().query] });

	if (error.value) {
		throw showError(error.value);
	}

	const password = ref('');
	const email = ref('');

	const validations = {
		password: {
			required
		},
		email: {
			required,
			emailValidation
		},
	}

	const v$ = useVuelidate(
		validations,
		{ password, email },
		{ $autoDirty: true }
	);

	async function update() {
		if (!await v$.value.$validate()) {
			return
		}

		await useApiSubmit('/options/email', {
			password: password.value,
			email: email.value,
		}, async () => {
			useSuccessNotification('Ваш Email успешно изменен');

			navigateTo('/options');
		});
	}
</script>