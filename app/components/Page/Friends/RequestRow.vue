<template>
	<div class="grid grid-cols-5">
		<div class="th middle">
			<NuxtLink :to="'/messages/write/' + item['user']['id']">{{ item['user']['name'] }}</NuxtLink>
		</div>
		<div class="th middle">
			<NuxtLink v-if="item['user']['alliance']['id'] > 0" :to="'/alliance/info/' + item['user']['alliance']['id']">{{ item['user']['alliance']['name'] }}</NuxtLink>
			<template v-else>-</template>
		</div>
		<div class="th middle">
			<NuxtLink :to="'/galaxy?galaxy=' + item['user']['galaxy'] + '&system=' + item['user']['system']">
				{{ item['user']['galaxy'] }}:{{ item['user']['system'] }}:{{ item['user']['planet'] }}
			</NuxtLink>
		</div>
		<div class="th middle" v-html="item['message']"></div>
		<div class="th text-center">
			<button v-if="isMy" @click.prevent="remove" class="button text-danger">{{ $t('pages.friends.requests.remove_request') }}</button>
			<template v-else>
				<button @click.prevent="approve" class="button text-success">{{ $t('pages.friends.requests.approve') }}</button>
				<button @click.prevent="remove" class="button text-danger">{{ $t('pages.friends.requests.reject') }}</button>
			</template>
		</div>
	</div>
</template>

<script setup>
	import { navigateTo, openConfirmModal, refreshNuxtData, useApiSubmit, useSuccessNotification, useI18n } from '#imports';

	const { t } = useI18n();

	const { item } = defineProps({
		item: Object,
		isMy: {
			type: Boolean,
			default: false,
		},
	});

	function approve () {
		useApiSubmit('/friends/' + item['id'] + '/approve', {}, () => {
			navigateTo('/friends');
		});
	}

	function remove () {
		openConfirmModal(
			null,
			t('pages.friends.requests.remove_request_confirm.title'),
			[{
				title: t('pages.friends.requests.remove_request_confirm.yes'),
				handler: () => {
					useApiSubmit('/friends/' + item['id'], {
						_method: 'DELETE'
					}, async () => {
						useSuccessNotification(t('pages.friends.requests.remove_request_confirm.success'));
						await refreshNuxtData();
					});
				}
			}, {
				title: t('pages.friends.requests.remove_request_confirm.no'),
			}]
		);
	}
</script>