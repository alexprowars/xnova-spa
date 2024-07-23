<template>
	<div class="page-fleet-verband">
		<div class="block">
			<div class="title">Флоты в совместной атаке</div>
			<div class="content border-0">
				<table class="table">
					<tr>
						<th>Задание</th>
						<th>Кол-во</th>
						<th>Отправлен</th>
						<th>Прибытие</th>
						<th>Цель</th>
						<th>Возврат</th>
					</tr>
					<FleetRow v-for="item in page['items']" :key="item['id']" :item="item"/>
					<tr v-if="page['items'].length === 0"><th colspan="6">-</th></tr>
				</table>
			</div>
		</div>
		<div v-if="!page['assault']" class="block">
			<div class="title">Создание ассоциации флота</div>
			<div class="content border-0">
				<Create :id="page['fleetid']"/>
			</div>
		</div>
		<div v-else-if="page['fleetid'] === page['assault']['fleet_id']" class="block">
			<div class="title">Ассоциация флота {{ page['assault']['name'] }}</div>
			<div class="content border-0">
				<div class="block-table">
					<div class="row">
						<div class="col th">
							<ChangeName :id="page['fleetid']" :name="page['assault']['name']"/>
						</div>
					</div>
					<div class="row">
						<div class="col th">
							<table class="table">
								<tr>
									<td class="c">Приглашенные участники</td>
									<td class="c">Пригласить участников</td>
								</tr>
								<tr>
									<th width="50%" valign="top">
										<select size="10" style="width:75%;">
											<option v-for="user in page['users']">{{ user }}</option>
											<option v-if="page['users'].length === 0">нет участников</option>
										</select>
									</th>
									<th>
										<InviteUser :id="page['fleetid']" :friends="page['friends']" :alliance="page['alliance']"/>
									</th>
								</tr>
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
	import { definePageMeta, showError, useAsyncData, useHead, useRoute } from '#imports';
	import useStore from '~/store';

	definePageMeta({
		middleware: ['auth'],
	});

	useHead({
		title: 'Совместная атака',
	});

	const route = useRoute();

	const { data: page, error } = await useAsyncData('page-verband.' + route.params['id'],
		async () => await useStore().loadPage(),
		{ watch: [() => useRoute().query] }
	);

	if (error.value) {
		throw showError(error.value);
	}
</script>