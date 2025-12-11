<template>
	<div class="block">
		<div class="title">{{ $t('pages.logs.create.title') }}</div>
		<div class="content">
			<div class="block-table text-center">
				<div class="grid">
					<div class="th">
						<form method="post" @submit.prevent="create">
							<div>{{ $t('pages.logs.create.name_label') }}</div>
							<div class="mt-1"><input type="text" name="title" v-model="title" :class="{error: v$.title.$error}" size="50" maxlength="100"></div>
							<div class="mt-4">{{ $t('pages.logs.create.code_label') }}</div>
							<div class="mt-1"><input type="text" name="code" v-model="code" :class="{error: v$.code.$error}" size="50" maxlength="40"></div>
						</form>
					</div>
				</div>
				<div class="grid">
					<div class="c">
						<button type="submit">{{ $t('pages.logs.create.save') }}</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="mt-2">
		<NuxtLink to="/logs" class="button">{{ $t('pages.logs.create.back') }}</NuxtLink>
	</div>
</template>

<script setup>
	import { useVuelidate } from '@vuelidate/core'
	import { required } from '@vuelidate/validators'
	import { definePageMeta, navigateTo, useApiSubmit, useHead, useRoute, useSuccessNotification, useI18n } from '#imports';
	import { ref } from 'vue';

	const { t } = useI18n();

	definePageMeta({
		middleware: ['auth'],
		view: {
			resources: false,
		}
	});

	useHead({
		title: t('pages.logs.create.page_title'),
	});

	const route = useRoute();

	const title = ref('');
	const code = ref(route.query.code || '');

	const validations = {
		title: {
			required,
		},
		code: {
			required,
		},
	}

	const v$ = useVuelidate(
		validations,
		{ title, code },
		{ $autoDirty: true }
	);

	async function create() {
		if (!await v$.value.$validate()) {
			return
		}

		useApiSubmit('/logs', {
			title: title.value,
			code: code.value,
		}, () => {
			useSuccessNotification(t('pages.logs.create.success'));

			navigateTo('/logs');
		});
	}
</script>