<template>
	<div class="page-officiers block">
		<div class="title">
			Доступно кредитов: {{ $number(user['credits']) }}
		</div>
		<div class="content container-fluid">
			<div class="row">
				<div class="d-none d-sm-block col-sm-2 text-center">
					<img :src="'/images/officiers/bigcredits.jpg'" alt="">
				</div>
				<div class="col-12 col-sm-7 text-start">
					Кредиты (<NuxtLinkLocale to="/credits/"><span class="positive">Получить</span></NuxtLinkLocale>)
					<br><br>
					Инженеры берут за свою работу только межгалактичесие кредиты. В зависимости от суммы контракта работают на вас в течении всего времени найма.
					<table class="powers">
						<tbody>
						<tr>
							<td class="padding-0">
								<img src="/images/officiers/smalcredts.gif" alt="">
							</td>
							<td>
								При помощи кредитов можно нанять инженеров
							</td>
						</tr>
						</tbody>
					</table>
				</div>
				<div class="col-sm-3 d-none d-sm-block text-center">
					<NuxtLinkLocale to="/credits/" class="button positive">
						Получить кредиты
					</NuxtLinkLocale>
				</div>
			</div>
			<Row v-for="item in items" :key="item['id']" :item="item"/>
		</div>
	</div>
</template>

<script setup>
	import Row from '~/components/Page/Officier/Row.vue';
	import { definePageMeta, showError, useAsyncData, useHead, useRoute } from '#imports';
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

	const store = useStore();

	const { data: items, error } = await useAsyncData('page-officiers',
		async () => await store.loadPage(),
		{ watch: [() => useRoute().query] });

	if (error.value) {
		throw showError(error.value);
	}

	const { user } = storeToRefs(store);
</script>