<template>
	<form @submit.prevent="save">
		<table class="table">
			<tbody>
			<tr>
				<td class="c" colspan="2">Создать новый ранг</td>
			</tr>
			<tr>
				<th>Имя ранга</th>
				<th><input type="text" v-model="name" size="20" maxlength="30"></th>
			</tr>
			<tr>
				<th colspan="2"><button type="submit">Создать</button></th>
			</tr>
			</tbody>
		</table>
	</form>
</template>

<script setup>
	import { useApiSubmit, refreshNuxtData } from '#imports';
	import { ref } from 'vue';

	const name = ref('');

	function save() {
		useApiSubmit('alliance/admin/ranks/create', {
			name: name.value,
		}, () => {
			name.value = '';

			refreshNuxtData();
		});
	}
</script>