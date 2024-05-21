<template>
	<div class="row">
		<div class="col-6 c">
			{{ item['name'] }} {{ item['level'] }}{{ item['mode'] === 1 ? '. Снос здания' : '' }}
		</div>
		<div class="col-6 k" v-if="index === 0">
			<div v-if="item['time'] > 0" class="z">
				{{ $time(item['time'], ':', true) }}
				<br>
				<a @click.prevent="cancelItem">Отменить</a>
			</div>
			<div v-else class="z">
				Завершено
				<br>
				<NuxtLinkLocale :to="'/buildings/?planet='+planet.id+''">Продолжить</NuxtLinkLocale>
			</div>
			<div class="positive">{{ $date(item['end'], 'd.m H:i:s') }}</div>
		</div>
		<div class="col-6 k" v-else>
			<a @click.prevent="deleteItem">Удалить</a>
			<div class="positive">{{ $date(item['end'], 'd.m H:i:s') }}</div>
		</div>
	</div>
</template>

<script setup>
	import { useApiPost } from '~/composables/useApi';
	import useStore from '~/store';
	import { openConfirmModal } from '#imports';
	import { storeToRefs } from 'pinia';

	const props = defineProps({
		index: Number,
		item: Object
	});

	const store = useStore();
	const { planet } = storeToRefs(store);

	function deleteItem () {
		openConfirmModal(
			'Очередь построек',
			'Удалить <b>'+props.item['name']+' '+props.item['level']+' ур.</b> из очереди?',
			[{
				title: 'Закрыть',
			}, {
				title: 'Удалить',
				handler: async () => {
					const result = await useApiPost('/buildings/?planet='+planet.value.id, {
						cmd: 'remove',
						listid: props.index
					})

					store.PAGE_LOAD(result)
				}
			}]
		)
	}

	function cancelItem () {
		openConfirmModal(
			'Очередь построек',
			'Отменить постройку <b>'+props.item['name']+' '+props.item['level']+' ур.</b>?',
			[{
				title: 'Закрыть',
			}, {
				title: 'Отменить',
				handler: async () => {
					const result = await useApiPost('/buildings/?planet='+planet.value.id, {
						cmd: 'cancel',
						listid: props.index - 1
					})

					store.PAGE_LOAD(result)
				}
			}]
		);
	}
</script>