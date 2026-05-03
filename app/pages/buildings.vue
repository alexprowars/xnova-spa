<template>
	<div class="page-building page-building-build">
		<div class="block">
			<BuildQueue :queue="queueByType('build')"/>

			<div class="buldings">
				<div class="buldings-header" :style="{ backgroundImage: 'url(\'/images/buildings-bg.webp\')' }">
					<div class="buldings-header-main">
							<span class="title">
								Постройки / {{ planet['name'] }}
							</span>

						<div class="flex flex-col items-end gap-2 bg-black/80 p-3">
							<i18n-t keypath="pages.building.fields_used" tag="div" scope="global">
								<template v-slot:used>
									<span class="positive">{{ planet['field_used'] }}</span>
								</template><template v-slot:max>
									<span class="positive">{{ planet['field_max'] }}</span>
								</template>
							</i18n-t>
							<div>
								{{ $t('pages.building.fields_left') }}
								<span class="positive">{{ fieldsEmpty }}</span> {{ $t('pages.building.fields_left_2', fieldsEmpty) }}
							</div>
						</div>
						<NuxtLink to="/resources" class="button">
							Настройки ресурсов
						</NuxtLink>
					</div>
					<BuildActive v-if="activeItem" :item="activeItem" @close="selectAction(null)" @build="addAction"/>
				</div>
				<div class="buldings-list hud-panel hud-corner">
					<BuildItem v-for="(item, i) in items" :key="i"
						:class="{ active: activeElement === item['id'] }"
						:item="item"
						@select="selectAction(item['id'])"
						@build="addAction"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import BuildQueue from '~/components/Page/Buildings/BuildQueue.vue';
	import { storeToRefs } from 'pinia';
	import useStore from '~/store';
	import { definePageMeta, showError, useAsyncData, useHead, useApiGet, useApiPost, refreshNuxtData } from '#imports';
	import BuildItem from '~/components/Page/Buildings/BuildItem.vue';
	import BuildActive from '~/components/Page/Buildings/BuildActive.vue';
	import { ref } from 'vue';

	definePageMeta({
		middleware: ['auth'],
	});

	useHead({
		title: 'Постройки',
		bodyAttrs: {
			class: 'set_buildings',
		}
	});

	const store = useStore();

	const { data: items, error } = await useAsyncData(
		async () => await Promise.all([
			useApiGet('/buildings'),
			store.loadState()
		]).then(([result]) => result)
	);

	if (error.value) {
		throw showError({ data: { error: error.value } });
	}

	const { planet, queueByType, fieldsEmpty } = storeToRefs(store);
	const activeElement = ref(null);
	const activeItem = computed(() => {
		return items.value.filter((item) => item.id === activeElement.value)[0] || null;
	});

	function selectAction(id) {
		if (activeElement.value !== id) {
			activeElement.value = id;
		} else {
			activeElement.value = null;
		}
	}

	async function addAction (id) {
		await useApiPost('/buildings/build/insert', {
			element: id
		});

		await refreshNuxtData();
	}
</script>