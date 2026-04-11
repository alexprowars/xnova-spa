<template>
	<div class="block">
		<div class="title">{{ $t('pages.alliance.admin.name_form_title') }}</div>
		<div class="content">
			<form method="post" @submit.prevent="save" class="block-table text-center">
				<div>
					<div class="th">
						<input type="text" v-model="name">
					</div>
				</div>
				<div>
					<div class="c">
						<button type="submit">{{ $t('pages.alliance.admin.action_change') }}</button>
					</div>
				</div>
			</form>
		</div>
	</div>
	<div class="mt-2">
		<NuxtLink to="/alliance/admin" class="button">{{ $t('pages.alliance.admin.nav_back_admin_hub') }}</NuxtLink>
	</div>
</template>

<script setup>
	import { definePageMeta, navigateTo, showError, useApiGet, useApiSubmit, useAsyncData, useHead, useSuccessNotification, useI18n } from '#imports';
	import { ref } from 'vue';

	definePageMeta({
		middleware: ['auth'],
		view: {
			resources: false,
		}
	});

	const { t } = useI18n();

	useHead({
		title: t('pages.alliance.admin.main_heading'),
	});

	const { data: page, error } = await useAsyncData(async () => {
		return await useApiGet('/alliance');
	});

	if (error.value) {
		throw showError({ data: { error: error.value } });
	}

	const name = ref(page.value['name']);

	function save() {
		useApiSubmit('/alliance/admin/name', {
			name: name.value,
		}, () => {
			useSuccessNotification(t('pages.alliance.admin.name_change_success_notice'));

			navigateTo('/alliance/admin');
		});
	}
</script>