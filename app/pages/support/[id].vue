<template>
	<div class="block">
		<div class="title">
			Тема: {{ item['subject'] }}
			<div class="float-end">Статус: {{ $t('pages.support.status.' + item['status']) }}</div>
		</div>
		<div class="content">
			<div class="block-table">
				<div class="grid">
					<div class="th text-left" v-html="item['message']"></div>
				</div>
				<div v-for="message in item['messages']" class="th">
					<div class="positive">
						{{ $formatDate(message['date'], 'DD.MM.YYYY HH:mm') }} от
						<a :href="'/players/' + message['user_id']" target="_blank">{{ message['user'] }}</a>
					</div>
					<div class="mt-2" v-html="message['message']"></div>
				</div>
			</div>
		</div>
	</div>

	<div class="mt-2">
		<NuxtLink to="/support" class="button">Назад</NuxtLink>
	</div>

	<div v-if="item['status'] !== 0" class="block mt-4">
		<div class="title">
			Ответ
		</div>
		<div class="content">
			<div class="grid">
				<div class="th">
					<TextEditor v-model="message" :class="{error: v$.message.$error}"/>
				</div>
			</div>
			<div class="grid">
				<div class="c text-center">
					<button @click.prevent="answer">Ответить</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { openErrorModal, refreshNuxtData, showError, useApiGet, useApiPost, useAsyncData, useRoute, useSuccessNotification } from '#imports';
	import { ref } from 'vue';
	import { required } from '@vuelidate/validators';
	import { useVuelidate } from '@vuelidate/core';

	const route = useRoute();

	const { data: item, error } = await useAsyncData(async () => {
		return await useApiGet('/support/' + route.params.id);
	});

	if (error.value) {
		throw showError(error.value);
	}

	const message = ref('');

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

	async function answer () {
		if (!await v$.value.$validate()) {
			return
		}

		try {
			await useApiPost('/support/' + item.value['id'] + '/answer', {
				message: message.value,
			});

			message.value = '';

			await refreshNuxtData();
			useSuccessNotification('Запрос добавлен');
		} catch (e) {
			openErrorModal(e);
		}
	}
</script>