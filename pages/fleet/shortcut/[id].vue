<template>
	<div class="block">
		<div class="title">{{ page['name'] }} [{{ page['galaxy'] }}:{{ page['system'] }}:{{ page['planet'] }}]</div>
		<div class="content border-0">
			<form method="post" @submit.prevent="update">
				<div class="block-table">
					<div class="row">
						<div class="col th">
							<input type="text" name="title" v-model="page['name']" size="32" maxlength="32" title="Название">
							<input type="text" name="galaxy" v-model.number="page['galaxy']" size="3" maxlength="2" title="Галактика">
							<input type="text" name="system" v-model.number="page['system']" size="3" maxlength="3" title="Система">
							<input type="text" name="planet" v-model.number="page['planet']" size="3" maxlength="2" title="Планета">
							<select name="planet_type" v-model.number="page['planet_type']">
								<option v-for="index in Object.keys($tm('planet_type'))" :value="index">{{ $t('planet_type.' + index) }}</option>
							</select>
						</div>
					</div>
					<div class="row">
						<div class="col th">
							<button type="reset">Очистить</button>
							<button type="submit">Обновить</button>
							<button type="button" @click.prevent="del">Удалить</button>
						</div>
					</div>
					<div class="row">
						<div class="col c">
							<NuxtLink to="/fleet/shortcut">Назад</NuxtLink>
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>

<script setup>
	import { definePageMeta, navigateTo, showError, useApiGet, useApiSubmit, useAsyncData, useHead, useRoute, useSuccessNotification } from '#imports';

	definePageMeta({
		middleware: ['auth'],
	});

	useHead({
		title: 'Редактирование закладки',
	});

	const { data: page, error } = await useAsyncData(async () => {
		return await useApiGet('/fleet/shortcut/' + useRoute().params.id);
	}, { watch: [() => useRoute().query] });

	if (error.value) {
		throw showError(error.value);
	}

	function update() {
		useApiSubmit('/fleet/shortcut/' + page.value['id'], {
			name: page.value['name'],
			galaxy: page.value['galaxy'],
			system: page.value['system'],
			planet: page.value['planet'],
			planet_type: page.value['planet_type'],
		}, () => {
			useSuccessNotification('Ссылка была обновлена!');

			navigateTo('/fleet/shortcut');
		});
	}

	function del() {
		useApiSubmit('/fleet/shortcut/' + page.value['id'], {
			'_method': 'DELETE',
		}, () => {
			useSuccessNotification('Ссылка была успешно удалена!');

			navigateTo('/fleet/shortcut');
		});
	}
</script>