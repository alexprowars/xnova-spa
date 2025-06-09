<template>
	<div class="block">
		<div class="title">Снос здания "{{ $t('tech.' + item) }}" уровень {{ data['level'] }}</div>
		<div class="content !border-0">
			<div class="block-table text-center">
				<div class="grid">
					<div class="th">
						<build-row-price :price="data['resources']"/>
					</div>
				</div>
				<div class="grid">
					<div class="th">
						<div class="mb-2">Время сноса: {{ $formatTime(data['time']) }}</div>

						<button @click.prevent="destroyAction">Снести</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import BuildRowPrice from '~/components/Page/Buildings/BuildRowPrice.vue'
	import { useApiPost, closeModals, openConfirmModal, refreshNuxtData, useRoute, useI18n } from '#imports';

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
						await refreshNuxtData();
					}
				}
			}]
		);
	}
</script>