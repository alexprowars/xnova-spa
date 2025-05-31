<template>
	<form method="post" @submit.prevent="save">
		<div class="block">
			<div class="title">Введите новое название альянса</div>
			<div class="content block-table border-0 middle">
				<div class="row">
					<div class="col th">
						<input type="text" v-model="name">
						<button type="submit">Изменить</button>
					</div>
				</div>
				<div class="row c">
					<NuxtLinkLocale to="/alliance/admin">вернутся к обзору</NuxtLinkLocale>
				</div>
			</div>
		</div>
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