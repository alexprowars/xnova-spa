<template>
	<form @click.prevent="save">
		<table class="table">
			<tr>
				<td class="c" colspan="2">Добавить альянс в список</td>
			</tr>
			<tr>
				<th>
					<select v-model="alliance">
						<option :value="0">список альянсов</option>
						<option v-for="item in items" :value="item['id']">{{ item['name'] }} [{{ item['tag'] }}]</option>
					</select>
				</th>
				<th>
					<select v-model="status">
						<option :value="1">Перемирие</option>
						<option :value="2">Мир</option>
						<option :value="3">Война</option>
					</select>
				</th>
			</tr>
			<tr>
				<td class="c"><NuxtLinkLocale to="/alliance">назад</NuxtLinkLocale></td>
				<td class="c">
					<button type="submit">Добавить</button>
				</td>
			</tr>
		</table>
	</form>
</template>

<script setup>
	import { ref } from 'vue';
	import { refreshNuxtData, useApiSubmit, useSuccessNotification } from '#imports';

	defineProps({
		items: Array,
	});

	const alliance = ref(0);
	const status = ref(1);

	function save() {
		useApiSubmit('alliance/diplomacy/create', {
			alliance: alliance.value,
			status: status.value,
		}, () => {
			alliance.value = 0;

			useSuccessNotification('Отношение между вашими альянсами успешно добавлено')

			refreshNuxtData('page-alliance.diplomacy');
		});
	}
</script>