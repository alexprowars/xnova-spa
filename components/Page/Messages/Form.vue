<template>
	<div class="block">
		<div class="title">
			Отправка сообщения
		</div>
		<div class="content">
			<form action="" method="post" @submit.prevent="send" class="block-table form-group text-center">
				<div class="grid">
					<div class="th">
						Получатель
					</div>
				</div>
				<div v-if="to.length" class="grid">
					<div class="c" v-html="to"></div>
				</div>
				<div class="grid">
					<div class="th">
						<TextEditor :class="{error: v$.message.$error}" v-model="message"/>
					</div>
				</div>
				<div class="grid">
					<div class="c">
						<button type="submit">Отправить</button>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>

<script setup>
	import { useVuelidate } from '@vuelidate/core'
	import { required } from '@vuelidate/validators'
	import { ref } from 'vue';
	import { useApiPost, useSuccessNotification } from '#imports';

	const props = defineProps({
		id: {
			type: Number,
			default: 0,
		},
		to: {
			type: String,
			default: '',
		},
		message: {
			type: String,
			default: '',
		}
	});

	const message = ref(props.message);
	const error = ref(false);

	const validations = {
		message: {
			required
		},
	}

	const v$ = useVuelidate(
		validations,
		{ message },
		{ $autoDirty: true }
	);

	async function send () {
		if (props.id <= 0) {
			return;
		}

		if (!await v$.value.$validate()) {
			return
		}

		try {
			const result = await useApiPost('/messages/write/' + props.id, {
				message: message.value,
			});

			if (result.redirect && result.redirect.length) {
				window.location.href = result.redirect;
			} else {
				useSuccessNotification('Сообщение отправлено!');

				message.value = '';
				v$.value.$reset();

				error.value = result.error;
			}
		} catch {
		}
	}
</script>