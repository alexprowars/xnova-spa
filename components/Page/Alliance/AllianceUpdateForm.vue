<template>
	<form class="block-table text-center" ref="formRef" @submit.prevent="save">
		<div class="grid">
			<div class="c">Дополнительные настройки</div>
		</div>
		<div class="grid grid-cols-4">
			<div class="th">Домашняя страница</div>
			<div class="th col-span-3"><input type="text" name="web" class="!w-full" :value="data['web']"></div>
		</div>
		<div class="grid grid-cols-4">
			<div class="th">Логотип</div>
			<div class="th col-span-3">
				<input class="w-full" type="file" name="image" value="">
				<template v-if="data['image']">
					<img :src="data['image']" style="max-width: 98%;max-height: 400px;" alt="">
					<label>
						<input type="checkbox" name="delete_image" value="Y"> Удалить
					</label>
				</template>
			</div>
		</div>
		<div class="grid grid-cols-4">
			<div class="th">Ранг основателя</div>
			<div class="th col-span-3"><input class="!w-full" type="text" name="owner_range" :value="data['owner_range']"></div>
		</div>
		<div class="grid grid-cols-4">
			<div class="th">Заявки</div>
			<div class="th col-span-3">
				<select class="w-full" name="request_notallow" v-model="data['request_allow']">
					<option value="1">Закрытый альянс</option>
					<option value="0">Открытый альянс</option>
				</select>
			</div>
		</div>
		<div class="grid">
			<div class="th">
				<button type="submit">Сохранить</button>
			</div>
		</div>
	</form>
</template>

<script setup>
	import { useApiSubmit, refreshNuxtData } from '#imports';
	import { ref } from 'vue';

	const props = defineProps({
		data: Object,
	});

	const formRef = ref();

	function save() {
		const data = new FormData(formRef.value);

		useApiSubmit('alliance/admin', data, () => {
			refreshNuxtData();
		});
	}
</script>