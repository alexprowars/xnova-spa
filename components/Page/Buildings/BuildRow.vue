<template>
	<div class="page-building-items-item building" :class="{ blocked: !item['available'] }">
		<div class="building-info">
			<a :href="'/info/' + item['id']" @click.prevent="openInfoPopup" class="building-info-img" :style="{ backgroundImage: 'url(' + image + ')' }">
				<img :src="'/images/buildings/item/' + item['id'] + '.png'" :alt="$t('tech.' + item['id'])" class="img-fluid" v-tooltip="$t('tech.' + item['id'])">
				<div class="building-effects">
					<template v-if="item['effects']">
						<template v-for="(value, resource) in item['effects']">
							<div v-if="value !== 0" class="building-effects-row">
								<span :class="'sprite skin_s_'+resource" :title="$t('resources.' + resource)"></span>
								<span :class="{ positive: value > 0, negative: value < 0 }">{{ $formatNumber(Math.abs(value)) }}</span>
							</div>
						</template>
					</template>
				</div>
			</a>
			<div class="building-info-actions">
				<div class="building-title">
					<NuxtLink :to="'/info/' + item['id']">
						{{ $t('tech.'+item['id']) }}
					</NuxtLink>
					<span v-if="level" class="positive" v-tooltip="$t('pages.building.current_level')">
						{{ $formatNumber(level) }}
					</span>
				</div>
				<div class="building-info-info" v-if="item['available']">
					<div class="building-info-time">
						<svg class="icon">
							<use xlink:href="/images/symbols.svg#icon-time"></use>
						</svg>
						{{ $formatTime(item['time']) }}
					</div>
					<div v-if="item['exp'] > 0" class="building-info-time" title="Опыт">
						<svg class="icon">
							<use xlink:href="/images/symbols.svg#icon-exp"></use>
						</svg>
						{{ $formatNumber(item['exp']) }} exp
					</div>
					<div class="building-info-upgrade">
						<div v-if="fieldsEmpty <= 0" class="negative">
							{{ $t('pages.building.status_no_more_fields') }}
						</div>
						<a v-else-if="user['queue_max'] > 1 && queueByType('build').length > 0" @click.prevent="addAction">
							{{ $t('pages.building.status_add_to_list') }}
						</a>
						<div v-else-if="!hasResources" class="negative text-center">
							{{ $t('pages.building.status_no_resources') }}
						</div>
						<div v-else-if="user['queue_max'] <= queueByType('build').length" class="negative">
							{{ $t('pages.building.status_queue_full') }}
						</div>
						<button v-else-if="queueByType('build').length === 0" @click.prevent="addAction" class="button">
							{{ level === 0 ? $t('pages.building.action_build') : $t('pages.building.action_improve') }}
						</button>
					</div>
				</div>
				<div v-else-if="item['requirements']" class="building-required">
					<div v-for="req in item['requirements']">
						<span class="negative">
							{{ $t('tech.'+req['id']) }} {{ req['level'] }} {{ req['diff'] !== 0 ? '('+req['diff']+')' : '' }}
						</span>
					</div>
				</div>
			</div>
		</div>
		<BuildRowPrice :price="item['price']"/>
	</div>
</template>

<script setup>
	import BuildRowPrice from './BuildRowPrice.vue'
	import InfoContent from '~/components/Page/Info/Content.vue'
	import { useI18n, useApiPost, openAjaxPopupModal, refreshNuxtData } from '#imports';
	import useStore from '~/store';
	import { computed } from 'vue';
	import { storeToRefs } from 'pinia';

	const props = defineProps({
		item: {
			type: Object
		}
	});

	const { tm } = useI18n();
	const { planet, user, queueByType, fieldsEmpty } = storeToRefs(useStore());

	const level = computed(() => planet.value['buildings'][props['item']['code']] || 0);

	const image = computed(() => {
		let cover = 'normaltemp';
		let match = planet.value.image.match(/(.*?)planet/);

		if (match) {
			cover = match[1].trim();
		}

		return '/images/buildings/planet/' + cover + '_' + (props.item['id'] % 4 + 1) + '.png';
	});

	const hasResources = computed(() => {
		return Object.keys(tm('resources')).every(res => {
			if (typeof props.item.price[res] !== 'undefined' && typeof planet.value['resources'][res] !== 'undefined' && props.item.price[res] > 0) {
				if (res === 'energy') {
					if (planet.value['resources'][res].capacity < props.item.price[res]) {
						return false
					}
				} else if (planet.value['resources'][res].value < props.item.price[res]) {
					return false
				}
			}

			return true
		})
	});

	async function addAction () {
		await useApiPost('/buildings/build/insert', {
			element: props.item['id']
		});

		await refreshNuxtData();
	}

	function openInfoPopup () {
		openAjaxPopupModal(InfoContent, '/info/' + props.item['id']);
	}
</script>