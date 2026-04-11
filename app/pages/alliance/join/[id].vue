<template>
	<div class="block">
		<div class="title">
			{{ $t('pages.alliance.join.heading_title', [page['tag']]) }}
		</div>
		<div class="content">
			<form class="block-table text-center" @submit.prevent="send">
				<template v-if="page['text']">
					<div>
						<div class="c">{{ $t('pages.alliance.join.alliance_welcome_heading') }}</div>
					</div>
					<div>
						<div class="b min-h-20 p-2 text-left">
							<TextViewer :text="page['text']"/>
						</div>
					</div>
				</template>
				<div>
					<div class="th"><textarea cols="40" rows="10" v-model="message"></textarea></div>
				</div>
				<div>
					<div class="c"><button type="submit">{{ $t('pages.alliance.join.submit_request') }}</button></div>
				</div>
			</form>
		</div>
	</div>
	<div class="mt-2">
		<NuxtLink to="/alliance" class="button">{{ $t('pages.alliance.join.nav_back') }}</NuxtLink>
	</div>
</template>

<script setup>
	import { navigateTo, showError, useApiGet, useApiSubmit, useAsyncData, useHead, useI18n, useRoute, useSuccessNotification } from '#imports';
	import { ref } from 'vue';

	const { t } = useI18n();

	useHead({
		title: t('pages.alliance.join.meta_title'),
	});

	const route = useRoute();

	const { data: page, error } = await useAsyncData(
		async () => await useApiGet('/alliance/join/' + route.params['id'])
	);

	if (error.value) {
		throw showError({ data: { error: error.value } });
	}

	const message = ref('');

	function send() {
		useApiSubmit('alliance/join/' + route.params['id'], {
			message: message.value,
		}, () => {
			useSuccessNotification(t('pages.alliance.join.success_after_submit'));

			navigateTo('/alliance');
		});
	}
</script>