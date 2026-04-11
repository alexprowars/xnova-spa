<template>
	<div class="block">
		<div class="title">{{ $t('pages.alliance.admin.give_page_title') }}</div>
		<div class="content">
			<form class="block-table text-center" @submit.prevent="send">
				<div>
					<div class="th">
						{{ $t('pages.alliance.admin.give_transfer_player_label') }}
						<select v-model="userId">
							<option value="">{{ $t('pages.alliance.admin.give_player_placeholder') }}</option>
							<option v-for="item in page['users']" :value="item['id']">{{ item['name'] }} [{{ item['rank'] }}]</option>
						</select>
					</div>
				</div>
				<div v-if="userId">
					<div class="th">
						<button type="submit">{{ $t('pages.alliance.admin.give_submit_transfer') }}</button>
					</div>
				</div>
			</form>
		</div>
	</div>
	<div class="mt-2">
		<NuxtLink to="/alliance" class="button">{{ $t('pages.alliance.admin.nav_back_alliance_root') }}</NuxtLink>
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
		title: t('pages.alliance.admin.give_page_title'),
	});

	const { data: page, error } = await useAsyncData(async () => {
		return await useApiGet('/alliance/admin/give');
	});

	if (error.value) {
		throw showError({ data: { error: error.value } });
	}

	const userId = ref('');

	function send() {
		useApiSubmit('alliance/admin/give', {
			user: userId.value
		}, () => {
			useSuccessNotification(t('pages.alliance.admin.give_transfer_success_notice'));

			navigateTo('/alliance');
		});
	}
</script>