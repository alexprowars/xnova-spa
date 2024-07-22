<template>
	<RouterForm action="/alliance/make">
		<table class="table">
			<tr>
				<td class="c" colspan="2">Создать альянс</td>
			</tr>
			<tr>
				<th>Аббревиатура альянса (3-8 символов)</th>
				<th><input type="text" name="tag" size=8 maxlength=8 value=""></th>
			</tr>
			<tr>
				<th>Название альянса (max. 35 символов)</th>
				<th><input type="text" name="name" size=20 maxlength=30 value=""></th>
			</tr>
			<tr>
				<th colspan="2"><button type="submit">Создать</button></th>
			</tr>
		</table>
	</RouterForm>
</template>

<script setup>
	import { definePageMeta, useHead } from '#imports';

	definePageMeta({
		view: {
			resources: false,
		}
	});

	useHead({
		title: 'Создать альянс',
	});
</script>