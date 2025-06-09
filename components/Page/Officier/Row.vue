<template>
	<div class="officiers-item">
		<div class="officiers-item-title">
			{{ $t('tech.' + item['id']) }}
			(<span v-if="time" class="positive">Нанят до: {{ $formatDate(time, 'DD MMM YYYY HH:mm:ss') }}</span><span v-else class="negative">Не нанят</span>)
		</div>
		<div class="flex flex-wrap sm:flex-nowrap gap-y-2 sm:gap-x-2">
			<div class="basis-1/2 sm:basis-1/6 grow order-1 sm:order-none officiers-item-image">
				<img :src="'/images/officiers/'+item['id']+'.jpg'" align="top" alt="">
			</div>
			<div class="basis-full sm:basis-4/6 grow text-left officiers-item-description">
				<div v-html="$t('info.' + item['id'])"></div>
				<div class="flex my-4 gap-2">
					<div>
						<img :src="'/images/officiers/'+item['id']+'.gif'" :alt="$t('tech.'+item['id'])">
					</div>
					<div class="flex flex-col justify-center gap-1">
						<div v-for="power in item['power']" class="text-sky-300">{{ power }}</div>
					</div>
				</div>
			</div>
			<div v-if="!isVacation" class="basis-1/2 sm:basis-1/6 order-2 text-center officiers-item-action flex items-center justify-center">
				<div class="flex flex-col gap-2">
					<div>
						<button @click.prevent="submit(7, 20)">на неделю</button>
						<br>Стоимость:&nbsp;<span class="positive">20</span>&nbsp;кр.
					</div>
					<div>
						<button @click.prevent="submit(14, 40)">на 2 недели</button>
						<br>Стоимость:&nbsp;<span class="positive">40</span>&nbsp;кр.
					</div>
					<div>
						<button @click.prevent="submit(30, 80)">на месяц</button>
						<br>Стоимость:&nbsp;<span class="positive">80</span>&nbsp;кр.
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import useStore from '~/store';
	import { useApiPost, openConfirmModal, useI18n, useErrorNotification, useSuccessNotification } from '#imports';
	import { storeToRefs } from 'pinia';

	const props = defineProps({
		item: Object,
	});

	const { t } = useI18n();
	const store = useStore();
	const { user, isVacation } = storeToRefs(store);

	const time = computed(() => user.value['officiers'].find((v) => v['id'] === props.item['id'])?.['date']);

	function submit (value, price) {
		openConfirmModal(
			'Вербовка офицера',
			'Вы действительно хотите нанять офицера "<b>' + t('tech.' + props.item['id']) + '</b>" на <b>' + value + '</b> дней за <b>' + price + '</b> кредитов?',
			[{
				title: 'Отменить',
			}, {
				title: 'Нанять',
				handler: async () => {
					try {
						await useApiPost('/officiers/buy', {
							id: props.item['id'],
							duration: value
						});

						useSuccessNotification('Офицер был завербован!');
					} catch (e) {
						useErrorNotification(e.message);
					}
				}
			}]
		);
	}
</script>