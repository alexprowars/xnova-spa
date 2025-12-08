<template>
	<div class="combar-report text-center">
		<div v-html="data['report']['html']"></div>
		Ссылка на результат симуляции
		<div class="my-4 text-center">
			<input type="text" :value="'https://' + runtimeConfig.public.baseUrl + '/sim/report/' + data['uuid']" class="!w-[500px] !p-4">
		</div>
		<div v-if="data['statistics']" class="my-4">
			<div class="mb-2">Результаты потерь после 50 симуляций:</div>
			<div class="block-table text-center w-max mx-auto">
				<div class="grid grid-cols-12">
					<div class="col-span-4 th">№</div>
					<div class="col-span-4 th">Потери атакующего</div>
					<div class="col-span-4 th">Потери защитника</div>
				</div>
				<div v-for="(s, i) in data['statistics']" class="grid grid-cols-12">
					<div class="col-span-4 th">{{ (i + 1) }}</div>
					<div class="col-span-4 th">{{ $formatNumber(s['att']) }}</div>
					<div class="col-span-4 th">{{ $formatNumber(s['def']) }}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { definePageMeta, showError, useAsyncData, useHead, useRoute, useApiPost } from '#imports';

	definePageMeta({
		layout: 'empty',
	});

	useHead({
		title: 'Симуляция',
	});

	const runtimeConfig = useRuntimeConfig();

	const { data, error } = await useAsyncData(
		async () => await useApiPost('/sim/report', {
			...useRoute().query
		}),
		{ watch: [() => useRoute().query] }
	);

	if (error.value) {
		throw showError(error.value);
	}
</script>