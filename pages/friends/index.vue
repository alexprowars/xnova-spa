<template>
	<div class="block">
		<div class="title">
			Список друзей
		</div>
		<div class="content">
			<div class="block-table text-center">
				<div class="grid grid-cols-5">
					<div class="c">Имя</div>
					<div class="c">Альянс</div>
					<div class="c">Координаты</div>
					<div class="c">Онлайн</div>
					<div class="c">&nbsp;</div>
				</div>
				<FriendRow v-for="item in items" :key="item['id']" :item="item"/>
				<div v-if="items.length === 0" class="grid">
					<div class="th">Нет друзей</div>
				</div>
			</div>
		</div>
	</div>
	<div class="mt-2">
		<NuxtLink to="/friends/requests" class="button">Запросы</NuxtLink>
		<NuxtLink to="/friends/requests/my" class="button">Мои запросы</NuxtLink>
	</div>
</template>

<script setup>
	import FriendRow from '~/components/Page/Friends/FriendRow.vue';
	import { definePageMeta, showError, useApiGet, useAsyncData, useHead, useRoute } from '#imports';

	definePageMeta({
		middleware: ['auth'],
	});

	useHead({
		title: 'Список друзей',
	});

	const { data: items, error } = await useAsyncData(async () => {
		return await useApiGet('/friends');
	}, { watch: [() => useRoute().query] });

	if (error.value) {
		throw showError(error.value);
	}
</script>