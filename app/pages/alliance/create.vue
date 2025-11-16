<template>
	<div class="block">
		<div class="title">Создать альянс</div>
		<div class="content">
			<form @submit.prevent="create" class="block-table text-center">
				<div class="grid grid-cols-2">
					<div class="th middle">Аббревиатура альянса (3-8 символов)</div>
					<div class="th middle"><input type="text" name="tag" :class="{error: v$.tag.$error}" size="8" maxlength="8" v-model="tag"></div>
				</div>
				<div class="grid grid-cols-2">
					<div class="th middle">Название альянса (max. 35 символов)</div>
					<div class="th middle"><input type="text" name="name" :class="{error: v$.name.$error}" size="20" maxlength="30" v-model="name"></div>
				</div>
				<div class="grid">
					<div class="c"><button type="submit">Создать</button></div>
				</div>
			</form>
		</div>
	</div>

	<div class="mt-2">
		<NuxtLink to="/alliance" class="button">Назад</NuxtLink>
	</div>
</template>

<script setup>
	import { ref } from 'vue';
	import { definePageMeta, navigateTo, useApiSubmit, useHead, useSuccessNotification } from '#imports';
	import useStore from '~/store';
	import { useVuelidate } from '@vuelidate/core'
	import { required } from '@vuelidate/validators'

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

	const validations = {
		name: {
			required
		},
		tag: {
			required
		},
	}

	const v$ = useVuelidate(
		validations,
		{ name, tag },
		{ $autoDirty: true }
	);

	async function create() {
		if (!await v$.value.$validate()) {
			return
		}

		await useApiSubmit('/alliance/create', {
			name: name.value,
			tag: tag.value,
		}, async() => {
			await useStore().loadState();

			useSuccessNotification('Альянс был создан');

			navigateTo('/alliance');
		});
	}
</script>