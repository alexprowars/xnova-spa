<template>
	<form @submit.prevent="create">
		<table class="table">
			<tbody>
			<tr>
				<td class="c" colspan="2">Создать альянс</td>
			</tr>
			<tr>
				<th>Аббревиатура альянса (3-8 символов)</th>
				<th><input type="text" name="tag" size="8" maxlength="8" v-model="tag"></th>
			</tr>
			<tr>
				<th>Название альянса (max. 35 символов)</th>
				<th><input type="text" name="name" size="20" maxlength="30" v-model="name"></th>
			</tr>
			<tr>
				<th colspan="2"><button type="submit">Создать</button></th>
			</tr>
			</tbody>
		</table>
	</form>
</template>

<script setup>
	import { ref } from 'vue';
	import { definePageMeta, navigateTo, useApiSubmit, useHead, useSuccessNotification } from '#imports';

	definePageMeta({
		view: {
			resources: false,
		}
	});

	useHead({
		title: 'Создать альянс',
	});

	const name = ref('');
	const tag = ref('');

	function create() {
		useApiSubmit('/alliance/create', {
			name: name.value,
			tag: tag.value,
		}, () => {
			useSuccessNotification('Альянс был создан');

			navigateTo('/alliance');
		});
	}
</script>