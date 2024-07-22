<template>
	<div>
	<RouterForm action="/alliance/admin/rights">
		<table class="table">
			<tr>
				<td class="c" colspan="13">Установить ранги</td>
			</tr>
			<tr>
				<th colspan="2">Имя ранга</th>
				<th><img src="/images/alliance/r1.png" width="16" alt=""></th>
				<th><img src="/images/alliance/r2.png" width="16" alt=""></th>
				<th><img src="/images/alliance/r3.png" width="16" alt=""></th>
				<th><img src="/images/alliance/r4.png" width="16" alt=""></th>
				<th><img src="/images/alliance/r5.png" width="16" alt=""></th>
				<th><img src="/images/alliance/r6.png" width="16" alt=""></th>
				<th><img src="/images/alliance/r7.png" width="16" alt=""></th>
				<th><img src="/images/alliance/r8.png" width="16" alt=""></th>
				<th><img src="/images/alliance/r9.png" width="16" alt=""></th>
				<th><img src="/images/alliance/r10.gif" width="16" alt=""></th>
			</tr>
			<tr v-for="rank in page['list']">
				<th>
					<a href="" @click="remove(rank['id'])"><img src="/images/abort.gif" alt="Удалить ранг"></a>
				</th>
				<th>{{ rank['name'] }}</th>
				<th>
					<input v-if="user['id'] === page['alliance']['user_id']" type="checkbox" :name="'rigths[' + rank['id'] + '][delete]'" :checked="rank['rights']['delete'] || false">
					<b v-else>{{ (rank['rights']['delete'] || false) ? '+' : '-' }}</b>
				</th>
				<th>
					<input v-if="user['id'] === page['alliance']['user_id']" type="checkbox" :name="'rigths[' + rank['id'] + '][kick]'" :checked="rank['rights']['kick'] || false">
					<b v-else>{{ (rank['rights']['kick'] || false) ? '+' : '-' }}</b>
				</th>
				<th><input type="checkbox" :name="'rigths[' + rank['id'] + '][request]'" :checked="rank['rights']['request'] || false"></th>
				<th><input type="checkbox" :name="'rigths[' + rank['id'] + '][memberlist]'" :checked="rank['rights']['memberlist'] || false"></th>
				<th><input type="checkbox" :name="'rigths[' + rank['id'] + '][accept]'" :checked="rank['rights']['accept'] || false"></th>
				<th><input type="checkbox" :name="'rigths[' + rank['id'] + '][admin]'" :checked="rank['rights']['admin'] || false"></th>
				<th><input type="checkbox" :name="'rigths[' + rank['id'] + '][onlinestatus]'" :checked="rank['rights']['onlinestatus'] || false"></th>
				<th><input type="checkbox" :name="'rigths[' + rank['id'] + '][chat]'" :checked="rank['rights']['chat'] || false"></th>
				<th><input type="checkbox" :name="'rigths[' + rank['id'] + '][rights]'" :checked="rank['rights']['rights'] || false"></th>
				<th><input type="checkbox" :name="'rigths[' + rank['id'] + '][diplomacy]'" :checked="rank['rights']['diplomacy'] || false"></th>
			</tr>
			<tr v-if="page['list'].length > 0">
				<th colspan="13"><button type="submit">Сохранить</button></th>
			</tr>
			<tr v-if="page['list'].length === 0">
				<th colspan="13" align="center">нет рангов</th>
			</tr>
		</table>
	</RouterForm>
	<div class="separator"></div>
	<RouterForm action="/alliance/admin/rights?add=name">
		<table class="table">
			<tr>
				<td class="c" colspan="2">Создать новый ранг</td>
			</tr>
			<tr>
				<th>Имя ранга</th>
				<th><input type="text" name="newrangname" size="20" maxlength="30"></th>
			</tr>
			<tr>
				<th colspan="2"><button type="submit">Создать</button></th>
			</tr>
		</table>
	</RouterForm>
	<div class="separator"></div>
	<table class="table">
		<tr>
			<td class="c" colspan="2">Описание Законов</td>
		</tr>
		<tr>
			<th><img src="/images/alliance/r1.png" alt=""></th>
			<th>Расформировать альянс</th>
		</tr>
		<tr>
			<th><img src="/images/alliance/r2.png" alt=""></th>
			<th>Редактирование участников</th>
		</tr>
		<tr>
			<th><img src="/images/alliance/r3.png" alt=""></th>
			<th>Показать заявки</th>
		</tr>
		<tr>
			<th><img src="/images/alliance/r4.png" alt=""></th>
			<th>Показать список участников</th>
		</tr>
		<tr>
			<th><img src="/images/alliance/r5.png" alt=""></th>
			<th>Проверить запросы</th>
		</tr>
		<tr>
			<th><img src="/images/alliance/r6.png" alt=""></th>
			<th>Управление альянсом</th>
		</tr>
		<tr>
			<th><img src="/images/alliance/r7.png" alt=""></th>
			<th>Показать онлайн статус в списке участников</th>
		</tr>
		<tr>
			<th><img src="/images/alliance/r8.png" alt=""></th>
			<th>Написать сообщение в чат</th>
		</tr>
		<tr>
			<th><img src="/images/alliance/r9.png" alt=""></th>
			<th>'Правая Рука' (для передачи необходим ранг основателя)</th>
		</tr>
		<tr>
			<th><img src="/images/alliance/r10.gif" alt=""></th>
			<th>Дипломатия</th>
		</tr>
		<tr>
			<td class="c" colspan="2">
				<NuxtLinkLocale to="/alliance/admin">вернутся к обзору</NuxtLinkLocale>
			</td>
		</tr>
	</table>
	</div>
</template>

<script setup>
	import { definePageMeta, showError, useAsyncData, useHead, useRoute } from '#imports';
	import useStore from '~/store';
	import { storeToRefs } from 'pinia';

	definePageMeta({
		middleware: ['auth'],
		view: {
			resources: false,
		}
	});

	useHead({
		title: 'Установить ранги',
	});

	const { data: page, error } = await useAsyncData(async () => {
		return await useStore().loadPage();
	}, { watch: [() => useRoute().query] });

	if (error.value) {
		throw showError(error.value);
	}

	const { user } = storeToRefs(useStore());

	function remove(val) {
	}
</script>