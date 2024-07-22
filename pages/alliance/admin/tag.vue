<template>
	<form method="post" @submit.prevent="save">
		<div class="block">
			<div class="title">Введите новую аббревиатуру альянса</div>
			<div class="content block-table border-0 middle">
				<div class="row">
					<div class="col th">
						<input type="text" v-model="tag">
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
	import { definePageMeta, showError, useApiSubmit, useAsyncData, useHead, useRoute, navigateTo } from '#imports';
	import useStore from '~/store';
	import { ref } from 'vue';
	import { toast } from 'vue3-toastify';

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
		return await useStore().loadPage('/alliance');
	}, { watch: [() => useRoute().query] });

	if (error.value) {
		throw showError(error.value);
	}

	const tag = ref(page.value['tag']);

	function save() {
		useApiSubmit('/alliance/admin/tag', {
			tag: tag.value,
		}, () => {
			toast('Абревиатура альянса изменена', {
				type: 'success'
			});

			navigateTo('/alliance/admin');
		});
	}
</script>