<template>
	<RouterForm :action="'/buddy/new/'+page['id']+'/'">
		<table class="table">
			<tr>
				<td class="c" colspan="2">Предложение подружиться</td>
			</tr>
			<tr>
				<th>Игрок</th>
				<th>{{ page["username"] }}</th>
			</tr>
			<tr>
				<th colspan="2"><textarea name="text" cols="60" rows="10" title=""></textarea></th>
			</tr>
			<tr>
				<td class="c"><NuxtLinkLocale to="/buddy/">назад</NuxtLinkLocale></td>
				<td class="c"><input type="submit" value="Отправить заявку"></td>
			</tr>
		</table>
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
		title: 'Добавить друга',
	});

	const store = useStore();

	const { data: page, error } = await useAsyncData(async () => {
		return await store.loadPage();
	}, { watch: [() => useRoute().query] });

	if (error.value) {
		throw showError(error.value);
	}
</script>