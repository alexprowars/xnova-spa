<template>
	<form @click.prevent>
		<div class="separator"></div>
		<div class="block-table">
			<div class="row">
				<div class="col th">Заявка от {{ request['name'] }}</div>
			</div>
			<div class="row">
				<div class="col th">{{ request['message'] }}</div>
			</div>
			<div class="row">
				<div class="col c">Форма ответа:</div>
			</div>
			<div class="row">
				<div class="col th"><button @click.prevent="accept">Принять</button></div>
			</div>
			<div class="row">
				<div class="col th"><textarea v-model="message" cols="40" rows="10"></textarea></div>
			</div>
			<div class="row">
				<div class="col th"><button @click.prevent="reject">Отклонить</button></div>
			</div>
		</div>
		<div class="separator"></div>
	</form>
</template>

<script setup>
	import { ref } from 'vue';
	import { useApiSubmit } from '~/composables/useApi.js';
	import { toast } from 'vue3-toastify';
	import { refreshNuxtData, navigateTo } from '#imports';

	const props = defineProps({
		request: Object,
	});

	const message = ref('');
	const emit = defineEmits(['close']);

	function accept() {
		useApiSubmit('alliance/admin/requests/accept', {
			id: props.request['id'],
			message: message.value,
		}, () => {
			toast('Игрок принят в альянс', {
				type: 'success'
			});

			navigateTo('/alliance/members');
		});
	}

	function reject() {
		useApiSubmit('alliance/admin/requests/reject', {
			id: props.request['id'],
			message: message.value,
		}, () => {
			toast('Вы отклонили заявку', {
				type: 'success'
			});

			emit('close');

			refreshNuxtData('page-alliance.requests');
		});
	}
</script>