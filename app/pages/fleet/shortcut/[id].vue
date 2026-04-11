<template>
	<div class="block">
		<div class="title">{{ page['name'] }} [{{ page['galaxy'] }}:{{ page['system'] }}:{{ page['planet'] }}]</div>
		<div class="content">
			<form method="post" class="block-table" @submit.prevent="update">
				<div class="grid">
					<div class="th">
						<input type="text" name="title" v-model="page['name']" size="32" maxlength="32" :title="$t('pages.fleets.shortcut.form.title_name')">
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
						<button type="submit">{{ $t('pages.fleets.shortcut.edit.update') }}</button>
						<button type="button" @click.prevent="del">{{ $t('pages.fleets.shortcut.edit.delete') }}</button>
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
	import { definePageMeta, navigateTo, showError, useApiGet, useApiSubmit, useAsyncData, useHead, useRoute, useSuccessNotification, useI18n } from '#imports';

	definePageMeta({
		middleware: ['auth'],
	});

	const { t } = useI18n();

	useHead({
		title: t('pages.fleets.shortcut.edit.meta_title'),
	});

	const { data: page, error } = await useAsyncData(async () => {
		return await useApiGet('/fleet/shortcut/' + useRoute().params.id);
	});

	if (error.value) {
		throw showError({ data: { error: error.value } });
	}

	function update() {
		useApiSubmit('/fleet/shortcut/' + page.value['id'], {
			name: page.value['name'],
			galaxy: page.value['galaxy'],
			system: page.value['system'],
			planet: page.value['planet'],
			planet_type: page.value['planet_type'],
		}, () => {
			useSuccessNotification(t('pages.fleets.shortcut.edit.notify_updated'));

			navigateTo('/fleet/shortcut');
		});
	}

	function del() {
		useApiSubmit('/fleet/shortcut/' + page.value['id'], {
			'_method': 'DELETE',
		}, () => {
			useSuccessNotification(t('pages.fleets.shortcut.edit.notify_deleted'));

			navigateTo('/fleet/shortcut');
		});
	}
</script>