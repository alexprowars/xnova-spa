<template>
	<div class="application" v-touch:swipe.left.right="swipe">
		<LayoutHeader v-if="isAuthorized && view['header']"/>
		<main>
			<LayoutMainMenu v-if="isAuthorized && view['menu']" :active="sidebar === 'menu'" @toggle="sidebarToggle('menu')"/>
			<LayoutPlanetsList v-if="isAuthorized && view['planets']" :active="sidebar === 'planet'" @toggle="sidebarToggle('planet')"/>
			<div class="main-content" v-touch:tap="tap">
				<LayoutPlanetPanel v-if="isAuthorized && view['resources']"/>
				<div class="main-content-row">
					<ErrorMessage v-if="error" :data="error"/>
					<slot v-else/>
				</div>
			</div>
		</main>

		<ClientOnly>
			<Chat v-if="isAuthorized" :visible="!isChatPage && view['menu'] && view['chat']"/>
		</ClientOnly>

		<LayoutFooter v-if="isAuthorized && view['header']"/>
	</div>
</template>

<script setup>
	import useStore from '~/store';
	import { useRoute } from '#imports';
	import { ref, computed, watch } from 'vue';
	import { storeToRefs } from 'pinia';

	const store = useStore();
	const route = useRoute();
	const sidebar = ref('');
	const { isAuthorized, user, error } = storeToRefs(store);

	const isChatPage = computed(() => {
		return useRoute().path.indexOf('/chat') !== -1;
	});

	watch(() => route.fullPath, () => {
		sidebar.value = '';
	});

	const view = computed(() => {
		let views = Object.assign({
			header: true,
			footer: true,
			planets: true,
			menu: true,
			resources: true,
			chat: true,
		}, useRoute().meta['view'] || {});

		if (user && !user.value['options']['chatbox']) {
			views.chat = false;
		}

		return views;
	});

	function sidebarToggle (type) {
		if (sidebar.value === type) {
			sidebar.value = '';
		} else {
			sidebar.value = type;
		}
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
</script>