<template>
	<div>
		<div v-if="error" v-html="error.text" :class="[error.type]" class="message"></div>
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
	import { useApiPost } from '~/composables/useApi';
	import { navigateTo } from '#app';
	import useStore from '~/store/index.js';

	const email = ref('');
	const password = ref('');
	const remember = ref(true);
	const error = ref(false);

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
			const result = await useApiPost('/login', {
				email: email.value,
				password: password.value,
				remember: remember.value,
			});

			if (typeof result['messages'] !== 'undefined' && result['messages']) {
				error.value = result['messages'][0];
			} else {
				await useStore().loadState();

				navigateTo('/overview');
			}
		} catch (e) {
			alert(e);
		}
	}
</script>