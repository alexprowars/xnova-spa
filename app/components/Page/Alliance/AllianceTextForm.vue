<template>
	<div class="block">
		<div class="title">Редактировать текст</div>
		<div class="content">
			<form class="block-table text-center" @submit.prevent="save">
				<div class="grid grid-cols-3">
					<div class="th"><NuxtLink to="/alliance/admin?type=1">Внешний текст</NuxtLink></div>
					<div class="th"><NuxtLink to="/alliance/admin?type=2">Внутренний текст</NuxtLink></div>
					<div class="th"><NuxtLink to="/alliance/admin?type=3">Текст заявки</NuxtLink></div>
				</div>
				<div class="grid">
					<div v-if="data['text_type'] === 3" class="c">Текст заявок альянса</div>
					<div v-else-if="data['text_type'] === 2" class="c">Внутренний текст альянса</div>
					<div v-else class="c">Текст альянса</div>
				</div>
				<div class="grid">
					<div class="th">
						<TextEditor v-model="data['text']"/>
					</div>
				</div>
				<div class="grid">
					<div class="th">
						<button type="reset">Очистить</button>
						<button type="submit">Сохранить</button>
					</div>
				</div>
			</form>
		</div>
	</div>
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
			refreshNuxtData();
		});
	}
</script>