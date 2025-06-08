<template>
	<div class="block text-center">
		<div class="title">Чёрный список</div>
		<div class="content !border-0">
			<div class="block-table">
				<div v-if="items.length === 0" class="grid">
					<div class="b">Нет заблокированных игроков</div>
				</div>
				<template v-else>
					<div class="grid grid-cols-5">
						<div class="th" width="110">Игрок</div>
						<div class="th" width="130">Начало блокировки</div>
						<div class="th" width="130">Конец блокировки</div>
						<div class="th" width="306">Причина</div>
						<div class="th" width="100">Модератор</div>
					</div>
					<div v-for="item in items" class="grid grid-cols-5">
						<div class="b">
							<NuxtLink :to="'/players/' + item['user']['id']">
								{{ item['user']['name'] }}
							</NuxtLink>
						</div>
						<div class="b">
							<div>{{ $formatDate(item['date'], 'DD MMM YYYY') }}</div>
							<div>{{ $formatDate(item['date'], 'HH:mm') }}</div>
						</div>
						<div class="b">
							<div>{{ $formatDate(item['date_end'], 'DD MMM YYYY') }}</div>
							<div>{{ $formatDate(item['date_end'], 'HH:mm:ss') }}</div>
						</div>
						<div class="b">{{ item['reason'] }}</div>
						<div class="b">
							<NuxtLink :to="'/players/' + item['moderator']['id']">
								{{ item['moderator']['name'] }}
							</NuxtLink>
						</div>
					</div>
					<div class="grid">
						<div class="b">Всего {{ items.length }} аккаунтов заблокировано</div>
					</div>
				</template>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { definePageMeta, showError, useAsyncData, useHead, useRoute, useApiGet } from '#imports';

	definePageMeta({
		view: {
			resources: false,
		}
	});

	useHead({
		title: 'Список заблокированных игроков',
	});

	const { data: items, error } = await useAsyncData(async () => {
		return await useApiGet('/blocked');
	}, { watch: [() => useRoute().query] });

	if (error.value) {
		throw showError(error.value);
	}
</script>