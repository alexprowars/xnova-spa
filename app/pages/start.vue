<template>
	<div class="page-start">
		<SelectAvatar v-if="!user.sex || !user.avatar"/>
		<SelectRace v-else-if="!user.race"/>
	</div>
</template>

<script setup>
	import { definePageMeta, useHead, navigateTo, useI18n } from '#imports';
	import useStore from '~/store';
	import { storeToRefs } from 'pinia';
	import SelectRace from '~/components/Page/Start/SelectRace.vue';
	import SelectAvatar from '~/components/Page/Start/SelectAvatar.vue';

	definePageMeta({
		middleware: ['auth'],
		view: {
			header: false,
			menu: false,
			resources: false,
		}
	});

	const { t } = useI18n();

	useHead({
		title: t('pages.start.title'),
	});

	const { user } = storeToRefs(useStore());

	if (user.value.race && user.value.sex && user.value.avatar) {
		navigateTo('/overview');
	}
</script>