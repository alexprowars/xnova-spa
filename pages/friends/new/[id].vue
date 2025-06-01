<template>
	<form @submit.prevent="send">
		<table class="table">
			<tbody>
			<tr>
				<td class="c" colspan="2">Предложение подружиться</td>
			</tr>
			<tr>
				<th>Игрок</th>
				<th>{{ page['username'] }}</th>
			</tr>
			<tr>
				<th colspan="2"><textarea cols="60" rows="10" v-model="message"></textarea></th>
			</tr>
			<tr>
				<td class="c"><NuxtLink to="/friends">назад</NuxtLink></td>
				<td class="c"><button type="submit">Отправить заявку</button></td>
			</tr>
			</tbody>
		</table>
	</form>
</template>

<script setup>
	import { definePageMeta, navigateTo, showError, useApiGet, useApiSubmit, useAsyncData, useHead, useRoute, useSuccessNotification } from '#imports';
	import { ref } from 'vue';

	definePageMeta({
		middleware: ['auth'],
		view: {
			resources: false,
		}
	});

	useHead({
		title: 'Добавить друга',
	});

	const route = useRoute();

	const { data: page, error } = await useAsyncData(async () => {
		return await useApiGet('/friends/new/' + route.params.id);
	}, { watch: [() => useRoute().query] });

	if (error.value) {
		throw showError(error.value);
	}

	const message = ref('');

	function send() {
		useApiSubmit('friends/new/' + route.params['id'], {
			message: message.value,
		}, () => {
			useSuccessNotification('Запрос отправлен');

			navigateTo('/friends');
		});
	}
</script>