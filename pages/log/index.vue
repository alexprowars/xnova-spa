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
		<tr v-for="(row, i) in page['items']">
			<td class="b text-center">{{ i + 1 }}</td>
			<td class="b text-center">{{ row['title'] }}</td>
			<td class="b text-center">
				<a :href="'/log/'+row['id']+'/'" target="_blank">Открыть</a>
			</td>
			<td class="b text-center"><nuxt-link :to="'/log/delete/id/'+row['id']+'/'">Удалить лог</nuxt-link></td>
		</tr>
		<tr v-if="page['items'].length === 0" align="center">
			<td class="b text-center" colspan="4">У вас пока нет сохранённых логов.</td>
		</tr>
		<tr>
			<td class="c" colspan="4"><nuxt-link to="/log/new/">Создать новый лог боя</nuxt-link></td>
		</tr>
	</table>
</template>

<script>
	import { defineNuxtComponent } from '#imports';
	import useStore from '~/store';

	export default defineNuxtComponent({
		async asyncData () {
			await useStore().loadPage();

			return {}
		},
		watchQuery: true,
		middleware: 'auth',
	})
</script>