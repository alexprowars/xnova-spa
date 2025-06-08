<template>
	<div class="page-fleet-shortcut">
		<div class="block">
			<div class="title">
				Быстрые ссылки
			</div>
			<div class="content !border-0">
				<div class="block-table">
					<div class="grid grid-cols-2">
						<div v-for="item in items" class="th">
							<NuxtLink :to="'/fleet/shortcut/' + item['id']">
								{{ item['name'] }} [{{ item['galaxy'] }}:{{ item['system'] }}:{{ item['planet'] }}] {{ $t('planet_type.' + item['planet_type']) }}
							</NuxtLink>
						</div>
						<div v-if="items.length === 0" class="col-span-2 th">Список ссылок пуст</div>
					</div>
					<div class="grid">
						<div class="c">
							<NuxtLink to="/fleet/shortcut/create" class="button">Добавить</NuxtLink>
							<NuxtLink to="/fleet" class="button">Назад</NuxtLink>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { definePageMeta, showError, useApiGet, useAsyncData, useHead, useRoute } from '#imports';

	definePageMeta({
		middleware: ['auth'],
	});

	useHead({
		title: 'Закладки',
	});

	const { data: items, error } = await useAsyncData(async () => {
		return await useApiGet('/fleet/shortcut');
	}, { watch: [() => useRoute().query] });

	if (error.value) {
		throw showError(error.value);
	}
</script>