<template>
	<div class="block">
		<div class="title text-center">
			Список друзей
		</div>
		<div class="content border-0">
			<div class="block-table">
				<div class="row">
					<div class="col text-center j">
						<NuxtLink to="/friends/requests">Запросы</NuxtLink>
					</div>
				</div>
				<div class="row">
					<div class="col text-center j">
						<NuxtLink to="/friends/requests/my">Мои запросы</NuxtLink>
					</div>
				</div>
				<div class="row">
					<div class="col c">Имя</div>
					<div class="col c">Альянс</div>
					<div class="col c">Координаты</div>
					<div class="col c">Онлайн</div>
					<div class="col c">&nbsp;</div>
				</div>
				<FriendRow v-for="item in items" :key="item['id']" :item="item"/>
				<div v-if="items.length === 0" class="row">
					<div class="col th">Нет друзей</div>
				</div>
			</div>
		</div>
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