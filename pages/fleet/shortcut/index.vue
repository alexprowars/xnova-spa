<template>
	<div class="page-fleet-shortcut">
		<div class="block">
			<div class="title">
				Быстрые ссылки
			</div>
			<div class="content border-0">
				<div class="block-table">
					<div class="row">
						<div v-for="(item, i) in page['items']" class="col-6 th">
							<NuxtLinkLocale :to="'/fleet/shortcut/'+item['id']+'/'">{{ item['name'] }} [{{ item['galaxy'] }}:{{ item['system'] }}:{{ item['planet'] }}] {{ $t('planet_type.' + item['planet_type']) }}</NuxtLinkLocale>
						</div>
						<div v-if="page['items'].length === 0" class="col th">Список ссылок пуст</div>
					</div>
					<div class="row">
						<div class="col c">
							<NuxtLinkLocale to="/fleet/shortcut/add/" class="button">Добавить</NuxtLinkLocale>
							<NuxtLinkLocale to="/fleet/" class="button">Назад</NuxtLinkLocale>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { definePageMeta, showError, useAsyncData, useHead, useRoute } from '#imports';
	import useStore from '~/store';
	import { watch } from 'vue';

	definePageMeta({
		middleware: ['auth'],
	});

	useHead({
		title: 'Закладки',
	});

	const route = useRoute();

	const { data: page, error, refresh } = await useAsyncData(async () => {
		return await useStore().loadPage();
	});

	watch(() => route.query, () => refresh());

	if (error.value) {
		throw showError(error.value);
	}
</script>