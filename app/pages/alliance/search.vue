<template>
	<div>
		<div class="block">
			<div class="title">
				{{ $t('pages.alliance.search.page_heading') }}
			</div>
			<div class="content">
				<form class="block-table text-center" method="post" @submit.prevent="search">
					<div>
						<div class="th">
							<input type="text" name="query" :class="{error: v$.query.$error}" v-model="query">
						</div>
					</div>
					<div>
						<div class="c">
							<button type="submit">{{ $t('pages.alliance.search.submit_action') }}</button>
						</div>
					</div>
				</form>
			</div>
		</div>

		<div v-if="items.length" class="block">
			<div class="title">
				{{ $t('pages.alliance.search.results_section_heading') }}
			</div>
			<div class="content">
				<div class="block-table text-center">
					<div v-for="r in items" class="grid grid-cols-3">
						<div class="th">
							<NuxtLink :to="'/alliance/join/' + r['id']">
								[{{ r['tag'] }}]
							</NuxtLink>
						</div>
						<div class="th">
							{{ r['name'] }}
						</div>
						<div class="th">
							{{ r['members'] }}
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="mt-2">
			<NuxtLink to="/alliance" class="button">{{ $t('pages.alliance.search.back_link') }}</NuxtLink>
		</div>
	</div>
</template>

<script setup>
	import { definePageMeta, showError, useApiSubmit, useAsyncData, useHead, useI18n } from '#imports';
	import useStore from '~/store';
	import { ref } from 'vue';
	import { useVuelidate } from '@vuelidate/core'
	import { required } from '@vuelidate/validators'

	definePageMeta({
		middleware: ['auth'],
		view: {
			resources: false,
		}
	});

	const { t } = useI18n();

	useHead({
		title: t('pages.alliance.search.page_heading'),
	});

	const { error } = await useAsyncData(async () => {
		await useStore().loadState(); return {}
	});

	if (error.value) {
		throw showError({ data: { error: error.value } });
	}

	const query = ref('');
	const items = ref([]);

	const validations = {
		query: {
			required
		},
	}

	const v$ = useVuelidate(
		validations,
		{ query },
		{ $autoDirty: true }
	);

	async function search() {
		if (!await v$.value.$validate()) {
			return
		}

		await useApiSubmit('/alliance/search', {
			query: query.value,
		}, (result) => {
			items.value = result;
		});
	}
</script>