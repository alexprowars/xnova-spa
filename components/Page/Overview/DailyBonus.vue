<template>
	<div class="block page-overview-bonus">
		<div class="title text-center">
			{{ $t('overview.daily_bonus.title') }}
		</div>
		<div class="content block-table">
			<div class="grid">
				<div class="th text-center">
					<div v-html="$t('overview.daily_bonus.row_1', [$formatNumber(amount)])"></div>
					<div class="mb-4">{{ $t('overview.daily_bonus.row_2') }}</div>
					<button @click.prevent="getBonus" class="button">
						{{ $t('overview.daily_bonus.button') }}
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { useApiPost, number, useErrorNotification, useSuccessNotification, useI18n } from '#imports';
	import useStore from '~/store/index.js';

	defineProps({
		amount: Number,
	});

	const { t } = useI18n();

	async function getBonus () {
		try {
			const result = await useApiPost('/user/daily');

			useSuccessNotification(t(result['credits'] ? 'overview.daily_bonus.success_2' : 'overview.daily_bonus.success_1', [number(result['resources']), result['credits']]));

			await useStore().loadState();
		} catch (e) {
			useErrorNotification(e.message);
		}
	}
</script>