<template>
	<Tabs class="page-techtree">
		<Tab v-for="(group, i) in groups" :key="i" :name="group['title']">
			<div v-for="list in group['items']" class="grid grid-cols-2">
				<div class="title flex items-center justify-between">
					<NuxtLink :to="'/info/' + list['id']">{{ list['name'] }}</NuxtLink>
					<div v-if="list['required'] !== null" class="float-end hidden sm:block">
						<NuxtLink :to="'/tech/' + list['id']">[i]</NuxtLink>
					</div>
				</div>
				<div v-html="list['required']"></div>
			</div>
		</Tab>
	</Tabs>
</template>

<script setup>
	import { definePageMeta, showError, useApiGet, useAsyncData, useHead } from '#imports';

	definePageMeta({
		view: {
			resources: false,
		}
	});

	useHead({
		title: 'Технологии',
	});

	const { data: groups, error } = await useAsyncData(async () => {
		return await useApiGet('/tech');
	});

	if (error.value) {
		throw showError({ data: { error: error.value } });
	}
</script>