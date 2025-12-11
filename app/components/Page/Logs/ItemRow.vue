<template>
	<div class="grid grid-cols-12">
		<div class="col-span-1 th">{{ item['id'] }}</div>
		<div class="col-span-7 th">{{ item['title'] }}</div>
		<div class="col-span-2 th">
			<a :href="'/logs/' + item['id']" target="_blank">{{ $t('pages.logs.item.open') }}</a>
		</div>
		<div class="col-span-2 thr">
			<a href="" @click.prevent="deleteItem">{{ $t('pages.logs.item.delete') }}</a>
		</div>
	</div>
</template>

<script setup>
	import { openConfirmModal } from '~/composables/useModals';
	import { useApiSubmit } from '~/composables/useApi';
	import { useSuccessNotification } from '~/composables/useToast';
	import { refreshNuxtData, useI18n } from '#imports';

	const { t } = useI18n();

	const { item } = defineProps({
		item: Object
	});

	function deleteItem() {
		openConfirmModal(
			null,
			t('pages.logs.item.delete_confirm.title'),
			[{
				title: t('pages.logs.item.delete_confirm.yes'),
				handler: () => {
					useApiSubmit('/logs/' + item['id'], {
						_method: 'DELETE',
					}, () => {
						useSuccessNotification(t('pages.logs.item.delete_confirm.success'));

						refreshNuxtData();
					});
				}
			}, {
				title: t('pages.logs.item.delete_confirm.no'),
			}]
		);
	}
</script>