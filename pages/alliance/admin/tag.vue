<template>
	<RouterForm action="/alliance/admin/tag">
		<div class="block">
			<div class="title">Введите новую аббревиатуру альянса</div>
			<div class="content block-table border-0 middle">
				<div class="row">
					<div class="col th">
						<input type="text" name="tag" :value="page['tag']">
						<button type="submit">Изменить</button>
					</div>
				</div>
				<div class="row c">
					<NuxtLinkLocale to="/alliance/admin">вернутся к обзору</NuxtLinkLocale>
				</div>
			</div>
		</div>
	</RouterForm>
</template>

<script setup>
	import { definePageMeta, showError, useAsyncData, useHead, useRoute } from '#imports';
	import useStore from '~/store';

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
		return await useStore().loadPage();
	}, { watch: [() => useRoute().query] });

	if (error.value) {
		throw showError(error.value);
	}
</script>