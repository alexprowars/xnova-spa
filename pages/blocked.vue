<template>
	<table class="table">
		<tbody>
		<tr>
			<td class="c" colspan="6">Чёрный список</td>
		</tr>
		<tr v-if="items.length === 0">
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
			<tr v-for="item in items">
				<td class="b text-center">
					<NuxtLinkLocale :to="'/players/' + item['user']['id']">
						{{ item['user']['name'] }}
					</NuxtLinkLocale>
				</td>
				<td class="b text-center">
					<small>{{ $date(item['date'], 'DD MMM YYYY HH:mm:ss') }}</small>
				</td>
				<td class="b text-center">
					<small>{{ $date(item['date_end'], 'DD MMM YYYY HH:mm:ss') }}</small>
				</td>
				<td class="b text-center">{{ item['reason'] }}</td>
				<td class="b text-center">
					<NuxtLinkLocale :to="'/players/' + item['moderator']['id']">
						{{ item['moderator']['name'] }}
					</NuxtLinkLocale>
				</td>
			</tr>
			<tr>
				<td class="b text-center" colspan="5">Всего {{ items.length }} аккаунтов заблокировано</td>
			</tr>
		</template>
		</tbody>
	</table>
</template>

<script setup>
	import { definePageMeta, showError, useAsyncData, useHead, useRoute, useApiGet } from '#imports';

	definePageMeta({
		view: {
			resources: false,
		}
	});

	useHead({
		title: 'Список заблокированных игроков',
	});

	const { data: items, error } = await useAsyncData(async () => {
		return await useApiGet('/blocked');
	}, { watch: [() => useRoute().query] });

	if (error.value) {
		throw showError(error.value);
	}
</script>