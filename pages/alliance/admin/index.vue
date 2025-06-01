<template>
	<div>
		<table class="table">
			<tbody>
			<tr>
				<td class="c">Управление альянсом</td>
			</tr>
			<tr>
				<th><NuxtLink to="/alliance/admin/ranks">Установить ранги</NuxtLink></th>
			</tr>
			<tr v-if="page['access']['kick']">
				<th><NuxtLink to="/alliance/admin/members">Члены альянса</NuxtLink></th>
			</tr>
			<tr>
				<th><NuxtLink to="/alliance/admin/tag">Изменить аббревиатуру альянса</NuxtLink></th>
			</tr>
			<tr>
				<th><NuxtLink to="/alliance/admin/name">Изменить название альянса</NuxtLink></th>
			</tr>
			</tbody>
		</table>

		<AllianceTextForm :data="page"/>
		<div class="separator"></div>
		<AllianceUpdateForm :data="page"/>

		<div class="separator"></div>
		<div class="row">
			<div class="col-6" v-if="page['access']['delete'] || false">
				<table width="100%">
					<tbody>
					<tr>
						<td class="c">Расформировать альянс</td>
					</tr>
					<tr>
						<th><button @click.prevent="remove">Продолжить</button></th>
					</tr>
					</tbody>
				</table>
			</div>
			<div class="col-6" v-if="page['owner'] === user['id']">
				<table width="100%">
					<tbody>
					<tr>
						<td class="c">Покинуть / Передать альянс</td>
					</tr>
					<tr>
						<th><NuxtLink to="/alliance/admin/give" class="button">Продолжить</NuxtLink></th>
					</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script setup>
	import AllianceUpdateForm from '~/components/Page/Alliance/AllianceUpdateForm.vue';
	import AllianceTextForm from '~/components/Page/Alliance/AllianceTextForm.vue';
	import { definePageMeta, openConfirmModal, showError, useApiSubmit, useAsyncData, useHead, useRoute, navigateTo, useSuccessNotification, useApiGet } from '#imports';
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
		async () => await useApiGet('/alliance/admin', Object.assign({}, route.query)),
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