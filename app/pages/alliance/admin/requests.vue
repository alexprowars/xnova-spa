<template>
	<table class="table text-center">
		<tbody>
		<tr>
			<td class="c" colspan="2">{{ $t('pages.alliance.admin.requests_page_heading') }}</td>
		</tr>
		<tr v-if="request">
			<td colspan="2" class="padding-0">
				<RequestAcceptForm :request="request" @close="request = null"/>
			</td>
		</tr>
		<tr v-if="items.length > 0">
			<td class="c">
				{{ $t('pages.alliance.admin.requests_col_login') }}
			</td>
			<td class="c">
				{{ $t('pages.alliance.admin.requests_col_submitted_at') }}
			</td>
		</tr>
		<tr v-for="item in items">
			<td class="th">
				<a href="" @click.prevent="show(item)">{{ item['name'] }}</a>
			</td>
			<td class="th">
				{{ $formatDate(item['date'], 'DD MMM YYYY HH:mm') }}
			</td>
		</tr>
		<tr v-if="items.length === 0">
			<td class="th" colspan="2">{{ $t('pages.alliance.admin.requests_empty_list') }}</td>
		</tr>
		<tr>
			<td class="c" colspan="2"><NuxtLink to="/alliance">{{ $t('pages.alliance.admin.nav_back_alliance_root') }}</NuxtLink></td>
		</tr>
		</tbody>
	</table>
</template>

<script setup>
	import { definePageMeta, showError, useApiGet, useAsyncData, useHead, useI18n } from '#imports';
	import { ref } from 'vue';
	import RequestAcceptForm from '~/components/Page/Alliance/RequestAcceptForm.vue';

	definePageMeta({
		middleware: ['auth'],
		view: {
			resources: false,
		}
	});

	const { t } = useI18n();

	useHead({
		title: t('pages.alliance.admin.requests_head_title'),
	});

	const { data: items, error } = await useAsyncData(
		async () => await useApiGet('/alliance/admin/requests')
	);

	if (error.value) {
		throw showError({ data: { error: error.value } });
	}

	const request = ref();

	function show(req) {
		request.value = req;
	}
</script>