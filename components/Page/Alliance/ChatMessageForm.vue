<template>
	<form class="block-table text-center" method="post" @submit.prevent="send">
		<div class="grid">
			<div class="c">Отправить сообщение в чат альянса</div>
		</div>
		<div class="grid">
			<div class="th">
				<TextEditor v-model="value"/>
			</div>
		</div>
		<div class="grid">
			<div class="c">
				<button @click.prevent="reset">Очистить</button>
				<button type="submit">Отправить</button>
			</div>
		</div>
	</form>
</template>

<script setup>
	import Form from '~/components/Page/Messages/Form.vue';
	import { useApiSubmit, refreshNuxtData, useSuccessNotification } from '#imports';

	const value = defineModel();
	const emit = defineEmits(['send']);

	function reset() {
		value.value = '';
	}

	function send() {
		useApiSubmit('/alliance/chat', {
			message: value.value,
		}, () => {
			useSuccessNotification('Сообщение отправлено');

			value.value = '';

			emit('send');
		});
	}
</script>