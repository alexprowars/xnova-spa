<template>
	<div class="grid grid-cols-12 divide-x page-fleet-fly-item">
		<div class="col-span-3 sm:col-span-1 th">{{ i + 1 }}</div>
		<div class="col-span-6 sm:col-span-2 th">
			<a>{{ $t('fleet_mission.' + item.mission) }}</a>
			<div v-if="item.start.time + 1 === item.target.time">
				<a :title="$t('pages.fleets.list.mission_R')">(R)</a>
			</div>
			<div v-else>
				<a :title="$t('pages.fleets.list.mission_A')">(A)</a>
			</div>
		</div>
		<div class="col-span-3 sm:col-span-1 th">
			<Popper>
				<template #content>
					<div class="flex flex-col gap-2 p-2">
						<div v-for="unit in item['units']">
							{{ $t('tech.' + unit['i']) }}: {{ unit['c'] }}
						</div>
					</div>
				</template>
				<div class="cursor-pointer">{{ $formatNumber(item['amount']) }}</div>
			</Popper>
		</div>
		<div class="col-span-4 sm:col-span-3 border-t sm:border-0 th">
			<div>
				<NuxtLink :to="'/galaxy?galaxy='+item['target']['galaxy']+'&system='+item['target']['system']" class="negative">
					[{{ item['target']['galaxy'] }}:{{ item['target']['system'] }}:{{ item['target']['planet'] }}]
				</NuxtLink>
			</div>
			{{ $formatDate(item['start']['date'], 'DD MMM HH:mm:ss') }}
			<Timer :value="item['start']['date']" delimiter="" class="positive"/>
		</div>
		<div v-if="item['target']['date']" class="col-span-4 sm:col-span-3 border-t sm:border-0 th">
			<div>
				<NuxtLink :to="'/galaxy?galaxy='+item['start']['galaxy']+'&system='+item['start']['system']" class="positive">
					[{{ item['start']['galaxy'] }}:{{ item['start']['system'] }}:{{ item['start']['planet'] }}]
				</NuxtLink>
			</div>
			{{ $formatDate(item['target']['date'], 'DD MMM HH:mm:ss') }}
			<Timer :value="item['target']['date']" delimiter="" class="positive"/>
		</div>
		<div v-else class="col-span-4 sm:col-span-3 border-t sm:border-0 th">
			-
		</div>
		<div class="col-span-4 sm:col-span-2 border-t sm:border-0 th flex flex-col gap-1">
			<NuxtLink v-if="item['stage'] === 0 && item['mission'] === 1" :to="'/fleet/verband/' + item.id" class="button w-full">
				{{ $t('pages.fleets.list.merge') }}
			</NuxtLink>

			<button v-if="(item['stage'] === 3 && item['mission'] !== 15) || (item['stage'] === 0 && item['mission'] !== 20)" class="w-full" @click.prevent="backAction">
				{{ $t('pages.fleets.list.recall') }}
			</button>
		</div>
	</div>
</template>

<script setup>
	import { refreshNuxtData, useApiPost, openConfirmModal, useErrorNotification, useSuccessNotification, useI18n } from '#imports';

	const props = defineProps({
		i: {
			type: Number,
		},
		item: {
			type: Object,
		}
	});

	const { t } = useI18n();

	function backAction () {
		openConfirmModal(
			null,
			t('pages.fleets.return_popup.title'),
			[{
				title: t('pages.fleets.return_popup.no'),
			}, {
				title: t('pages.fleets.return_popup.yes'),
				handler: async () => {
					try {
						await useApiPost('/fleet/back', {
							id: props.item['id'],
						});

						useSuccessNotification(t('pages.fleets.return_popup.success'));

						await refreshNuxtData();
					} catch (e) {
						useErrorNotification(e.message);
					}
				}
			}]
		);
	}
</script>