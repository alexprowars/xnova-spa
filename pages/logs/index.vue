<template>
	<div class="block-table container-fluid">
		<div class="grid">
			<div class="th">Логовница</div>
		</div>
		<div class="grid">
			<div class="c">Ваши сохранённые логи</div>
		</div>
		<div class="grid grid-cols-12">
			<div class="col-span-1 c">№</div>
			<div class="col-span-7 c">Название</div>
			<div class="col-span-2 c">Ссылка</div>
			<div class="col-span-2 c">Управление</div>
		</div>
		<ItemRow v-for="row in items" :key="row['id']" :item="row"/>
		<div v-if="items.length === 0" class="grid">
			<div class="b text-center">У вас пока нет сохранённых логов.</div>
		</div>
		<div class="grid">
			<div class="c">
				<NuxtLink to="/logs/create" class="button">Создать новый лог боя</NuxtLink>
			</div>
		</div>
	</div>
</template>

<script setup>
	import ItemRow from '~/components/Page/Logs/ItemRow.vue';
	import { definePageMeta, showError, useApiGet, useAsyncData, useHead, useRoute } from '#imports';

	definePageMeta({
		middleware: ['auth'],
		view: {
			resources: false,
		}
	});

	useHead({
		title: 'Логовница',
	});

	const { data: items, error } = await useAsyncData(async () => {
		return await useApiGet('/logs');
	}, { watch: [() => useRoute().query] });

	if (error.value) {
		throw showError(error.value);
	}
</script>