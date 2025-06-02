<template>
	<div class="row">
		<div class="col-1 b text-center">{{ item['id'] }}</div>
		<div class="col b text-center">{{ item['title'] }}</div>
		<div class="col-2 b text-center">
			<a :href="'/logs/' + item['id']" target="_blank">Открыть</a>
		</div>
		<div class="col-2 b text-center">
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