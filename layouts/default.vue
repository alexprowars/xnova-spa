<template>
	<div class="application" v-touch:swipe.left.right="swipe">
		<LayoutHeader v-if="isAuthorized && view['header']"/>
		<main>
			<LayoutMainMenu v-if="isAuthorized && view['menu']" :active="sidebar === 'menu'" @toggle="sidebarToggle('menu')"/>
			<LayoutPlanetsList v-if="isAuthorized && view['planets']" :active="sidebar === 'planet'" @toggle="sidebarToggle('planet')"/>
			<div class="main-content" v-touch:tap="tap">
				<LayoutPlanetPanel v-if="isAuthorized && view['resources']"/>
				<div class="main-content-row">
					<MessagesRow v-for="message in messages" :type="message.type || ''" :text="message.text"/>
					<MessagesRow v-if="user?.vacation" type="warning" text="Включен режим отпуска! Функциональность игры ограничена."/>
					<MessagesRow v-if="user?.deleted_at" type="info" :text="'Включен режим удаления профиля!<br>Ваш аккаунт будет удалён после ' + $formatDate(user.deleted_at, 'DD MMM YYYY HH:mm') + '. Выключить режим удаления можно в настройках игры.'"/>
					<slot/>
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
	import { isMobile, useRoute } from '#imports';
	import { ref, computed, watch } from 'vue';
	import { storeToRefs } from 'pinia';
	import MessagesRow from '~/components/Layout/MessagesRow.vue';

	const store = useStore();
	const route = useRoute();
	const sidebar = ref('');
	const { isAuthorized, user } = storeToRefs(store);

	const isChatPage = computed(() => {
		return useRoute().path.indexOf('/chat') !== -1;
	});

	watch(() => route.fullPath, () => {
		sidebar.value = '';
	});

	const messages = computed(() => {
		return (store.messages || []).filter((item) => {
			return item['type'].indexOf('-static') >= 0;
		});
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
		if (!isMobile()) {
			return
		}

		if (ev.target.closest('.table-responsive') !== null)
			return

		if (sidebar.value !== '') {
			sidebar.value = '';
			return;
		}

		if (direction === 'left') {
			sidebarToggle('planet')
		}

		if (direction === 'right') {
			sidebarToggle('menu')
		}
	}

	function tap () {
		if (!isMobile())
			return

		if (sidebar.value !== '')
			sidebar.value = ''
	}
</script>