<template>
	<div class="col-md-6 col-12">
		<div class="page-building-items-item building" :class="{ blocked: !item['available'] }">
			<div class="building-info">
				<a :href="'/info/' + item['id']" @click.prevent="openInfoPopup" class="building-info-img" :style="{ backgroundImage: 'url(' + image + ')' }">
					<img :src="'/images/buildings/item/' + item['id'] + '.png'" :alt="$t('tech.' + item['id'])" class="img-fluid" v-tooltip="$t('tech.' + item['id'])">
					<div class="building-effects">
						<template v-if="item['effects']">
							<template v-for="(value, resource) in item['effects']">
								<div v-if="value !== 0" class="building-effects-row">
									<span :class="'sprite skin_s_'+resource" :title="$t('resources.' + resource)"></span>
									<span :class="{ positive: value > 0, negative: value < 0 }">{{ $number(Math.abs(value)) }}</span>
								</div>
							</template>
						</template>
					</div>
				</a>
				<div class="building-info-actions">
					<div class="building-title">
						<NuxtLinkLocale :to="'/info/' + item['id']">
							{{ $t('tech.'+item['id']) }}
						</NuxtLinkLocale>
						<span v-if="level" class="positive" title="Текущий уровень постройки">
							{{ $number(level) }}
						</span>
					</div>
					<div class="building-info-info" v-if="item['available']">
						<div class="building-info-time">
							<svg class="icon">
								<use xlink:href="/images/symbols.svg#icon-time"></use>
							</svg>
							{{ $time(item['time']) }}
						</div>
						<div v-if="item['exp'] > 0" class="building-info-time" title="Опыт">
							<svg class="icon">
								<use xlink:href="/images/symbols.svg#icon-exp"></use>
							</svg>
							{{ $number(item['exp']) }} exp
						</div>
						<div class="building-info-upgrade">
							<div v-if="fieldsEmpty <= 0" class="negative">
								нет места
							</div>
							<a v-else-if="user['queue_max'] > 1 && queueByType('build').length > 0" @click.prevent="addAction">
								Добавить в очередь
							</a>
							<div v-else-if="!hasResources" class="negative text-center">
								нет ресурсов
							</div>
							<div v-else-if="user['queue_max'] <= queueByType('build').length" class="negative">
								очередь заполнена
							</div>
							<a v-else-if="queueByType('build').length === 0" @click.prevent="addAction" class="button">
								{{ level === 0 ? 'Построить' : 'Улучшить' }}
							</a>
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
			if (typeof props.item.price[res] !== 'undefined' && props.item.price[res] > 0) {
				if (res === 'energy') {
					if (planet.value['resources'][res].capacity < props.item.price[res])
						return false
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

		await refreshNuxtData('page-buildings');
	}

	function openInfoPopup () {
		openAjaxPopupModal(InfoContent, '/info/' + props.item['id']);
	}
</script>