<template>
	<div class="page-fleet-shortcut">
		<div class="block">
			<div class="title">
				{{ $t('pages.fleets.shortcut.index.title') }}
			</div>
			<div class="content">
				<div class="block-table">
					<div class="grid grid-cols-2">
						<div v-for="item in items" class="th">
							<NuxtLink :to="'/fleet/shortcut/' + item['id']">
								{{ item['name'] }} [{{ item['galaxy'] }}:{{ item['system'] }}:{{ item['planet'] }}] {{ $t('planet_type.' + item['planet_type']) }}
							</NuxtLink>
						</div>
						<div v-if="items.length === 0" class="col-span-2 th">{{ $t('pages.fleets.shortcut.index.empty') }}</div>
					</div>
					<div class="grid">
						<div class="c">
							<NuxtLink to="/fleet/shortcut/create" class="button">{{ $t('pages.fleets.shortcut.index.add') }}</NuxtLink>
							<NuxtLink to="/fleet" class="button">{{ $t('pages.fleets.shortcut.index.back_fleet') }}</NuxtLink>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { definePageMeta, showError, useApiGet, useAsyncData, useHead, useI18n } from '#imports';

	definePageMeta({
		middleware: ['auth'],
	});

	const { t } = useI18n();

	useHead({
		title: t('pages.fleets.shortcut.index.meta_title'),
	});

	const { data: items, error } = await useAsyncData(async () => {
		return await useApiGet('/fleet/shortcut');
	});

	if (error.value) {
		throw showError({ data: { error: error.value } });
	}
</script>