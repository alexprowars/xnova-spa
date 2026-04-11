<template>
	<div class="page-stat">
		<div class="block">
			<div class="title text-center">
				{{ $t('pages.stats.header', [$formatDate(data['update'], 'DD MMM YYYY HH:mm:ss')]) }}
			</div>
			<div class="content">
				<div class="block-table text-center">
					<div class="grid grid-cols-12">
						<div class="th col-span-2 middle">{{ $t('pages.stats.table_header_stats') }}</div>
						<div class="th col-span-4 sm:col-span-2">
							<select v-model="form.list">
								<option value="players">{{ $t('pages.stats.list_players') }}</option>
								<option value="alliances">{{ $t('pages.stats.list_alliances') }}</option>
								<option value="races">{{ $t('pages.stats.list_races') }}</option>
							</select>
						</div>
						<div class="th col-span-2 sm:col-span-1 middle">{{ $t('pages.stats.label_by') }}</div>
						<div class="th col-span-4 sm:col-span-3">
							<select v-model="form.type">
								<option :value="1">{{ $t('pages.stats.type_points') }}</option>
								<option :value="2">{{ $t('pages.stats.type_fleet') }}</option>
								<option :value="5">{{ $t('pages.stats.type_buildings') }}</option>
								<option :value="3">{{ $t('pages.stats.type_research') }}</option>
								<option :value="4">{{ $t('pages.stats.type_defense') }}</option>
								<option v-if="form.list !== 'races'" :value="6">{{ $t('pages.stats.type_peace_level') }}</option>
								<option v-if="form.list !== 'races'" :value="7">{{ $t('pages.stats.type_combat_level') }}</option>
							</select>
						</div>
						<div v-if="form.list !== 'races'" class="th col-span-2 middle">{{ $t('pages.stats.label_place') }}</div>
						<div v-if="form.list !== 'races'" class="th col-span-10 sm:col-span-2">
							<select v-model="form.page">
								<option v-for="i in form.pages" :value="i">{{ (i - 1) * 100 + 1 }} - {{ i * 100 }}</option>
							</select>
						</div>
					</div>
				</div>
			</div>
		</div>

		<StatPlayers v-if="list === 'players'" :items="items"/>
		<StatAlliances v-if="list === 'alliances'" :items="items"/>
		<StatRaces v-if="list === 'races'" :items="items"/>
	</div>
</template>

<script setup>
	import StatPlayers from '~/components/Page/Stat/Players.vue';
	import StatAlliances from '~/components/Page/Stat/Alliances.vue';
	import StatRaces from '~/components/Page/Stat/Races.vue';
	import { definePageMeta, showError, useApiGet, useAsyncData, useHead, useI18n, refreshNuxtData } from '#imports';
	import { computed, ref, watch } from 'vue';

	definePageMeta({
		view: {
			resources: false,
		}
	});

	const { t } = useI18n();

	useHead({
		title: t('pages.stats.title'),
	});

	const form = ref({
		list: 'players',
		type: 1,
		page: 1,
		pages: 0
	});

	const { data, error } = await useAsyncData(async () => {
		return await useApiGet('/stats/' + form.value.list,  {
			type: form.value.type,
			page: form.value.page
		});
	});

	if (error.value) {
		throw showError({ data: { error: error.value } });
	}

	const items = computed(() => data.value.items);
	const list = computed(() => data.value.list);

	form.value.list = data.value['list'];
	form.value.type = data.value['type'];
	form.value.pages = Math.ceil(data.value['elements'] / 100);

	watch(() => form.value.list, () => {
		form.value.type = 1;
		form.value.page = 1;
	});

	watch(() => form.value.type, () => {
		form.value.page = 1;
	});

	watch(form, () => {
		refreshNuxtData();
	}, { deep: true });
</script>