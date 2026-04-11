<template>
	<div>
		<div class="block">
			<div class="title">{{ $t('pages.alliance.admin.main_heading') }}</div>
			<div class="content">
				<div class="block-table text-center">
					<div>
						<div class="th"><NuxtLink to="/alliance/admin/ranks">{{ $t('pages.alliance.admin.index_link_ranks') }}</NuxtLink></div>
					</div>
					<div v-if="page['access']['kick']">
						<div class="th"><NuxtLink to="/alliance/admin/members">{{ $t('pages.alliance.admin.index_link_members') }}</NuxtLink></div>
					</div>
					<div>
						<div class="th"><NuxtLink to="/alliance/admin/tag">{{ $t('pages.alliance.admin.index_link_change_tag') }}</NuxtLink></div>
					</div>
					<div>
						<div class="th"><NuxtLink to="/alliance/admin/name">{{ $t('pages.alliance.admin.index_link_change_name') }}</NuxtLink></div>
					</div>
				</div>
			</div>
		</div>

		<AllianceTextForm :data="page"/>
		<AllianceUpdateForm :data="page"/>

		<div class="block">
			<div class="content">
				<div class="block-table text-center">
					<div class="grid grid-cols-2">
						<div v-if="page['access']['delete'] || false">
							<div class="c">{{ $t('pages.alliance.admin.index_dissolve_caption') }}</div>
							<div class="th"><button @click.prevent="remove">{{ $t('pages.alliance.admin.action_continue') }}</button></div>
						</div>
						<div v-if="page['owner'] === user['id']">
							<div class="c">{{ $t('pages.alliance.admin.index_leave_transfer_caption') }}</div>
							<div class="th"><NuxtLink to="/alliance/admin/give" class="button">{{ $t('pages.alliance.admin.action_continue') }}</NuxtLink></div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="mt-2">
			<NuxtLink to="/alliance" class="button">{{ $t('pages.alliance.admin.nav_back_alliance_root') }}</NuxtLink>
		</div>
	</div>
</template>

<script setup>
	import AllianceUpdateForm from '~/components/Page/Alliance/AllianceUpdateForm.vue';
	import AllianceTextForm from '~/components/Page/Alliance/AllianceTextForm.vue';
	import { definePageMeta, openConfirmModal, showError, useApiSubmit, useAsyncData, useHead, useRoute, navigateTo, useSuccessNotification, useApiGet, useI18n } from '#imports';
	import useStore from '~/store';
	import { storeToRefs } from 'pinia';

	definePageMeta({
		middleware: ['auth'],
		view: {
			resources: false,
		}
	});

	const route = useRoute();
	const { t } = useI18n();

	useHead({
		title: t('pages.alliance.admin.main_heading'),
	});

	const { data: page, error } = await useAsyncData(
		async () => await useApiGet('/alliance/admin', Object.assign({}, route.query))
	);

	if (error.value) {
		throw showError({ data: { error: error.value } });
	}

	const { user } = storeToRefs(useStore());

	function remove() {
		openConfirmModal(
			null,
			t('pages.alliance.admin.index_dissolve_confirm_prompt'),
			[{
				title: t('pages.alliance.admin.confirm_decline'),
			}, {
				title: t('pages.alliance.admin.confirm_accept'),
				handler: () => {
					useApiSubmit('alliance/admin/remove', {}, () => {
						useSuccessNotification(t('pages.alliance.admin.index_dissolve_success_notice'));

						navigateTo('/alliance');
					});
				}
			}]
		);
	}
</script>