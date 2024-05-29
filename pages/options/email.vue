<template>
	<RouterForm action="/options/email/">
		<table class="table">
			<tr>
				<td class="c" colspan="2">Смена адреса электронной почты</td>
			</tr>
			<tr>
				<th>Текущий пароль</th>
				<th><input name="password" size="20" value="" type="password" title=""></th>
			</tr>
			<tr>
				<th>Новый EMAIL адрес</th>
				<th><input name="email" size="20" value="" type="text" title=""></th>
			</tr>
			<tr>
				<th colspan="2">
					Смена адреса email осуществляется ручным методом после проверки аккаунта администрацией игры.
				</th>
			</tr>
			<tr>
				<td colspan="2" class="c"><input type="submit" value="Отправить на модерацию"></td>
			</tr>
		</table>
	</RouterForm>
</template>

<script setup>
	import { definePageMeta, showError, useAsyncData, useHead, useRoute } from '#imports';
	import useStore from '~/store';

	definePageMeta({
		middleware: ['auth'],
		view: {
			resources: false,
		}
	});

	useHead({
		title: 'Смена Email',
	});

	const store = useStore();

	const { data: page, error } = await useAsyncData(async () => {
		return await store.loadPage();
	}, { watch: [() => useRoute().query] });

	if (error.value) {
		throw showError(error.value);
	}
</script>