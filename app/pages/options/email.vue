<template>
	<div class="block">
		<div class="title">Смена адреса электронной почты</div>
		<div class="content">
			<form class="block-table text-center" method="post" @submit.prevent="update">
				<div class="grid grid-cols-2">
					<div class="th middle">Текущий пароль</div>
					<div class="th middle"><input type="password" name="password" v-model="password" :class="{error: v$.password.$error}" size="20"></div>
				</div>
				<div class="grid grid-cols-2">
					<div class="th middle">Новый Email адрес</div>
					<div class="th middle"><input type="email" name="email" v-model="email" :class="{error: v$.email.$error}" size="20" autocomplete="off"></div>
				</div>
				<div>
					<div class="c"><button type="submit">Сменить</button></div>
				</div>
			</form>
		</div>
	</div>
	<div class="mt-2">
		<NuxtLink to="/options" class="button">Назад</NuxtLink>
	</div>
</template>

<script setup>
	import { definePageMeta, navigateTo, useApiSubmit, useHead, useSuccessNotification } from '#imports';
	import { useVuelidate } from '@vuelidate/core'
	import { required, email as emailValidation } from '@vuelidate/validators'
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