<template>
	<div class="block">
		<div class="title">Имя [Галактика:Система:Планета]</div>
		<div class="content border-0">
			<RouterForm action="/fleet/shortcut/add/">
				<div class="block-table">
					<div class="row">
						<div class="col th">
							<input type="text" name="title" value="" size="32" maxlength="32" title="Название">
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
							<input type="reset" value="Очистить">
							<input type="submit" value="Добавить">
						</div>
					</div>
					<div class="row">
						<div class="col c">
							<NuxtLinkLocale to="/fleet/shortcut/">Назад</NuxtLinkLocale>
						</div>
					</div>
				</div>
			</RouterForm>
		</div>
	</div>
</template>

<script setup>
	import { definePageMeta, showError, useAsyncData, useHead, useRoute } from '#imports';
	import useStore from '~/store';

	definePageMeta({
		middleware: ['auth'],
	});

	useHead({
		title: 'Добавление в закладки',
	});

	const { data: page, error } = await useAsyncData(async () => {
		return await useStore().loadPage();
	}, { watch: [() => useRoute().query] });

	if (error.value) {
		throw showError(error.value);
	}
</script>