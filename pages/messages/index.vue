<template>
	<RouterForm action="/messages/" @page="setState">
		<div ref="formRef" class="block">
			<div class="title">
				Сообщения
				<select name="category" @change.prevent="submitForm" v-model="page['category']">
					<option v-for="type in Object.keys($tm('message_types'))" :value="type">{{ $t('message_types.' + type) }}</option>
				</select>
				по
				<select name="limit" @change.prevent="submitForm" v-model="page['limit']">
					<option v-for="i in limit" :value="i">{{ i }}</option>
				</select>
				на странице
				<div v-if="deleteItems.length > 0" class="d-inline-block">
					<input name="deletemessages" value="Удалить отмеченные" type="button" @click.prevent="submitForm">
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
					<input name="deletemessages" value="Удалить отмеченные" type="button" @click.prevent="submitForm">
				</div>
			</div>
		</div>
	</RouterForm>
</template>

<script setup>
	import MessagesRow from '~/components/Page/Messages/Row.vue'
	import { definePageMeta, showError, useAsyncData, useHead, useRoute } from '#imports';
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

	const route = useRoute();

	const { data: page, error, refresh } = await useAsyncData(async () => {
		return await useStore().loadPage();
	});

	watch(() => route.query, () => refresh());

	if (error.value) {
		throw showError(error.value);
	}

	const formRef = ref(null);
	const checkAll = ref(false);
	const limit = ref([5, 10, 25, 50, 100, 200]);

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
		return messages.value.filter((item) => item.deleted === true);
	});

	function submitForm () {
		formRef.value.parentElement.requestSubmit();
	}

	function setState(val) {
		page.value = val;
	}
</script>