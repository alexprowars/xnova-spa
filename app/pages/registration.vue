<template>
	<div class="page-registration">
		<div class="block">
			<div class="title">Регистрация</div>
			<div class="content">
				<div v-for="error in errors" v-html="error" class="message error"></div>
				<form class="block-table form" action="" method="post" @submit.prevent="send">
					<div class="grid grid-cols-12">
						<div class="col-span-5 th middle">E-Mail</div>
						<div class="col-span-7 th middle">
							<input :class="{error: v$.email.$error}" name="email" type="email" v-model="email" autocomplete="username">
						</div>
					</div>
					<div class="grid grid-cols-12">
						<div class="col-span-5 th middle">Пароль</div>
						<div class="col-span-7 th middle">
							<input :class="{error: v$.password.$error}" type="password" v-model="password" autocomplete="new-password">
						</div>
					</div>
					<div class="grid grid-cols-12">
						<div class="col-span-5 th middle">Подтверждение пароля</div>
						<div class="col-span-7 th middle">
							<input :class="{error: v$.password_confirm.$error}" type="password" v-model="password_confirm" autocomplete="new-password">
						</div>
					</div>
					<ReCaptcha v-if="recaptchaKey" v-model="captchaToken"/>
					<div class="grid">
						<div class="th text-left">
							<input :class="{error: v$.rules.$error}" id="rules" type="checkbox" v-model="rules">
							<label for="rules">Я принимаю</label>
							<NuxtLink to="/content/agreement" target="_blank">Пользовательское соглашение</NuxtLink>
						</div>
					</div>
					<div class="grid">
						<div class="th text-left">
							<input :class="{error: v$.laws.$error}" id="laws" type="checkbox" v-model="laws">
							<label for="laws">Я принимаю</label>
							<NuxtLink to="/content/agb" target="_blank">Законы игры</NuxtLink>
						</div>
					</div>
					<div class="grid">
						<div class="th text-center">
							<button type="submit" class="button">
								Регистрация
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { useVuelidate } from '@vuelidate/core'
	import { required, email as emailValidation, minLength } from '@vuelidate/validators'
	import { ref } from 'vue';
	import { useHead, useRuntimeConfig, navigateTo, useApiPost } from '#imports';
	import useStore from '~/store/index.js';
	import ReCaptcha from '~/components/ReCaptcha.vue';

	if (process.server) {
		useHead({
			title: 'Регистрация',
		});
	}

	const errors = ref([]);
	const email = ref('');
	const password = ref('');
	const password_confirm = ref('');
	const rules = ref(false);
	const laws = ref(false);
	const { public: { recaptchaKey } } = useRuntimeConfig();
	const captchaToken = ref('');

	const validations = {
		email: {
			required,
			emailValidation,
		},
		password: {
			required,
			minLength: minLength(4),
		},
		password_confirm: {
			required,
			minLength: minLength(4),
		},
		rules: {
			required,
		},
		laws: {
			required,
		}
	}

	const v$ = useVuelidate(
		validations,
		{ email, password, password_confirm, rules, laws },
		{ $autoDirty: true }
	);

	async function send () {
		if (!await v$.value.$validate()) {
			return
		}

		try {
			await useApiPost('/registration', {
				email: email.value,
				password: password.value,
				password_confirmation: password_confirm.value,
				captcha: captchaToken.value,
			});

			await useStore().loadState();

			navigateTo('/start');
		} catch (e) {
			if (typeof e.item['errors'] !== 'undefined' && e.item['errors']) {
				errors.value = e.item['errors'];
			}

			window.grecaptcha?.enterprise.reset();
		}
	}
</script>