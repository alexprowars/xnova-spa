<template>
	<div>
		<NuxtLayout>
			<NuxtLoadingIndicator color="#9a1915"/>
			<NuxtPage/>
		</NuxtLayout>
		<Loader/>
		<ClientOnly>
			<ModalsContainer />
		</ClientOnly>
	</div>
</template>

<script setup>
	import Loader from '~/components/Layout/Loader.vue'
	import { ModalsContainer } from 'vue-final-modal';
	import { useLocaleHead } from '#i18n';
	import { navigateTo, useHead, useNuxtApp, useToast } from '#imports';
	import { computed, watch } from 'vue';
	import useStore from '~/store';
	import { storeToRefs } from 'pinia';
	import useChatStore from '~/store/chat';
	import dayjs from 'dayjs';

	const store = useStore();
	const { user, redirect } = storeToRefs(store);

	const tz = user.value?.options.timezone;

	if (tz !== null) {
		dayjs.tz.setDefault((tz >= 0 ? '+' : '-') + (Math.abs(tz) < 10 ? '0' : '') + Math.abs(tz) + ':00');
	}

	watch(redirect, (url) => {
		if (url && url.length > 0) {
			redirect.value = null;
			navigateTo({ path: url, force: true });
		}
	});

	const notifications = computed(() => {
		return (store.messages || []).filter((item) => {
			return item['type'].indexOf('-static') < 0;
		})
	});

	watch(notifications, (val) => {
		val.forEach((item) => {
			useToast(item.text, item.type)
		})
	});

	const head = useLocaleHead({
		addDirAttribute: true,
		addSeoAttributes: true,
	});

	useHead({
		title: () => 'Игра',
		titleTemplate: '%s | Звездная Империя',
		meta: () => [
			{ hid: 'og:title', property: 'og:title', content: store.title || '' }
		],
		htmlAttrs: () => head.value?.htmlAttrs || {},
	});

	if (store.isAuthorized) {
		useNuxtApp().$echo?.channel('chat')
			.listen('ChatMessage', ({ message }) => {
				useChatStore().addMessage(message);
			});

		useNuxtApp().$echo?.private('user.' + store.user.id)
			.listen('ChatPrivateMessage', ({ message }) => {
				useChatStore().addMessage(message);
			})
			.listen('PlanetEntityUpdated', () => {
				store.loadState();
			});
	}
</script>