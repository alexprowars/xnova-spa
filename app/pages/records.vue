<template>
	<div class="block">
		<div class="title">Рекорды</div>
		<div class="content">
			<div class="block-table">
				<div class="grid">
					<div class="th text-center">Обновлено в {{ $formatDate(page['update'], 'HH:mm:ss DD MMM YYYY') }}</div>
				</div>
				<template v-for="(list, group) in page['items']">
					<div class="grid grid-cols-12">
						<div class="col-span-5 c">{{ group }}</div>
						<div class="col-span-5 c text-center">Игрок</div>
						<div class="col-span-2 c text-center">Уровень</div>
					</div>
					<div v-for="(info, building) in list" class="grid grid-cols-12">
						<div class="col-span-5 th text-left">{{ building }}</div>
						<div class="col-span-5 th text-center">{{ info['winner'] }}</div>
						<div class="col-span-2 th text-center">{{ info['count'] }}</div>
					</div>
				</template>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { definePageMeta, showError, useApiGet, useAsyncData, useHead, useRoute } from '#imports';

	definePageMeta({
		view: {
			resources: false,
		}
	});

	useHead({
		title: 'Таблица рекордов',
	});

	const { data: page, error } = await useAsyncData(async () => {
		return await useApiGet('/records');
	}, { watch: [() => useRoute().query] });

	if (error.value) {
		throw showError(error.value);
	}
</script>