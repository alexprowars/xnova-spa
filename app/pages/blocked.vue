<template>
	<div class="block">
		<div class="title">{{ $t('pages.blocked.heading') }}</div>
		<div class="content">
			<div class="block-table text-center">
				<div v-if="items.length === 0" class="grid">
					<div class="b">{{ $t('pages.blocked.empty_state') }}</div>
				</div>
				<template v-else>
					<div class="grid grid-cols-6">
						<div class="th">{{ $t('pages.blocked.col_player') }}</div>
						<div class="th">{{ $t('pages.blocked.col_block_start') }}</div>
						<div class="th">{{ $t('pages.blocked.col_block_end') }}</div>
						<div class="th col-span-2">{{ $t('pages.blocked.col_reason') }}</div>
						<div class="th">{{ $t('pages.blocked.col_moderator') }}</div>
					</div>
					<div v-for="item in items" class="grid grid-cols-6">
						<div class="b">
							<NuxtLink :to="'/players/' + item['user']['id']">
								{{ item['user']['name'] }}
							</NuxtLink>
						</div>
						<div class="b">
							<div>{{ $formatDate(item['date'], 'DD MMM YYYY') }}</div>
							<div>{{ $formatDate(item['date'], 'HH:mm') }}</div>
						</div>
						<div class="b">
							<div>{{ $formatDate(item['date_end'], 'DD MMM YYYY') }}</div>
							<div>{{ $formatDate(item['date_end'], 'HH:mm:ss') }}</div>
						</div>
						<div class="b col-span-2">{{ item['reason'] }}</div>
						<div class="b">
							<NuxtLink :to="'/players/' + item['moderator']['id']">
								{{ item['moderator']['name'] }}
							</NuxtLink>
						</div>
					</div>
					<div class="grid">
						<div class="b">{{ $t('pages.blocked.footer_total', { count: items.length }) }}</div>
					</div>
				</template>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { definePageMeta, showError, useAsyncData, useHead, useApiGet, useI18n } from '#imports';

	definePageMeta({
		view: {
			resources: false,
		}
	});

	const { t } = useI18n();

	useHead({
		title: t('pages.blocked.meta_title'),
	});

	const { data: items, error } = await useAsyncData(async () => {
		return await useApiGet('/blocked');
	});

	if (error.value) {
		throw showError({ data: { error: error.value } });
	}
</script>