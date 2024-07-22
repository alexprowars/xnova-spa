<template>
	<div>
		<RouterForm :action="'/notes/edit/'+page['id']+'/'">
			<table class="table">
				<tr>
					<td class="c">Просмотр заметки</td>
				</tr>
				<tr>
					<th style="text-align:left;font-weight:normal;">
						<TextViewer :text="page['text']"/>
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
						<TextEditor v-model="page['text']"/>
					</th>
				</tr>
				<tr>
					<td class="c" colspan="2">
						<button type="reset">Сброс</button>
						<button type="submit">Сохранить</button>
					</td>
				</tr>
			</table>
		</RouterForm>
		<span style="float:left;margin-left: 10px;margin-top: 10px;"><NuxtLinkLocale to="/notes/">Назад</NuxtLinkLocale></span>
	</div>
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
		title: 'Редактирование заметки',
	});

	const { data: page, error } = await useAsyncData(async () => {
		return await useStore().loadPage();
	}, { watch: [() => useRoute().query] });

	if (error.value) {
		throw showError(error.value);
	}
</script>