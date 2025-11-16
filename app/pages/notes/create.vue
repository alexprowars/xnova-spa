<template>
	<div>
		<div class="block">
			<div class="title">Создание заметки</div>
			<div class="content">
				<form method="post" class="block-table text-center" @submit.prevent="create">
					<div class="grid grid-cols-2">
						<div class="th middle">
							<div>
								Приоритет:
								<select v-model="priority">
									<option value="2">Важно</option>
									<option value="1">Обычно</option>
									<option value="0">Неважно</option>
								</select>
							</div>
						</div>
						<div class="th middle">
							<div>
								Тема: <input type="text" name="title" size="30" maxlength="30" v-model="title" placeholder="Введите тему">
							</div>
						</div>
					</div>
					<div class="grid">
						<div class="th">
							<TextEditor v-model="message"/>
						</div>
					</div>
					<div class="grid">
						<div class="c">
							<button @click.prevent="reset">Сброс</button>
							<button type="submit">Сохранить</button>
						</div>
					</div>
				</form>
			</div>
		</div>
		<div class="mt-2">
			<NuxtLink to="/notes" class="button !min-w-0">Назад</NuxtLink>
		</div>
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

	const priority = ref(1);
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