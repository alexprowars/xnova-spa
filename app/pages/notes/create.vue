<template>
	<div>
		<div class="block">
			<div class="title">{{ $t('pages.notes.create.title') }}</div>
			<div class="content">
				<form method="post" class="block-table text-center" @submit.prevent="create">
					<div class="grid grid-cols-2">
						<div class="th middle">
							<div>
								{{ $t('pages.notes.create.priority') }}
								<select v-model="priority">
									<option value="2">{{ $t('pages.notes.create.priority_important') }}</option>
									<option value="1">{{ $t('pages.notes.create.priority_normal') }}</option>
									<option value="0">{{ $t('pages.notes.create.priority_unimportant') }}</option>
								</select>
							</div>
						</div>
						<div class="th middle">
							<div>
								{{ $t('pages.notes.create.subject') }} <input type="text" name="title" size="30" maxlength="30" v-model="title" :placeholder="$t('pages.notes.create.subject_placeholder')">
							</div>
						</div>
					</div>
					<div class="grid">
						<div class="th">
							<TextEditor v-model="message"/>
						</div>
					</div>
					<div class="grid">
						<div class="c">
							<button @click.prevent="reset">{{ $t('pages.notes.create.reset') }}</button>
							<button type="submit">{{ $t('pages.notes.create.save') }}</button>
						</div>
					</div>
				</form>
			</div>
		</div>
		<div class="mt-2">
			<NuxtLink to="/notes" class="button !min-w-0">{{ $t('pages.notes.create.back') }}</NuxtLink>
		</div>
	</div>
</template>

<script setup>
	import { definePageMeta, navigateTo, useApiSubmit, useHead, useSuccessNotification, useI18n } from '#imports';
	import { ref } from 'vue';

	const { t } = useI18n();

	definePageMeta({
		middleware: ['auth'],
		view: {
			resources: false,
		}
	});

	useHead({
		title: t('pages.notes.create.page_title'),
	});

	const priority = ref(1);
	const title = ref('');
	const message = ref('');

	function reset() {
		priority.value = 0;
		title.value = '';
		message.value = '';
	}

	function create() {
		useApiSubmit('/notes/create', {
			priority: priority.value,
			title: title.value,
			message: message.value,
		}, (result) => {
			useSuccessNotification(t('pages.notes.create.created'));

			navigateTo('/notes/' + result['id']);
		});
	}
</script>