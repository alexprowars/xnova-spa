<template>
	<div>
		<table class="table">
			<tr>
				<td class="c" colspan="3">Ваши запросы</td>
			</tr>
			<tr v-for="diplo in page['DMyQuery']">
				<th>{{ diplo['name'] }}</th>
				<th>{{ $t('alliance.diplomacy_status.'+diplo['type']) }}</th>
				<th>
					<NuxtLinkLocale :to="'/alliance/diplomacy?edit=del&id='+diplo['id']+''"><img src="/images/abort.gif" alt="Удалить заявку"></NuxtLinkLocale>
				</th>
			</tr>
			<tr v-if="page['DMyQuery'].length === 0">
				<th colspan="3">нет</th>
			</tr>
		</table>
		<div class="separator"></div>
		<table class="table">
			<tr>
				<td class="c" colspan="3">Запросы вашему альянсу</td>
			</tr>
			<tr v-for="diplo in page['DQuery']">
				<th>{{ diplo['name'] }}</th>
				<th>{{ $t('alliance.diplomacy_status.'+diplo['type']) }}</th>
				<th>
					<NuxtLinkLocale :to="'/alliance/diplomacy?edit=suc&id='+diplo['id']+''"><img src="/images/appwiz.gif" alt="Подтвердить"></NuxtLinkLocale>
					<NuxtLinkLocale :to="'/alliance/diplomacy?edit=del&id='+diplo['id']+''"><img src="/images/abort.gif" alt="Удалить заявку"></NuxtLinkLocale>
				</th>
			</tr>
			<tr v-if="page['DQuery'].length === 0">
				<th colspan="3">нет</th>
			</tr>
		</table>
		<div class="separator"></div>
		<table class="table">
			<tr>
				<td class="c" colspan="4">Отношения между альянсами</td>
			</tr>
			<tr v-for="diplo in page['DText']">
				<th>{{ diplo['name'] }}</th>
				<th>{{ $t('alliance.diplomacy_status.'+diplo['type']) }}</th>
				<th>
					<NuxtLinkLocale :to="'/alliance/diplomacy?edit=del&id='+diplo['id']+''"><img src="/images/abort.gif" alt="Удалить заявку"></NuxtLinkLocale>
				</th>
			</tr>
			<tr v-if="page['DText'].length === 0">
				<th colspan="4">нет</th>
			</tr>
		</table>
		<div class="separator"></div>
		<RouterForm action="/alliance/diplomacy?edit=add">
			<table class="table">
				<tr>
					<td class="c" colspan="2">Добавить альянс в список</td>
				</tr>
				<tr>
					<th>
						<select name="ally" title="">
							<option value="0">список альянсов</option>
							<option v-for="item in page['a_list']" :value="item['id']">{{ item['name'] }} [{{ item['tag'] }}]</option>
						</select>
					</th>
					<th>
						<select name="status" title="">
							<option value="1">Перемирие</option>
							<option value="2">Мир</option>
							<option value="3">Война</option>
						</select>
					</th>
				</tr>

				<tr>
					<td class="c"><NuxtLinkLocale to="/alliance">назад</NuxtLinkLocale></td>
					<td class="c">
						<input type="submit" value="Добавить">
					</td>
				</tr>
			</table>
		</RouterForm>
	</div>
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
		title: 'Дипломатия',
	});

	const { data: page, error } = await useAsyncData(async () => {
		return await useStore().loadPage();
	}, { watch: [() => useRoute().query] });

	if (error.value) {
		throw showError(error.value);
	}
</script>