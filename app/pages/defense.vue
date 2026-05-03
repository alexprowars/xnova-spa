<template>
	<div class="page-building page-building-unit">
		<div class="block">
			<div class="content page-building-items">
				<div class="buldings">
					<div ref="activeRef" class="buldings-header" :style="{ backgroundImage: 'url(\'/images/defense-bg.webp\')' }">
						<div class="buldings-header-main">
							<span class="title">
								Оборона / {{ planet['name'] }}
							</span>
							<NuxtLink to="/fleet" class="button">
								Флот
							</NuxtLink>
						</div>
						<UnitActive v-if="activeItem" :item="activeItem" @close="activeElement = null" @build="buildAction"/>
					</div>
					<div class="buldings-list">
						<UnitItem v-for="(item, i) in items"
							:class="{ active: activeElement === item['id'] }"
							:key="i"
							:item="item"
							v-model="activeElement"
						/>
					</div>
				</div>
			</div>
		</div>

		<UnitQueue :queue="queueByType('unit')"/>
	</div>
</template>

<script setup>
	import UnitQueue from '~/components/Page/Buildings/UnitQueue.vue'
	import { definePageMeta, showError, useAsyncData, useHead, refreshNuxtData, useApiSubmit, useApiGet } from '#imports';
	import useStore from '~/store';
	import { ref } from 'vue';
	import { storeToRefs } from 'pinia';
	import UnitItem from '~/components/Page/Buildings/UnitItem.vue';
	import UnitActive from '~/components/Page/Buildings/UnitActive.vue';

	definePageMeta({
		middleware: ['auth'],
	});

	useHead({
		title: 'Оборона',
	});

	const store = useStore();

	const { data: items, error } = await useAsyncData(
		async () => await Promise.all([
			useApiGet('/defense'),
			store.loadState()
		]).then(([result]) => result)
	);

	if (error.value) {
		throw showError({ data: { error: error.value } });
	}

	const { planet, queueByType } = storeToRefs(store);

	const activeElement = ref(null);
	const activeItem = computed(() => {
		return items.value.filter((item) => item.id === activeElement.value)[0] || null;
	});

	async function buildAction (id, count) {
		let data = {
			element: {}
		};
		data.element[id] = count;

		await useApiSubmit('/defense/queue', data);
		await refreshNuxtData();
	}
</script>