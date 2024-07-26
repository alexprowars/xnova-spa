<template>
	<form @submit.prevent="send">
		<table class="table">
			<tr>
				<td class="c" colspan="8">Передача альянса</td>
			</tr>
			<tr>
				<th colspan="3">Передать альянс игроку:</th>
				<th>
					<select v-model="userId">
						<option value="">Выберите игрока</option>
						<option v-for="item in page['users']" :value="item['id']">{{ item['name'] }} [{{ item['rank'] }}]</option>
					</select>
				</th>
				<th colspan="3"><button type="submit">Передача</button></th>
			</tr>
			<tr>
				<td class="c" colspan="8">
					<NuxtLinkLocale to="/alliance/admin">назад</NuxtLinkLocale>
				</td>
			</tr>
		</table>
	</form>
</template>

<script setup>
	import { definePageMeta, navigateTo, showError, useApiSubmit, useAsyncData, useHead, useRoute } from '#imports';
	import useStore from '~/store';
	import { ref } from 'vue';
	import { toast } from 'vue3-toastify';

	definePageMeta({
		middleware: ['auth'],
		view: {
			resources: false,
		}
	});

	useHead({
		title: 'Передача альянса',
	});

	const { data: page, error } = await useAsyncData(async () => {
		return await useStore().loadPage();
	}, { watch: [() => useRoute().query] });

	if (error.value) {
		throw showError(error.value);
	}

	const userId = ref('');

	function send() {
		useApiSubmit('alliance/admin/give', {
			user: userId.value
		}, () => {
			toast('Правление передано', {
				type: 'success'
			})

			navigateTo('/alliance');
		});
	}
</script>