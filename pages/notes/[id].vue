<template>
	<div>
		<form method="post" @submit.prevent="update">
			<table class="table">
				<tbody>
				<tr>
					<td class="c">Просмотр заметки</td>
				</tr>
				<tr>
					<th style="text-align:left;font-weight:normal;">
						<TextViewer :text="page['text']"/>
					</th>
				</tr>
				</tbody>
			</table>
			<div class="separator"></div>
			<table class="table">
				<tbody>
				<tr>
					<td class="c" colspan="2">Редактирование заметки</td>
				</tr>
				<tr>
					<th>Приоритет:
						<select v-model="page['priority']">
							<option value="2">Важно</option>
							<option value="1">Обычно</option>
							<option value="0">Неважно</option>
						</select>
					</th>
					<th>Тема:
						<input type="text" name="title" size="30" maxlength="30" v-model="page['title']" placeholder="Введите тему">
					</th>
				</tr>
				<tr>
					<th colspan="2" class="p-a-0">
						<TextEditor v-model="page['text']"/>
					</th>
				</tr>
				<tr>
					<td class="c" colspan="2">
						<button @click.prevent="reset">Сброс</button>
						<button type="submit">Сохранить</button>
					</td>
				</tr>
				</tbody>
			</table>
		</form>
		<span style="float:left;margin-left: 10px;margin-top: 10px;"><NuxtLink to="/notes">Назад</NuxtLink></span>
	</div>
</template>

<script setup>
	import { definePageMeta, showError, useApiGet, useApiSubmit, useAsyncData, useHead, useRoute, useSuccessNotification } from '#imports';
	import { ref } from 'vue';

	definePageMeta({
		middleware: ['auth'],
		view: {
			resources: false,
		}
	});

	useHead({
		title: 'Редактирование заметки',
	});

	const { data: page, error, refresh } = await useAsyncData(
		async () => await useApiGet('/notes/'+ useRoute().params.id),
		{ watch: [() => useRoute().query] }
	);

	if (error.value) {
		throw showError(error.value);
	}

	const original = ref(page.value);

	function reset() {
		page.value['priority'] = original.value['priority'];
		page.value['title'] = original.value['title'];
		page.value['text'] = original.value['text'];
	}

	function update() {
		useApiSubmit('/notes/' + page.value['id'], {
			priority: page.value['priority'],
			title: page.value['title'],
			message: page.value['text'],
		}, () => {
			useSuccessNotification('Заметка обновлена');

			refresh();
		});
	}
</script>