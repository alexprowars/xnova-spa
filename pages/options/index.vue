<template>
	<div>
		<VacationTab v-if="page['vacation']" :data="page"/>
		<OptionsTab v-else :data="page"/>

		<template v-if="typeof page['bot_auth'] === 'object'">
			<br><br>
			<div class="block-table">
				<div class="row">
					<div class="col-12 th">
						Ваш код для привязки Telegram-бота:<br><br><b>{{ page['bot_auth']['code'] }}</b>
					</div>
				</div>
			</div>
		</template>
	</div>
</template>

<script setup>
	import { definePageMeta, showError, useApiGet, useAsyncData, useHead, useRoute } from '#imports';
	import VacationTab from '~/components/Page/Options/VacationTab.vue';
	import OptionsTab from '~/components/Page/Options/OptionsTab.vue';

	definePageMeta({
		middleware: ['auth'],
		view: {
			resources: false,
		}
	});

	useHead({
		title: 'Hacтpoйки',
	});

	const { data: page, error } = await useAsyncData('page-options',
		async () => await useApiGet('/options'),
		{ watch: [() => useRoute().query] }
	);

	if (error.value) {
		throw showError(error.value);
	}
</script>