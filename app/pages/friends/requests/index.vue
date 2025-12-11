<template>
	<div class="friends page-friends-request">
		<div class="block">
			<div class="title">
				{{ isMy ? $t('pages.friends.my_requests') : $t('pages.friends.requests.other_requests') }}
			</div>
			<div class="content">
				<div class="block-table text-center">
					<div class="grid grid-cols-6">
						<div class="c">{{ $t('pages.friends.list.name') }}</div>
						<div class="c">{{ $t('pages.friends.list.alliance') }}</div>
						<div class="col-span-2 c">{{ $t('pages.friends.list.coordinates') }}</div>
						<div class="c">{{ $t('pages.friends.list.text') }}</div>
						<div class="c">&nbsp;</div>
					</div>
					<RequestRow v-for="item in items" :key="item['id']" :item="item" :is-my="isMy"/>
					<div v-if="items.length === 0" class="grid">
						<div class="th">{{ $t('pages.friends.requests.no_requests') }}</div>
					</div>
				</div>
			</div>
		</div>
		<div class="mt-2">
			<NuxtLink to="/friends" class="button">{{ $t('pages.friends.requests.back') }}</NuxtLink>
		</div>
	</div>
</template>

<script setup>
	import RequestRow from '~/components/Page/Friends/RequestRow.vue';
	import { definePageMeta, showError, useAsyncData, useRoute, useApiGet } from '#imports';
	import { computed } from 'vue';

	definePageMeta({
		middleware: ['auth'],
	});

	const route = useRoute();

	const isMy = computed(() => route.path.indexOf('/my') !== -1);

	const { data: items, error } = await useAsyncData(async () => {
		return await useApiGet('/friends/requests', { my: isMy.value ? 'Y' : 'N' });
	}, { watch: [() => useRoute().query] });

	if (error.value) {
		throw showError(error.value);
	}
</script>