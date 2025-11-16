<template>
	<div class="block">
		<div class="title">
			Предложение подружиться
		</div>
		<div class="content">
			<form class="block-table text-center" @submit.prevent="send">
				<div>
					<div class="th">Игрок {{ page['username'] }}</div>
				</div>
				<div>
					<div class="th"><textarea cols="60" rows="10" v-model="message"></textarea></div>
				</div>
				<div>
					<div class="c"><button type="submit">Отправить заявку</button></div>
				</div>
			</form>
		</div>
	</div>
	<div class="mt-2">
		<NuxtLink to="/friends" class="button">Вернуться назад</NuxtLink>
	</div>
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