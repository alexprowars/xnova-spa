<template>
	<table class="table text-center">
		<tbody>
		<tr>
			<td class="c" colspan="2">Обзор заявок</td>
		</tr>
		<tr v-if="request">
			<td colspan="2" class="padding-0">
				<RequestAcceptForm :request="request" @close="request = null"/>
			</td>
		</tr>
		<tr v-if="page['items'].length > 0">
			<td class="c">
				Логин
			</td>
			<td class="c">
				Дата подачи заявки
			</td>
		</tr>
		<tr v-for="item in page['items']">
			<td class="th">
				<a href="" @click.prevent="show(item)">{{ item['name'] }}</a>
			</td>
			<td class="th">
				{{ $formatDate(item['date'], 'DD MMM YYYY HH:mm') }}
			</td>
		</tr>
		<tr v-if="page['items'].length === 0">
			<td class="th" colspan="2">Список заявок пуст</td>
		</tr>
		<tr>
			<td class="c" colspan="2"><NuxtLink to="/alliance">Назад</NuxtLink></td>
		</tr>
		</tbody>
	</table>
</template>

<script setup>
	import { definePageMeta, showError, useApiGet, useAsyncData, useHead, useRoute } from '#imports';
	import { ref } from 'vue';
	import RequestAcceptForm from '~/components/Page/Alliance/RequestAcceptForm.vue';

	definePageMeta({
		middleware: ['auth'],
		view: {
			resources: false,
		}
	});

	useHead({
		title: 'Проверить запросы',
	});

	const { data: page, error } = await useAsyncData(
		async () => await useApiGet('/alliance/admin/requests'),
		{ watch: [() => useRoute().query] }
	);

	if (error.value) {
		throw showError(error.value);
	}

	const request = ref();

	function show(req) {
		request.value = req;
	}
</script>