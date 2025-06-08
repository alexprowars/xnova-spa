<template>
	<div class="block-table">
		<div class="grid">
			<div class="c">Сохранение боевого доклада</div>
		</div>
		<div class="grid">
			<div class="th">
				<form method="post" @submit.prevent="create">
					<div>Название:</div>
					<div><input type="text" name="title" v-model="title" :class="{error: v$.title.$error}" size="50" maxlength="100"></div>
					<div>ID боевого доклада:</div>
					<div><input type="text" name="code" v-model="code" :class="{error: v$.code.$error}" size="50" maxlength="40"></div>
					<button type="submit">Сохранить</button>
				</form>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { useVuelidate } from '@vuelidate/core'
	import { required } from '@vuelidate/validators'
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

	const validations = {
		title: {
			required,
		},
		code: {
			required,
		},
	}

	const v$ = useVuelidate(
		validations,
		{ title, code },
		{ $autoDirty: true }
	);

	async function create() {
		if (!await v$.value.$validate()) {
			return
		}

		useApiSubmit('/logs', {
			title: title.value,
			code: code.value,
		}, () => {
			useSuccessNotification('Боевой отчёт успешно сохранён');

			navigateTo('/logs');
		});
	}
</script>