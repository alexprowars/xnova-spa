<template>
	<div class="block page-notes">
		<div class="title">
			Заметки
		</div>
		<div class="content">
			<div class="block-table">
				<div class="row">
					<div class="col-1 c"></div>
					<div class="col-3 c">Дата</div>
					<div class="col-8 c">Тема</div>
				</div>
				<div class="row" v-for="item in items">
					<div class="col-1 th">
						<input :value="item['id']" v-model="deleteItems" type="checkbox">
					</div>
					<div class="col-3 th">
						{{ $date(item['time'], 'DD MMM YYYY HH:mm') }}
					</div>
					<div class="col-8 th">
						<NuxtLinkLocale :to="'/notes/' + item['id']">
							<span :style="'color:'+item['color']">{{ item['title'] }}</span>
						</NuxtLinkLocale>
					</div>
				</div>
				<div class="row" v-if="items.length === 0">
					<div class="th col-12">Заметки отсутствуют</div>
				</div>
			</div>
			<div class="separator"></div>
			<div class="text-end">
				<button v-if="deleteItems.length > 0" class="negative" @click="deleteNotes">Удалить выбранное</button>
				<NuxtLinkLocale class="button" to="/notes/create">Создать новую заметку</NuxtLinkLocale>
			</div>
		</div>
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