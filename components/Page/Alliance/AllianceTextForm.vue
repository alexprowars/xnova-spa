<template>
	<form @submit.prevent="save">
		<table class="table">
			<tbody>
			<tr>
				<td class="c" colspan="3">Редактировать текст</td>
			</tr>
			<tr>
				<th><NuxtLink to="/alliance/admin?type=1">Внешний текст</NuxtLink></th>
				<th><NuxtLink to="/alliance/admin?type=2">Внутренний текст</NuxtLink></th>
				<th><NuxtLink to="/alliance/admin?type=3">Текст заявки</NuxtLink></th>
			</tr>
			<tr>
				<td v-if="data['text_type'] === 3" class="c" colspan="3">Текст заявок альянса</td>
				<td v-else-if="data['text_type'] === 2" class="c" colspan="3">Внутренний текст альянса</td>
				<td v-else class="c" colspan="3">Текст альянса</td>
			</tr>
			<tr>
				<th colspan="3" class="p-a-0">
					<TextEditor v-model="data['text']"/>
				</th>
			</tr>
			<tr>
				<th colspan="3">
					<button type="reset">Очистить</button>
					<button type="submit">Сохранить</button>
				</th>
			</tr>
			</tbody>
		</table>
	</form>
</template>

<script setup>
	import { useApiSubmit, refreshNuxtData } from '#imports';

	const props = defineProps({
		data: Object,
	});

	function save() {
		useApiSubmit('alliance/admin/text', {
			type: props.data['text_type'],
			text: props.data['text'],
		}, () => {
			refreshNuxtData('page-alliance.admin');
		});
	}
</script>