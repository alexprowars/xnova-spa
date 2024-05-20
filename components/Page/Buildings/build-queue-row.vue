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
				<NuxtLinkLocale :to="'/buildings/?planet='+$state.user.planet+''">Продолжить</NuxtLinkLocale>
			</div>
			<div class="positive">{{ $date(item['end'], 'd.m H:i:s') }}</div>
		</div>
		<div class="col-6 k" v-else>
			<a @click.prevent="deleteItem">Удалить</a>
			<div class="positive">{{ $date(item['end'], 'd.m H:i:s') }}</div>
		</div>
	</div>
</template>

<script>
	import { useApiPost } from '~/composables/useApi';
	import useStore from '~/store';

	export default {
		name: "build-queue-row",
		props: {
			index: Number,
			item: Object
		},
		methods: {
			deleteItem ()
			{
				this.$dialog
					.confirm({
						body: 'Удалить <b>'+this.item['name']+' '+this.item['level']+' ур.</b> из очереди?',
						title: 'Очередь построек'
					}, {
						okText: 'Удалить',
						cancelText: 'Закрыть',
					})
					.then(() =>
					{
						useApiPost('/buildings/?planet='+this.$store.state.user.planet, {
							cmd: 'remove',
							listid: this.index
						})
						.then((result) => {
							useStore().PAGE_LOAD(result)
						})
					})
			},
			cancelItem ()
			{
				this.$dialog
					.confirm({
						body: 'Отменить постройку <b>'+this.item['name']+' '+this.item['level']+' ур.</b>?',
						title: 'Очередь построек'
					}, {
						okText: 'Отменить',
						cancelText: 'Закрыть',
					})
					.then(() =>
					{
						useApiPost('/buildings/?planet='+this.$store.state.user.planet, {
							cmd: 'cancel',
							listid: this.index - 1
						})
						.then((result) => {
							useStore().PAGE_LOAD(result)
						})
					})
			}
		}
	}
</script>