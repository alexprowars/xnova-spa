<template>
	<ViewsRouterForm :action="'/buddy/new/'+page['id']+'/'">
		<table class="table">
			<tr>
				<td class="c" colspan="2">Предложение подружиться</td>
			</tr>
			<tr>
				<th>Игрок</th>
				<th>{{ page["username"] }}</th>
			</tr>
			<tr>
				<th colspan="2"><textarea name="text" cols="60" rows="10" title=""></textarea></th>
			</tr>
			<tr>
				<td class="c"><nuxt-link to="/buddy/">назад</nuxt-link></td>
				<td class="c"><input type="submit" value="Отправить заявку"></td>
			</tr>
		</table>
	</ViewsRouterForm>
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