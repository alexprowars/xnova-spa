<template>
	<div class="grid grid-cols-5">
		<div class="th middle">
			<NuxtLink :to="'/messages/write/'+item['user']['id']">{{ item['user']['name'] }}</NuxtLink>
		</div>
		<div class="th middle">
			<NuxtLink v-if="item['user']['alliance']['id'] > 0" :to="'/alliance/info/'+item['user']['alliance']['id']">{{ item['user']['alliance']['name'] }}</NuxtLink>
			<template v-else>-</template>
		</div>
		<div class="th middle">
			<NuxtLink :to="'/galaxy?galaxy='+item['user']['galaxy']+'&system='+item['user']['system']">{{ item['user']['galaxy'] }}:{{ item['user']['system'] }}:{{ item['user']['planet'] }}</NuxtLink>
		</div>
		<div class="th middle" v-html="item['message']"></div>
		<div class="th text-center">
			<button v-if="isMy" @click.prevent="remove" class="button text-danger">Удалить запрос</button>
			<template v-else>
				<button @click.prevent="approve" class="button text-success">Принять</button>
				<button @click.prevent="remove" class="button text-danger">Отклонить</button>
			</template>
		</div>
	</div>
</template>

<script setup>
	import { navigateTo, openConfirmModal, refreshNuxtData, useApiSubmit, useSuccessNotification } from '#imports';

	const { item } = defineProps({
		item: Object,
		isMy: {
			type: Boolean,
			default: false,
		},
	});

	function approve () {
		useApiSubmit('/friends/' + item['id'] + '/approve', {}, () => {
			navigateTo('/friends');
		});
	}

	function remove () {
		openConfirmModal(
			null,
			'Удалить запрос?',
			[{
				title: 'Да',
				handler: () => {
					useApiSubmit('/friends/' + item['id'], {
						_method: 'DELETE'
					}, async () => {
						useSuccessNotification('Заявка удалена');
						await refreshNuxtData();
					});
				}
			}, {
				title: 'Нет',
			}]
		);
	}
</script>