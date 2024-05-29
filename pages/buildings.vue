<template>
	<div class="page-building page-building-build">
		<div class="block">
			<div class="title">
				<div class="row">
					<div class="col-12 col-sm-6">
						Занято полей
						<span class="positive">{{ planet['field_used'] }}</span> из <span class="negative">{{ planet['field_max'] }}</span>
					</div>
					<div class="text-sm-end col-12 col-sm-6">
						Осталось
						<span class="positive">{{ fields_empty }}</span>
						{{ $morph(fields_empty, 'свободное', 'свободных', 'свободных') }}
						{{ $morph(fields_empty, 'поле', 'поля', 'полей') }}
					</div>
				</div>
			</div>

			<BuildQueue v-if="page.queue && page.queue.length" :queue="page.queue"/>

			<div class="content page-building-items">
				<div class="row">
					<BuildRow v-for="(item, i) in page.items" :key="i" :item="item"/>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import BuildRow from '~/components/Page/Buildings/BuildRow.vue';
	import BuildQueue from '~/components/Page/Buildings/BuildQueue.vue';
	import { storeToRefs } from 'pinia';
	import useStore from '~/store';
	import { definePageMeta, showError, useAsyncData, useHead, useRoute } from '#imports';
	import { computed } from 'vue';

	definePageMeta({
		middleware: ['auth'],
	});

	useHead({
		title: 'Постройки',
		bodyAttrs: {
			class: 'set_buildings',
		}
	});

	const { data: page, error } = await useAsyncData('page-buildings', async () => {
		return await useStore().loadPage();
	}, { watch: [() => useRoute().query] });

	if (error.value) {
		throw showError(error.value);
	}

	const { planet } = storeToRefs(useStore());

	const fields_empty = computed(() => {
		return planet.value['field_max'] - planet.value['field_used'] - page.value.queue.length
	});

	defineExpose({
		page,
		fields_empty
	})
</script>