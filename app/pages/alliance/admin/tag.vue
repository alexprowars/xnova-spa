<template>
	<div class="block">
		<div class="title">Введите новую аббревиатуру альянса</div>
		<div class="content">
			<form method="post" @submit.prevent="save" class="block-table text-center">
				<div>
					<div class="th">
						<input type="text" v-model="tag">
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
	import { definePageMeta, showError, useApiSubmit, useAsyncData, useHead, useRoute, navigateTo, useSuccessNotification, useApiGet } from '#imports';
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

	const tag = ref(page.value['tag']);

	function save() {
		useApiSubmit('/alliance/admin/tag', {
			tag: tag.value,
		}, () => {
			useSuccessNotification('Абревиатура альянса изменена');

			navigateTo('/alliance/admin');
		});
	}
</script>