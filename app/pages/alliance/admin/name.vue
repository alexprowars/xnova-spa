<template>
	<div class="block">
		<div class="title">Введите новое название альянса</div>
		<div class="content">
			<form method="post" @submit.prevent="save" class="block-table text-center">
				<div>
					<div class="th">
						<input type="text" v-model="name">
					</div>
				</div>
				<div>
					<div class="c">
						<button type="submit">Изменить</button>
					</div>
				</div>
			</form>
		</div>
	</div>
	<div class="mt-2">
		<NuxtLink to="/alliance/admin" class="button">Назад</NuxtLink>
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
		title: 'Управление альянсом',
	});

	const { data: page, error } = await useAsyncData(async () => {
		return await useApiGet('/alliance');
	}, { watch: [() => useRoute().query] });

	if (error.value) {
		throw showError(error.value);
	}

	const name = ref(page.value['name']);

	function save() {
		useApiSubmit('/alliance/admin/name', {
			name: name.value,
		}, () => {
			useSuccessNotification('Название альянса изменено');

			navigateTo('/alliance/admin');
		});
	}
</script>