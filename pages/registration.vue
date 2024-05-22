<template>
	<div class="page-registration">
		<div v-for="error in page.errors" v-html="error" class="message error"></div>
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
				<div class="row">
					<div class="col th text-center">
						<div ref="captchaRef"></div>
					</div>
				</div>
				<div class="row">
					<div class="col th text-start">
						<input :class="{error: v$.rules.$error}" id="rules" type="checkbox" v-model="rules">
						<label for="rules">Я принимаю</label>
						<NuxtLinkLocale to="/content/agreement/" target="_blank">Пользовательское соглашение</NuxtLinkLocale>
					</div>
				</div>
				<div class="row">
					<div class="col th text-start">
						<input :class="{error: v$.laws.$error}" id="laws" type="checkbox" v-model="laws">
						<label for="laws">Я принимаю</label>
						<NuxtLinkLocale to="/content/agb/" target="_blank">Законы игры</NuxtLinkLocale>
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
</template>

<script setup>
	import { useVuelidate } from '@vuelidate/core'
	import { required, email as emailValidation, minLength } from '@vuelidate/validators'
	import { ref, onMounted } from 'vue';
	import { showError, useAsyncData, useRuntimeConfig } from '#imports';
	import useStore from '~/store';
	import { useApiPost } from '~/composables/useApi';

	const props = defineProps({
		popup: {
			type: Object
		}
	});

	const { data: page, error } = await useAsyncData(async () => {
		if (process.server) {
			return await useStore().loadPage();
		} else {
			return {}
		}
	});

	if (error.value) {
		throw showError(error.value);
	}

	const email = ref('');
	const password = ref('');
	const password_confirm = ref('');
	const rules = ref(false);
	const laws = ref(false);
	const captcha = ref(null);
	const captchaRef = ref(null);
	const { public: { recaptchaKey } } = useRuntimeConfig();

	page.value = props.popup !== undefined ? props.popup : page.value;

	onMounted(() => {
		captcha.value = grecaptcha.render(captchaRef.value, {
			sitekey: recaptchaKey,
		});
	})

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

		useApiPost('/registration/', {
			email: email.value,
			password: password.value,
			password_confirm: password_confirm.value,
			captcha: grecaptcha.getResponse(captcha.value)
		})
		.then((result) => {
			if (result.redirect && result.redirect.length) {
				window.location.href = result.redirect;
			} else {
				grecaptcha.reset(captcha.value)
				page.value = result.page;
			}
		})
	}
</script>