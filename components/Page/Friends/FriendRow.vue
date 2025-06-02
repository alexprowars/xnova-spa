<template>
	<div class="row">
		<div class="col th middle">
			<NuxtLink :to="'/messages/write/'+item['user']['id']">{{ item['user']['name'] }}</NuxtLink>
		</div>
		<div class="col th middle">
			<NuxtLink v-if="item['user']['alliance']['id'] > 0" :to="'/alliance/info/'+item['user']['alliance']['id']">{{ item['user']['alliance']['name'] }}</NuxtLink>
			<template v-else>-</template>
		</div>
		<div class="col th middle">
			<NuxtLink :to="'/galaxy?galaxy='+item['user']['galaxy']+'&system='+item['user']['system']">{{ item['user']['galaxy'] }}:{{ item['user']['system'] }}:{{ item['user']['planet'] }}</NuxtLink>
		</div>
		<div class="col th middle">
			<span v-if="item['online'] === 1" class="positive">
				В игре
			</span>
			<span v-if="item['online'] === 2" class="neutral">
				15 мин.
			</span>
			<span v-else class="negative">
				Не в игре
			</span>
		</div>
		<div class="col th middle">
			<button @click.prevent="remove(item['id'])" class="button text-danger">Удалить</button>
		</div>
	</div>
</template>

<script setup>
	import { openConfirmModal, refreshNuxtData, useApiSubmit, useSuccessNotification } from '#imports';

	const { item } = defineProps({
		item: Object,
	});

	function remove (id) {
		openConfirmModal(
			null,
			'Удалить друга?',
			[{
				title: 'Да',
				handler: () => {
					useApiSubmit('/friends/' + id, {
						_method: 'DELETE'
					}, () => {
						useSuccessNotification('Друг удалён');
						refreshNuxtData();
					});
				}
			}, {
				title: 'Нет',
			}]
		);
	}
</script>