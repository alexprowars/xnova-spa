<template>
	<table class="table">
		<tr>
			<td class="c" colspan="6">Чёрный список</td>
		</tr>
		<tr v-if="page['items'].length === 0">
			<th class="b text-center" colspan="5">Нет заблокированных игроков</th>
		</tr>
		<template v-else>
			<tr>
				<th width="110">Логин</th>
				<th width="130">Дата блокировки</th>
				<th width="130">Конец блокировки</th>
				<th width="306">Причина блокировки</th>
				<th width="100">Модератор</th>
			</tr>
			<tr v-for="item in page['items']">
				<td class="b text-center">
					<NuxtLinkLocale :to="'/players/'+item['user']['id']+'/'">
						{{ item['user']['name'] }}
					</NuxtLinkLocale>
				</td>
				<td class="b text-center">
					<small>{{ $date(item['time'], 'd.m.Y H:i:s') }}</small>
				</td>
				<td class="b text-center">
					<small>{{ $date(item['time_end'], 'd.m.Y H:i:s') }}</small>
				</td>
				<td class="b text-center">{{ item['reason'] }}</td>
				<td class="b text-center">
					<NuxtLinkLocale :to="'/players/'+item['moderator']['id']+'/'">
						{{ item['moderator']['name'] }}
					</NuxtLinkLocale>
				</td>
			</tr>
			<tr>
				<td class="b text-center" colspan="5">Всего {{ page['items'].length }} аккаунтов заблокировано</td>
			</tr>
		</template>
	</table>
</template>

<script setup>
	import { definePageMeta, showError, useAsyncData, useHead, useRoute } from '#imports';
	import useStore from '~/store';
	import { watch } from 'vue';

	definePageMeta({
		view: {
			resources: false,
		}
	});

	useHead({
		title: 'Список заблокированных игроков',
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