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

	const props = defineProps({
		active: {
			type: Boolean,
			default: true
		}
	});

	const emit = defineEmits(['toggle']);
	const { isVacation } = storeToRefs(useStore());

	const items = reactive([
		{ id: 'overview', title: 'Обзор', url: '/overview' },
		{ id: 'imperium', title: 'Империя', url: '/imperium' },
		{ id: 'galaxy', title: 'Космос', url: '/galaxy' },
		{ id: 'fleet', title: 'Флот', url: '/fleet' },
		{ id: 'buildings', title: 'Постройки', url: '/buildings', vacation: true },
		{ id: 'research', title: 'Наука', url: '/research', vacation: true },
		{ id: 'shipyard', title: 'Верфь', url: '/shipyard', vacation: true },
		{ id: 'defense', title: 'Оборона', url: '/defense', vacation: true },
		{ id: 'resources', title: 'Сырьё', url: '/resources' },
		{ id: 'merchant', title: 'Рынок', url: '/merchant' },
		{ id: 'officier', title: 'Офицеры', url: '/officier' },
		{ id: 'alliance', title: 'Альянс', url: '/alliance' },
		{ id: 'buddy', title: 'Друзья', url: '/buddy' },
		{ id: 'notes', title: 'Заметки', url: '/notes' },
		{ id: 'records', title: 'Рекорды', url: '/records' },
		{ id: 'hall', title: 'Зал славы', url: '/hall' },
		{ id: 'log', title: 'Логи', url: '/log' },
	]);

	const filteredItems = computed(() => {
		return items.filter((item) => typeof item['vacation'] === undefined || item['vacation'] !== isVacation.value);
	})
</script>