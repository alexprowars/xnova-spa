<template>
	<div class="col-md-6 col-12">
		<div class="page-building-items-item building" :class="{blocked: !item.allow}">
			<div class="building-info">
				<a :href="'/info/'+item.i+'/'" @click.prevent="openInfoPopup" class="building-info-img" v-tooltip="$t('TECH.'+item.i)">
					<img :src="'/images/gebaeude/'+item.i+'.gif'" :alt="$t('TECH.'+item.i)" class="img-fluid">
				</a>
				<div class="building-info-actions">
					<div class="building-title">
						<nuxt-link :to="'/info/'+item.i+'/'">
							{{ $t('TECH.'+item.i) }}
						</nuxt-link>
						<span :class="{positive: item.count > 0, negative: item.count === 0}">{{ item.count | number }}</span>
					</div>

					<div class="building-info-info" v-if="item.allow">
						<div class="building-info-time">
							<svg class="icon">
								<use xlink:href="/images/symbols.svg#icon-time"></use>
							</svg>
							{{ item.time | time }}
						</div>

						<template v-if="item['effects']">
							<div v-for="(value, resource) in item['effects']" v-if="value !== 0" class="building-effects-row">
								<span :class="'sprite skin_s_'+resource" :title="$t('RESOURCES.'+resource)"></span>
								<span :class="{positive: value > 0, negative: value < 0}">{{ Math.abs(value) }}</span>
							</div>
						</template>

						<div v-if="item['is_max']">
							<center class="negative">
								Вы можете построить только {{ item.max }} постройку данного типа
							</center>
						</div>
						<div v-else-if="max > 0" class="buildmax">
							<a @click.prevent="setMax">
								max: <span class="positive">{{ max | number }}</span>
							</a>
							<input type="number" min="0" :max="max" :name="'fmenge['+item.i+']'" :alt="item.name" v-model="count" style="width: 80px" maxlength="5" value="" placeholder="0">
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
	import { mapState } from 'vuex'

	export default {
		name: 'unit-row',
		components: {
			BuildRowPrice,
		},
		props: {
			item: {
				type: Object
			}
		},
		data () {
			return {
				count: ''
			}
		},
		computed: {
			...mapState({
				resources: state => state.planet.resources,
			}),
			max ()
			{
				let max = -1

				if (this.$store.state.resources === false) {
					return max
				}

				let resources = Object.keys(this.$t('RESOURCES'))

				resources.forEach((item) => {
					let count = Math.floor(this.resources[item]['current'] / this.item['price'][item])

					if (max < 0) {
						max = count
					} else if (max > count) {
						max = count
					}
				})

				if (this.item['max'] > 0 && this.item['max'] < max) {
					max = this.item['max']
				}

				return max
			}
		},
		methods: {
			setMax ()
			{
				if (this.count === '' || parseInt(this.count) === 0) {
					this.count = this.max
				} else {
					this.count = ''
				}
			},
			openInfoPopup () {
				this.$modal.showAjax(InfoContent, '/info/'+this.item['i']+'/')
			},
		}
	}
</script>