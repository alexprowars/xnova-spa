<template>
	<div>
		<div class="block">
			<div class="title">{{ $t('pages.notes.view.title') }}</div>
			<div class="content">
				<div class="block-table">
					<div class="grid">
						<div class="th !font-normal">
							<TextViewer :text="page['text']"/>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="block">
			<div class="title">{{ $t('pages.notes.edit.title') }}</div>
			<div class="content">
				<form method="post" class="block-table text-center" @submit.prevent="update">
					<div class="grid grid-cols-2">
						<div class="th middle">
							<div>
								{{ $t('pages.notes.edit.priority') }}
								<select v-model="page['priority']">
									<option value="2">{{ $t('pages.notes.edit.priority_important') }}</option>
									<option value="1">{{ $t('pages.notes.edit.priority_normal') }}</option>
									<option value="0">{{ $t('pages.notes.edit.priority_unimportant') }}</option>
								</select>
							</div>
						</div>
						<div class="th middle">
							<div>
								{{ $t('pages.notes.edit.subject') }} <input type="text" name="title" size="30" maxlength="30" v-model="page['title']" :placeholder="$t('pages.notes.edit.subject_placeholder')">
							</div>
						</div>
					</div>
					<div class="grid">
						<div class="th">
							<TextEditor v-model="page['text']"/>
						</div>
					</div>
					<div class="grid">
						<div class="c">
							<button @click.prevent="reset">{{ $t('pages.notes.edit.reset') }}</button>
							<button type="submit">{{ $t('pages.notes.edit.save') }}</button>
						</div>
					</div>
				</form>
			</div>
		</div>
		<div class="mt-2">
			<NuxtLink to="/notes" class="button">{{ $t('pages.notes.edit.back') }}</NuxtLink>
		</div>
	</div>
</template>

<script setup>
	import { definePageMeta, showError, useApiGet, useApiSubmit, useAsyncData, useHead, useRoute, useSuccessNotification, useI18n } from '#imports';
	import { ref } from 'vue';

	const { t } = useI18n();

	definePageMeta({
		middleware: ['auth'],
		view: {
			resources: false,
		}
	});

	useHead({
		title: t('pages.notes.edit.page_title'),
	});

	const { data: page, error, refresh } = await useAsyncData(
		async () => await useApiGet('/notes/'+ useRoute().params.id),
		{ watch: [() => useRoute().query] }
	);

	if (error.value) {
		throw showError(error.value);
	}

	const original = ref(page.value);

	function reset() {
		page.value['priority'] = original.value['priority'];
		page.value['title'] = original.value['title'];
		page.value['text'] = original.value['text'];
	}

	function update() {
		useApiSubmit('/notes/' + page.value['id'], {
			priority: page.value['priority'],
			title: page.value['title'],
			message: page.value['text'],
		}, () => {
			useSuccessNotification(t('pages.notes.edit.updated'));

			refresh();
		});
	}
</script>