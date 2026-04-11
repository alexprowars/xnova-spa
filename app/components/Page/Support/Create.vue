<template>
	<div class="block page-support-new">
		<div class="title text-center">
			{{ $t('pages.support.create.title') }}
		</div>
		<div class="content">
			<div class="block-table">
				<div class="grid">
					<div class="th">
						<input type="text" v-model="subject" class="width-full" :class="{error: v$.subject.$error}" :placeholder="$t('pages.support.create.subject_placeholder')">
					</div>
				</div>
				<div class="grid">
					<div class="th">
						<TextEditor v-model="message" :class="{error: v$.message.$error}"/>
					</div>
				</div>
				<div class="grid">
					<div class="c text-center">
						<button @click.prevent="request">{{ $t('pages.support.create.send') }}</button>
						<button @click.prevent="emit('close')">{{ $t('pages.support.create.close') }}</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { ref } from 'vue';
	import { refreshNuxtData, openAlertModal, useApiPost, useI18n, useSuccessNotification } from '#imports';
	import { required } from '@vuelidate/validators';
	import { useVuelidate } from '@vuelidate/core';

	const emit = defineEmits(['close']);
	const { t } = useI18n();

	const message = ref('');
	const subject = ref('');

	const validations = {
		message: {
			required
		},
		subject: {
			required
		},
	}

	const v$ = useVuelidate(
		validations,
		{ message, subject },
		{ $autoDirty: true }
	);

	async function request() {
		if (!await v$.value.$validate()) {
			return
		}

		try {
			await useApiPost('/support/create', {
				subject: subject.value,
				message: message.value,
			});

			useSuccessNotification(t('pages.support.notifications.request_added'));

			emit('close');

			await refreshNuxtData();
		} catch (e) {
			await openAlertModal(null, e);
		}
	}
</script>