<template>
	<div class="page-alliance-chat">
		<div class="block-table">
			<div class="row">
				<div class="col-12 c">
					<a href="" @click.prevent="refresh">Обновить</a>
				</div>
			</div>

			<div v-for="item in page['items']" class="row">
				<div class="col-2 b text-center">
					{{ $date(item['time'], 'HH:mm:ss') }}
					<br>
					<a :href="'/players/' + item['user_id']" target="_blank">{{ item['user'] }}</a>
					<a @click.prevent="quote(item)"> -> </a>
				</div>
				<div class="col-9 b">
					<TextViewer v-if="user['options']['bb_parser']" :text="item['message']"/>
					<div v-else>{{ item['message'] }}</div>
				</div>
				<div v-if="page['owner']" class="col-1 b text-center">
					<input type="checkbox" :value="item['id']" v-model="marked">
				</div>
			</div>

			<div v-if="page['items'].length === 0" class="row">
				<div class="col-12 b" align="center">В альянсе нет сообщений.</div>
			</div>

			<div class="row">
				<div class="col-12 th">
					<Pagination :options="page['pagination']"/>
				</div>
			</div>

			<div v-if="marked.length" class="row">
				<div class="col-12 th">
					<select v-model="deleteType">
						<option value="marked">Удалить выделенные</option>
						<option value="unmarked">Удалить не выделенные</option>
						<option value="all">Удалить все</option>
					</select>
					<button @click.prevent="deleteMessages">Удалить</button>
				</div>
			</div>
		</div>
		<div class="separator"></div>
		<ChatMessageForm v-model="message" @send="refresh"/>
		<span style="float:left;margin-top:7px;">
			<NuxtLinkLocale to="/alliance">[назад к альянсу]</NuxtLinkLocale>
		</span>
	</div>
</template>

<script setup>
	import ChatMessageForm from '~/components/Page/Alliance/ChatMessageForm.vue';
	import { definePageMeta, showError, useApiSubmit, useAsyncData, useHead, useRoute } from '#imports';
	import useStore from '~/store';
	import { ref } from 'vue';

	import { storeToRefs } from 'pinia';

	definePageMeta({
		middleware: ['auth'],
		view: {
			resources: false,
		}
	});

	useHead({
		title: 'Альянс-чат',
	});

	const { data: page, error, refresh } = await useAsyncData('page-alliance.chat',
		async () => await useStore().loadPage(),
		{ watch: [() => useRoute().query] }
	);

	if (error.value) {
		throw showError(error.value);
	}

	const message = ref('');
	const deleteType = ref('marked');
	const marked = ref([]);
	const { user } = storeToRefs(useStore());

	function quote (messageItem) {
		let text = messageItem['message'] || '';
		text = text.replace(/<br>/gi, "\n");
	    text = text.replace(/<br \/>/gi, "\n");

		message.value = message.value + '[quote author=' + messageItem['user'] + ']' + text + '[/quote]';
	}

	function deleteMessages() {
		useApiSubmit('/alliance/chat', {
			_method: 'DELETE',
			type: deleteType.value,
			id: marked.value,
		}, () => {
			refresh();
		});
	}
</script>