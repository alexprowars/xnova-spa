<template>
	<div v-if="page" class="page-fleet-verband">
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
					<tr v-for="item in page['list']">
						<th>
							<a>{{ $t('fleet_mission.'+item.mission) }}</a>
							<a v-if="(item['start']['time'] + 1) === item['target']['time']">(F)</a>
						</th>
						<th>
							<Popper>
								<template #content>
									<div v-for="data in item['ships']">{{ $t('tech.'+data['id']) }}: {{ data['count'] }}</div>
								</template>
								{{ $number(item['ships_total']) }}
							</Popper>
						</th>
						<th>
							<PlanetLink :galaxy="item['start']['galaxy']" :system="item['start']['system']" :planet="item['start']['planet']"/>
							<div>{{ item['start']['name'] }}</div>
						</th>
						<th>
							{{ dayjs(item['start']['time']).tz().format('DD MMM HH:mm:ss') }}
							<Timer :value="item['start']['time'] + 1" class="positive"/>
						</th>
						<th>
							<PlanetLink :galaxy="item['target']['galaxy']" :system="item['target']['system']" :planet="item['target']['planet']"/>
							<div>{{ item['target']['name'] }}</div>
						</th>
						<th>{{ dayjs(item['target']['time']).tz().format('DD MMM HH:mm:ss') }}</th>
					</tr>
					<tr v-if="page['list'].length === 0"><th colspan="9">-</th></tr>
				</table>
			</div>
		</div>
	
		<div v-if="page['group'] === 0" class="block">
			<div class="title">Создание ассоциации флота</div>
			<div class="content border-0">
				<RouterForm :action="'/fleet/verband/' + page['fleetid']">
					<input type="hidden" name="action" value="add">
					<div class="block-table">
						<div class="row">
							<div class="col th">
								<input type="text" name="name" :value="'AKS'+rand(100000, 999999999)" size="50">
								<br>
								<button type="submit">Создать</button>
							</div>
						</div>
					</div>
				</RouterForm>
			</div>
		</div>

		<div v-else-if="page['aks'] && page['fleetid'] === page['aks']['fleet_id']" class="block">
			<div class="title">Ассоциация флота {{ page['aks']['name'] }}</div>
			<div class="content border-0">
				<div class="block-table">
					<div class="row">
						<div class="col th">
							<RouterForm :action="'/fleet/verband/'+page['fleetid']+'/'">
								<input type="hidden" name="action" value="changename">
								<input type="text" name="name" :value="page['aks']['name']" size="50">
								<br>
								<button type="submit">Изменить</button>
							</RouterForm>
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
										<RouterForm :action="'/fleet/verband/' + page['fleetid']">
											<input type="hidden" name="action" value="adduser">
											<div v-if="page['friends'].length > 0 || page['alliance'].length > 0">
												<select name="user_id" size="10" style="width:75%;">
													<option value="">-не выбрано-</option>
													<optgroup v-if="page['friends'].length > 0" label="Список друзей">
														<option v-for="user in page['friends']" :value="user['id']">{{ user['username'] }}</option>
													</optgroup>
													<optgroup v-if="page['alliance'].length > 0" label="Члены альянса">
														<option v-for="user in page['alliance']" :value="user['id']">{{ user['username'] }}</option>
													</optgroup>
												</select>
												<div class="separator"></div>
											</div>
											<input type="text" name="user_name" size="40" placeholder="Введите игровой ник">
											<br>
											<button type="submit">OK</button>
										</RouterForm>
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
	import { definePageMeta, showError, useAsyncData, useHead, useRoute } from '#imports';
	import useStore from '~/store';
	import dayjs from 'dayjs';

	definePageMeta({
		middleware: ['auth'],
	});

	useHead({
		title: 'Совместная атака',
	});

	const { data: page, error } = await useAsyncData(async () => {
		return await useStore().loadPage();
	}, { watch: [() => useRoute().query] });

	if (error.value) {
		throw showError(error.value);
	}

	function rand (min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min
	}
</script>