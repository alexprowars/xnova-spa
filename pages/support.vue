<template>
	<div class="page-support">
		<div class="block">
			<div class="title text-center">
				Служба техподдержки
			</div>
			<div class="content">
				<div class="block-table">
					<div v-if="!items.length" class="grid">
						<div class="th">Нет запросов в техподдержку</div>
					</div>
					<div v-else class="grid grid-cols-12">
						<div class="col-span-1 th">ID</div>
						<div class="col-span-6 th">Тема</div>
						<div class="col-span-2 th">Статус</div>
						<div class="col-span-3 th">Дата</div>
					</div>
					<div v-for="item in items" class="grid grid-cols-12">
						<div class="col-span-1 c">
							<a @click.prevent="getInfo(item['id'])">{{ item['id'] }}</a>
						</div>
						<div class="col-span-6 c">
							<a @click.prevent="getInfo(item['id'])">{{ item['subject'] }}</a>
						</div>
						<div class="col-span-2 c">
							<span v-if="item['status'] === 0" style="color:red">закрыто</span>
							<span v-if="item['status'] === 1" style="color:green">открыто</span>
							<span v-if="item['status'] === 2" style="color:orange">ответ админа</span>
							<span v-if="item['status'] === 3" style="color:green">ответ игрока</span>
						</div>
						<div class="col-span-3 c">{{ $formatDate(item['date'], 'DD MMM YYYY HH:mm:ss') }}</div>
					</div>
				</div>
			</div>
		</div>

		<SupportDetail v-if="detail" :item="detail" @close="detail = false"/>

		<div v-if="!request">
			<div class="separator"></div>
			<div class="grid">
				<div class="text-right">
					<button @click="newRequest">Создать запрос</button>
				</div>
			</div>
		</div>
		<SupportNew v-else @close="request = false"/>
	</div>
</template>

<script setup>
	import SupportDetail from '~/components/Page/Support/Detail.vue'
	import SupportNew from '~/components/Page/Support/New.vue'
	import { definePageMeta, showError, useApiGet, useAsyncData, useHead, useRoute } from '#imports';
	import { ref } from 'vue';

	definePageMeta({
		middleware: ['auth'],
		view: {
			resources: false,
		}
	});

	useHead({
		title: 'Техподдержка',
	});

	const { data: items, error } = await useAsyncData(
		async () => await useApiGet('/support'),
		{ watch: [() => useRoute().query] }
	);

	if (error.value) {
		throw showError(error.value);
	}

	const detail = ref(false);
	const request = ref(false);

	function newRequest () {
		request.value = !request.value
	}

	async function getInfo (id) {
		detail.value = await useApiGet('/support/info/' + id).then(({ data }) => data);
	}
</script>