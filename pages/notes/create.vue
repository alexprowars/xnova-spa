<template>
	<div>
		<form method="post" @submit.prevent="create">
			<table class="table">
				<tbody>
				<tr>
					<td class="c" colspan="2">Создание заметки</td>
				</tr>
				<tr>
					<th>Приоритет:
						<select v-model="priority">
							<option value="2" selected>Важно</option>
							<option value="1">Обычно</option>
							<option value="0">Неважно</option>
						</select>
					</th>
					<th>Тема:
						<input type="text" name="title" size="30" maxlength="30" v-model="title" placeholder="Введите тему">
					</th>
				</tr>
				<tr>
					<th colspan="2" class="p-a-0">
						<TextEditor v-model="message"/>
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
		<span style="float:left;margin-left: 10px;margin-top: 10px;"><NuxtLink to="/notes/">Назад</NuxtLink></span>
	</div>
</template>

<script setup>
	import { definePageMeta, navigateTo, useApiSubmit, useHead, useSuccessNotification } from '#imports';
	import { ref } from 'vue';

	definePageMeta({
		middleware: ['auth'],
		view: {
			resources: false,
		}
	});

	useHead({
		title: 'Создание заметки',
	});

	const priority = ref(0);
	const title = ref('');
	const message = ref('');

	function reset() {
		priority.value = 0;
		title.value = '';
		message.value = '';
	}

	function create() {
		useApiSubmit('/notes/create', {
			priority: priority.value,
			title: title.value,
			message: message.value,
		}, (result) => {
			useSuccessNotification('Заметка добавлена');

			navigateTo('/notes/' + result['id']);
		});
	}
</script>