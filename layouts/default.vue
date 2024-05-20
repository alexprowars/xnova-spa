<template>
	<div ref="application" class="application" :class="['set_'+controller, (!loader ? 'preload' : '')]" v-touch:swipe.left.right="swipe">
		<AppHeader v-if="views && views['header']"/>
		<main>
			<MainMenu v-if="views['menu']" :active="sidebar === 'menu'" @toggle="sidebarToggle('menu')"/>
			<PlanetsList v-if="views['planets']" :active="sidebar === 'planet'" @toggle="sidebarToggle('planet')"/>
			<div class="main-content" v-touch:tap="tap">
				<PlanetPanel v-if="views['resources']"/>
				<div class="main-content-row">
					<ErrorMessage v-if="error" :data="error"/>
					<slot v-else/>
				</div>
			</div>
		</main>

		<ClientOnly>
			<Chat v-if="store.isAuthorized" :visible="controller !== 'chat' && views['menu'] && views['chat']"/>
		</ClientOnly>

		<AppFooter v-if="views && views['header']"/>
	</div>
</template>

<script setup>
	import MainMenu from '~/components/app/main-menu.vue'
	import AppHeader from '~/components/app/header.vue'
	import AppFooter from '~/components/app/footer.vue'
	import PlanetsList from '~/components/app/planets-list.vue'
	import PlanetPanel from '~/components/app/planet-panel.vue'
	import Chat from '~/components/Views/Chat.vue'
	import ErrorMessage from '~/components/Views/Message.vue'
	import useStore from '~/store';
	import { useLocaleHead } from '#i18n';
	import { useRoute, navigateTo, useHead } from '#imports';
	import { ref, computed, watch, onMounted } from 'vue';

	const store = useStore();
	const route = useRoute();

	const sidebar = ref('');
	const loader = ref(false);

	const controller = computed(() => {
		return (store.route && store.route.controller) || 'index'
	})

	const error = computed(() => {
		return store.error || false
	})

	const redirect = computed(() => {
		return store.redirect || ''
	})

	const messages = computed(() => {
		return (store.messages || []).filter((item) => {
			return item['type'].indexOf('-static') >= 0;
		})
	})

	const views = computed(() => {
		return store['view'] || {}
	})

	const notifications = computed(() => {
		return (store.messages || []).filter((item) => {
			return item['type'].indexOf('-static') < 0;
		})
	});

	onMounted(() => {
		loader.value = true
	});

	watch(() => route.fullPath, () => {
		sidebar.value = '';
	})

	watch(redirect, (val) => {
		if (val && val.length > 0)
			navigateTo(val)
	})

	watch(notifications, (val) => {
		val.forEach((item) => {
			this.$toasted.show(item.text, {
				type: item.type
			})
		})
	})

	function sidebarToggle (type) {
		if (sidebar.value === type)
			sidebar.value = ''
		else
			sidebar.value = type
	}

	function swipe (direction, ev) {
		if (!store.isMobile) {
			return
		}

		if (ev.target.closest('.table-responsive') !== null)
			return

		if (direction === 'left')
			sidebar.value = 'planet'

		if (direction === 'right')
			sidebar.value = 'menu'
	}

	function tap () {
		if (!store.isMobile)
			return

		if (sidebar.value !== '')
			sidebar.value = ''
	}

	const head = useLocaleHead({
		addDirAttribute: true,
		addSeoAttributes: true,
	});

	useHead({
		title: () => store.title || '',
		titleTemplate: '%s | Звездная Империя',
		meta: () => [
			{ hid: 'og:title', property: 'og:title', content: store.title || '' }
		],
		htmlAttrs: () => head.value?.htmlAttrs || {},
		bodyAttrs: {
			page: controller.value,
			class: store.isSocial ? 'iframe' : 'window'
		},
	})
</script>