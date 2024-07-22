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
	import { definePageMeta, useHead, useRoute } from '#imports';

	definePageMeta({
		middleware: ['auth'],
		view: {
			resources: false,
		}
	});

	useHead({
		title: 'Создание заметки',
	});

	const route = useRoute();
</script>