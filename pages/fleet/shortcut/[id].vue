<template>
	<div class="block">
		<div class="title">{{ page['name'] }} [{{ page['galaxy'] }}:{{ page['system'] }}:{{ page['planet'] }}]</div>
		<div class="content border-0">
			<RouterForm :action="'/fleet/shortcut/'+page['id']+'/'">
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
							<input type="reset" value="Очистить">
							<input type="submit" value="Обновить">
							<input type="submit" name="delete" value="Удалить">
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
	import { watch } from 'vue';

	definePageMeta({
		middleware: ['auth'],
	});

	useHead({
		title: 'Редактирование закладки',
	});

	const route = useRoute();

	const { data: page, error, refresh } = await useAsyncData(async () => {
		return await useStore().loadPage();
	});

	watch(() => route.query, () => refresh());

	if (error.value) {
		throw showError(error.value);
	}
</script>