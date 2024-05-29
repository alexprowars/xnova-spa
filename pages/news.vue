<template>
	<div class="block">
		<div class="title">История изменений</div>
		<div class="content border-0">
			<div class="block-table">
				<div class="row">
					<div class="col-2 c">Версия</div>
					<div class="col-10 c">Описание</div>
				</div>
				<div v-for="item in page['items']" class="row">
					<div class="col-2 th" v-html="item['title']"></div>
					<div class="col-10 text-start b" v-html="item['text']"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { definePageMeta, showError, useAsyncData, useHead, useRoute } from '#imports';
	import useStore from '~/store';

	definePageMeta({
		middleware: ['auth'],
		view: {
			resources: false,
		}
	});

	useHead({
		title: 'Новости',
	});

	const { data: page, error } = await useAsyncData(async () => {
		return await useStore().loadPage();
	}, { watch: [() => useRoute().query] });

	if (error.value) {
		throw showError(error.value);
	}
</script>