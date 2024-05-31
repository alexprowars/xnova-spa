<template>
	<div class="row page-fleet-fly-item">
		<div class="col-3 col-sm-1 th">{{ i + 1 }}</div>
		<div class="col-6 col-sm-2 th">
			<a>{{ $t('fleet_mission.'+item.mission) }}</a>
			<div v-if="item.start.time + 1 === item.target.time">
				<a title="Возврат домой">(R)</a>
			</div>
			<div v-else>
				<a title="Полёт к цели">(A)</a>
			</div>
		</div>
		<div class="col-3 col-sm-1 th">
			<Popper>
				<template #content>
					<div v-for="(fleetData, fleetId) in item['units']">
						{{ $t('tech.'+fleetId) }}: {{ fleetData['count'] }}
					</div>
				</template>
				{{ $number(item['amount']) }}
			</Popper>
		</div>
		<div class="col-4 col-sm-3 th">
			<div>
				<NuxtLinkLocale :to="'/galaxy/?galaxy='+item['target']['galaxy']+'&system='+item['target']['system']" class="negative">
					[{{ item['target']['galaxy'] }}:{{ item['target']['system'] }}:{{ item['target']['planet'] }}]
				</NuxtLinkLocale>
			</div>
			{{ dayjs(item['start']['time']).tz().format('DD MMM HH:mm:ss') }}
			<Timer :value="item['start']['time']" delimiter="" class="positive"></Timer>
		</div>
		<div v-if="item['target']['time']" class="col-4 col-sm-3 th">
			<div>
				<NuxtLinkLocale :to="'/galaxy/?galaxy='+item['start']['galaxy']+'&system='+item['start']['system']" class="positive">
					[{{ item['start']['galaxy'] }}:{{ item['start']['system'] }}:{{ item['start']['planet'] }}]
				</NuxtLinkLocale>
			</div>
			{{ dayjs(item['target']['time']).tz().format('DD MMM HH:mm:ss') }}
			<Timer :value="item['target']['time']" delimiter="" class="positive"></Timer>
		</div>
		<div v-else class="col-4 col-sm-3 th">
			-
		</div>
		<div class="col-4 col-sm-2 th">
			<RouterForm v-if="item['stage'] === 0 && item['mission'] !== 20 && item.target.id !== 1" action="/fleet/back/">
				<input name="fleetid" :value="item.id" type="hidden">
				<input value="Возврат" type="submit" name="send">
			</RouterForm>

			<NuxtLinkLocale v-if="item['stage'] === 0 && item['mission'] === 1 && item.target.id !== 1" :to="'/fleet/verband/'+item.id+'/'" class="button">
				Объединить
			</NuxtLinkLocale>

			<button v-if="item['stage'] === 3 && item['mission'] !== 15" @click.prevent="backAction">Отозвать</button>
		</div>
	</div>
</template>

<script setup>
	import { useApiPost } from '~/composables/useApi';
	import useStore from '~/store';
	import { openConfirmModal } from '~/composables/useModals';
	import dayjs from 'dayjs';

	const props = defineProps({
		i: {
			type: Number,
		},
		item: {
			type: Object,
		}
	})

	function backAction () {
		openConfirmModal(
			null,
			'Вернуть флот?',
			[{
				title: 'Нет',
			}, {
				title: 'Да',
				handler: () => {
					useApiPost('/fleet/back/', {
						id: props.item['id'],
					})
					.then((result) => {
						useStore().PAGE_LOAD(result)
					})
				}
			}]
		);
	}
</script>