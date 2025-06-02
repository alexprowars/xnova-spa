<template>
	<nav class="main-menu">
		<a :class="{ active: active }" class="menu-toggle d-sm-none" @click.prevent="emit('toggle')">
			<span>
				<span class="first"></span>
				<span class="second"></span>
				<span class="third"></span>
			</span>
		</a>

		<div :class="{ active: active }" class="menu-sidebar">
			<ul>
				<MainMenuItem v-for="(item, i) in filteredItems" :item="item" :key="i"/>
			</ul>
		</div>
	</nav>
</template>

<script setup>
	import MainMenuItem from './MainMenuItem.vue';
	import { computed, reactive } from 'vue';
	import { storeToRefs } from 'pinia';
	import useStore from '~/store/index.js';
	import { useI18n } from '#imports';

	const props = defineProps({
		active: {
			type: Boolean,
			default: true
		}
	});

	const emit = defineEmits(['toggle']);
	const { isVacation } = storeToRefs(useStore());
	const { t } = useI18n();

	const items = reactive([
		{ title: t('menu.overview'), url: '/overview' },
		{ title: t('menu.empire'), url: '/empire' },
		{ title: t('menu.galaxy'), url: '/galaxy' },
		{ title: t('menu.fleet'), url: '/fleet' },
		{ title: t('menu.buildings'), url: '/buildings', vacation: true },
		{ title: t('menu.research'), url: '/research', vacation: true },
		{ title: t('menu.shipyard'), url: '/shipyard', vacation: true },
		{ title: t('menu.defense'), url: '/defense', vacation: true },
		{ title: t('menu.resources'), url: '/resources' },
		{ title: t('menu.merchant'), url: '/merchant' },
		{ title: t('menu.officiers'), url: '/officiers' },
		{ title: t('menu.alliance'), url: '/alliance' },
		{ title: t('menu.friends'), url: '/friends' },
		{ title: t('menu.notes'), url: '/notes' },
		{ title: t('menu.records'), url: '/records' },
		{ title: t('menu.hall'), url: '/hall' },
		{ title: t('menu.logs'), url: '/logs' },
	]);

	const filteredItems = computed(() => {
		return items.filter((item) => typeof item['vacation'] === undefined || item['vacation'] !== isVacation.value);
	})
</script>