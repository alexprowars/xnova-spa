<template>
	<RouterForm action="/alliance/admin/tag">
		<div class="block">
			<div class="title">Введите новую аббревиатуру альянса</div>
			<div class="content block-table border-0 middle">
				<div class="row">
					<div class="col th">
						<input type="text" name="tag" :value="page['tag']">
						<input type="submit" value="Изменить">
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
	import { watch } from 'vue';

	definePageMeta({
		middleware: ['auth'],
	});

	useHead({
		title: 'Управление альянсом',
	});

	const route = useRoute();

	const { data: page, error, refresh } = await useAsyncData(async () => {
		return await useStore().loadPage();
	});

	watch(() => route.query, () => refresh());

	if (error.value) {
		throw showError(error.value);
	}
</script>