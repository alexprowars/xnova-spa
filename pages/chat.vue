<template>
	<div class="page-chat">
		<div class="col-12 th">
			<div ref="chatboxRef" class="page-chat-messages">
				<div v-for="item in messages" class="page-chat-messages-row text-start">
					<span :class="{date1: !item['me'] && !item['my'], date2: !!item['me'], date3: !!item['my']}" @click="toPrivate(item['user'])">{{ $date(item['time'], 'H:i') }}</span>
					<span v-if="item['my']" class="negative">{{ item['user'] }}</span><span v-else class="to" @click="toPlayer(item['user'])">{{ item['user'] }}</span>:
					<span v-if="item['tou'].length" :class="[item['private'] ? 'private' : 'player']">
						{{ item['private'] ? 'приватно' : 'для' }} [<span v-for="(u, i) in item['tou']">{{ i > 0 ? ',' : '' }}<a v-if="!item['private']" @click.prevent="toPlayer(u)">{{ u }}</a><a v-else @click.prevent="toPrivate(u)">{{ u }}</a></span>]
					</span>
					<span class="page-chat-row-message" v-html="item['text']"></span>
				</div>
			</div>
		</div>
		<div class="col-12 th">
			<div class="float-end">
				<div class="editor-component-toolbar d-inline-block">
					<button type="button" class="buttons" title="Вставить ссылку" @click="addTag('[url]|[/url]', 1)">
						<span class="sprite bb_world_link"></span>
					</button>
					<button type="button" class="buttons" title="Вставить картинку" @click="addTag('[img]|[/img]', 3)">
						<span class="sprite bb_picture_add"></span>
					</button>
					<button type="button" class="buttons" title="Смайлы" @click="smiles = !smiles">
						<span class="sprite bb_emoticon_grin"></span>
					</button>
				</div>
				<div v-if="smiles" class="smiles">
					<img v-for="smile in smilesList" :src="'/images/smile/'+smile+'.gif'" :alt="smile" @click="addSmile(smile)">
				</div>
			</div>
			<input ref="textRef" class="page-chat-message" type="text" v-model="message" @keypress.13.prevent="sendMessage" maxlength="750">

			<input type="button" value="Очистить" @click.prevent="clear">
			<input type="button" value="Отправить" @click.prevent="sendMessage">
		</div>
	</div>
</template>

<script setup>
	import { definePageMeta, useHead } from '#imports';
	import useChatStore from '~/store/chat';
	import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
	import parser from '~/utils/parser';
	import { storeToRefs } from 'pinia';

	definePageMeta({
		middleware: ['auth'],
		view: {
			resources: false,
		}
	});

	useHead({
		title: 'Межгалактический чат',
	});

	const chatStore = useChatStore();

	const chatboxRef = ref(null);
	const textRef = ref(null);
	const smiles = ref(false);
	const smilesList = ref(parser.patterns.smiles);
	const message = ref('');
	const { messages } = storeToRefs(chatStore);

	onMounted(() => {
		chatStore.loadMessages();

		window.addEventListener('resize', scrollToBottom, true);
	});

	onBeforeUnmount(() => {
		window.removeEventListener('resize', scrollToBottom);
	});

	watch(message, () => {
		textRef.value.focus()
	});

	watch(messages, () => {
		setTimeout(scrollToBottom, 250);

		if (this.active) {
			chatStore.clearUnread();
		}
	});

	function scrollToBottom () {
		if (chatboxRef.value) {
			chatboxRef.value.scrollTop = chatboxRef.value.scrollHeight
		}
	}

	function addTag (tag, type) {
		let len = message.value.length;
		let start = textRef.value.selectionStart;
		let end = textRef.value.selectionEnd;

		let rep = parser.addTag(tag, message.value.substring(start, end), type)

		message.value = message.value.substring(0, start) + rep + message.value.substring(end, len)
	}

	function addSmile (smile){
		message.value = message.value + ' :'+smile+':';
		smiles.value = false;
	}

	function toPlayer (user) {
		message.value = 'для ['+user+'] ' + message.value;
	}

	function toPrivate (user) {
		message.value = 'приватно ['+user+'] ' + message.value;
	}

	function clear () {
		chatStore.clear();
		smiles.value = false;
	}

	function sendMessage () {
		smiles.value = false;
		chatStore.sendMessage(message.value);
		message.value = '';
	}
</script>