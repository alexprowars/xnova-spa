<template>
	<header class="top-menu">
		<div class="top-menu-container">
			<div class="top-menu-block left">
				<NuxtLink v-if="user['quests'] < 10" :to="{ path: '/tutorial', force: true }" class="m1" v-tooltip="$t('menu.quests')">
					<svg class="icon">
						<use xlink:href="/images/symbols.svg#icon-book"></use>
					</svg>
					<b>{{ 10 - user['quests'] }}</b>
				</NuxtLink>
				<NuxtLink :to="{ path: '/chat', force: true }" class="m1" v-tooltip="$t('menu.chat')">
					<svg class="icon">
						<use xlink:href="/images/symbols.svg#icon-chat"></use>
					</svg>
				</NuxtLink>
				<NuxtLink :to="{ path: '/messages', force: true }" class="m1" v-tooltip="$t('menu.messages')">
					<svg class="icon">
						<use xlink:href="/images/symbols.svg#icon-message"></use>
					</svg>
					<b v-if="user.messages > 0">{{ user.messages }}</b>
				</NuxtLink>
				<NuxtLink v-if="user.alliance" :to="{ path: '/alliance/chat', force: true }" class="m1" v-tooltip="$t('menu.alliance-chat')">
					<svg class="icon">
						<use xlink:href="/images/symbols.svg#icon-alliance"></use>
					</svg>
					<b v-if="user.alliance.messages > 0">{{ user.alliance.messages }}</b>
				</NuxtLink>
			</div>
			<div class="top-menu-block right">
				<NuxtLink :to="{ path: '/stat', force: true }" class="m1" v-tooltip="$t('menu.stats')">
					<svg class="icon">
						<use xlink:href="/images/symbols.svg#icon-statistics"></use>
					</svg>
				</NuxtLink>
				<NuxtLink :to="{ path: '/tech', force: true }" class="m1" v-tooltip="$t('menu.tech')">
					<svg class="icon">
						<use xlink:href="/images/symbols.svg#icon-tech"></use>
					</svg>
				</NuxtLink>
				<NuxtLink :to="{ path: '/sim', force: true }" class="m1" v-tooltip="$t('menu.sim')">
					<svg class="icon">
						<use xlink:href="/images/symbols.svg#icon-sim"></use>
					</svg>
				</NuxtLink>
				<NuxtLink :to="{ path: '/search', force: true }" class="m1" v-tooltip="$t('menu.search')">
					<svg class="icon">
						<use xlink:href="/images/symbols.svg#icon-search"></use>
					</svg>
				</NuxtLink>
				<NuxtLink :to="{ path: '/options', force: true }" class="m1" v-tooltip="$t('menu.options')">
					<svg class="icon">
						<use xlink:href="/images/symbols.svg#icon-settings"></use>
					</svg>
				</NuxtLink>
				<a href="" @click.prevent="logout" class="m1" v-tooltip="$t('menu.logout')">
					<svg class="icon red">
						<use xlink:href="/images/symbols.svg#icon-exit"></use>
					</svg>
				</a>
			</div>
		</div>
	</header>
</template>

<script setup>
	import useStore from '~/store';
	import { storeToRefs } from 'pinia';
	import { useApiPost, useEvents, useErrorNotification, navigateTo } from '#imports';

	const { user } = storeToRefs(useStore());

	async function logout() {
		try {
			await useApiPost('/logout');

			user.value = null;

			useEvents().emit('logout');

			navigateTo('/');
		} catch (e) {
			useErrorNotification(e.message);
		}
	}
</script>