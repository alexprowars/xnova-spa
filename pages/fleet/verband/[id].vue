<template>
	<div class="page-fleet-verband">
		<div class="block">
			<div class="title">Флоты в совместной атаке</div>
			<div class="content">
				<table class="table">
					<tbody>
					<tr>
						<td class="th">Задание</td>
						<td class="th">Кол-во</td>
						<td class="th">Отправлен</td>
						<td class="th">Прибытие</td>
						<td class="th">Цель</td>
						<td class="th">Возврат</td>
					</tr>
					<FleetRow v-for="item in page['items']" :key="item['id']" :item="item"/>
					<tr v-if="page['items'].length === 0"><td class="th" colspan="6">-</td></tr>
					</tbody>
				</table>
			</div>
		</div>
		<div v-if="!page['assault']" class="block">
			<div class="title">Создание ассоциации флота</div>
			<div class="content">
				<Create :id="page['fleetid']"/>
			</div>
		</div>
		<div v-else-if="page['fleetid'] === page['assault']['fleet_id']" class="block">
			<div class="title">Ассоциация флота {{ page['assault']['name'] }}</div>
			<div class="content">
				<div class="block-table">
					<div class="grid">
						<div class="th">
							<ChangeName :id="page['fleetid']" :name="page['assault']['name']"/>
						</div>
					</div>
					<div class="grid">
						<div class="th">
							<table class="table">
								<tbody>
								<tr>
									<td class="c">Приглашенные участники</td>
									<td class="c">Пригласить участников</td>
								</tr>
								<tr>
									<td class="th" width="50%" valign="top">
										<select size="10" style="width:75%;">
											<option v-for="user in page['users']">{{ user }}</option>
											<option v-if="page['users'].length === 0">нет участников</option>
										</select>
									</td>
									<td class="th">
										<InviteUser :id="page['fleetid']" :friends="page['friends']" :alliance="page['alliance']"/>
									</td>
								</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import Create from '~/components/Page/Fleet/Verband/Create.vue';
	import ChangeName from '~/components/Page/Fleet/Verband/ChangeName.vue';
	import InviteUser from '~/components/Page/Fleet/Verband/InviteUser.vue';
	import FleetRow from '~/components/Page/Fleet/Verband/FleetRow.vue';
	import { definePageMeta, showError, useApiGet, useAsyncData, useHead, useRoute } from '#imports';

	definePageMeta({
		middleware: ['auth'],
	});

	useHead({
		title: 'Совместная атака',
	});

	const route = useRoute();

	const { data: page, error } = await useAsyncData(
		async () => await useApiGet('/fleet/verband/' + route.params.id),
		{ watch: [() => useRoute().query] }
	);

	if (error.value) {
		throw showError(error.value);
	}
</script>