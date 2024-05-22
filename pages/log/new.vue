<template>
	<table class="table">
		<tr>
			<td class="c">Сохранение боевого доклада</td>
		</tr>
		<tr>
			<th>
				<RouterForm action="/log/new/">
					Название:<br>
					<input type="text" name="title" size="50" maxlength="100" title=""><br>
					ID боевого доклада:<br>
					<input type="text" name="code" size="50" maxlength="40" :value="$route.query.code || ''" title="">
					<br>
					<br><input type="submit" value="Сохранить">
				</RouterForm>
			</th>
		</tr>
	</table>
</template>

<script setup>
	import { useHead } from '#imports';

	useHead({
		title: 'Добавить боевой доклад',
	});
</script>