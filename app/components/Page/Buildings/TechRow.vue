<template>
	<div class="page-building-items-item building" :class="{ blocked: !item['available'] }">
		<div class="building-info">
			<Popup :id="item['id']" class="building-info-img" v-tooltip="item['name']">
				<img :src="'/images/gebaeude/' + item['id'] + '.gif'" :alt="item['name']" class="img-fluid">
			</Popup>

			<div class="building-info-actions">
				<div class="building-title">
					<NuxtLink :to="'/info/' + item['id']">
						{{ item['name'] }}
					</NuxtLink>
					<span v-if="level" class="positive" v-tooltip="$t('pages.research.current_level')">
						{{ $formatNumber(level) }} <template v-if="item.max > 0">{{ $t('pages.research.from') }} <span class="neutral">{{ $formatNumber(item.max) }}</span></template>
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
							{{ $t('pages.research.max_level') }}
						</div>
						<div v-else-if="!hasResources" class="negative text-center">
							{{ $t('pages.research.no_resources') }}
						</div>
						<button v-else-if="item['build'] !== true" @click.prevent="addAction" :class="{ positive: level, negative: level === 0 }" class="button">
							{{ $t('pages.research.build') }}
						</button>
					</div>
				</div>
				<div v-else-if="item['requirements']" class="building-required">
					<div v-for="req in item['requirements']">
						<span class="negative">
							{{ req['name'] }} {{ req['level'] }} {{ req['diff'] !== 0 ? '(' + req['diff'] + ')' : '' }}
						</span>
					</div>
				</div>
			</div>
		</div>
		<BuildRowPrice :price="item['price']"/>
	</div>
</template>

<script setup>
	import BuildRowPrice from './BuildRowPrice.vue';
	import useStore from '~/store';
	import { useApiPost, useI18n, refreshNuxtData } from '#imports';
	import { computed } from 'vue';
	import TechQueue from '~/components/Page/Buildings/TechQueue.vue';
	import { storeToRefs } from 'pinia';
	import Popup from '~/components/Page/Info/Popup.vue';

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
			return !(typeof props.item.price[res] !== 'undefined' && planet.value['resources'][res] !== 'undefined' && props.item.price[res] > 0
				&& planet.value['resources'][res] && planet.value['resources'][res].value < props.item.price[res]);
		})
	});

	async function addAction () {
		await useApiPost('/research/search', {
			element: props.item['id'],
		});

		await refreshNuxtData();
	}
</script>