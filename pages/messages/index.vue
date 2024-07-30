<template>
	<form method="post" @submit.prevent>
		<div class="block">
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
				<div v-if="deleteItems.length > 0" class="d-inline-block">
					<button type="button" @click.prevent="deleteMessages">Удалить отмеченные</button>
				</div>
			</div>
			<div class="content noborder">
				<div class="block-table">
					<div v-if="messages.length" class="row">
						<div class="col-1 th text-center">
							<input type="checkbox" class="checkAll" v-model="checkAll">
						</div>
						<div class="col-3 th text-center">Дата</div>
						<div class="col-6 th text-center">От</div>
						<div class="col-2 th text-center"></div>
					</div>

					<MessagesRow v-for="item in messages" :key="item['id']" :item="item"/>

					<div v-if="page['pagination']['total'] === 0" class="row">
						<div class="col-12 th text-center">нет сообщений</div>
					</div>
				</div>

				<div v-if="page['pagination']['total'] > page['pagination']['limit']" class="float-start">
					<Pagination :options="page['pagination']"/>
				</div>
				<div v-if="deleteItems.length > 0" class="float-end" style="padding: 5px">
					<button type="button" @click.prevent="deleteMessages">Удалить отмеченные</button>
				</div>
			</div>
		</div>
	</form>
</template>

<script setup>
	import MessagesRow from '~/components/Page/Messages/Row.vue';
	import Form from '~/components/Page/Messages/Form.vue';
	import { definePageMeta, showError, useApiSubmit, useAsyncData, useHead, useRoute } from '#imports';
	import useStore from '~/store';
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

	const { data: page, error, refresh } = await useAsyncData('page-messages',
		async () => await useStore().loadPage(undefined, Object.assign({}, route.query, { category: category.value, limit: limit.value })),
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