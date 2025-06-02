<template>
	<div class="col-md-6 col-12">
		<div class="page-building-items-item building" :class="{ blocked: !item['available'] }">
			<div class="building-info">
				<a :href="'/info/' + item['id']" @click.prevent="openInfoPopup" class="building-info-img" v-tooltip="$t('tech.' + item['id'])">
					<img :src="'/images/gebaeude/' + item['id'] + '.gif'" :alt="$t('tech.' + item['id'])" class="img-fluid">
				</a>

				<div class="building-info-actions">
					<div class="building-title">
						<NuxtLink :to="'/info/' + item['id']">
							{{ $t('tech.' + item['id']) }}
						</NuxtLink>
						<span v-if="level" class="positive" title="Текущий уровень постройки">
							{{ $formatNumber(level) }} <template v-if="item.max > 0">из <span class="neutral">{{ $formatNumber(item.max) }}</span></template>
						</span>
					</div>

					<div class="building-info-info" v-if="item['available']">
						<div class="building-info-time">
							<svg class="icon">
								<use xlink:href="/images/symbols.svg#icon-time"></use>
							</svg>
							{{ $formatTime(item['time']) }}
						</div>

						<div v-html="item['effects']"></div>

						<div class="building-info-upgrade">
							<TechQueue v-if="typeof item['build'] === 'object'" :build="item['build']"/>
							<div v-else-if="item['max'] > 0 && item['max'] <= level" class="negative">
								максимальный уровень
							</div>
							<div v-else-if="!hasResources" class="negative text-center">
								нет ресурсов
							</div>
							<a v-else-if="item['build'] !== true" @click.prevent="addAction" :class="{ positive: level, negative: level === 0 }" class="button">
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
	import { useApiPost, openAjaxPopupModal, useI18n, refreshNuxtData } from '#imports';
	import { computed } from 'vue';
	import TechQueue from '~/components/Page/Buildings/TechQueue.vue';
	import { storeToRefs } from 'pinia';

	const props = defineProps({
		item: {
			type: Object
		}
	});

	const { tm } = useI18n();
	const store = useStore();
	const { user, planet } = storeToRefs(store);

	const level = computed(() => user.value['technology'][props['item']['code']] || 0);

	const hasResources = computed(() => {
		return Object.keys(tm('resources')).every(res => {
			return !(typeof props.item.price[res] !== 'undefined' && props.item.price[res] > 0
				&& planet.value['resources'][res] && planet.value['resources'][res].value < props.item.price[res]);
		})
	});

	async function addAction () {
		await useApiPost('/research/search', {
			element: props.item['id'],
		});

		await refreshNuxtData();
	}

	function openInfoPopup () {
		openAjaxPopupModal(InfoContent, '/info/' + props.item['id'])
	}
</script>