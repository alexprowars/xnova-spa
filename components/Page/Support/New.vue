<template>
	<div class="block page-support-new">
		<div class="title text-center">
			Новый запрос
		</div>
		<div class="content border-0">
			<div class="block-table">
				<div class="row">
					<div class="col-3 th">Тема:</div>
					<div class="col-9 th">
						<input type="text" v-model="subject" class="width-full" name="subject">
					</div>
				</div>
				<div class="row">
					<div class="col-3 th">Текст сообщения:</div>
					<div class="col-9 th">
						<TextEditor v-model="message"/>
					</div>
				</div>
				<div class="row">
					<div class="col c">
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

	const emit = defineEmits(['close']);

	const message = ref('');
	const subject = ref('');

	async function request() {
		try {
			await useApiPost('/support/add', {
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