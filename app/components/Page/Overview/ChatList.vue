<template>
	<div v-if="messages.length > 0" class="block">
		<div class="title">{{ $t('menu.chat') }}</div>
		<div class="content">
			<div class="overflow-y-auto overflow-x-hidden max-h-72">
				<ChatMessage v-for="message in messages" :key="message.id" :item="message"/>
			</div>
		</div>
	</div>
</template>

<script setup>
	import ChatMessage from '~/components/Page/Overview/ChatMessage.vue';
	import { onMounted } from 'vue';
	import useChatStore from '~/store/chat';
	import { storeToRefs } from 'pinia';

	const { messages } = storeToRefs(useChatStore());

	onMounted(() => {
		useChatStore().loadMessages();
	});
</script>