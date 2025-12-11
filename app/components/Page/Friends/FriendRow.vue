<template>
	<div class="grid grid-cols-5">
		<div class="th middle">
			<NuxtLink :to="'/messages/write/' + item['user']['id']">{{ item['user']['name'] }}</NuxtLink>
		</div>
		<div class="th middle">
			<NuxtLink v-if="item['user']['alliance']['id'] > 0" :to="'/alliance/info/' + item['user']['alliance']['id']">
				{{ item['user']['alliance']['name'] }}
			</NuxtLink>
			<template v-else>-</template>
		</div>
		<div class="th middle">
			<NuxtLink :to="'/galaxy?galaxy=' + item['user']['galaxy']+'&system=' + item['user']['system']">
				{{ item['user']['galaxy'] }}:{{ item['user']['system'] }}:{{ item['user']['planet'] }}
			</NuxtLink>
		</div>
		<div class="th middle">
			<span v-if="item['online'] === 1" class="positive">
				{{ $t('pages.friends.list.in_game') }}
			</span>
			<span v-if="item['online'] === 2" class="neutral">
				{{ $t('pages.friends.list.15_min') }}
			</span>
			<span v-else class="negative">
				{{ $t('pages.friends.list.not_in_game') }}
			</span>
		</div>
		<div class="th middle">
			<button @click.prevent="remove" class="button text-danger">
				{{ $t('pages.friends.list.remove') }}
			</button>
		</div>
	</div>
</template>

<script setup>
	import { openConfirmModal, refreshNuxtData, useApiSubmit, useSuccessNotification, useI18n } from '#imports';

	const { t } = useI18n();

	const { item } = defineProps({
		item: Object,
	});

	function remove () {
		openConfirmModal(
			null,
			t('pages.friends.list.remove_confirm.title'),
			[{
				title: t('pages.friends.list.remove_confirm.yes'),
				handler: () => {
					useApiSubmit('/friends/' + item.id, {
						_method: 'DELETE'
					}, () => {
						useSuccessNotification(t('pages.friends.list.remove_confirm.success'));
						refreshNuxtData();
					});
				}
			}, {
				title: t('pages.friends.list.remove_confirm.no'),
			}]
		);
	}
</script>