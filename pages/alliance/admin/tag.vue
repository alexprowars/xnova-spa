<template>
	<form method="post" @submit.prevent="save">
		<div class="block">
			<div class="title">Введите новую аббревиатуру альянса</div>
			<div class="content block-table border-0 middle">
				<div class="grid">
					<div class="th">
						<input type="text" v-model="tag">
						<button type="submit">Изменить</button>
					</div>
				</div>
				<div class="grid c">
					<NuxtLink to="/alliance/admin">вернутся к обзору</NuxtLink>
				</div>
			</div>
		</div>
	</form>
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