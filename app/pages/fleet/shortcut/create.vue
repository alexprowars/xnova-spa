<template>
	<div class="block">
		<div class="title">{{ $t('pages.fleets.shortcut.create.heading') }}</div>
		<div class="content">
			<form method="post" class="block-table" @submit.prevent="send">
				<div class="grid">
					<div class="th">
						<input type="text" name="title" v-model.trim="name" size="32" maxlength="32" :title="$t('pages.fleets.shortcut.form.title_name')">
						<input type="text" name="galaxy" v-model.number="page['galaxy']" size="3" maxlength="2" :title="$t('pages.fleets.shortcut.form.title_galaxy')">
						<input type="text" name="system" v-model.number="page['system']" size="3" maxlength="3" :title="$t('pages.fleets.shortcut.form.title_system')">
						<input type="text" name="planet" v-model.number="page['planet']" size="3" maxlength="2" :title="$t('pages.fleets.shortcut.form.title_planet')">
						<select name="planet_type" v-model.number="page['planet_type']">
							<option v-for="index in Object.keys($tm('planet_type'))" :value="index">{{ $t('planet_type.' + index) }}</option>
						</select>
					</div>
				</div>
				<div class="grid">
					<div class="th">
						<button type="reset">{{ $t('pages.fleets.shortcut.form.clear') }}</button>
						<button type="submit">{{ $t('pages.fleets.shortcut.create.submit') }}</button>
					</div>
				</div>
				<div class="grid">
					<div class="c">
						<NuxtLink to="/fleet/shortcut">{{ $t('pages.fleets.shortcut.form.back') }}</NuxtLink>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>

<script setup>
	import { definePageMeta, showError, useApiSubmit, useAsyncData, useHead, navigateTo, useSuccessNotification, useApiGet, useI18n } from '#imports';
	import { ref } from 'vue';

	definePageMeta({
		middleware: ['auth'],
	});

	const { t } = useI18n();

	useHead({
		title: t('pages.fleets.shortcut.create.meta_title'),
	});

	const { data: page, error } = await useAsyncData(async () => {
		return await useApiGet('/fleet/shortcut/create');
	});

	if (error.value) {
		throw showError({ data: { error: error.value } });
	}

	const name = ref('');

	function send() {
		useApiSubmit('/fleet/shortcut', {
			name: name.value,
			galaxy: page.value['galaxy'],
			system: page.value['system'],
			planet: page.value['planet'],
			planet_type: page.value['planet_type'],
		}, () => {
			useSuccessNotification(t('pages.fleets.shortcut.create.notify_success'));

			navigateTo('/fleet/shortcut');
		});
	}
</script>