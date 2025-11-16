<template>
	<div class="block">
		<div class="title">
			Запрос на вступление в альянс [{{ page['tag'] }}]
		</div>
		<div class="content">
			<form class="block-table text-center" @submit.prevent="send">
				<template v-if="page['text']">
					<div>
						<div class="c">Приветствие альянса</div>
					</div>
					<div>
						<div class="b min-h-20 p-2 text-left">
							<TextViewer :text="page['text']"/>
						</div>
					</div>
				</template>
				<div>
					<div class="th"><textarea cols="40" rows="10" v-model="message"></textarea></div>
				</div>
				<div>
					<div class="c"><button type="submit">Отправить</button></div>
				</div>
			</form>
		</div>
	</div>
	<div class="mt-2">
		<NuxtLink to="/alliance" class="button">Назад</NuxtLink>
	</div>
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