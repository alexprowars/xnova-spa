<template>
	<div class="page-alliance-chat">
		<div class="block-table">
			<div class="c text-center">
				<a href="" @click.prevent="refresh">{{ $t('pages.alliance.chat.link_refresh') }}</a>
			</div>
			<div v-for="item in page['items']" class="grid grid-cols-12">
				<div class="col-span-2 b text-center middle">
					<div>
						{{ $formatDate(item['time'], 'HH:mm:ss') }}
						<br>
						<a :href="'/players/' + item['user_id']" target="_blank">{{ item['user'] }}</a>
						<a @click.prevent="quote(item)"> -> </a>
					</div>
				</div>
				<div class="col-span-9 b">
					<TextViewer v-if="user['options']['bb_parser']" :text="item['message']"/>
					<div v-else>{{ item['message'] }}</div>
				</div>
				<div v-if="page['owner']" class="col-span-1 b text-center middle">
					<input type="checkbox" :value="item['id']" v-model="marked">
				</div>
			</div>

			<div v-if="page['items'].length === 0" class="grid">
				<div class="b text-center">{{ $t('pages.alliance.chat.empty_messages') }}</div>
			</div>

			<div>
				<div class="th">
					<Pagination :options="page['pagination']"/>
				</div>
			</div>

			<div v-if="marked.length" class="grid">
				<div class="th">
					<select v-model="deleteType">
						<option value="marked">{{ $t('pages.alliance.chat.delete_option_marked') }}</option>
						<option value="unmarked">{{ $t('pages.alliance.chat.delete_option_unmarked') }}</option>
						<option value="all">{{ $t('pages.alliance.chat.delete_option_all') }}</option>
					</select>
					<button @click.prevent="deleteMessages">{{ $t('pages.alliance.chat.button_delete') }}</button>
				</div>
			</div>
		</div>

		<ChatMessageForm v-model="message" @send="refresh"/>

		<div class="mt-2">
			<NuxtLink to="/alliance" class="button">{{ $t('pages.alliance.chat.link_back_alliance') }}</NuxtLink>
		</div>
	</div>
</template>

<script setup>
	import ChatMessageForm from '~/components/Page/Alliance/ChatMessageForm.vue';
	import { definePageMeta, showError, useApiGet, useApiSubmit, useAsyncData, useHead, useI18n } from '#imports';
	import useStore from '~/store';
	import { ref } from 'vue';

	import { storeToRefs } from 'pinia';

	definePageMeta({
		middleware: ['auth'],
		view: {
			resources: false,
		}
	});

	const { t } = useI18n();

	useHead({
		title: t('pages.alliance.chat.meta_title'),
	});

	const { data: page, error, refresh } = await useAsyncData(
		async () => await useApiGet('alliance/chat')
	);

	if (error.value) {
		throw showError({ data: { error: error.value } });
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