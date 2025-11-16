<template>
	<div>
		<div v-if="error" v-html="error" class="message error"></div>
		<form action="" method="post" @submit.prevent="send">
			<input :class="{error: v$.email.$error}" name="email" class="input-text" placeholder="Email" v-model="email" type="email" autocomplete="username">
			<input :class="{error: v$.password.$error}" name="password" class="input-text" placeholder="Пароль" v-model="password" type="password" autocomplete="current-password">
			<button type="submit" class="input-submit">Вход</button>
			<div class="remember">
				<input id="rememberme" type="checkbox" v-model="remember">
				<label for="rememberme">Запомнить меня</label>
			</div>
		</form>
	</div>
</template>

<script setup>
	import { useVuelidate } from '@vuelidate/core'
	import { required, email as emailValidation } from '@vuelidate/validators'
	import { ref } from 'vue';
	import { useApiPost, navigateTo, useErrorNotification, useEvents } from '#imports';
	import useStore from '~/store';

	const email = ref('');
	const password = ref('');
	const remember = ref(true);
	const error = ref(null);

	try {
		email.value = localStorage.getItem('email')
	} catch {}

	const validations = {
		email: {
			required,
			emailValidation
		},
		password: {
			required
		},
	}

	const v$ = useVuelidate(
		validations,
		{ email, password },
		{ $autoDirty: true }
	);

	async function send () {
		if (!await v$.value.$validate()) {
			return
		}

		try {
			await useApiPost('/login', {
				email: email.value,
				password: password.value,
				remember: remember.value,
			});

			await useStore().loadState();

			useEvents().emit('login');

			navigateTo('/overview');
		} catch (e) {
			error.value = e.message;
		}
	}
</script>