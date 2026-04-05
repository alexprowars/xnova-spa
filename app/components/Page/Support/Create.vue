<template>
	<div class="block page-support-new">
		<div class="title text-center">
			Новый запрос
		</div>
		<div class="content">
			<div class="block-table">
				<div class="grid">
					<div class="th">
						<input type="text" v-model="subject" class="width-full" :class="{error: v$.subject.$error}" placeholder="Тема">
					</div>
				</div>
				<div class="grid">
					<div class="th">
						<TextEditor v-model="message" :class="{error: v$.message.$error}"/>
					</div>
				</div>
				<div class="grid">
					<div class="c text-center">
						<button @click.prevent="request">Отправить</button>
						<button @click.prevent="emit('close')">Закрыть</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { ref } from 'vue';
	import { refreshNuxtData, openAlertModal, useApiPost, useSuccessNotification } from '#imports';
	import { required } from '@vuelidate/validators';
	import { useVuelidate } from '@vuelidate/core';

	const emit = defineEmits(['close']);

	const message = ref('');
	const subject = ref('');

	const validations = {
		message: {
			required
		},
		subject: {
			required
		},
	}

	const v$ = useVuelidate(
		validations,
		{ message, subject },
		{ $autoDirty: true }
	);

	async function request() {
		if (!await v$.value.$validate()) {
			return
		}

		try {
			await useApiPost('/support/create', {
				subject: subject.value,
				message: message.value,
			});

			useSuccessNotification('Запрос добавлен');

			emit('close');

			await refreshNuxtData();
		} catch (e) {
			await openAlertModal(null, e);
		}
	}
</script>