<template>
	<div>
		<VacationTab v-if="user.vacation"/>
		<OptionsTab v-else/>
	</div>
</template>

<script setup>
	import { definePageMeta, useHead } from '#imports';
	import VacationTab from '~/components/Page/Options/VacationTab.vue';
	import OptionsTab from '~/components/Page/Options/OptionsTab.vue';
	import { storeToRefs } from 'pinia';
	import useStore from '~/store/index.js';

	definePageMeta({
		middleware: ['auth'],
		view: {
			resources: false,
		}
	});

	useHead({
		title: 'Hacтpoйки',
	});

	const { user } = storeToRefs(useStore());
</script>