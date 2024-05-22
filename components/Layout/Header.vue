<template>
	<header class="top-menu">
		<div class="top-menu-container">
			<div class="top-menu-block left">
				<NuxtLink v-if="user['quests'] < 10" :to="{ path: localePath('/tutorial/'), force: true }" class="m1" v-tooltip="'Квесты'">
					<svg class="icon">
						<use xlink:href="/images/symbols.svg#icon-book"></use>
					</svg>
					<b>{{ 10 - user['quests'] }}</b>
				</NuxtLink>
				<NuxtLink :to="{ path: localePath('/chat/'), force: true }" class="m1" v-tooltip="'Чат'">
					<svg class="icon">
						<use xlink:href="/images/symbols.svg#icon-chat"></use>
					</svg>
				</NuxtLink>
				<NuxtLink :to="{ path: localePath('/messages/'), force: true }" class="m1" v-tooltip="'Сообщения'">
					<svg class="icon">
						<use xlink:href="/images/symbols.svg#icon-message"></use>
					</svg>
					<b v-if="user.messages > 0">{{ user.messages }}</b>
				</NuxtLink>
				<NuxtLink v-if="user.alliance" :to="{ path: localePath('/alliance/chat/'), force: true }" class="m1" v-tooltip="'Альянс'">
					<svg class="icon">
						<use xlink:href="/images/symbols.svg#icon-alliance"></use>
					</svg>
					<b v-if="user.alliance.messages > 0">{{ user.alliance.messages }}</b>
				</NuxtLink>
			</div>
			<div class="top-menu-block right">
				<NuxtLink :to="{ path: localePath('/stat/'), force: true }" class="m1" v-tooltip="'Статистика'">
					<svg class="icon">
						<use xlink:href="/images/symbols.svg#icon-statistics"></use>
					</svg>
				</NuxtLink>
				<NuxtLink :to="{ path: localePath('/tech/'), force: true }" class="m1" v-tooltip="'Технологии'">
					<svg class="icon">
						<use xlink:href="/images/symbols.svg#icon-tech"></use>
					</svg>
				</NuxtLink>
				<NuxtLink :to="{ path: localePath('/sim/'), force: true }" class="m1" v-tooltip="'Симулятор'">
					<svg class="icon">
						<use xlink:href="/images/symbols.svg#icon-sim"></use>
					</svg>
				</NuxtLink>
				<NuxtLink :to="{ path: localePath('/search/'), force: true }" class="m1" v-tooltip="'Поиск'">
					<svg class="icon">
						<use xlink:href="/images/symbols.svg#icon-search"></use>
					</svg>
				</NuxtLink>
				<NuxtLink :to="{ path: localePath('/support/'), force: true }" class="m1" v-tooltip="'Техподдержка'">
					<svg class="icon">
						<use xlink:href="/images/symbols.svg#icon-support"></use>
					</svg>
				</NuxtLink>
				<a href="http://forum.xnova.su/" target="_blank" class="m1" v-tooltip="'Форум'">
					<svg class="icon">
						<use xlink:href="/images/symbols.svg#icon-forum"></use>
					</svg>
				</a>
				<NuxtLink :to="{ path: localePath('/options/'), force: true }" class="m1" v-tooltip="'Настройки'">
					<svg class="icon">
						<use xlink:href="/images/symbols.svg#icon-settings"></use>
					</svg>
				</NuxtLink>
				<NuxtLinkLocale to="/logout/" class="m1" v-tooltip="'Выход'">
					<svg class="icon red">
						<use xlink:href="/images/symbols.svg#icon-exit"></use>
					</svg>
				</NuxtLinkLocale>
			</div>
		</div>
	</header>
</template>

<script setup>
	import useStore from '~/store';
	import { storeToRefs } from 'pinia';

	const { user } = storeToRefs(useStore());
</script>