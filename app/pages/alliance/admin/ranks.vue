<template>
	<div>
		<AllianceRanksForm :owner="user['id'] === page['alliance']['user_id']" :items="page['items']"/>
		<AllianceRanksCreate/>
		<AllianceRanksInfo/>
		<div class="mt-2">
			<NuxtLink to="/alliance/admin" class="button">Назад</NuxtLink>
		</div>
	</div>
</template>

<script setup>
	import AllianceRanksForm from '~/components/Page/Alliance/AllianceRanksForm.vue';
	import AllianceRanksInfo from '~/components/Page/Alliance/AllianceRanksInfo.vue';
	import AllianceRanksCreate from '~/components/Page/Alliance/AllianceRanksCreate.vue';
	import { definePageMeta, showError, useApiGet, useAsyncData, useHead } from '#imports';
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

	const { data: page, error } = await useAsyncData(
		async () => await useApiGet('/alliance/admin/ranks')
	);

	if (error.value) {
		throw showError(error.value);
	}

	const { user } = storeToRefs(useStore());
</script>