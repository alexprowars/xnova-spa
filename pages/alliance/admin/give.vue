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

<script>
	import { defineNuxtComponent } from '#imports';
	import useStore from '~/store';

	export default defineNuxtComponent({
		async asyncData () {
			await useStore().loadPage();

			return {}
		},
		watchQuery: true,
		middleware: 'auth',
	})
</script>