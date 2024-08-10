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
				<NuxtLinkLocale :to="'/galaxy?galaxy='+item['target']['galaxy']+'&system='+item['target']['system']" class="negative">
					[{{ item['target']['galaxy'] }}:{{ item['target']['system'] }}:{{ item['target']['planet'] }}]
				</NuxtLinkLocale>
			</div>
			{{ $date(item['start']['time'], 'DD MMM HH:mm:ss') }}
			<Timer :value="item['start']['time']" delimiter="" class="positive"/>
		</div>
		<div v-if="item['target']['time']" class="col-4 col-sm-3 th">
			<div>
				<NuxtLinkLocale :to="'/galaxy?galaxy='+item['start']['galaxy']+'&system='+item['start']['system']" class="positive">
					[{{ item['start']['galaxy'] }}:{{ item['start']['system'] }}:{{ item['start']['planet'] }}]
				</NuxtLinkLocale>
			</div>
			{{ $date(item['target']['time'], 'DD MMM HH:mm:ss') }}
			<Timer :value="item['target']['time']" delimiter="" class="positive"/>
		</div>
		<div v-else class="col-4 col-sm-3 th">
			-
		</div>
		<div class="col-4 col-sm-2 th">
			<NuxtLinkLocale v-if="item['stage'] === 0 && item['mission'] === 1" :to="'/fleet/verband/'+item.id+'/'" class="button">
				Объединить
			</NuxtLinkLocale>

			<button v-if="(item['stage'] === 3 && item['mission'] !== 15) || (item['stage'] === 0 && item['mission'] !== 20)" @click.prevent="backAction">Отозвать</button>
		</div>
	</div>
</template>

<script setup>
	import { refreshNuxtData, useApiPost, openConfirmModal, useErrorNotification, useSuccessNotification } from '#imports';

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
				handler: async () => {
					try {
						await useApiPost('/fleet/back', {
							id: props.item['id'],
						});

						useSuccessNotification('Флот возвращается назад!');

						await refreshNuxtData('page-fleet');
					} catch (e) {
						useErrorNotification(e.message);
					}
				}
			}]
		);
	}
</script>