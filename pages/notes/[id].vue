<template>
	<div>
		<div class="block">
			<div class="title">Просмотр заметки</div>
			<div class="content">
				<div class="block-table">
					<div class="grid">
						<div class="th !font-normal">
							<TextViewer :text="page['text']"/>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="block">
			<div class="title">Редактирование заметки</div>
			<div class="content">
				<form method="post" class="block-table text-center" @submit.prevent="update">
					<div class="grid grid-cols-2">
						<div class="th middle">
							<div>
								Приоритет:
								<select v-model="page['priority']">
									<option value="2">Важно</option>
									<option value="1">Обычно</option>
									<option value="0">Неважно</option>
								</select>
							</div>
						</div>
						<div class="th middle">
							<div>
								Тема: <input type="text" name="title" size="30" maxlength="30" v-model="page['title']" placeholder="Введите тему">
							</div>
						</div>
					</div>
					<div class="grid">
						<div class="th">
							<TextEditor v-model="page['text']"/>
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
			<NuxtLink to="/notes" class="button">Назад</NuxtLink>
		</div>
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