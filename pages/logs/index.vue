<template>
	<div class="block-table container-fluid">
		<div class="row">
			<div class="col-12 th">Логовница</div>
		</div>
		<div class="row">
			<div class="col-12 c">Ваши сохранённые логи</div>
		</div>
		<div class="row">
			<div class="col-1 c">№</div>
			<div class="col c">Название</div>
			<div class="col-2 c">Ссылка</div>
			<div class="col-2 c">Управление</div>
		</div>
		<ItemRow v-for="row in items" :key="row['id']" :item="row"/>
		<div v-if="items.length === 0" class="row text-center">
			<div class="col b text-center">У вас пока нет сохранённых логов.</div>
		</div>
		<div class="row">
			<div class="col c">
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