<template>
	<div class="block-table">
		<div class="row">
			<div class="col th">Обновлено в {{ dayjs(page['update']).tz().format('HH:mm:ss DD MMM YYYY') }}</div>
		</div>
		<template v-for="(list, group) in page['items']">
			<div class="row">
				<div class="col c">{{ group }}</div>
				<div class="col c">Игрок</div>
				<div class="col-2 c">Уровень</div>
			</div>
			<div v-for="(info, building) in list" class="row">
				<div class="col th">{{ building }}</div>
				<div class="col th">{{ info['winner'] }}</div>
				<div class="col-2 th">{{ info['count'] }}</div>
			</div>
		</template>
	</div>
</template>

<script setup>
	import { definePageMeta, showError, useAsyncData, useHead, useRoute } from '#imports';
	import useStore from '~/store';
	import dayjs from 'dayjs';

	definePageMeta({
		view: {
			resources: false,
		}
	});

	useHead({
		title: 'Таблица рекордов',
	});

	const { data: page, error } = await useAsyncData(async () => {
		return await useStore().loadPage();
	}, { watch: [() => useRoute().query] });

	if (error.value) {
		throw showError(error.value);
	}
</script>