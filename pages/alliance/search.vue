<template>
	<div>
		<RouterForm action="/alliance/search/">
			<table class="table">
				<tr>
					<td class="c" colspan="2">Поиск альянса</td>
				</tr>
				<tr>
					<th>Строка поиска</th>
					<th>
						<input type="text" name="searchtext" value="" title="">
						<input type="submit" value="Поиск">
					</th>
				</tr>
			</table>
		</RouterForm>

		<div v-if="page['result'].length">
			<div class="separator"></div>
			<table class="table">
				<tr>
					<td class="c" colspan="3">Найденые альянсы:</td>
				</tr>
				<tr v-for="r in page['result']">
					<th class="text-center">
						{{ r['tag'] }}
					</th>
					<th class="text-center">
						{{ r['name'] }}
					</th>
					<th class="text-center">
						{{ r['members'] }}
					</th>
				</tr>
			</table>
		</div>
	</div>
</template>

<script setup>
	import { definePageMeta, showError, useAsyncData, useHead, useRoute } from '#imports';
	import useStore from '~/store';
	import { watch } from 'vue';

	definePageMeta({
		middleware: ['auth'],
		view: {
			resources: false,
		}
	});

	useHead({
		title: 'Поиск альянса',
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