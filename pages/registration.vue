<template>
	<div class="page-registration">
		<div class="block">
			<div class="title">Регистрация</div>
			<div class="content border-0">
				<div v-for="error in errors" v-html="error" class="message error"></div>
				<form action="" method="post" class="form" @submit.prevent="send">
					<div class="block-table">
						<div class="row">
							<div class="col-5 th">E-Mail<br>(используется для входа)</div>
							<div class="col-7 th">
								<input :class="{error: v$.email.$error}" name="email" type="email" v-model="email" autocomplete="username">
							</div>
						</div>
						<div class="row">
							<div class="col-5 th">Пароль</div>
							<div class="col-7 th">
								<input :class="{error: v$.password.$error}" type="password" v-model="password" autocomplete="new-password">
							</div>
						</div>
						<div class="row">
							<div class="col-5 th">Подтверждение пароля</div>
							<div class="col-7 th">
								<input :class="{error: v$.password_confirm.$error}" type="password" v-model="password_confirm" autocomplete="new-password">
							</div>
						</div>
						<div v-if="recaptchaKey" class="row">
							<div class="col th text-center">
								<div ref="captchaRef" class="g-recaptcha" :data-sitekey="recaptchaKey"></div>
							</div>
						</div>
						<div class="row">
							<div class="col th text-start">
								<input :class="{error: v$.rules.$error}" id="rules" type="checkbox" v-model="rules">
								<label for="rules">Я принимаю</label>
								<NuxtLink to="/content/agreement/" target="_blank">Пользовательское соглашение</NuxtLink>
							</div>
						</div>
						<div class="row">
							<div class="col th text-start">
								<input :class="{error: v$.laws.$error}" id="laws" type="checkbox" v-model="laws">
								<label for="laws">Я принимаю</label>
								<NuxtLink to="/content/agb/" target="_blank">Законы игры</NuxtLink>
							</div>
						</div>
						<div class="row">
							<div class="col th">
								<input name="submit" type="submit" value="Регистрация">
							</div>
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
	import { ref, onMounted, nextTick } from 'vue';
	import { useHead, useRuntimeConfig, navigateTo, addScript, useApiPost } from '#imports';
	import useStore from '~/store/index.js';

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
	const captcha = ref(null);
	const captchaRef = ref(null);
	const { public: { recaptchaKey } } = useRuntimeConfig();

	onMounted(() => {
		addScript('https://www.google.com/recaptcha/api.js')

		//if (recaptchaKey) {
			//captcha.value = grecaptcha.render(captchaRef.value, {
			//	sitekey: recaptchaKey,
			//});
		//}
	});

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
				captcha: document.querySelector('#g-recaptcha-response')?.value,
			});

			await useStore().loadState();

			navigateTo('/start');
		} catch (e) {
			if (typeof e.data['errors'] !== 'undefined' && e.data['errors']) {
				errors.value = e.data['errors'];
			}
		}
	}
</script>