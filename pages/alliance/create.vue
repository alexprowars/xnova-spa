<template>
	<div class="block">
		<div class="title text-center">Создать альянс</div>
		<div class="content">
			<form @submit.prevent="create" class="block-table">
				<div class="grid grid-cols-2">
					<div class="th">Аббревиатура альянса (3-8 символов)</div>
					<div class="th"><input type="text" name="tag" size="8" maxlength="8" v-model="tag"></div>
				</div>
				<div class="grid grid-cols-2">
					<div class="th">Название альянса (max. 35 символов)</div>
					<div class="th"><input type="text" name="name" size="20" maxlength="30" v-model="name"></div>
				</div>
				<div class="grid">
					<div class="th"><button type="submit">Создать</button></div>
				</div>
			</form>
		</div>
	</div>
</template>

<script setup>
	import { ref } from 'vue';
	import { definePageMeta, navigateTo, useApiSubmit, useHead, useSuccessNotification } from '#imports';
	import useStore from '~/store';

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
		}, async() => {
			await useStore().loadState();

			useSuccessNotification('Альянс был создан');

			navigateTo('/alliance');
		});
	}
</script>