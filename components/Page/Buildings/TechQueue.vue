<template>
	<div class="building-info-upgrade-timer">
		<span v-if="time > 0">
			{{ $formatTime(time, ':', true) }}&nbsp;<a @click.prevent="cancelAction">Отменить<span v-if="build.name">на {{ build.name }}</span></a>
		</span>
		<a v-else href="" @click.prevent="refresh">завершено. продолжить...</a>
	</div>
</template>

<script setup>
	import { computed } from 'vue';
	import dayjs from 'dayjs';
	import { useNow } from '@vueuse/core';
	import { useApiPost, openConfirmModal, refreshNuxtData, useI18n } from '#imports';

	const props = defineProps({
		build: Object,
	});

	const { t } = useI18n();
	const now = useNow({ interval: 1000 });
	const time = computed(() => dayjs(props.build['date']).diff(dayjs(now.value).utc()) / 1000);

	async function refresh() {
		await refreshNuxtData();
	}

	function cancelAction () {
		openConfirmModal(
			null,
			'Отменить изучение <b>' + t('tech.' + props.build['item']) + ' ' + props.build['level'] + ' ур.</b>?',
			[{
				title: 'Закрыть',
			}, {
				title: 'Отменить',
				handler: async () => {
					await useApiPost('/research/cancel', {
						element: props.build['item'],
					});

					await refreshNuxtData();
				}
			}]
		);
	}
</script>