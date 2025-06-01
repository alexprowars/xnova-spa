<template>
	<div>
		<table class="table">
			<tbody>
			<tr>
				<td class="c" colspan="2">Альянсы</td>
			</tr>
			<tr>
				<th><NuxtLink to="/alliance/create">Создать альянс</NuxtLink></th>
				<th><NuxtLink to="/alliance/search">Поиск альянса</NuxtLink></th>
			</tr>
			</tbody>
		</table>

		<table v-if="requests.length" class="table">
			<tbody>
			<tr>
				<td class="c" colspan="2">Ваши заявки</td>
			</tr>
			<template v-for="item in requests">
				<tr>
					<th width="70%">{{ item['name'] }} [{{ item['tag'] }}]</th>
					<th>{{ $formatDate(item['date'], 'DD MMM YYYY HH:mm') }}</th>
				</tr>
				<tr>
					<th colspan="2">
						<button type="button" @click.prevent="removeRequest(item['id'])">Убрать заявку</button>
					</th>
				</tr>
			</template>
			</tbody>
		</table>

		<table v-if="alliances.length" class="table">
			<tbody>
			<tr>
				<td class="c" width="30">Место</td>
				<td class="c">Альянс</td>
				<td class="c">Игроки</td>
				<td class="c">Очки</td>
			</tr>
			<tr v-for="(item, i) in alliances">
				<th>{{ i + 1 }}</th>
				<th><NuxtLink :to="'/alliance/info/' + item['id']">{{ item['name'] }} [{{ item['tag'] }}]</NuxtLink></th>
				<th>{{ item['members'] }}</th>
				<th>{{ item['total_points'] }}</th>
			</tr>
			</tbody>
		</table>
	</div>
</template>

<script setup>
	import { openConfirmModal, useApiSubmit, refreshNuxtData, useSuccessNotification } from '#imports';

	defineProps({
		requests: {
			type: Array,
			default: () => [],
		},
		alliances: {
			type: Array,
			default: () => [],
		},
	});

	function removeRequest(id) {
		openConfirmModal(
			null,
			'Отозвать заявку?',
			[{
				title: 'Нет',
			}, {
				title: 'Да',
				handler: () => {
					useApiSubmit('alliance/request/' + id, {
						_method: 'DELETE',
					}, () => {
						useSuccessNotification('Вы отозвали свою заявку на вступление в альянс');

						refreshNuxtData('page-alliance');
					});
				}
			}]
		);
	}
</script>