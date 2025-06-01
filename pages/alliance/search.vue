<template>
	<div>
		<form method="post" @submit.prevent="search">
			<table class="table">
				<tbody>
				<tr>
					<td class="c" colspan="2">Поиск альянса</td>
				</tr>
				<tr>
					<th>Строка поиска</th>
					<th>
						<input type="text" name="query" v-model="query">
						<button type="submit">Поиск</button>
					</th>
				</tr>
				</tbody>
			</table>
		</form>
		<div v-if="items.length">
			<div class="separator"></div>
			<table class="table">
				<tbody>
				<tr>
					<td class="c" colspan="3">Найденые альянсы:</td>
				</tr>
				<tr v-for="r in items">
					<th class="text-center">
						<NuxtLink :to="'/alliance/join/' + r['id']">
							[{{ r['tag'] }}]
						</NuxtLink>
					</th>
					<th class="text-center">
						{{ r['name'] }}
					</th>
					<th class="text-center">
						{{ r['members'] }}
					</th>
				</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script setup>
	import { definePageMeta, showError, useApiSubmit, useAsyncData, useHead, useRoute } from '#imports';
	import useStore from '~/store';
	import { ref } from 'vue';

	definePageMeta({
		middleware: ['auth'],
		view: {
			resources: false,
		}
	});

	useHead({
		title: 'Поиск альянса',
	});

	const { error } = await useAsyncData(async () => {
		await useStore().loadState(); return {}
	}, { watch: [() => useRoute().query] });

	if (error.value) {
		throw showError(error.value);
	}

	const query = ref('');
	const items = ref([]);

	function search() {
		useApiSubmit('/alliance/search', {
			query: query.value,
		}, (result) => {
			items.value = result;
		});
	}
</script>