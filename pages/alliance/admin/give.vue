<template>
	<RouterForm :action="'/alliance/admin/give?id='+page['id']">
		<table class="table">
			<tr>
				<td class="c" colspan="8">Передача альянса</td>
			</tr>
			<tr>
				<th colspan="3">Передать альянс игроку:</th>
				<th><select name="newleader">{{ page['righthand'] }}</select></th>
				<th colspan="3"><button type="submit">Передача</button></th>
			</tr>
			<tr>
				<td class="c" colspan="8"><NuxtLinkLocale to="/alliance/admin">назад</NuxtLinkLocale></td>
			</tr>
		</table>
	</RouterForm>
</template>

<script setup>
	import { definePageMeta, showError, useAsyncData, useHead, useRoute } from '#imports';
	import useStore from '~/store';

	definePageMeta({
		middleware: ['auth'],
		view: {
			resources: false,
		}
	});

	useHead({
		title: 'Передача альянса',
	});

	const { data: page, error } = await useAsyncData(async () => {
		return await useStore().loadPage();
	}, { watch: [() => useRoute().query] });

	if (error.value) {
		throw showError(error.value);
	}
</script>