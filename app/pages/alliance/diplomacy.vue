<template>
	<div>
		<div v-if="page['DMyQuery'].length > 0" class="block">
			<div class="title">Ваши запросы</div>
			<div class="content">
				<div class="block-table text-center">
					<div v-for="item in page['DMyQuery']" class="grid grid-cols-3">
						<div class="th">{{ item['name'] }}</div>
						<div class="th">{{ $t('alliance.diplomacy_status.' + item['type']) }}</div>
						<div class="th">
							<a href="" @click.prevent="reject(item['id'])"><img src="/images/abort.gif" alt="Удалить заявку"></a>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div v-if="page['DQuery'].length > 0" class="block">
			<div class="title">Запросы вашему альянсу</div>
			<div class="content">
				<div class="block-table text-center">
					<div v-for="item in page['DQuery']" class="grid grid-cols-3">
						<div class="th">{{ item['name'] }}</div>
						<div class="th">{{ $t('alliance.diplomacy_status.' + item['type']) }}</div>
						<div class="th">
							<a href="" @click.prevent="accept(item['id'])"><img src="/images/appwiz.gif" alt="Подтвердить"></a>
							<a href="" @click.prevent="reject(item['id'])"><img src="/images/abort.gif" alt="Удалить заявку"></a>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="block">
			<div class="title">Отношения между альянсами</div>
			<div class="content">
				<div class="block-table text-center">
					<div v-for="item in page['DText']" class="grid grid-cols-3">
						<div class="th">{{ item['name'] }}</div>
						<div class="th">{{ $t('alliance.diplomacy_status.' + item['type']) }}</div>
						<div class="th">
							<a href="" @click.prevent="reject(item['id'])"><img src="/images/abort.gif" alt="Удалить заявку"></a>
						</div>
					</div>
					<div v-if="page['DText'].length === 0">
						<div class="th">нет</div>
					</div>
				</div>
			</div>
		</div>

		<DiplomacyCreate :items="page['items']"/>

		<div class="mt-2">
			<NuxtLink to="/alliance" class="button">Назад</NuxtLink>
		</div>
	</div>
</template>

<script setup>
	import DiplomacyCreate from '~/components/Page/Alliance/DiplomacyCreate.vue';
	import { definePageMeta, showError, useApiGet, useApiSubmit, useAsyncData, useHead, useRoute, useSuccessNotification } from '#imports';

	definePageMeta({
		middleware: ['auth'],
		view: {
			resources: false,
		}
	});

	useHead({
		title: 'Дипломатия',
	});

	const { data: page, error, refresh } = await useAsyncData(
		async () => await useApiGet('/alliance/diplomacy'),
		{ watch: [() => useRoute().query] }
	);

	if (error.value) {
		throw showError(error.value);
	}

	function accept(id) {
		useApiSubmit('alliance/diplomacy/accept', { id }, () => {
			useSuccessNotification('Отношение между вашими альянсами подтверждено');

			refresh();
		});
	}

	function reject(id) {
		useApiSubmit('alliance/diplomacy/reject', { id }, () => {
			useSuccessNotification('Отношение между вашими альянсами расторжено');

			refresh();
		});
	}
</script>