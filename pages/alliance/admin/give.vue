<template>
	<RouterForm :action="'/alliance/admin/give?id='+page['id']+''">
		<table class="table">
			<tr>
				<td class="c" colspan="8">Передача альянса</td>
			</tr>
			<tr>
				<th colspan="3">Передать альянс игроку:</th>
				<th><select name="newleader" title="">{{ page['righthand'] }}</select></th>
				<th colspan="3"><input type="submit" value="Передача"></th>
			</tr>
			<tr>
				<td class="c" colspan="8"><NuxtLinkLocale to="/alliance/admin">назад</NuxtLinkLocale></td>
			</tr>
		</table>
	</RouterForm>
</template>

<script setup>
	import { definePageMeta, showError, useAsyncData, useRoute } from '#imports';
	import useStore from '~/store';
	import { watch } from 'vue';

	definePageMeta({
		middleware: ['auth'],
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