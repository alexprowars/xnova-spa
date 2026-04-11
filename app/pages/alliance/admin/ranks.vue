<template>
	<div>
		<AllianceRanksForm :owner="user['id'] === page['alliance']['user_id']" :items="page['items']"/>
		<AllianceRanksCreate/>
		<AllianceRanksInfo/>
		<div class="mt-2">
			<NuxtLink to="/alliance/admin" class="button">{{ $t('pages.alliance.admin.nav_back_admin_hub') }}</NuxtLink>
		</div>
	</div>
</template>

<script setup>
	import AllianceRanksForm from '~/components/Page/Alliance/AllianceRanksForm.vue';
	import AllianceRanksInfo from '~/components/Page/Alliance/AllianceRanksInfo.vue';
	import AllianceRanksCreate from '~/components/Page/Alliance/AllianceRanksCreate.vue';
	import { definePageMeta, showError, useApiGet, useAsyncData, useHead, useI18n } from '#imports';
	import useStore from '~/store';
	import { storeToRefs } from 'pinia';

	definePageMeta({
		middleware: ['auth'],
		view: {
			resources: false,
		}
	});

	const { t } = useI18n();

	useHead({
		title: t('pages.alliance.admin.ranks_head_title'),
	});

	const { data: page, error } = await useAsyncData(
		async () => await useApiGet('/alliance/admin/ranks')
	);

	if (error.value) {
		throw showError({ data: { error: error.value } });
	}

	const { user } = storeToRefs(useStore());
</script>