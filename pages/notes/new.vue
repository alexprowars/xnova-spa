<template>
	<div>
		<RouterForm action="/notes/new/">
			<table class="table">
				<tr>
					<td class="c" colspan="2">Создание заметки</td>
				</tr>
				<tr>
					<th>Приоритет:
						<select name="u" title="">
							<option value="2" selected>Важно</option>
							<option value="1">Обычно</option>
							<option value="0">Неважно</option>
						</select>
					</th>
					<th>Тема:
						<input type="text" name="title" size="30" maxlength="30" value="" placeholder="Введите тему">
					</th>
				</tr>
				<tr>
					<th colspan="2" class="p-a-0">
						<TextEditor/>
					</th>
				</tr>
				<tr>
					<td class="c" colspan="2">
						<input type="reset" value="Сброс">
						<input type="submit" value="Сохранить">
					</td>
				</tr>
			</table>
		</RouterForm>
		<span style="float:left;margin-left: 10px;margin-top: 10px;"><NuxtLinkLocale to="/notes/">Назад</NuxtLinkLocale></span>
	</div>
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