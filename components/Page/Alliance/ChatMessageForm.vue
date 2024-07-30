<template>
	<form method="post" @submit.prevent="send">
		<table class="table">
			<tr>
				<td class="c">Отправить сообщение в чат альянса</td>
			</tr>
			<tr>
				<th class="p-a-0">
					<TextEditor v-model="value"/>
				</th>
			</tr>
			<tr>
				<td class="c">
					<button @click.prevent="reset">Очистить</button>
					<button type="submit">Отправить</button>
				</td>
			</tr>
		</table>
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