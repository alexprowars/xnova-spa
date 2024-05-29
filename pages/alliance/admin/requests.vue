<template>
	<table class="table">
		<tr>
			<td class="c" colspan="2">Обзор заявок [{{ page['tag'] }}]</td>
		</tr>
		<tr v-if="page['request'] !== null">
			<td colspan="2" class="padding-0">
				<RouterForm :action="'/alliance/admin/requests?show='+page['request']['id']+''">
					<div class="separator"></div>
					<div class="block-table">
						<div class="row">
							<div class="col th">Заявка от {{ page['request']['username'] }}</div>
						</div>
						<div class="row">
							<div class="col th">{{ page['request']['request_text'] }}</div>
						</div>
						<div class="row">
							<div class="col c">Форма ответа:</div>
						</div>
						<div class="row">
							<div class="col th"><input type="submit" name="action" value="Принять"></div>
						</div>
						<div class="row">
							<div class="col th"><textarea name="text" cols=40 rows=10 title=""></textarea></div>
						</div>
						<div class="row">
							<div class="col th"><input type="submit" name="action" value="Отклонить"></div>
						</div>
					</div>
					<div class="separator"></div>
				</RouterForm>
			</td>
		</tr>
		<tr v-if="page['list'].length > 0">
			<td class="c text-center">
				<NuxtLinkLocale to="/alliance/admin/requests?sort=1">Логин</NuxtLinkLocale>
			</td>
			<td class="c text-center">
				<NuxtLinkLocale to="/alliance/admin/requests?sort=0">Дата подачи заявки</NuxtLinkLocale>
			</td>
		</tr>
		<tr v-for="list in page['list']">
			<th class="text-center">
				<NuxtLinkLocale :to="'/alliance/admin/requests?show='+list['id']+''">{{ list['username'] }}</NuxtLinkLocale>
			</th>
			<th class="text-center">
				{{ list['time'] }}
			</th>
		</tr>
		<tr v-if="page['list'].length === 0">
			<th colspan="2">Список заявок пуст</th>
		</tr>
		<tr>
			<td class="c" colspan="2"><NuxtLinkLocale to="/alliance/">Назад</NuxtLinkLocale></td>
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
		title: 'Проверить запросы',
	});

	const { data: page, error } = await useAsyncData(async () => {
		return await useStore().loadPage();
	}, { watch: [() => useRoute().query] });

	if (error.value) {
		throw showError(error.value);
	}
</script>