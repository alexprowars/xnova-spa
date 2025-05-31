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
						<span class="positive">{{ fieldsEmpty }}</span>
						{{ $morph(fieldsEmpty, 'свободное', 'свободных', 'свободных') }}
						{{ $morph(fieldsEmpty, 'поле', 'поля', 'полей') }}
					</div>
				</div>
			</div>

			<BuildQueue :queue="queueByType('build')"/>

			<div class="content page-building-items">
				<div class="row">
					<BuildRow v-for="(item, i) in items" :key="i" :item="item"/>
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
	import { definePageMeta, showError, useAsyncData, useHead, useRoute, useApiGet } from '#imports';

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

	const { data: items, error } = await useAsyncData('page-buildings',
		async () => await Promise.all([
			useApiGet('/buildings'),
			store.loadState()
		]).then(([result]) => result),
		{ watch: [() => useRoute().query] }
	);

	if (error.value) {
		throw showError(error.value);
	}

	const { planet, queueByType, fieldsEmpty } = storeToRefs(store);
</script>