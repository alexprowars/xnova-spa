<template>
	<div class="page-building page-building-tech">
		<div class="block">
			<div class="content page-building-items">
				<div class="buldings">
					<div ref="activeRef" class="buldings-header" :style="{ backgroundImage: 'url(\'/images/research-bg.webp\')' }">
						<div class="buldings-header-main">
							<span class="title">
								Исследования / {{ planet['name'] }}
							</span>
							<NuxtLink to="/tech" class="button">
								Технологии
							</NuxtLink>
						</div>
						<TechActive v-if="activeItem" :item="activeItem" @close="activeElement = null" @build="addAction"/>
					</div>
					<div class="buldings-list">
						<TechItem v-for="(item, i) in items" :key="i" :item="item" v-model="activeElement" @build="addAction" :class="{ active: activeElement === item['id'] }"/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { definePageMeta, refreshNuxtData, showError, useApiGet, useApiPost, useAsyncData, useHead, useAnimateScroll } from '#imports';
	import useStore from '~/store';
	import BuildItem from '~/components/Page/Buildings/BuildItem.vue';
	import { ref, watch, useTemplateRef } from 'vue';
	import { storeToRefs } from 'pinia';
	import TechActive from '~/components/Page/Buildings/TechActive.vue';
	import TechItem from '~/components/Page/Buildings/TechItem.vue';

	definePageMeta({
		middleware: ['auth'],
	});

	useHead({
		title: 'Исследования',
	});

	const store = useStore();

	const { data: items, error } = await useAsyncData(
		async () => await Promise.all([
			useApiGet('/research'),
			store.loadState()
		]).then(([result]) => result)
	);

	if (error.value) {
		throw showError({ data: { error: error.value } });
	}

	const activeRef = useTemplateRef('activeRef');
	const { planet } = storeToRefs(store);
	const activeElement = ref(null);
	const activeItem = computed(() => {
		return items.value.filter((item) => item.id === activeElement.value)[0] || null;
	});

	watch(activeElement, (value) => {
		if (!value) {
			return;
		}

		useAnimateScroll(activeRef.value, 500, { padding: -50 });
	});

	async function addAction (id) {
		await useApiPost('/research/search', {
			element: id,
		});

		await refreshNuxtData();
	}
</script>