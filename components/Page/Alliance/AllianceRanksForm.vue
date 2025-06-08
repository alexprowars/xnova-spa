<template>
	<form ref="ranksRef" @submit.prevent="save">
		<div class="block-table text-center">
			<div class="grid">
				<div class="c">Установить ранги</div>
			</div>
			<div class="flex">
				<div class="basis-1/6 th">Имя ранга</div>
				<div class="basis-1/12 th"><img src="/images/alliance/r1.png" width="16" alt=""></div>
				<div class="basis-1/12 th"><img src="/images/alliance/r2.png" width="16" alt=""></div>
				<div class="basis-1/12 th"><img src="/images/alliance/r3.png" width="16" alt=""></div>
				<div class="basis-1/12 th"><img src="/images/alliance/r4.png" width="16" alt=""></div>
				<div class="basis-1/12 th"><img src="/images/alliance/r5.png" width="16" alt=""></div>
				<div class="basis-1/12 th"><img src="/images/alliance/r6.png" width="16" alt=""></div>
				<div class="basis-1/12 th"><img src="/images/alliance/r7.png" width="16" alt=""></div>
				<div class="basis-1/12 th"><img src="/images/alliance/r8.png" width="16" alt=""></div>
				<div class="basis-1/12 th"><img src="/images/alliance/r9.png" width="16" alt=""></div>
				<div class="basis-1/12 th"><img src="/images/alliance/r10.gif" width="16" alt=""></div>
			</div>
			<div v-for="rank in items" class="flex">
				<div class="basis-1/12 th">
					<a href="" @click.prevent="remove(rank['id'])"><img src="/images/abort.gif" alt="Удалить ранг"></a>
				</div>
				<div class="basis-1/12 th">{{ rank['name'] }}</div>
				<div class="basis-1/12 th">
					<input v-if="owner" type="checkbox" :name="'rigths[' + rank['id'] + '][delete]'" :checked="rank['rights']['delete'] || false">
					<b v-else>{{ (rank['rights']['delete'] || false) ? '+' : '-' }}</b>
				</div>
				<div class="basis-1/12 th">
					<input v-if="owner" type="checkbox" :name="'rigths[' + rank['id'] + '][kick]'" :checked="rank['rights']['kick'] || false">
					<b v-else>{{ (rank['rights']['kick'] || false) ? '+' : '-' }}</b>
				</div>
				<div class="basis-1/12 th"><input type="checkbox" :name="'rigths[' + rank['id'] + '][request]'" :checked="rank['rights']['request'] || false"></div>
				<div class="basis-1/12 th"><input type="checkbox" :name="'rigths[' + rank['id'] + '][memberlist]'" :checked="rank['rights']['memberlist'] || false"></div>
				<div class="basis-1/12 th"><input type="checkbox" :name="'rigths[' + rank['id'] + '][accept]'" :checked="rank['rights']['accept'] || false"></div>
				<div class="basis-1/12 th"><input type="checkbox" :name="'rigths[' + rank['id'] + '][admin]'" :checked="rank['rights']['admin'] || false"></div>
				<div class="basis-1/12 th"><input type="checkbox" :name="'rigths[' + rank['id'] + '][onlinestatus]'" :checked="rank['rights']['onlinestatus'] || false"></div>
				<div class="basis-1/12 th"><input type="checkbox" :name="'rigths[' + rank['id'] + '][chat]'" :checked="rank['rights']['chat'] || false"></div>
				<div class="basis-1/12 th"><input type="checkbox" :name="'rigths[' + rank['id'] + '][rights]'" :checked="rank['rights']['rights'] || false"></div>
				<div class="basis-1/12 th"><input type="checkbox" :name="'rigths[' + rank['id'] + '][diplomacy]'" :checked="rank['rights']['diplomacy'] || false"></div>
			</div>
			<div v-if="items.length > 0" class="grid">
				<div class="th"><button type="submit">Сохранить</button></div>
			</div>
			<div v-if="items.length === 0" class="grid">
				<div class="th">нет рангов</div>
			</div>
		</div>
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