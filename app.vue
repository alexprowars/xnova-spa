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
	import { navigateTo, useHead } from '#imports';
	import { computed, watch } from 'vue';
	import { toast } from 'vue3-toastify';
	import useStore from '~/store';
	import { storeToRefs } from 'pinia';

	const store = useStore();
	const { redirect } = storeToRefs(store);

	watch(redirect, (url) => {
		if (url && url.length > 0) {
			redirect.value = null;
			navigateTo({ to: url, force: true });
		}
	});

	const controller = computed(() => {
		return (store.route && store.route.controller) || 'index'
	});

	const notifications = computed(() => {
		return (store.messages || []).filter((item) => {
			return item['type'].indexOf('-static') < 0;
		})
	});

	watch(notifications, (val) => {
		val.forEach((item) => {
			toast(item.text, {
				type: item.type
			})
		})
	})

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
		bodyAttrs: {
			page: controller.value,
		},
	})
</script>