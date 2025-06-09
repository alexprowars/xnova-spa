<template>
	<div class="page-building page-building-build">
		<div class="block">
			<div class="title">
				<div class="flex flex-col sm:flex-row justify-between gap-2">
					<i18n-t keypath="building.fields_used" tag="div" scope="global">
						<template v-slot:used>
							<span class="positive">{{ planet['field_used'] }}</span>
						</template><template v-slot:max>
							<span class="positive">{{ planet['field_max'] }}</span>
						</template>
					</i18n-t>
					<div>
						{{ $t('building.fields_left') }}
						<span class="positive">{{ fieldsEmpty }}</span> {{ $t('building.fields_left_2', fieldsEmpty) }}
					</div>
				</div>
			</div>

			<BuildQueue :queue="queueByType('build')"/>

			<div class="content page-building-items">
				<div class="grid grid-cols-1 sm:grid-cols-2 gap-1">
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

	const { data: items, error } = await useAsyncData(
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