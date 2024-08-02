<template>
	<div class="row officiers-item">
		<div class="col-12 officiers-item-title">
			{{ $t('tech.' + item['id']) }}
			(<span v-if="time" class="positive">Нанят до: {{ dayjs(time).tz().format('DD MMM YYYY HH:mm:ss') }}</span><span v-else class="negative">Не нанят</span>)
		</div>
		<div class="d-none d-sm-block col-sm-2 text-center officiers-item-image">
			<img :src="'/images/officiers/'+item['id']+'.jpg'" align="top" alt="">
		</div>
		<div class="col-12 col-sm-7 text-start officiers-item-description">
			<div v-html="$t('info.' + item['id'])"></div>
			<table class="powers">
				<tbody>
					<tr>
						<td :rowspan="(item['power'].length + 1)" valign="top" class="padding-0">
							<img :src="'/images/officiers/'+item['id']+'.gif'" :alt="$t('tech.'+item['id'])">
						</td>
					</tr>
					<tr v-for="power in item['power']">
						<td class="up">{{ power }}</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="clearfix d-sm-none">
			<div class="separator"></div>
		</div>
		<div class="col-6 d-sm-none text-center officiers-item-image">
			<img :src="'/images/officiers/' + item['id'] + '.jpg'" align="top" alt="">
		</div>
		<div v-if="!isVacation" class="col-6 col-sm-3 text-center officiers-item-action">
			<div class="negative">{{ time > 0 ? 'Продлить' : 'Нанять' }}</div>

			<button @click.prevent="submit(7, 20)">на неделю</button>
			<br>Стоимость:&nbsp;<span class="positive">20</span>&nbsp;кр.

			<div class="separator"></div>

			<button @click.prevent="submit(14, 40)">на 2 недели</button>
			<br>Стоимость:&nbsp;<span class="positive">40</span>&nbsp;кр.

			<div class="separator"></div>

			<button @click.prevent="submit(30, 80)">на месяц</button>
			<br>Стоимость:&nbsp;<span class="positive">80</span>&nbsp;кр.

			<div class="separator"></div>
		</div>
	</div>
</template>

<script setup>
	import useStore from '~/store';
	import dayjs from 'dayjs';
	import { useApiPost, openConfirmModal, useI18n, useErrorNotification, useSuccessNotification } from '#imports';
	import { storeToRefs } from 'pinia';

	const props = defineProps({
		item: Object,
	});

	const { t } = useI18n();
	const store = useStore();
	const { user, isVacation } = storeToRefs(store);

	const time = computed(() => user.value['officiers'].find((v) => v['id'] === props.item['id'])?.['time']);

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
						await useApiPost('/officier/buy', {
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