<template>
	<div>
		<div v-if="page['DMyQuery'].length > 0" class="block">
			<div class="title">{{ $t('pages.alliance.diplomacy.my_requests') }}</div>
			<div class="content">
				<div class="block-table text-center">
					<div v-for="item in page['DMyQuery']" class="grid grid-cols-3">
						<div class="th">{{ item['name'] }}</div>
						<div class="th">{{ $t('alliance.diplomacy_status.' + item['type']) }}</div>
						<div class="th">
							<a href="" @click.prevent="reject(item['id'])"><img src="/images/abort.gif" :alt="$t('pages.alliance.diplomacy.delete_request')"></a>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div v-if="page['DQuery'].length > 0" class="block">
			<div class="title">{{ $t('pages.alliance.diplomacy.requests_to_alliance') }}</div>
			<div class="content">
				<div class="block-table text-center">
					<div v-for="item in page['DQuery']" class="grid grid-cols-3">
						<div class="th">{{ item['name'] }}</div>
						<div class="th">{{ $t('alliance.diplomacy_status.' + item['type']) }}</div>
						<div class="th">
							<a href="" @click.prevent="accept(item['id'])"><img src="/images/appwiz.gif" :alt="$t('pages.alliance.diplomacy.confirm')"></a>
							<a href="" @click.prevent="reject(item['id'])"><img src="/images/abort.gif" :alt="$t('pages.alliance.diplomacy.delete_request')"></a>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="block">
			<div class="title">{{ $t('pages.alliance.diplomacy.alliance_relations') }}</div>
			<div class="content">
				<div class="block-table text-center">
					<div v-for="item in page['DText']" class="grid grid-cols-3">
						<div class="th">{{ item['name'] }}</div>
						<div class="th">{{ $t('alliance.diplomacy_status.' + item['type']) }}</div>
						<div class="th">
							<a href="" @click.prevent="reject(item['id'])"><img src="/images/abort.gif" :alt="$t('pages.alliance.diplomacy.delete_request')"></a>
						</div>
					</div>
					<div v-if="page['DText'].length === 0">
						<div class="th">{{ $t('pages.alliance.diplomacy.none') }}</div>
					</div>
				</div>
			</div>
		</div>

		<DiplomacyCreate :items="page['items']"/>

		<div class="mt-2">
			<NuxtLink to="/alliance" class="button">{{ $t('pages.alliance.diplomacy.back') }}</NuxtLink>
		</div>
	</div>
</template>

<script setup>
	import DiplomacyCreate from '~/components/Page/Alliance/DiplomacyCreate.vue';
	import { definePageMeta, showError, useApiGet, useApiSubmit, useAsyncData, useHead, useRoute, useSuccessNotification, useI18n } from '#imports';

	const { t } = useI18n();

	definePageMeta({
		middleware: ['auth'],
		view: {
			resources: false,
		}
	});

	useHead({
		title: t('pages.alliance.diplomacy.page_title'),
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
			useSuccessNotification(t('pages.alliance.diplomacy.relation_confirmed'));

			refresh();
		});
	}

	function reject(id) {
		useApiSubmit('alliance/diplomacy/reject', { id }, () => {
			useSuccessNotification(t('pages.alliance.diplomacy.relation_terminated'));

			refresh();
		});
	}
</script>