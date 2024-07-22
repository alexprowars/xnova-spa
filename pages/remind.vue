<template>
	<div class="page-remind">
		<div v-if="error" v-html="error.message" :class="[error.type]" class="message"></div>
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
						<button type="submit">Выслать пароль</button>
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
	import { useHead, useApiPost } from '#imports';
	import { toast } from 'vue3-toastify';

	useHead({
		title: 'Восстановление пароля',
	});

	const email = ref('');
	const error = ref();

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

		try {
			const result = await useApiPost('/login/reset', {
				email: email.value,
			});

			email.value = '';
			error.value = { message: result['message'], type: 'success' }
		} catch (e) {
			error.value = { message: e.message, type: 'error' }
		}
	}
</script>