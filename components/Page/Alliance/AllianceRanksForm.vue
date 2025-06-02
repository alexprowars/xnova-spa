<template>
	<form ref="ranksRef" @submit.prevent="save">
		<table class="table">
			<tbody>
			<tr>
				<td class="c" colspan="13">Установить ранги</td>
			</tr>
			<tr>
				<th colspan="2">Имя ранга</th>
				<th><img src="/images/alliance/r1.png" width="16" alt=""></th>
				<th><img src="/images/alliance/r2.png" width="16" alt=""></th>
				<th><img src="/images/alliance/r3.png" width="16" alt=""></th>
				<th><img src="/images/alliance/r4.png" width="16" alt=""></th>
				<th><img src="/images/alliance/r5.png" width="16" alt=""></th>
				<th><img src="/images/alliance/r6.png" width="16" alt=""></th>
				<th><img src="/images/alliance/r7.png" width="16" alt=""></th>
				<th><img src="/images/alliance/r8.png" width="16" alt=""></th>
				<th><img src="/images/alliance/r9.png" width="16" alt=""></th>
				<th><img src="/images/alliance/r10.gif" width="16" alt=""></th>
			</tr>
			<tr v-for="rank in items">
				<th>
					<a href="" @click.prevent="remove(rank['id'])"><img src="/images/abort.gif" alt="Удалить ранг"></a>
				</th>
				<th>{{ rank['name'] }}</th>
				<th>
					<input v-if="owner" type="checkbox" :name="'rigths[' + rank['id'] + '][delete]'" :checked="rank['rights']['delete'] || false">
					<b v-else>{{ (rank['rights']['delete'] || false) ? '+' : '-' }}</b>
				</th>
				<th>
					<input v-if="owner" type="checkbox" :name="'rigths[' + rank['id'] + '][kick]'" :checked="rank['rights']['kick'] || false">
					<b v-else>{{ (rank['rights']['kick'] || false) ? '+' : '-' }}</b>
				</th>
				<th><input type="checkbox" :name="'rigths[' + rank['id'] + '][request]'" :checked="rank['rights']['request'] || false"></th>
				<th><input type="checkbox" :name="'rigths[' + rank['id'] + '][memberlist]'" :checked="rank['rights']['memberlist'] || false"></th>
				<th><input type="checkbox" :name="'rigths[' + rank['id'] + '][accept]'" :checked="rank['rights']['accept'] || false"></th>
				<th><input type="checkbox" :name="'rigths[' + rank['id'] + '][admin]'" :checked="rank['rights']['admin'] || false"></th>
				<th><input type="checkbox" :name="'rigths[' + rank['id'] + '][onlinestatus]'" :checked="rank['rights']['onlinestatus'] || false"></th>
				<th><input type="checkbox" :name="'rigths[' + rank['id'] + '][chat]'" :checked="rank['rights']['chat'] || false"></th>
				<th><input type="checkbox" :name="'rigths[' + rank['id'] + '][rights]'" :checked="rank['rights']['rights'] || false"></th>
				<th><input type="checkbox" :name="'rigths[' + rank['id'] + '][diplomacy]'" :checked="rank['rights']['diplomacy'] || false"></th>
			</tr>
			<tr v-if="items.length > 0">
				<th colspan="13"><button type="submit">Сохранить</button></th>
			</tr>
			<tr v-if="items.length === 0">
				<th colspan="13" align="center">нет рангов</th>
			</tr>
			</tbody>
		</table>
	</form>
</template>

<script setup>
	import { ref } from 'vue';
	import { useApiSubmit, refreshNuxtData } from '#imports';

	defineProps({
		owner: Boolean,
		items: Array,
	});

	const ranksRef = ref();

	function save() {
		const data = new FormData(ranksRef.value);

		useApiSubmit('alliance/admin/ranks', data, () => {
			refreshNuxtData();
		});
	}

	function remove(id) {
		useApiSubmit('alliance/admin/ranks/' + id, {
			_method: 'DELETE'
		}, () => {
			refreshNuxtData();
		});
	}
</script>