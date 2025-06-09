<template>
	<div class="block page-notes">
		<div class="title">
			Заметки
		</div>
		<div class="content">
			<div class="block-table">
				<div class="grid grid-cols-12">
					<div class="col-span-1 c"></div>
					<div class="col-span-3 c">Дата</div>
					<div class="col-span-8 c">Тема</div>
				</div>
				<div class="grid grid-cols-12" v-for="item in items">
					<div class="col-span-1 th text-center">
						<input :value="item['id']" v-model="deleteItems" type="checkbox">
					</div>
					<div class="col-span-3 th text-center">
						{{ $formatDate(item['time'], 'DD MMM YYYY HH:mm') }}
					</div>
					<div class="col-span-8 th">
						<NuxtLink :to="'/notes/' + item['id']">
							<span :style="'color:'+item['color']">{{ item['title'] }}</span>
						</NuxtLink>
					</div>
				</div>
				<div class="grid" v-if="items.length === 0">
					<div class="th">Заметки отсутствуют</div>
				</div>
			</div>
		</div>
	</div>
	<div class="mt-2">
		<button v-if="deleteItems.length > 0" class="negative" @click="deleteNotes">Удалить выбранное</button>
		<NuxtLink class="button" to="/notes/create">Создать новую заметку</NuxtLink>
	</div>
</template>

<script setup>
	import { definePageMeta, showError, useApiGet, useApiSubmit, useAsyncData, useHead, useRoute, useSuccessNotification } from '#imports';
	import { ref } from 'vue';

	definePageMeta({
		middleware: ['auth'],
		view: {
			resources: false,
		}
	});

	useHead({
		title: 'Заметки',
	});

	const { data: items, error, refresh } = await useAsyncData(
		async () => await useApiGet('/notes'),
		{ watch: [() => useRoute().query] }
	);

	if (error.value) {
		throw showError(error.value);
	}

	const deleteItems = ref([]);

	function deleteNotes() {
		useApiSubmit('/notes', {
			_method: 'DELETE',
			id: deleteItems.value,
		}, () => {
			useSuccessNotification('Заметки удалены');

			deleteItems.value = [];

			refresh();
		});
	}
</script>