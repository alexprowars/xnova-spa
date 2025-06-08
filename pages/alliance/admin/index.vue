<template>
	<div>
		<div class="block-table text-center">
			<div>
				<div class="c">Управление альянсом</div>
			</div>
			<div>
				<div class="th"><NuxtLink to="/alliance/admin/ranks">Установить ранги</NuxtLink></div>
			</div>
			<div v-if="page['access']['kick']">
				<div class="th"><NuxtLink to="/alliance/admin/members">Члены альянса</NuxtLink></div>
			</div>
			<div>
				<div class="th"><NuxtLink to="/alliance/admin/tag">Изменить аббревиатуру альянса</NuxtLink></div>
			</div>
			<div>
				<div class="th"><NuxtLink to="/alliance/admin/name">Изменить название альянса</NuxtLink></div>
			</div>
		</div>

		<AllianceTextForm :data="page"/>
		<AllianceUpdateForm :data="page"/>

		<div class="block-table text-center">
			<div class="grid grid-cols-2">
				<div v-if="page['access']['delete'] || false">
					<div class="c">Расформировать альянс</div>
					<div class="th"><button @click.prevent="remove">Продолжить</button></div>
				</div>
				<div v-if="page['owner'] === user['id']">
					<div class="c">Покинуть / Передать альянс</div>
					<div class="th"><NuxtLink to="/alliance/admin/give" class="button">Продолжить</NuxtLink></div>
				</div>
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