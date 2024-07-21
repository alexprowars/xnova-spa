<template>
	<div class="building-info-upgrade-timer">
		<span v-if="time > 0">
			{{ $time(time, ':', true) }}&nbsp;<a @click.prevent="cancelAction">Отменить<span v-if="build.name">на {{ build.name }}</span></a>
		</span>
		<a v-else href="" @click.prevent="refresh">завершено. продолжить...</a>
	</div>
</template>

<script setup>
	import { computed } from 'vue';
	import dayjs from 'dayjs';
	import { useNow } from '@vueuse/core';
	import { openConfirmModal } from '~/composables/useModals';
	import { useApiPost } from '~/composables/useApi';
	import { refreshNuxtData, useI18n } from '#imports';

	const props = defineProps({
		build: Object,
	});

	const { t } = useI18n();
	const now = useNow({ interval: 1000 });
	const time = computed(() => dayjs(props.build['time']).diff(dayjs(now.value).utc()) / 1000);

	async function refresh() {
		await refreshNuxtData('page-research');
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

					await refreshNuxtData('page-research');
				}
			}]
		);
	}
</script>