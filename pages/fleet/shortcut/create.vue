<template>
	<div class="block">
		<div class="title">Имя [Галактика:Система:Планета]</div>
		<div class="content border-0">
			<form method="post" @submit.prevent="send">
				<div class="block-table">
					<div class="row">
						<div class="col th">
							<input type="text" name="title" v-model.trim="name" size="32" maxlength="32" title="Название">
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
							<button type="submit">Добавить</button>
						</div>
					</div>
					<div class="row">
						<div class="col c">
							<NuxtLinkLocale to="/fleet/shortcut/">Назад</NuxtLinkLocale>
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>

<script setup>
	import { definePageMeta, showError, useApiSubmit, useAsyncData, useHead, useRoute, navigateTo, useSuccessNotification, useApiGet } from '#imports';
	import { ref } from 'vue';

	definePageMeta({
		middleware: ['auth'],
	});

	useHead({
		title: 'Добавление в закладки',
	});

	const { data: page, error } = await useAsyncData(async () => {
		return await useApiGet('/fleet/shortcut/create');
	}, { watch: [() => useRoute().query] });

	if (error.value) {
		throw showError(error.value);
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
			useSuccessNotification('Ссылка на планету добавлена!');

			navigateTo('/fleet/shortcut');
		});
	}
</script>