<template>
	<div class="col-md-6 col-12">
		<div class="page-building-items-item building" :class="{ blocked: !item['available'] }">
			<div class="building-info">
				<a :href="'/info/' + item['id']" @click.prevent="openInfoPopup" class="building-info-img" v-tooltip="$t('tech.' + item['id'])">
					<img :src="'/images/gebaeude/' + item['id'] + '.gif'" :alt="$t('tech.' + item['id'])" class="img-fluid">
				</a>

				<div class="building-info-actions">
					<div class="building-title">
						<NuxtLinkLocale :to="'/info/' + item['id']">
							{{ $t('tech.' + item['id']) }}
						</NuxtLinkLocale>
						<span v-if="item.level" class="positive" title="Текущий уровень постройки">
							{{ $number(item.level) }} <template v-if="item.max > 0">из <span class="neutral">{{ $number(item.max) }}</span></template>
						</span>
					</div>

					<div class="building-info-info" v-if="item['available']">
						<div class="building-info-time">
							<svg class="icon">
								<use xlink:href="/images/symbols.svg#icon-time"></use>
							</svg>
							{{ $time(item['time']) }}
						</div>

						<div v-html="item['effects']"></div>

						<div class="building-info-upgrade">
							<div v-if="typeof item['build'] === 'object'" class="building-info-upgrade-timer">
								<span v-if="time > 0">
									{{ $time(time, ':', true) }}&nbsp;<a @click.prevent="cancelAction">Отменить<span v-if="item['build'].name">на {{ item['build'].name }}</span></a>
								</span>
								<a v-else href="" @click.prevent="refresh">завершено. продолжить...</a>
							</div>
							<div v-else-if="item['max'] > 0 && item['max'] <= item['level']" class="negative">
								максимальный уровень
							</div>
							<div v-else-if="!hasResources" class="negative text-center">
								нет ресурсов
							</div>
							<a v-else-if="item['build'] !== true" @click.prevent="addAction" :class="{ positive: item['level'], negative: item['level'] === 0 }" class="button">
								Изучить
							</a>
						</div>
					</div>
					<div v-else-if="item['requirements']" class="building-required">
						<div v-for="req in item['requirements']">
							<span class="negative">
								{{ $t('tech.' + req['id']) }} {{ req['level'] }} {{ req['diff'] !== 0 ? '(' + req['diff'] + ')' : '' }}
							</span>
						</div>
					</div>
				</div>
			</div>
			<BuildRowPrice :price="item['price']"/>
		</div>
	</div>
</template>

<script setup>
	import BuildRowPrice from './BuildRowPrice.vue';
	import InfoContent from '~/components/Page/Info/Content.vue';
	import useStore from '~/store';
	import { useApiPost, openAjaxPopupModal, openConfirmModal, useI18n, refreshNuxtData } from '#imports';
	import { computed } from 'vue';
	import { useNow } from '@vueuse/core';
	import dayjs from 'dayjs';

	const props = defineProps({
		item: {
			type: Object
		}
	});

	const { t, tm } = useI18n();
	const store = useStore();
	const now = useNow({ interval: 1000 });
	const time = computed(() => dayjs(props.item['build']['time']).diff(now.value) / 1000);

	const resources = computed(() => {
		return store.planet['resources'];
	});

	const hasResources = computed(() => {
		return Object.keys(tm('resources')).every(res => {
			return !(typeof props.item.price[res] !== 'undefined' && props.item.price[res] > 0
				&& resources.value[res] && resources.value[res].value < props.item.price[res]);
		})
	});

	async function refresh() {
		await refreshNuxtData('page-research');
	}

	async function addAction () {
		await useApiPost('/research/search', {
			element: props.item['id'],
		});

		await refreshNuxtData('page-research');
	}

	function cancelAction () {
		openConfirmModal(
			null,
			'Отменить изучение <b>' + t('tech.' + props.item['id']) + ' ' + props.item['level'] + ' ур.</b>?',
			[{
				title: 'Закрыть',
			}, {
				title: 'Отменить',
				handler: async () => {
					await useApiPost('/research/cancel', {
						element: props.item['id'],
					});

					await refreshNuxtData('page-research');
				}
			}]
		);
	}

	function openInfoPopup () {
		openAjaxPopupModal(InfoContent, '/info/' + props.item['id'])
	}
</script>