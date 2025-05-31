<template>
	<table class="table" style="table-layout: fixed;">
		<tbody>
		<tr>
			<td class="c" colspan="2">Информация об альянсе</td>
		</tr>
		<tr v-if="page['image'] !== ''">
			<th colspan="2"><img :src="page['image']" style="max-width:100%" alt=""></th>
		</tr>
		<tr>
			<th>Аббревиатура</th>
			<th>{{ page['tag'] }}</th>
		</tr>
		<tr>
			<th>Имя</th>
			<th>{{ page['name'] }}</th>
		</tr>
		<tr>
			<th>Участники</th>
			<th>{{ page['member_scount'] }}</th>
		</tr>
		<tr v-if="page['description'] !== ''">
			<td class="b" colspan="2" height="100" style="padding:3px;">
				<TextViewer :text="page['description']"/>
			</td>
		</tr>
		<tr v-if="page['web'] !== ''">
			<th>Сайт альянса:</th>
			<th><a :href="page['web']" target="_blank">{{ page['web'] }}</a></th>
		</tr>
		<tr v-if="page['request']">
			<th colspan="2">
				<NuxtLinkLocale :to="'/alliance/join/' + page['id']" class="button">Вступить в альянс</NuxtLinkLocale>
			</th>
		</tr>
		</tbody>
	</table>
</template>

<script setup>
	import { definePageMeta, showError, useApiGet, useAsyncData, useHead, useRoute } from '#imports';

	definePageMeta({
		middleware: ['auth'],
		view: {
			resources: false,
		}
	});

	const { data: page, error } = await useAsyncData(async () => {
		return await useApiGet('/alliance/info/' + useRoute().params.id);
	}, { watch: [() => useRoute().query] });

	if (error.value) {
		throw showError(error.value);
	}

	useHead({
		title: 'Альянс ' + page.value['name'],
	});
</script>