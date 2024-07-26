<template>
	<form ref="formRef" @submit.prevent="save">
		<table class="table">
			<tr>
				<td class="c" colspan="2">Дополнительные настройки</td>
			</tr>
			<tr>
				<th width="200">Домашняя страница</th>
				<th><input type="text" name="web" :value="data['web']" style="width:98%;"></th>
			</tr>
			<tr>
				<th>Логотип</th>
				<th>
					<input type="file" name="image" value="" style="width:98%;">
					<template v-if="data['image']">
						<img :src="data['image']" style="max-width: 98%;max-height: 400px;" alt="">
						<label>
							<input type="checkbox" name="delete_image" value="Y"> Удалить
						</label>
					</template>
				</th>
			</tr>
			<tr>
				<th>Ранг основателя</th>
				<th><input type="text" name="owner_range" :value="data['owner_range']" style="width:98%;"></th>
			</tr>
			<tr>
				<th>Заявки</th>
				<th>
					<select style="width:98%;" name="request_notallow" v-model="data['request_allow']">
						<option value="1">Закрытый альянс</option>
						<option value="0">Открытый альянс</option>
					</select>
				</th>
			</tr>
			<tr>
				<th colspan="2">
					<button type="submit">Сохранить</button>
				</th>
			</tr>
		</table>
	</form>
</template>

<script setup>
	import { useApiSubmit } from '~/composables/useApi.js';
	import { refreshNuxtData } from '#imports';
	import { ref } from 'vue';

	const props = defineProps({
		data: Object,
	});

	const formRef = ref();

	function save() {
		const data = new FormData(formRef.value);

		useApiSubmit('alliance/admin', data, () => {
			refreshNuxtData('page-alliance.admin');
		});
	}
</script>