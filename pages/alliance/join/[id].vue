<template>
	<form @submit.prevent="send">
		<table class="table">
			<tbody>
			<template v-if="page['text']">
				<tr>
					<td class="c" colspan="2">Приветствие альянса</td>
				</tr>
				<tr>
					<td class="b" colspan="2" height="100" style="padding:3px;">
						<TextViewer :text="page['text']"/>
					</td>
				</tr>
			</template>
			<tr>
				<td class="c" colspan="2">Написать запрос на вступление в альянс [{{ page['tag'] }}]</td>
			</tr>
			<tr>
				<th><textarea cols="40" rows="10" v-model="message"></textarea></th>
			</tr>
			<tr>
				<th colspan="2"><button type="submit">Отправить</button></th>
			</tr>
			</tbody>
		</table>
	</form>
</template>

<script setup>
	import { navigateTo, showError, useApiGet, useApiSubmit, useAsyncData, useHead, useRoute, useSuccessNotification } from '#imports';
	import { ref } from 'vue';

	useHead({
		title: 'Запрос на вступление',
	});

	const route = useRoute();

	const { data: page, error } = await useAsyncData(
		async () => await useApiGet('/alliance/join/' + route.params['id']),
		{ watch: [() => useRoute().query] }
	);

	if (error.value) {
		throw showError(error.value);
	}

	const message = ref('');

	function send() {
		useApiSubmit('alliance/join/' + route.params['id'], {
			message: message.value,
		}, () => {
			useSuccessNotification('Запрос на вступление в альянс. После получения вашего сообщения вы получите разрешение/отказ');

			navigateTo('/alliance');
		});
	}
</script>