<template>
	<form @submit.prevent="send">
		<table class="table">
			<template v-if="page['text']">
				<tr>
					<td class="c" colspan="2">Приветствие альянса</td>
				</tr>
				<tr>
					<td class="b" colspan="2" height="100" style="padding:3px;">
						<TextViewer :text="page['text']"/>
					</td>
				</tr>
			</template>
			<tr>
				<td class="c" colspan="2">Написать запрос на вступление в альянс [{{ page['tag'] }}]</td>
			</tr>
			<tr>
				<th><textarea cols="40" rows="10" v-model="message"></textarea></th>
			</tr>
			<tr>
				<th colspan="2"><button type="submit">Отправить</button></th>
			</tr>
		</table>
	</form>
</template>

<script setup>
	import { navigateTo, showError, useApiSubmit, useAsyncData, useHead, useRoute } from '#imports';
	import useStore from '~/store/index.js';
	import { ref } from 'vue';
	import { toast } from 'vue3-toastify';

	useHead({
		title: 'Запрос на вступление',
	});

	const route = useRoute();

	const { data: page, error } = await useAsyncData(
		async () => await useStore().loadPage(),
		{ watch: [() => useRoute().query] }
	);

	if (error.value) {
		throw showError(error.value);
	}

	const message = ref('');

	function send() {
		useApiSubmit('alliance/join/' + route.params['id'], {
			message: message.value,
		}, () => {
			toast('Запрос на вступление в альянс. После получения вашего сообщения вы получите разрешение/отказ.', {
				type: 'success'
			});

			navigateTo('/alliance');
		});
	}
</script>