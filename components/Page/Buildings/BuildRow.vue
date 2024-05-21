<template>
	<div class="col-md-6 col-12">
		<div class="page-building-items-item building" :class="{blocked: !item.allow}">

			<div class="building-info">
				<a :href="'/info/'+item.i+'/'" @click.prevent="openInfoPopup" class="building-info-img" :style="{backgroundImage: 'url(/images/buildings/planet/'+$parent.page.planet+'_'+(item.i % 4 + 1)+'.png)'}">
					<img :src="'/images/buildings/item/'+item.i+'.png'" :alt="$t('TECH.'+item.i)" class="img-fluid" v-tooltip="$t('TECH.' + item.i)">
					<div class="building-effects">
						<template v-if="item['effects']">
							<template v-for="(value, resource) in item['effects']">
								<div v-if="value !== 0" class="building-effects-row">
									<span :class="'sprite skin_s_'+resource" :title="$t('RESOURCES.' + resource)"></span>
									<span :class="{positive: value > 0, negative: value < 0}">{{ Math.abs(value) }}</span>
								</div>
							</template>
						</template>
					</div>
				</a>

				<div class="building-info-actions">
					<div class="building-title">
						<NuxtLinkLocale :to="'/info/'+item.i+'/'">
							{{ $t('TECH.'+item.i) }}
						</NuxtLinkLocale>
						<span v-if="item.level" class="positive" title="Текущий уровень постройки">
							{{ $number(item.level) }}
						</span>
					</div>

					<div class="building-info-info" v-if="item.allow">
						<div class="building-info-time">
							<svg class="icon">
								<use xlink:href="/images/symbols.svg#icon-time"></use>
							</svg>
							{{ $time(item.time) }}
						</div>
						<div v-if="item.exp > 0" class="building-info-time" title="Опыт">
							<svg class="icon">
								<use xlink:href="/images/symbols.svg#icon-exp"></use>
							</svg>
							{{ $number(item.exp) }} exp
						</div>

						<div class="building-info-upgrade">
							<div v-if="fields_empty <= 0" class="negative">
								нет места
							</div>
							<a v-else-if="page['queue_max'] > 1 && page['queue'].length > 0" @click.prevent="addAction">
								Добавить в очередь
							</a>
							<div v-else-if="!hasResources" class="negative text-center">
								нет ресурсов
							</div>
							<div v-else-if="page['queue_max'] <= page['queue'].length" class="negative">
								очередь заполнена
							</div>
							<a v-else-if="page['queue'].length === 0" @click.prevent="addAction" class="button">
								{{ item.level === 0 ? 'Построить' : 'Улучшить' }}
							</a>
						</div>
					</div>
					<div v-else-if="item['requirements']" class="building-required">
						<div v-for="req in item['requirements']">
							<span class="negative">
								{{ $t('TECH.'+req['id']) }} {{ req['level'] }} {{ req['diff'] !== 0 ? '('+req['diff']+')' : '' }}
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
	import { useI18n } from '#imports';
	import useStore from '~/store';
	import { useApiPost } from '~/composables/useApi';
	import { openAjaxPopupModal } from '~/composables/useModals';
	import { computed, getCurrentInstance } from 'vue';

	const props = defineProps({
		item: {
			type: Object
		}
	});

	const { tm } = useI18n();
	const instance = getCurrentInstance();
	const page = instance.parent.exposed['page'];
	const fields_empty = instance.parent.exposed['fields_empty'];

	const resources = computed(() => {
		return useStore().planet.resources;
	});

	const hasResources = computed(() => {
		return Object.keys(tm('RESOURCES')).every(res => {
			if (typeof props.item.price[res] !== 'undefined' && props.item.price[res] > 0) {
				if (res === 'energy') {
					if (resources.value[res].capacity < props.item.price[res])
						return false
				} else if (resources.value[res].value < props.item.price[res]) {
					return false
				}
			}

			return true
		})
	});

	async function addAction () {
		const result = await useApiPost('/buildings/', {
			cmd: 'insert',
			building: props.item['i']
		});

		useStore().PAGE_LOAD(result);
	}

	function openInfoPopup () {
		openAjaxPopupModal(InfoContent, '/info/' + props.item['i'] + '/');
	}
</script>