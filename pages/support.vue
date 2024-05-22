<template>
	<div class="page-support">
		<div class="block">
			<div class="title text-center">
				Служба техподдержки
			</div>
			<div class="content border-0">
				<div class="block-table">
					<div v-if="!page['items'].length" class="row">
						<div class="col th">Нет запросов в техподдержку</div>
					</div>
					<div v-else class="row">
						<div class="col-1 th">ID</div>
						<div class="col-6 th">Тема</div>
						<div class="col-2 th">Статус</div>
						<div class="col-3 th">Дата</div>
					</div>
					<div v-for="item in page['items']" class="row">
						<div class="col-1 c">
							<a @click="getInfo(item['id'])">{{ item['id'] }}</a>
						</div>
						<div class="col-6 c">
							<a @click="getInfo(item['id'])">{{ item['subject'] }}</a>
						</div>
						<div class="col-2 c">
							<span v-if="item['status'] === 0" style="color:red">закрыто</span>
							<span v-if="item['status'] === 1" style="color:green">открыто</span>
							<span v-if="item['status'] === 2" style="color:orange">ответ админа</span>
							<span v-if="item['status'] === 3" style="color:green">ответ игрока</span>
						</div>
						<div class="col-3 c">{{ item['date'] }}</div>
					</div>
				</div>
			</div>
		</div>

		<support-detail v-if="detail" :item="detail" @close="detail = false"></support-detail>

		<div v-if="!request">
			<div class="separator"></div>
			<div class="row">
				<div class="col text-end">
					<button @click="newRequest">Создать запрос</button>
				</div>
			</div>
		</div>
		<support-new v-else @close="request = false"></support-new>
	</div>
</template>

<script setup>
	import SupportDetail from '~/components/Page/Support/Detail.vue'
	import SupportNew from '~/components/Page/Support/New.vue'
	import { definePageMeta, showError, useApiGet, useAsyncData, useRoute } from '#imports';
	import useStore from '~/store';
	import { ref, watch } from 'vue';

	definePageMeta({
		middleware: ['auth'],
	});

	const route = useRoute();

	const { data: page, error, refresh } = await useAsyncData(async () => {
		return await useStore().loadPage();
	});

	watch(() => route.query, () => refresh());

	if (error.value) {
		throw showError(error.value);
	}

	const detail = ref(false);
	const request = ref(false);

	function newRequest () {
		request.value = !request.value
	}

	async function getInfo (id) {
		detail.value = await useApiGet('/support/info/' + id + '/')
	}
</script>