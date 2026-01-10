<template>
	<div class="flex justify-center">
		<div class="block w-full max-w-3xl">
			<div class="title">Изменение пароля</div>
			<div class="content">
				<form class="block-table text-center" method="post" action="" @submit.prevent="send">
					<div v-if="error" class="grid">
						<div v-html="error" class="th error message"></div>
					</div>
					<div class="grid grid-cols-4">
						<div class="th">Email</div>
						<div class="th col-span-3">
							{{ email }}
						</div>
					</div>
					<div class="grid grid-cols-4">
						<div class="th">Новый пароль</div>
						<div class="th col-span-3">
							<input :class="{error: v$.password.$error}" id="auth_password" name="password" type="password" autocomplete="new-password" class="input-text" v-model="password">
						</div>
					</div>
					<div class="grid grid-cols-4">
						<div class="th">Подтверждение пароля</div>
						<div class="th col-span-3">
							<input :class="{error: v$.passwordConfirm.$error}" id="auth_password2" name="password_confirmation" type="password" autocomplete="new-password" class="input-text" v-model="passwordConfirm">
						</div>
					</div>
					<div class="grid">
						<div class="th">
							<button type="submit">Изменить</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { definePageMeta, navigateTo, useApiPost, useEvents, useHead, useRoute } from '#imports';
	import { required, sameAs } from '@vuelidate/validators';
	import { useVuelidate } from '@vuelidate/core';
	import { ref, computed } from 'vue';
	import useStore from '~/store/index.js';

	useHead({
		title: 'Восстановление пароля',
	});

	definePageMeta({
		layout: 'empty',
	});

	const password = ref('')
	const passwordConfirm = ref('')
	const success = ref(false)
	const error = ref('')
	const route = useRoute()

	const email = computed(() => {
		return route.query['email'] || ''
	})

	const validations = {
		password: {
			required,
		},
		passwordConfirm: {
			required,
			sameAsPassword: sameAs(password)
		},
	}

	const v$ = useVuelidate(
		validations,
		{ password, passwordConfirm },
		{ $autoDirty: true }
	);

	async function send () {
		if (!await v$.value.$validate())
			return

		try {
			await useApiPost('/login/reset', {
				token: route.query['token'] || '',
				email: email.value,
				password: password.value,
				password_confirmation: passwordConfirm.value,
			});

			await useStore().loadState();

			useEvents().emit('login');

			await navigateTo('/overview');
		} catch (e) {
			error.value = e.message;
		}
	}
</script>