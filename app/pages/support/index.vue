<template>
	<div class="page-support">
		<div class="block">
			<div class="title text-center">
				Служба техподдержки
			</div>
			<div class="content">
				<div class="block-table">
					<div v-if="!items.length" class="grid">
						<div class="th">Нет запросов в техподдержку</div>
					</div>
					<div v-else class="grid grid-cols-12">
						<div class="col-span-1 th">ID</div>
						<div class="col-span-6 th">Тема</div>
						<div class="col-span-2 th">Статус</div>
						<div class="col-span-3 th">Дата</div>
					</div>
					<ListItem v-for="item in items" :key="item['id']" :item="item"/>
				</div>
			</div>
		</div>

		<div v-if="!request">
			<div class="separator"></div>
			<div class="grid">
				<div class="text-right">
					<button @click="newRequest">Создать запрос</button>
				</div>
			</div>
		</div>
		<CreateTicket v-else @close="request = false"/>
	</div>
</template>

<script setup>
	import CreateTicket from '~/components/Page/Support/Create.vue';
	import { definePageMeta, showError, useApiGet, useAsyncData, useHead } from '#imports';
	import { ref } from 'vue';
	import ListItem from '~/components/Page/Support/ListItem.vue';

	definePageMeta({
		middleware: ['auth'],
		view: {
			resources: false,
		}
	});

	useHead({
		title: 'Техподдержка',
	});

	const { data: items, error } = await useAsyncData(
		async () => await useApiGet('/support')
	);

	if (error.value) {
		throw showError(error.value);
	}

	const request = ref(false);

	function newRequest () {
		request.value = !request.value
	}
</script>