<template>
	<div class="col-md-6 col-12">
		<div class="page-building-items-item building" :class="{blocked: !item.allow}">

			<div class="building-info">
				<a :href="'/info/'+item.i+'/'" @click.prevent="openInfoPopup" class="building-info-img" :style="{backgroundImage: 'url(/images/buildings/planet/'+$parent.page.planet+'_'+(item.i % 4 + 1)+'.png)'}">
					<img :src="'/images/buildings/item/'+item.i+'.png'" :alt="$t('TECH.'+item.i)" class="img-fluid" v-tooltip="$t('TECH.'+item.i)">
					<div class="building-effects">
						<template v-if="item['effects']">
							<div v-for="(value, resource) in item['effects']" v-if="value !== 0" class="building-effects-row">
								<span :class="'sprite skin_s_'+resource" :title="$t('RESOURCES.'+resource)"></span>
								<span :class="{positive: value > 0, negative: value < 0}">{{ Math.abs(value) }}</span>
							</div>
						</template>
					</div>
				</a>

				<div class="building-info-actions">
					<div class="building-title">
						<nuxt-link :to="'/info/'+item.i+'/'">
							{{ $t('TECH.'+item.i) }}
						</nuxt-link>
						<span v-if="item.level" class="positive" title="Текущий уровень постройки">
							{{ item.level | number }}
						</span>
					</div>

					<div class="building-info-info" v-if="item.allow">
						<div class="building-info-time">
							<svg class="icon">
								<use xlink:href="/images/symbols.svg#icon-time"></use>
							</svg>
							{{ item.time | time }}
						</div>
						<div v-if="item.exp > 0" class="building-info-time" title="Опыт">
							<svg class="icon">
								<use xlink:href="/images/symbols.svg#icon-exp"></use>
							</svg>
							{{ item.exp | number }} exp
						</div>

						<div class="building-info-upgrade">
							<div v-if="$parent.fields_empty <= 0" class="negative">
								нет места
							</div>
							<a v-else-if="$parent.page['queue_max'] > 1 && $parent.page['queue'].length > 0" @click.prevent="addAction">
								Добавить в очередь
							</a>
							<div v-else-if="!hasResources" class="negative text-center">
								нет ресурсов
							</div>
							<div v-else-if="$parent.page['queue_max'] <= $parent.page['queue'].length" class="negative">
								очередь заполнена
							</div>
							<a v-else-if="$parent.page['queue'].length === 0" @click.prevent="addAction" class="button">
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

<script>
	import BuildRowPrice from './build-row-price.vue'
	import InfoContent from '~/components/page/info/content.vue'
	import { mapState } from 'pinia'
	import useStore from '~/store';
	import { useApiPost } from '~/composables/useApi';

	export default {
		name: "build-row",
		props: {
			item: {
				type: Object
			}
		},
		components: {
			BuildRowPrice,
		},
		computed: {
			...mapState(useStore, {
				resources: state => state.planet.resources,
			}),
			hasResources ()
			{
				return Object.keys(this.$t('RESOURCES')).every(res => {
					if (typeof this.item.price[res] !== 'undefined' && this.item.price[res] > 0) {
						if (res === 'energy') {
							if (this.resources[res].capacity < this.item.price[res])
								return false
						} else if (this.resources[res].value < this.item.price[res]) {
							return false
						}
					}

					return true
				})
			}
		},
		methods: {
			async addAction ()
			{
				const result = await useApiPost('/buildings/', {
					cmd: 'insert',
					building: this.item['i']
				})

				useStore().PAGE_LOAD(result)
			},
			openInfoPopup () {
				this.$modal.showAjax(InfoContent, '/info/'+this.item['i']+'/')
			},
		}
	}
</script>