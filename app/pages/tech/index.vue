<template>
	<Tabs class="page-techtree">
		<Tab v-for="(groups, i) in page" :key="i" :name="groups['name']">
			<div v-for="list in groups['items']" class="grid grid-cols-2">
				<div class="title flex items-center justify-between">
					<NuxtLink :to="'/info/' + list['id']">{{ $t('tech.' + list['id']) }}</NuxtLink>
					<div v-if="list['required'] !== ''" class="float-end hidden sm:block">
						<NuxtLink :to="'/tech/' + list['id']">[i]</NuxtLink>
					</div>
				</div>
				<div class="" v-html="list['required']"></div>
			</div>
		</Tab>
	</Tabs>
</template>

<script setup>
	import { definePageMeta, showError, useApiGet, useAsyncData, useHead, useRoute } from '#imports';

	definePageMeta({
		view: {
			resources: false,
		}
	});

	useHead({
		title: 'Технологии',
	});

	const { data: page, error } = await useAsyncData(async () => {
		return await useApiGet('/tech');
	}, { watch: [() => useRoute().query] });

	if (error.value) {
		throw showError(error.value);
	}
</script>