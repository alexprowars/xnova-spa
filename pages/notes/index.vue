<template>
	<div class="block page-notes">
		<div class="title">
			Заметки
		</div>
		<div class="content">
			<RouterForm action="/notes/">
				<div class="block-table">
					<div class="row">
						<div class="col-1 c"></div>
						<div class="col-3 c">Дата</div>
						<div class="col-8 c">Тема</div>
					</div>
					<div class="row" v-for="item in page['items']">
						<div class="col-1 th">
							<input name="delete[]" :value="item['id']" v-model="deleteItems" type="checkbox">
						</div>
						<div class="col-3 th">
							{{ item['time'] }}
						</div>
						<div class="col-8 th">
							<NuxtLinkLocale :to="'/notes/edit/'+item['id']+'/'">
								<span :style="'color:'+item['color']">{{ item['title'] }}</span>
							</NuxtLinkLocale>
						</div>
					</div>
					<div class="row" v-if="page['items'].length === 0">
						<div class="th col-12">Заметки отсутствуют</div>
					</div>
				</div>
				<div class="separator"></div>
				<div class="text-end">
					<input v-if="deleteItems.length > 0" class="negative" value="Удалить выбранное" type="submit">
					<NuxtLinkLocale class="button" to="/notes/new/">Создать новую заметку</NuxtLinkLocale>
				</div>
			</RouterForm>
		</div>
	</div>
</template>

<script setup>
	import { definePageMeta, showError, useAsyncData, useHead, useRoute } from '#imports';
	import useStore from '~/store';
	import { ref, watch } from 'vue';

	definePageMeta({
		middleware: ['auth'],
	});

	useHead({
		title: 'Заметки',
	});

	const route = useRoute();

	const { data: page, error, refresh } = await useAsyncData(async () => {
		return await useStore().loadPage();
	});

	watch(() => route.query, () => refresh());

	if (error.value) {
		throw showError(error.value);
	}

	const deleteItems = ref([]);
</script>