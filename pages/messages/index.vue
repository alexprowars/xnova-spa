<template>
	<form class="block" method="post" @submit.prevent>
		<div class="title">
			Сообщения
			<select name="category" v-model="category">
				<option v-for="type in Object.keys($tm('message_types'))" :value="type">{{ $t('message_types.' + type) }}</option>
			</select>
			по
			<select name="limit" v-model="limit">
				<option v-for="i in limitItems" :value="i">{{ i }}</option>
			</select>
			на странице
			<div v-if="deleteItems.length > 0" class="inline-block">
				<button type="button" @click.prevent="deleteMessages">Удалить отмеченные</button>
			</div>
		</div>
		<div class="content">
			<div class="block-table">
				<div v-if="messages.length" class="grid grid-cols-12 text-center">
					<div class="col-span-1 th">
						<input type="checkbox" class="checkAll" v-model="checkAll">
					</div>
					<div class="col-span-3 th">Дата</div>
					<div class="col-span-6 th">От</div>
					<div class="col-span-2 th"></div>
				</div>

				<MessagesRow v-for="item in messages" :key="item['id']" :item="item"/>

				<div v-if="page['pagination']['total'] === 0" class="grid">
					<div class="th">нет сообщений</div>
				</div>
			</div>

			<div v-if="page['pagination']['total'] > page['pagination']['limit']" class="float-start">
				<Pagination :options="page['pagination']"/>
			</div>
			<div v-if="deleteItems.length > 0" class="float-end" style="padding: 5px">
				<button type="button" @click.prevent="deleteMessages">Удалить отмеченные</button>
			</div>
		</div>
	</form>
</template>

<script setup>
	import MessagesRow from '~/components/Page/Messages/Row.vue';
	import { definePageMeta, showError, useApiGet, useApiSubmit, useAsyncData, useHead, useRoute } from '#imports';
	import { computed, ref, watch } from 'vue';

	definePageMeta({
		middleware: ['auth'],
		view: {
			resources: false,
		}
	});

	useHead({
		title: 'Сообщения',
	});

	const category = ref();
	const limit = ref();
	const route = useRoute();

	const { data: page, error, refresh } = await useAsyncData(
		async () => await useApiGet('/messages', Object.assign({}, route.query, { category: category.value, limit: limit.value })),
		{ watch: [() => useRoute().query] }
	);

	if (error.value) {
		throw showError(error.value);
	}

	category.value = page.value['category'];
	limit.value = page.value['limit'];

	const checkAll = ref(false);
	const limitItems = ref([5, 10, 25, 50, 100, 200]);

	watch(checkAll, (value) => {
		messages.value.forEach((item) => {
			item.deleted = value;
		});
	});

	const messages = computed(() => {
		if (!page.value.items)
			return [];

		page.value.items.forEach((item) => {
			item['deleted'] = false;
		});

		return page.value.items;
	});

	const deleteItems = computed(() => {
		return messages.value.filter((item) => item.deleted === true)
			.map((item) => item['id']);
	});

	watch([category, limit], () => refresh());

	function deleteMessages() {
		useApiSubmit('/messages/delete', {
			id: deleteItems.value,
		}, () => {
			refresh();
		});
	}
</script>