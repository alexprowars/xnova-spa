<template>
	<form @submit.prevent="send">
		<table class="table">
			<tbody>
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
					<NuxtLink to="/alliance/admin">назад</NuxtLink>
				</td>
			</tr>
			</tbody>
		</table>
	</form>
</template>

<script setup>
	import { definePageMeta, navigateTo, showError, useApiGet, useApiSubmit, useAsyncData, useHead, useRoute, useSuccessNotification } from '#imports';
	import { ref } from 'vue';

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
		return await useApiGet('/alliance/admin/give');
	}, { watch: [() => useRoute().query] });

	if (error.value) {
		throw showError(error.value);
	}

	const userId = ref('');

	function send() {
		useApiSubmit('alliance/admin/give', {
			user: userId.value
		}, () => {
			useSuccessNotification('Правление передано')

			navigateTo('/alliance');
		});
	}
</script>