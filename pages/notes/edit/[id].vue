<template>
	<div>
		<ViewsRouterForm :action="'/notes/edit/'+page['id']+'/'">
			<table class="table">
				<tr>
					<td class="c">Просмотр заметки</td>
				</tr>
				<tr>
					<th style="text-align:left;font-weight:normal;">
						<text-viewer :text="page['text']"></text-viewer>
					</th>
				</tr>
			</table>
			<div class="separator"></div>
			<table class="table">
				<tr>
					<td class="c" colspan="2">Редактирование заметки</td>
				</tr>
				<tr>
					<th>Приоритет:
						<select name="u" title="" v-model="page['priority']">
							<option value="2">Важно</option>
							<option value="1">Обычно</option>
							<option value="0">Неважно</option>
						</select>
					</th>
					<th>Тема:
						<input type="text" name="title" size="30" maxlength="30" :value="page['title']" placeholder="Введите тему">
					</th>
				</tr>
				<tr>
					<th colspan="2" class="p-a-0">
						<text-editor :text="page['text']"></text-editor>
					</th>
				</tr>
				<tr>
					<td class="c" colspan="2">
						<input type="reset" value="Сброс">
						<input type="submit" value="Сохранить">
					</td>
				</tr>
			</table>
		</ViewsRouterForm>
		<span style="float:left;margin-left: 10px;margin-top: 10px;"><nuxt-link to="/notes/">Назад</nuxt-link></span>
	</div>
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