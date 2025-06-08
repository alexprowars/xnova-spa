<template>
	<div class="page-stat">
		<div class="block">
			<div class="title text-center">
				Статистика: {{ $formatDate(data['update'], 'HH:mm:ss DD MMM YYYY') }}
			</div>
			<div class="content !border-0">
				<div class="block-table text-center">
					<div class="grid grid-cols-12">
						<div class="th col-span-2 middle">Статистика</div>
						<div class="th col-span-4 sm:col-span-2">
							<select v-model="form.list">
								<option value="players">Игроков</option>
								<option value="alliances">Альянсов</option>
								<option value="races">Фракций</option>
							</select>
						</div>
						<div class="th col-span-2 sm:col-span-1 middle">по</div>
						<div class="th col-span-4 sm:col-span-3">
							<select v-model="form.type">
								<option :value="1">Очкам</option>
								<option :value="2">Флоту</option>
								<option :value="5">Постройкам</option>
								<option :value="3">Исследованиям</option>
								<option :value="4">Обороне</option>
								<option v-if="form.list !== 'races'" :value="6">Мирному уровню</option>
								<option v-if="form.list !== 'races'" :value="7">Боевому уровню</option>
							</select>
						</div>
						<div v-if="form.list !== 'races'" class="th col-span-2 middle">место</div>
						<div v-if="form.list !== 'races'" class="th col-span-10 sm:col-span-2">
							<select v-model="form.page">
								<option v-for="i in form.pages" :value="i">{{ (i - 1) * 100 + 1 }} - {{ i * 100 }}</option>
							</select>
						</div>
					</div>
				</div>
			</div>
		</div>

		<StatPlayers v-if="form.list === 'players'" :items="data.items"/>
		<StatAlliances v-if="form.list === 'alliances'" :items="data.items"/>
		<StatRaces v-if="form.list === 'races'" :items="data.items"/>
	</div>
</template>

<script setup>
	import StatPlayers from '~/components/Page/Stat/Players.vue';
	import StatAlliances from '~/components/Page/Stat/Alliances.vue';
	import StatRaces from '~/components/Page/Stat/Races.vue';
	import { definePageMeta, showError, useApiGet, useApiPost, useAsyncData, useHead, useRoute } from '#imports';
	import { ref, watch } from 'vue';

	definePageMeta({
		view: {
			resources: false,
		}
	});

	useHead({
		title: 'Статистика',
	});

	const { data, error } = await useAsyncData(async () => {
		return await useApiGet('/stat');
	}, { watch: [() => useRoute().query] });

	if (error.value) {
		throw showError(error.value);
	}

	const form = ref({
		list: '',
		type: '',
		page: 1,
		pages: 0
	});

	form.value.list = data.value['list'];
	form.value.type = data.value['type'];
	form.value.pages = Math.ceil(data.value['elements'] / 100);

	watch(() => form.value.list, () => {
		form.value.type = 1;
		form.value.page = 1;
	});

	watch(() => form.value.type, () => {
		form.value.page = 1;
	});

	watch(form, () => {
		loadItems();
	}, { deep: true });

	async function loadItems () {
		const result = await useApiPost('/stat' + (form.value.list !== 'players' ? '/' + form.value.list : ''), {
			type: form.value.type,
			page: form.value.page
		});

		data.value.items = result.items;
	}
</script>