<template>
	<form method="post" @submit.prevent="update">
		<table class="table">
			<tr>
				<td class="c" colspan="2">Смена адреса электронной почты</td>
			</tr>
			<tr>
				<th>Текущий пароль</th>
				<th><input name="password" size="20" type="password" v-model="password"></th>
			</tr>
			<tr>
				<th>Новый Email адрес</th>
				<th><input name="email" size="20" type="text" v-model="email"></th>
			</tr>
			<tr>
				<th colspan="2">
					Смена адреса email осуществляется ручным методом после проверки аккаунта администрацией игры.
				</th>
			</tr>
			<tr>
				<td colspan="2" class="c"><button type="submit">Отправить на модерацию</button></td>
			</tr>
		</table>
	</form>
</template>

<script setup>
	import { definePageMeta, navigateTo, showError, useApiSubmit, useAsyncData, useHead, useRoute, useSuccessNotification } from '#imports';
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

	function update() {
		useApiSubmit('/options/email', {
			password: password.value,
			email: email.value,
		}, () => {
			useSuccessNotification('Заявка отправлена на рассмотрение');

			navigateTo('/options');
		});
	}
</script>