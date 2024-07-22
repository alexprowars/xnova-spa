<template>
	<div class="block">
		<div class="title">Снос здания "{{ $t('tech.' + item) }}" уровень {{ data['level'] }}</div>
		<div class="content border-0">
			<div class="block-table">
				<div class="row">
					<div class="col th">
						<build-row-price :price="data['resources']"/>
					</div>
				</div>
				<div class="row">
					<div class="col th">
						Время сноса: {{ $time(data['time']) }}

						<button @click.prevent="destroyAction">Снести</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import BuildRowPrice from '~/components/Page/Buildings/BuildRowPrice.vue'
	import { useApiPost } from '~/composables/useApi';
	import { closeModals, openConfirmModal } from '~/composables/useModals';
	import { refreshNuxtData, useRoute, useI18n } from '#imports';

	const props = defineProps({
		data: Object,
		item: Number
	});

	const { t } = useI18n();

	function destroyAction () {
		openConfirmModal(
			null,
			'Снести постройку <b>' + t('tech.' + props.item) + ' ' + props.data['level'] + ' ур.</b>?',
			[{
				title: 'Закрыть',
			}, {
				title: 'Снести',
				handler: async () => {
					await useApiPost('/buildings/build/destroy', {
						element: props.item,
					});

					await closeModals();

					if (useRoute().path.indexOf('/buildings') !== -1) {
						await refreshNuxtData('page-buildings');
					}
				}
			}]
		);
	}
</script>