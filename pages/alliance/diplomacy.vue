<template>
	<div>
		<table class="table">
			<tr>
				<td class="c" colspan="3">Ваши запросы</td>
			</tr>
			<tr v-for="item in page['DMyQuery']">
				<th>{{ item['name'] }}</th>
				<th>{{ $t('alliance.diplomacy_status.' + item['type']) }}</th>
				<th>
					<a href="" @click.prevent="reject(item['id'])"><img src="/images/abort.gif" alt="Удалить заявку"></a>
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
			<tr v-for="item in page['DQuery']">
				<th>{{ item['name'] }}</th>
				<th>{{ $t('alliance.diplomacy_status.' + item['type']) }}</th>
				<th>
					<a href="" @click.prevent="accept(item['id'])"><img src="/images/appwiz.gif" alt="Подтвердить"></a>
					<a href="" @click.prevent="reject(item['id'])"><img src="/images/abort.gif" alt="Удалить заявку"></a>
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
			<tr v-for="item in page['DText']">
				<th>{{ item['name'] }}</th>
				<th>{{ $t('alliance.diplomacy_status.' + item['type']) }}</th>
				<th>
					<a href="" @click.prevent="reject(item['id'])"><img src="/images/abort.gif" alt="Удалить заявку"></a>
				</th>
			</tr>
			<tr v-if="page['DText'].length === 0">
				<th colspan="4">нет</th>
			</tr>
		</table>
		<div class="separator"></div>
		<DiplomacyCreate :items="page['items']"/>
	</div>
</template>

<script setup>
	import { definePageMeta, refreshNuxtData, showError, useApiSubmit, useAsyncData, useHead, useRoute } from '#imports';
	import useStore from '~/store/index.js';
	import DiplomacyCreate from '~/components/Page/Alliance/DiplomacyCreate.vue';
	import { toast } from 'vue3-toastify';

	definePageMeta({
		middleware: ['auth'],
		view: {
			resources: false,
		}
	});

	useHead({
		title: 'Дипломатия',
	});

	const { data: page, error } = await useAsyncData(
		'page-alliance.diplomacy',
		async () => await useStore().loadPage(),
		{ watch: [() => useRoute().query] }
	);

	if (error.value) {
		throw showError(error.value);
	}

	function accept(id) {
		useApiSubmit('alliance/diplomacy/accept', { id }, () => {
			toast('Отношение между вашими альянсами подтверждено', {
				type: 'success'
			});

			refreshNuxtData('page-alliance.diplomacy');
		});
	}

	function reject(id) {
		useApiSubmit('alliance/diplomacy/reject', { id }, () => {
			toast('Отношение между вашими альянсами расторжено', {
				type: 'success'
			});

			refreshNuxtData('page-alliance.diplomacy');
		});
	}
</script>