<template>
	<div class="row">
		<div class="col-6 c">
			{{ $t('tech.' + item['item']) }} {{ item['level'] }}{{ item['mode'] === 1 ? '. Снос здания' : '' }}
		</div>
		<div class="col-6 k" v-if="index === 0">
			<div v-if="time > 0" class="z">
				{{ $time(time, ':', true) }}
				<br>
				<a @click.prevent="cancelItem">Отменить</a>
			</div>
			<div v-else class="z">
				Завершено
				<br>
				<NuxtLinkLocale :to="{ path: '/buildings', force: true }">Продолжить</NuxtLinkLocale>
			</div>
			<div class="positive">{{ $date(item['date'], 'DD MMM HH:mm:ss') }}</div>
		</div>
		<div class="col-6 k" v-else>
			<a @click.prevent="deleteItem">Удалить</a>
			<div class="positive">{{ $date(item['date'], 'DD MMM HH:mm:ss') }}</div>
		</div>
	</div>
</template>

<script setup>
	import { useApiPost, openConfirmModal, refreshNuxtData, useI18n } from '#imports';
	import dayjs from 'dayjs';
	import { useNow } from '@vueuse/core';
	import { computed } from 'vue';

	const props = defineProps({
		index: Number,
		item: Object
	});

	const { t } = useI18n();
	const now = useNow({ interval: 1000 });
	const time = computed(() => dayjs(props.item['date']).diff(now.value) / 1000);

	function deleteItem () {
		openConfirmModal(
			'Очередь построек',
			'Удалить <b>' + t('tech.' + props.item['item']) + ' ' + props.item['level'] + ' ур.</b> из очереди?',
			[{
				title: 'Закрыть',
			}, {
				title: 'Удалить',
				handler: async () => {
					await useApiPost('/buildings/queue/remove', {
						index: props.index
					});

					await refreshNuxtData('page-buildings');
				}
			}]
		)
	}

	function cancelItem () {
		openConfirmModal(
			'Очередь построек',
			'Отменить постройку <b>' + t('tech.' + props.item['item']) + ' ' + props.item['level'] + ' ур.</b>?',
			[{
				title: 'Закрыть',
			}, {
				title: 'Отменить',
				handler: async () => {
					await useApiPost('/buildings/queue/cancel', {
						index: props.index - 1
					})

					await refreshNuxtData('page-buildings');
				}
			}]
		);
	}
</script>