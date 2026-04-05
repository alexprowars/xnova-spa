<template>
	<div ref="recaptchaRef"></div>
</template>

<script setup lang="ts">
	import { useScript } from '@unhead/vue';
	import { useRuntimeConfig } from '#imports';
	import { onMounted, useTemplateRef } from 'vue';

	const { action } = defineProps({
		action: {
			type: String,
			default: 'submit',
		}
	});

	const recaptchaRef = useTemplateRef('recaptchaRef');
	const model = defineModel({ default: '' });

	onMounted(() => {
		useScript({
			src: 'https://www.google.com/recaptcha/enterprise.js?render=explicit&hl=' + (useI18n()?.locale.value || ''),
			key: 'grecaptcha',
			defer: true,
			async: true,
			crossorigin: null,
		}, {
			trigger: 'client'
		})
		.onLoaded(() => {
			window.grecaptcha.enterprise.ready(() => {
				renderRecaptcha();
			});
		});
	});

	function renderRecaptcha() {
		window.grecaptcha.enterprise.render(recaptchaRef.value, {
			sitekey: useRuntimeConfig().public.recaptchaKey,
			action: action,
			callback: (token: string) => {
				model.value = token;
			},
		});
	}
</script>