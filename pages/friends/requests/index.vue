<template>
	<div class="friends page-friends-request">
		<div class="block">
			<div class="title text-center">
				{{ page['title'] }}
			</div>
			<div class="content border-0">
				<div class="block-table">
					<div class="row">
						<div class="col-1 c">&nbsp;</div>
						<div class="col c">Имя</div>
						<div class="col c">Альянс</div>
						<div class="col-2 c">Координаты</div>
						<div class="col c">Текст запроса</div>
						<div class="col c">&nbsp;</div>
					</div>
					<div v-for="(item, i) in page['items']" class="row">
						<div class="col-1 th middle">
							{{ i + 1 }}
						</div>
						<div class="col th middle">
							<NuxtLink :to="'/messages/write/'+item['user']['id']">{{ item['user']['name'] }}</NuxtLink>
						</div>
						<div class="col th middle">
							<NuxtLink v-if="item['user']['alliance']['id'] > 0" :to="'/alliance/info/'+item['user']['alliance']['id']">{{ item['user']['alliance']['name'] }}</NuxtLink>
							<template v-else>-</template>
						</div>
						<div class="col-2 th middle">
							<NuxtLink :to="'/galaxy/?galaxy='+item['user']['galaxy']+'&system='+item['user']['system']">{{ item['user']['galaxy'] }}:{{ item['user']['system'] }}:{{ item['user']['planet'] }}</NuxtLink>
						</div>
						<div class="col th middle" v-html="item['message']"></div>
						<div class="col th text-center">
							<button v-if="page['isMy']" @click.prevent="deleteRequest(item['id'])" class="button text-danger">Удалить запрос</button>
							<template v-else>
								<button @click.prevent="approveRequest(item['id'])" class="button text-success">Применить</button>
								<button @click.prevent="deleteRequest(item['id'])" class="button text-danger">Отклонить</button>
							</template>
						</div>
					</div>
					<div v-if="page['items'].length === 0" class="row">
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
	import { definePageMeta, openConfirmModal, showError, useApiSubmit, useAsyncData, useRoute, navigateTo, useApiGet, refreshNuxtData } from '#imports';

	definePageMeta({
		middleware: ['auth'],
	});

	const route = useRoute();

	const { data: page, error } = await useAsyncData(async () => {
		return await useApiGet('/friends', { requests: true, my: route.path.indexOf('/my') !== -1 });
	}, { watch: [() => useRoute().query] });

	if (error.value) {
		throw showError(error.value);
	}

	function approveRequest (id) {
		useApiSubmit('/friends/' + id + '/approve', {}, () => {
			navigateTo('/friends');
		});
	}

	function deleteRequest (id) {
		openConfirmModal(
			null,
			'Удалить запрос?',
			[{
				title: 'Нет',
			}, {
				title: 'Да',
				handler: () => {
					useApiSubmit('/friends/' + id, {
						_method: 'DELETE'
					}, async () => {
						await refreshNuxtData();
					});
				}
			}]
		);
	}
</script>