<template>
	<div class="block">
		<div class="title">
			{{ $t('pages.friends.new.title') }}
		</div>
		<div class="content">
			<form class="block-table text-center" @submit.prevent="send">
				<div>
					<div class="th">{{ $t('pages.friends.new.player') }} {{ page['username'] }}</div>
				</div>
				<div>
					<div class="th"><textarea cols="60" rows="10" v-model="message"></textarea></div>
				</div>
				<div>
					<div class="c"><button type="submit">{{ $t('pages.friends.new.submit') }}</button></div>
				</div>
			</form>
		</div>
	</div>
	<div class="mt-2">
		<NuxtLink to="/friends" class="button">{{ $t('pages.friends.new.back') }}</NuxtLink>
	</div>
</template>

<script setup>
	import { definePageMeta, navigateTo, showError, useApiGet, useApiSubmit, useAsyncData, useHead, useRoute, useSuccessNotification, useI18n } from '#imports';
	import { ref } from 'vue';

	const { t } = useI18n();

	definePageMeta({
		middleware: ['auth'],
		view: {
			resources: false,
		}
	});

	useHead({
		title: t('pages.friends.new.page_title'),
	});

	const route = useRoute();

	const { data: page, error } = await useAsyncData(async () => {
		return await useApiGet('/friends/new/' + route.params.id);
	}, { watch: [() => useRoute().query] });

	if (error.value) {
		throw showError(error.value);
	}

	const message = ref('');

	function send() {
		useApiSubmit('friends/new/' + route.params['id'], {
			message: message.value,
		}, () => {
			useSuccessNotification(t('pages.friends.new.request_sent'));

			navigateTo('/friends');
		});
	}
</script>