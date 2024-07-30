<template>
	<table class="table">
		<tr>
			<td class="c">Сохранение боевого доклада</td>
		</tr>
		<tr>
			<th>
				<form method="post" @submit.prevent="create">
					Название:<br>
					<input type="text" name="title" size="50" maxlength="100" v-model="title"><br>
					ID боевого доклада:<br>
					<input type="text" name="code" size="50" maxlength="40" v-model="code">
					<br><br>
					<button type="submit">Сохранить</button>
				</form>
			</th>
		</tr>
	</table>
</template>

<script setup>
	import { definePageMeta, navigateTo, useApiSubmit, useHead, useRoute, useSuccessNotification } from '#imports';
	import { ref } from 'vue';

	definePageMeta({
		middleware: ['auth'],
		view: {
			resources: false,
		}
	});

	useHead({
		title: 'Добавить боевой доклад',
	});

	const route = useRoute();

	const title = ref('');
	const code = ref(route.query.code || '');

	function create() {
		useApiSubmit('/log', {
			title: title.value,
			code: code.value,
		}, () => {
			useSuccessNotification('Боевой отчёт успешно сохранён');

			navigateTo('/log');
		});
	}
</script>