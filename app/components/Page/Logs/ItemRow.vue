<template>
	<div class="grid grid-cols-12">
		<div class="col-span-1 th">{{ item['id'] }}</div>
		<div class="col-span-7 th">{{ item['title'] }}</div>
		<div class="col-span-2 th">
			<a :href="'/logs/' + item['id']" target="_blank">Открыть</a>
		</div>
		<div class="col-span-2 thr">
			<a href="" @click.prevent="deleteItem">Удалить</a>
		</div>
	</div>
</template>

<script setup>
	import { openConfirmModal } from '~/composables/useModals';
	import { useApiSubmit } from '~/composables/useApi';
	import { useSuccessNotification } from '~/composables/useToast';
	import { refreshNuxtData } from '#imports';

	const { item } = defineProps({
		item: Object
	});

	function deleteItem() {
		openConfirmModal(
			null,
			'Удалить лог?',
			[{
				title: 'Да',
				handler: () => {
					useApiSubmit('/logs/' + item['id'], {
						_method: 'DELETE',
					}, () => {
						useSuccessNotification('Отчет удалён');

						refreshNuxtData();
					});
				}
			}, {
				title: 'Нет',
			}]
		);
	}
</script>