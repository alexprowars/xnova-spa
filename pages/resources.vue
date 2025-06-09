<template>
	<div class="page-resources">
		<div class="block">
			<div class="title">
				{{ $t('pages.resources.planet_production', [planet['name']]) }}
			</div>
			<div class="content !border-0">
				<div class="table-responsive">
					<form method="post" @submit.prevent="updateState">
						<table class="table">
							<tbody>
								<tr>
									<th width="200"></th>
									<th>{{ $t('pages.resources.lvl') }}</th>
									<th>{{ $t('pages.resources.bonus') }}</th>
									<th><InfoPopup :id="1" :title="$t('tech.1')">{{ $t('resources.metal') }}</InfoPopup></th>
									<th><InfoPopup :id="2" :title="$t('tech.2')">{{ $t('resources.crystal') }}</InfoPopup></th>
									<th><InfoPopup :id="3" :title="$t('tech.3')">{{ $t('resources.deuterium') }}</InfoPopup></th>
									<th><InfoPopup :id="4" :title="$t('tech.4')">{{ $t('resources.energy') }}</InfoPopup></th>
									<th width="100">{{ $t('pages.resources.efficiency') }}</th>
								</tr>
								<tr>
									<th class="text-left" nowrap>{{ $t('pages.resources.base_production') }}</th>
									<td class="k text-center"></td>
									<td class="k text-center"></td>
									<td v-for="res in page['resources']" class="k text-center">{{ $formatNumber(planet['resources'][res]['basic']) }}</td>
									<td class="k text-center">{{ $formatNumber(planet['resources']['energy']['basic']) }}</td>
									<td class="k text-center">100%</td>
								</tr>
								<ResourcesRow v-for="(item, index) in page['items']" :key="index" :item="item" :resources="page['resources']"/>
								<tr>
									<th colspan="2">{{ $t('pages.resources.storage') }}:</th>
									<th>{{ page['bonus_h'] }}%</th>
									<td v-for="res in page['resources']" class="k text-center" v-once>
										<span :class="[(planet['resources'][res]['capacity'] > planet['resources'][res]['value']) ? 'positive' : 'negative']">
											{{ $formatNumber(planet['resources'][res]['capacity'] / 1000) }} k
										</span>
									</td>
									<td class="k text-center">
										<span style="color: #00ff00">{{ $formatNumber(planet['resources']['energy']['capacity']) }}</span>
									</td>
									<td v-if="!isVacation" class="k text-center">
										<button type="submit" class="button" name="action" value="Y">
											{{ $t('pages.resources.calculate') }}
										</button>
									</td>
								</tr>
								<tr>
									<th colspan="3">Всего:</th>
									<td v-for="res in page['resources']" class="k text-center">
										<Colored :value="planet['resources'][res]['production']"/>
									</td>
									<td class="k text-center"><Colored :value="planet['resources']['energy']['value']"/></td>
								</tr>
							</tbody>
						</table>
					</form>
				</div>
			</div>
		</div>

		<div class="block">
			<div class="block-table rounded overflow-clip">
				<div class="grid grid-cols-6">
					<div class="col-span-2 c">{{ $t('pages.resources.production_level') }}</div>
					<div class="th text-center">{{ page['production_level'] }}%</div>
					<div class="col-span-3 th">
						<ResourcesBar :value="page['production_level']" :reverse="true"/>
					</div>
				</div>
				<div class="grid grid-cols-6">
					<div class="col-span-2 c">
						<NuxtLink to="/info/113">{{ $t('tech.113') }}</NuxtLink>
					</div>
					<div class="th text-center">
						{{ user['technology']['energy_tech'] }} {{ $t('pages.resources.lvl').toLowerCase() }}
					</div>
					<div class="col-span-3 th"></div>
				</div>
			</div>
		</div>

		<div v-if="!isVacation" class="block">
			<div class="title">
				{{ $t('pages.resources.production_info') }}
			</div>
			<div class="content">
				<div class="block-table text-center">
					<div class="grid grid-cols-12">
						<div class="col-span-2 th">&nbsp;</div>
						<div class="col-span-2 th">{{ $t('pages.resources.per_hour') }}</div>
						<div class="col-span-2 th">{{ $t('pages.resources.per_day') }}</div>
						<div class="col-span-3 th">{{ $t('pages.resources.per_week') }}</div>
						<div class="col-span-3 th">{{ $t('pages.resources.per_month') }}</div>
					</div>
					<div class="grid grid-cols-12" v-for="res in page['resources']">
						<div class="col-span-2 th">
							{{ $t('resources.' + res) }}
						</div>
						<div class="col-span-2 th">
							<Colored :value="planet['resources'][res]['production']"/>
						</div>
						<div class="col-span-2 th">
							<Colored :value="planet['resources'][res]['production'] * 24"/>
						</div>
						<div class="col-span-3 th">
							<Colored :value="planet['resources'][res]['production'] * 24 * 7"/>
						</div>
						<div class="col-span-3 th">
							<Colored :value="planet['resources'][res]['production'] * 24 * 7 * 30"/>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="block">
			<div class="title">
				{{ $t('pages.resources.storage_status') }}
			</div>
			<div class="content">
				<div class="block-table text-center">
					<StorageRow v-for="res in page['resources']" :key="res" :resource="res"/>
				</div>
			</div>
		</div>

		<div v-if="!isVacation" class="block">
			<div class="title">
				{{ $t('pages.resources.production_management') }}
			</div>
			<div class="content">
				<div class="block-table text-center">
					<div class="grid grid-cols-2">
						<div class="th">
							<button @click.prevent="shutdown('Y')" class="button h-12">
								{{ $t('pages.resources.production_on') }}
							</button>
						</div>
						<div class="th">
							<button @click.prevent="shutdown('N')" class="button h-12">
								{{ $t('pages.resources.production_off') }}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>

		<BuyResources :data="page['buy_form']"/>
	</div>
</template>

<script setup>
	import ResourcesBar from '~/components/Page/Resources/Bar.vue';
	import ResourcesRow from '~/components/Page/Resources/Row.vue';
	import InfoPopup from '~/components/Page/Info/Popup.vue';
	import StorageRow from '~/components/Page/Resources/StorageRow.vue';
	import BuyResources from '~/components/Page/Resources/BuyResources.vue';
	import { storeToRefs } from 'pinia';
	import useStore from '~/store';
	import { definePageMeta, showError, useAsyncData, useHead, useRoute, useApiSubmit, useApiGet } from '#imports';

	definePageMeta({
		middleware: ['auth'],
	});

	useHead({
		title: 'Сырьё',
	});

	const store = useStore();

	const { data: page, error, refresh } = await useAsyncData(
		async () => await Promise.all([
			useApiGet('/resources'),
			store.loadState()
		]).then(([result]) => result),
		{ watch: [() => useRoute().query] }
	);

	if (error.value) {
		throw showError(error.value);
	}

	const { user, planet, isVacation } = storeToRefs(store);

	function shutdown(active) {
		useApiSubmit('/resources/shutdown', { active }, async () => {
			await store.loadState();
			await refresh();
		});
	}

	function updateState() {
		let state = {};

		page.value['items'].forEach((item) => state[item['id']] = item['factor']);

		useApiSubmit('/resources/state', { state }, async () => {
			await store.loadState();
			await refresh();
		});
	}
</script>