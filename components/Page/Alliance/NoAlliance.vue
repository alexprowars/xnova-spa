<template>
	<div class="block">
		<div class="title">
			Альянсы
		</div>
		<div class="content">
			<div class="block-table text-center">
				<div class="grid grid-cols-2">
					<div class="th"><NuxtLink to="/alliance/create" class="button">Создать альянс</NuxtLink></div>
					<div class="th"><NuxtLink to="/alliance/search" class="button">Поиск альянса</NuxtLink></div>
				</div>
			</div>
		</div>
	</div>

	<div v-if="requests.length" class="block">
		<div class="title">
			Ваши заявки
		</div>
		<div class="content">
			<table class="table text-center">
				<tbody>
				<template v-for="item in requests">
					<tr>
						<td class="th w-2/4">
							<NuxtLink :to="'/alliance/info/' + item['alliance_id']">{{ item['name'] }} [{{ item['tag'] }}]</NuxtLink>
						</td>
						<td class="th">{{ $formatDate(item['date'], 'DD MMM YYYY HH:mm') }}</td>
						<td class="th"><button type="button" @click.prevent="removeRequest(item['id'])">Убрать заявку</button></td>
					</tr>
				</template>
				</tbody>
			</table>
		</div>
	</div>

	<div v-if="alliances.length" class="block">
		<div class="title">
			Лучшие альянсы
		</div>
		<div class="content">
			<table class="table text-center">
				<tbody>
					<tr>
						<td class="c w-8">Место</td>
						<td class="c grow">Альянс</td>
						<td class="c grow">Игроки</td>
						<td class="c grow">Очки</td>
					</tr>
					<tr v-for="(item, i) in alliances">
						<td class="th w-1/12">{{ i + 1 }}</td>
						<td class="th grow">
							<NuxtLink :to="'/alliance/info/' + item['id']">{{ item['name'] }} [{{ item['tag'] }}]</NuxtLink>
						</td>
						<td class="th grow">{{ item['members'] }}</td>
						<td class="th grow">{{ item['total_points'] }}</td>
					</tr>
				</tbody>
			</table>
		</div>
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

						refreshNuxtData();
					});
				}
			}]
		);
	}
</script>