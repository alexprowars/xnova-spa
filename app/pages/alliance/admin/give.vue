<template>
	<div class="block">
		<div class="title">Передача альянса</div>
		<div class="content">
			<form class="block-table text-center" @submit.prevent="send">
				<div>
					<div class="th">
						Передать альянс игроку:
						<select v-model="userId">
							<option value="">Выберите игрока</option>
							<option v-for="item in page['users']" :value="item['id']">{{ item['name'] }} [{{ item['rank'] }}]</option>
						</select>
					</div>
				</div>
				<div v-if="userId">
					<div class="th">
						<button type="submit">Передача</button>
					</div>
				</div>
			</form>
		</div>
	</div>
	<div class="mt-2">
		<NuxtLink to="/alliance" class="button">Назад</NuxtLink>
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
		title: 'Передача альянса',
	});

	const { data: page, error } = await useAsyncData(async () => {
		return await useApiGet('/alliance/admin/give');
	}, { watch: [() => useRoute().query] });

	if (error.value) {
		throw showError(error.value);
	}

	const userId = ref('');

	function send() {
		useApiSubmit('alliance/admin/give', {
			user: userId.value
		}, () => {
			useSuccessNotification('Правление передано')

			navigateTo('/alliance');
		});
	}
</script>