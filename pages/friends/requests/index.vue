<template>
	<div class="friends page-friends-request">
		<div class="block">
			<div class="title text-center">
				{{ isMy ? 'Мои запросы' : 'Другие запросы' }}
			</div>
			<div class="content border-0">
				<div class="block-table">
					<div class="row">
						<div class="col c">Имя</div>
						<div class="col c">Альянс</div>
						<div class="col-2 c">Координаты</div>
						<div class="col c">Текст запроса</div>
						<div class="col c">&nbsp;</div>
					</div>
					<RequestRow v-for="item in items" :key="item['id']" :item="item" :is-my="isMy"/>
					<div v-if="items.length === 0" class="row">
						<div class="col th">Нет запросов</div>
					</div>
				</div>
			</div>
		</div>
		<div class="separator"></div>
		<div class="text-end">
			<div class="row">
				<div class="col">
					<NuxtLink to="/friends" class="button">Вернуться назад</NuxtLink>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import RequestRow from '~/components/Page/Friends/RequestRow.vue';
	import { definePageMeta, showError, useAsyncData, useRoute, useApiGet } from '#imports';
	import { computed } from 'vue';

	definePageMeta({
		middleware: ['auth'],
	});

	const route = useRoute();

	const isMy = computed(() => route.path.indexOf('/my') !== -1);

	const { data: items, error } = await useAsyncData(async () => {
		return await useApiGet('/friends/requests', { my: isMy.value ? 'Y' : 'N' });
	}, { watch: [() => useRoute().query] });

	if (error.value) {
		throw showError(error.value);
	}
</script>