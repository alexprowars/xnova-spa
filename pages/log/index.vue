<template>
	<table class="table">
		<tr>
			<th colspan="4">Логовница</th>
		</tr>
		<tr>
			<td class="c" colspan="4">Ваши сохранённые логи</td>
		</tr>
		<tr>
			<td class="c">№</td>
			<td class="c">Название</td>
			<td class="c">Ссылка</td>
			<td class="c">Управление логом</td>
		</tr>
		<tr v-for="(row, i) in items">
			<td class="b text-center">{{ i + 1 }}</td>
			<td class="b text-center">{{ row['title'] }}</td>
			<td class="b text-center">
				<a :href="'/log/' + row['id']" target="_blank">Открыть</a>
			</td>
			<td class="b text-center"><NuxtLinkLocale :to="'/log/' + row['id']">Удалить лог</NuxtLinkLocale></td>
		</tr>
		<tr v-if="items.length === 0" align="center">
			<td class="b text-center" colspan="4">У вас пока нет сохранённых логов.</td>
		</tr>
		<tr>
			<td class="c" colspan="4">
				<NuxtLinkLocale to="/log/create">Создать новый лог боя</NuxtLinkLocale>
			</td>
		</tr>
	</table>
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
		title: 'Логовница',
	});

	const { data: items, error } = await useAsyncData(async () => {
		return await useStore().loadPage();
	}, { watch: [() => useRoute().query] });

	if (error.value) {
		throw showError(error.value);
	}
</script>