<template>
	<div class="block">
		<div class="officiers-list">
			<div class="officiers-item">
				<div class="officiers-item-title">
					Доступно кредитов: {{ $formatNumber(user['credits']) }}
				</div>
				<div class="flex flex-wrap sm:flex-nowrap gap-2">
					<div class="hidden sm:block sm:basis-1/6 officiers-item-image">
						<img :src="'/images/officiers/bigcredits.jpg'" alt="">
					</div>
					<div class="basis-full sm:basis-5/6 text-left">
						Инженеры берут за свою работу только межгалактичесие кредиты. В зависимости от суммы контракта работают на вас в течении всего времени найма.

						<div class="flex my-4 gap-2">
							<div>
								<img src="/images/officiers/smalcredts.gif" alt="">
							</div>
							<div class="flex flex-col justify-center">
								<div class="text-sky-300">
									При помощи кредитов можно нанять инженеров
								</div>
							</div>
						</div>

						<NuxtLink to="/credits" class="button positive">
							Получить кредиты
						</NuxtLink>
					</div>
				</div>
			</div>
			<Row v-for="item in items" :key="item['id']" :item="item"/>
		</div>
	</div>
</template>

<script setup>
	import Row from '~/components/Page/Officier/Row.vue';
	import { definePageMeta, showError, useApiGet, useAsyncData, useHead, useRoute } from '#imports';
	import useStore from '~/store';
	import { storeToRefs } from 'pinia';

	definePageMeta({
		middleware: ['auth'],
		view: {
			resources: false,
		}
	});

	useHead({
		title: 'Офицеры',
	});

	const { data: items, error } = await useAsyncData(
		async () => await useApiGet('/officiers'),
		{ watch: [() => useRoute().query] });

	if (error.value) {
		throw showError(error.value);
	}

	const { user } = storeToRefs(useStore());
</script>