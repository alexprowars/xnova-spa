<template>
	<Tabs class="page-techtree">
		<Tab v-for="(groups, i) in page" :key="i" :name="groups['name']" class="container-fluid">
			<div v-for="list in groups['items']" class="row">
				<div class="col-sm-5 col-6 title">
					<NuxtLinkLocale :to="'/info/' + list['id']">{{ $t('tech.' + list['id']) }}</NuxtLinkLocale>
					<div v-if="list['required'] !== ''" class="float-end d-none d-sm-block">
						<NuxtLinkLocale :to="'/tech/' + list['id']">[i]</NuxtLinkLocale>
					</div>
				</div>
				<div class="col-sm-7 col-6" v-html="list['required']"></div>
			</div>
		</Tab>
	</Tabs>
</template>

<script setup>
	import { definePageMeta, showError, useAsyncData, useHead, useRoute } from '#imports';
	import useStore from '~/store';

	definePageMeta({
		view: {
			resources: false,
		}
	});

	useHead({
		title: 'Технологии',
	});

	const { data: page, error } = await useAsyncData(async () => {
		return await useStore().loadPage();
	}, { watch: [() => useRoute().query] });

	if (error.value) {
		throw showError(error.value);
	}
</script>