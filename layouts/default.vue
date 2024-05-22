<template>
	<div ref="application" class="application" :class="['set_'+controller]" v-touch:swipe.left.right="swipe">
		<LayoutHeader v-if="view['header']"/>
		<main>
			<LayoutMainMenu v-if="view['menu']" :active="sidebar === 'menu'" @toggle="sidebarToggle('menu')"/>
			<LayoutPlanetsList v-if="view['planets']" :active="sidebar === 'planet'" @toggle="sidebarToggle('planet')"/>
			<div class="main-content" v-touch:tap="tap">
				<LayoutPlanetPanel v-if="view['resources']"/>
				<div class="main-content-row">
					<ErrorMessage v-if="error" :data="error"/>
					<slot v-else/>
				</div>
			</div>
		</main>

		<ClientOnly>
			<Chat v-if="store.isAuthorized" :visible="controller !== 'chat' && view['menu'] && view['chat']"/>
		</ClientOnly>

		<LayoutFooter v-if="view['header']"/>
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
	const { error, view } = storeToRefs(store);

	const controller = computed(() => {
		return (store.route && store.route.controller) || 'index'
	});

	watch(() => route.fullPath, () => {
		sidebar.value = '';
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