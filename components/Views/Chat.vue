<template>
	<div v-if="!mobile" class="component-chat" :class="{active: active}">
		<div class="block">
			<div class="title" v-on:click="toggleActive">
				Чат
				<span v-if="unread > 0">({{ unread }})</span>
			</div>
			<div v-show="active" class="content border-0">
				<div class="col-12 th">
					<div ref="chatRef" class="page-chat-messages">
						<div v-for="item in sortedMessages" class="page-chat-messages-row text-start">
							<span :class="{date1: !item['me'] && !item['my'], date2: !!item['me'], date3: !!item['my']}" v-on:click="toPrivate(item['user'])">{{ $date(item['time'], 'H:m') }}</span>
							<span v-if="item['my']" class="negative">{{ item['user'] }}</span><span v-else class="to" v-on:click="toPlayer(item['user'])">{{ item['user'] }}</span>:
							<span v-if="item['tou'].length" :class="[item['private'] ? 'private' : 'player']">
								{{ item['private'] ? 'приватно' : 'для' }} [<span v-for="(u, i) in item['tou']">{{ i > 0 ? ',' : '' }}<a v-if="!item['private']" v-on:click.prevent="toPlayer(u)">{{ u }}</a><a v-else v-on:click.prevent="toPrivate(u)">{{ u }}</a></span>]
							</span>
							<span class="page-chat-row-message" v-html="item['text']"></span>
						</div>
					</div>
				</div>
				<div class="col-12 th d-flex">
					<input ref="textRef" class="page-chat-message" type="text" v-model="message" v-on:keypress.13.prevent="sendMessage" maxlength="750">

					<input type="button" value="Отправить" v-on:click.prevent="sendMessage">
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { storeToRefs } from 'pinia'
	import useChatStore from '~/store/chat';
	import useStore from '~/store';
	import { onBeforeUnmount, onMounted, ref, watch } from 'vue';

	const props = defineProps({
		visible: {
			type: Boolean,
			default: false,
		}
	});

	const store = useStore();
	const chatStore = useChatStore();

	const mobile = ref(store.isMobile || !props.visible);
	const active = ref(localStorage.getItem('mini-chat-active') === 'Y');
	const message = ref('');

	const textRef = ref(null);
	const chatRef = ref(null);

	const { unread, sortedMessages } = storeToRefs(chatStore);

	onMounted(() => {
		if (active.value) {
			chatStore.loadMessages();
		}

		window.addEventListener('resize', onResize, true);
	});

	onBeforeUnmount(() => {
		window.removeEventListener('resize', onResize);
	});

	watch(sortedMessages, () => {
		setTimeout(scrollToBottom, 250);

		if (active.value) {
			chatStore.clearUnread();
		}
	});

	watch(message, () => {
		textRef.value?.focus();
	});

	watch(() => props.visible, (value) => {
		mobile.value = store.isMobile || !value;
	});

	function scrollToBottom () {
		if (chatRef.value) {
			chatRef.value.scrollTop = chatRef.value.scrollHeight;
		}
	}

	function toggleActive () {
		active.value = !active.value;

		try {
			localStorage.setItem('mini-chat-active', active.value ? 'Y' : 'N')
		} catch (e) {}

		if (active.value) {
			chatStore.loadMessages();
			chatStore.clearUnread();
			scrollToBottom();
		}
	}

	function toPlayer (user) {
		message.value = 'для [' + user + '] ' + message.value;
	}

	function toPrivate (user) {
		message.value = 'приватно [' + user + '] ' + message.value;
	}

	function sendMessage () {
		chatStore.sendMessage(message.value);
		message.value = '';
	}

	function onResize () {
		if (active.value) {
			scrollToBottom()
		}
	}
</script>