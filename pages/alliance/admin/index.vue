<template>
	<div>
		<table class="table">
			<tr>
				<td class="c">Управление альянсом</td>
			</tr>
			<tr>
				<th><NuxtLinkLocale to="/alliance/admin/rights">Установить ранги</NuxtLinkLocale></th>
			</tr>
			<tr v-if="page['access']['kick']">
				<th><NuxtLinkLocale to="/alliance/admin/members">Члены альянса</NuxtLinkLocale></th>
			</tr>
			<tr>
				<th><NuxtLinkLocale to="/alliance/admin/tag">Изменить аббревиатуру альянса</NuxtLinkLocale></th>
			</tr>
			<tr>
				<th><NuxtLinkLocale to="/alliance/admin/name">Изменить название альянса</NuxtLinkLocale></th>
			</tr>
		</table>

		<AllianceTextForm :data="page"/>
		<div class="separator"></div>
		<AllianceUpdateForm :data="page"/>

		<div class="separator"></div>
		<div class="row">
			<div class="col-6" v-if="page['access']['delete'] || false">
				<table width="100%">
					<tr>
						<td class="c">Расформировать альянс</td>
					</tr>
					<tr>
						<th><button @click.prevent="remove">Продолжить</button></th>
					</tr>
				</table>
			</div>
			<div class="col-6" v-if="page['owner'] === user['id']">
				<table width="100%">
					<tr>
						<td class="c">Покинуть / Передать альянс</td>
					</tr>
					<tr>
						<th><NuxtLinkLocale to="/alliance/admin/give" class="button">Продолжить</NuxtLinkLocale></th>
					</tr>
				</table>
			</div>
		</div>
	</div>
</template>

<script setup>
	import AllianceUpdateForm from '~/components/Page/Alliance/AllianceUpdateForm.vue';
	import AllianceTextForm from '~/components/Page/Alliance/AllianceTextForm.vue';
	import { definePageMeta, openConfirmModal, showError, useApiSubmit, useAsyncData, useHead, useRoute, navigateTo, useSuccessNotification } from '#imports';
	import useStore from '~/store';
	import { storeToRefs } from 'pinia';

	definePageMeta({
		middleware: ['auth'],
		view: {
			resources: false,
		}
	});

	useHead({
		title: 'Управление альянсом',
	});

	const route = useRoute();

	const { data: page, error } = await useAsyncData(
		'page-alliance.admin',
		async () => await useStore().loadPage(undefined, Object.assign({}, route.query)),
		{ watch: [() => useRoute().query] }
	);

	if (error.value) {
		throw showError(error.value);
	}

	const { user } = storeToRefs(useStore());

	function remove() {
		openConfirmModal(
			null,
			'Расформировать альянс?',
			[{
				title: 'Нет',
			}, {
				title: 'Да',
				handler: () => {
					useApiSubmit('alliance/admin/remove', {}, () => {
						useSuccessNotification('Альянс удален');

						navigateTo('/alliance');
					});
				}
			}]
		);
	}
</script>