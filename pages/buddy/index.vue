<template>
	<div class="page-buddy">
		<div class="block">
			<div class="title text-center">
				Список друзей
			</div>
			<div class="content border-0">
				<div class="block-table">
					<div class="row">
						<div class="col text-center j">
							<NuxtLinkLocale to="/buddy/requests/">Запросы</NuxtLinkLocale>
						</div>
					</div>
					<div class="row">
						<div class="col text-center j">
							<NuxtLinkLocale to="/buddy/requests/my/">Мои запросы</NuxtLinkLocale>
						</div>
					</div>
					<div class="row">
						<div class="col-1 c">&nbsp;</div>
						<div class="col c">Имя</div>
						<div class="col c">Альянс</div>
						<div class="col c">Координаты</div>
						<div class="col c">Онлайн</div>
						<div class="col c">&nbsp;</div>
					</div>
					<div v-for="(item, i) in page['items']" class="row">
						<div class="col-1 th middle">
							{{ i + 1 }}
						</div>
						<div class="col th middle">
							<NuxtLinkLocale :to="'/messages/write/'+item['user']['id']+'/'">{{ item['user']['name'] }}</NuxtLinkLocale>
						</div>
						<div class="col th middle">
							<NuxtLinkLocale v-if="item['user']['alliance']['id'] > 0" :to="'/alliance/info/'+item['user']['alliance']['id']+'/'">{{ item['user']['alliance']['name'] }}</NuxtLinkLocale>
							<template v-else>-</template>
						</div>
						<div class="col th middle">
							<NuxtLinkLocale :to="'/galaxy/?galaxy='+item['user']['galaxy']+'&system='+item['user']['system']">{{ item['user']['galaxy'] }}:{{ item['user']['system'] }}:{{ item['user']['planet'] }}</NuxtLinkLocale>
						</div>
						<div class="col th middle">
							<span v-if="item['online'] < 10" class="positive">
								В игре
							</span>
							<span v-if="item['online'] < 20" class="neutral">
								15 мин.
							</span>
							<span v-else class="negative">
								Не в игре
							</span>
						</div>
						<div class="col th middle">
							<button :to="'/buddy/delete/'+item['id']+'/'" @click.prevent="deleteItem(item['id'])" class="button text-danger">Удалить</button>
						</div>
					</div>
					<div v-if="page['items'].length === 0" class="row">
						<div class="col th">Нет друзей</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { definePageMeta, openConfirmModal, showError, useApiPost, useAsyncData, useRoute } from '#imports';
	import useStore from '~/store';
	import { toRefs, watch } from 'vue';

	definePageMeta({
		middleware: ['auth'],
	});

	const route = useRoute();
	const store = useStore();

	const { data: page, error, refresh } = await useAsyncData(async () => {
		return await store.loadPage();
	});

	watch(() => route.query, () => refresh());

	if (error.value) {
		throw showError(error.value);
	}

	function deleteItem (id) {
		openConfirmModal(
			null,
			'Удалить друга?',
			[{
				title: 'Нет',
			}, {
				title: 'Да',
				handler: async () => {
					const result = await useApiPost('/buddy/delete/' + id + '/');

					store.PAGE_LOAD(result);
				}
			}]
		);
	}
</script>