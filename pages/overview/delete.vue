<template>
	<div class="page-overview-delete">
		<div class="block">
			<div class="title">Система безопасности</div>
			<div class="content border-0">
				<RouterForm action="/overview/delete/">
					<input type="hidden" name="id" :value="page['id']">
					<input type="hidden" name="password" :value="page['number_check']">
					<div class="block-table">
						<div class="row">
							<div class="col th">
								Подтвердите удаление планеты {{ page['galaxy'] }}:{{ page['system'] }}:{{ page['planet'] }} вводом правильного ответа
							</div>
						</div>
						<div class="row">
							<div class="col th">{{ page['number_1'] }} + {{ page['number_2'] }} * {{ page['number_3'] }} = ???</div>
							<div class="col th"><input type="text" name="pw"></div>
							<div class="col th"><button type="submit" name="action">Удалить колонию</button></div>
						</div>
					</div>
				</RouterForm>
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
		title: 'Покинуть колонию',
	});

	const { data: page, error } = await useAsyncData(async () => {
		return await useStore().loadPage();
	}, { watch: [() => useRoute().query] });

	if (error.value) {
		throw showError(error.value);
	}
</script>