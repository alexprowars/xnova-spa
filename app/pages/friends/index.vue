<template>
	<div class="block">
		<div class="title">
			{{ $t('pages.friends.list.title') }}
		</div>
		<div class="content">
			<div class="block-table text-center">
				<div class="grid grid-cols-5">
					<div class="c">{{ $t('pages.friends.list.name') }}</div>
					<div class="c">{{ $t('pages.friends.list.alliance') }}</div>
					<div class="c">{{ $t('pages.friends.list.coordinates') }}</div>
					<div class="c">{{ $t('pages.friends.list.online') }}</div>
					<div class="c">&nbsp;</div>
				</div>
				<FriendRow v-for="item in items" :key="item['id']" :item="item"/>
				<div v-if="items.length === 0" class="grid">
					<div class="th">{{ $t('pages.friends.list.no_friends') }}</div>
				</div>
			</div>
		</div>
	</div>
	<div class="mt-2">
		<NuxtLink to="/friends/requests" class="button">{{ $t('pages.friends.list.requests_label') }}</NuxtLink>
		<NuxtLink to="/friends/requests/my" class="button">{{ $t('pages.friends.list.my_requests') }}</NuxtLink>
	</div>
</template>

<script setup>
	import FriendRow from '~/components/Page/Friends/FriendRow.vue';
	import { definePageMeta, showError, useApiGet, useAsyncData, useHead, useRoute, useI18n } from '#imports';

	const { t } = useI18n();

	definePageMeta({
		middleware: ['auth'],
	});

	useHead({
		title: t('pages.friends.list.title'),
	});

	const { data: items, error } = await useAsyncData(async () => {
		return await useApiGet('/friends');
	}, { watch: [() => useRoute().query] });

	if (error.value) {
		throw showError(error.value);
	}
</script>