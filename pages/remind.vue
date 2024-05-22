<template>
	<div class="page-remind">
		<div v-if="errors" v-html="errors.message" :class="[errors.type]" class="message"></div>
		<form action="" method="post" class="form" @submit.prevent="send">
			<div class="block-table">
				<div class="row">
					<div class="col th">
						Введите ваш Email, который вы указали при регистрации.
						При нажатии на кнопку "Получить пароль" на ваш e-mail будет выслана ссылка на новый пароль.
					</div>
				</div>
				<div class="row">
					<div class="col th">
						Ваш Email: <input :class="{error: v$.email.$error}" type="email" name="email" v-model="email">
					</div>
				</div>
				<div class="row">
					<div class="col th">
						<input name="submit" type="submit" value="Выслать пароль">
					</div>
				</div>
			</div>
		</form>
	</div>
</template>

<script setup>
	import { useVuelidate } from '@vuelidate/core'
	import { required, email as emailValidation } from '@vuelidate/validators'
	import { ref } from 'vue';
	import { showError, useAsyncData, useHead } from '#imports';
	import useStore from '~/store';

	useHead({
		title: 'Восстановление пароля',
	});

	const props = defineProps({
		popup: {
			type: Object
		}
	});

	const { data, error } = await useAsyncData(async () => {
		const data = await useStore().loadPage()

		return { data: data.page }
	});

	if (error.value) {
		throw showError(error.value);
	}

	const page = ref({});
	const email = ref('');
	const errors = ref(false);

	page.value = props.popup !== undefined ? props.popup : data.value

	const validations = {
		email: {
			required,
			emailValidation
		},
	}

	const v$ = useVuelidate(
		validations,
		{ email },
		{ $autoDirty: true }
	);

	async function send () {
		if (!await v$.value.$validate()) {
			return
		}

		post('/login/reset/', {
			email: email.value,
		})
		.then((result) => {
			if (result.redirect && result.redirect.length) {
				window.location.href = result.redirect;
			} else {
				errors.value = result.error;
			}
		})
	}
</script>