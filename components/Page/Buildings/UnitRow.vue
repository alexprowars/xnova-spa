<template>
	<div class="col-md-6 col-12">
		<div class="page-building-items-item building" :class="{blocked: !item.allow}">
			<div class="building-info">
				<a :href="'/info/'+item.i+'/'" @click.prevent="openInfoPopup" class="building-info-img" v-tooltip="$t('tech.'+item.i)">
					<img :src="'/images/gebaeude/'+item.i+'.gif'" :alt="$t('tech.'+item.i)" class="img-fluid">
				</a>
				<div class="building-info-actions">
					<div class="building-title">
						<NuxtLinkLocale :to="'/info/'+item.i+'/'">
							{{ $t('tech.'+item.i) }}
						</NuxtLinkLocale>
						<span :class="{positive: item.count > 0, negative: item.count === 0}">{{ $number(item.count) }}</span>
					</div>

					<div class="building-info-info" v-if="item.allow">
						<div class="building-info-time">
							<svg class="icon">
								<use xlink:href="/images/symbols.svg#icon-time"></use>
							</svg>
							{{ $time(item.time) }}
						</div>

						<template v-if="item['effects']">
							<div v-for="(value, resource) in item['effects']" v-if="value !== 0" class="building-effects-row">
								<span :class="'sprite skin_s_'+resource" :title="$t('resources.'+resource)"></span>
								<span :class="{positive: value > 0, negative: value < 0}">{{ Math.abs(value) }}</span>
							</div>
						</template>

						<div v-if="item['is_max']" class="text-center negative">
							Вы можете построить только {{ item.max }} постройку данного типа
						</div>
						<div v-else-if="max > 0" class="buildmax">
							<a @click.prevent="setMax">
								max: <span class="positive">{{ $number(max) }}</span>
							</a>
							<input type="number" min="0" :max="max" :name="'fmenge['+item.i+']'" :alt="item.name" v-model="count" style="width: 80px" maxlength="5" value="" placeholder="0">
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
	import useStore from '~/store';
	import { useI18n, openAjaxPopupModal } from '#imports';
	import { computed, ref } from 'vue';

	const props = defineProps({
		item: {
			type: Object
		}
	});

	const count = ref('');
	const store = useStore();
	const { tm } = useI18n();

	defineExpose({
		count
	});

	const resources = computed(() => {
		return store.planet.resources;
	});

	const max = computed(() => {
		let max = -1

		if (resources.value === false) {
			return max
		}

		let resourceKeys = Object.keys(tm('resources'))

		resourceKeys.forEach((item) => {
			let count = Math.floor(resources.value[item]['value'] / props.item['price'][item])

			if (max < 0) {
				max = count
			} else if (max > count) {
				max = count
			}
		})

		if (props.item['max'] > 0 && props.item['max'] < max) {
			max = props.item['max']
		}

		return max
	});

	function setMax () {
		if (count.value === '' || parseInt(count.value) === 0) {
			count.value = max.value;
		} else {
			count.value = '';
		}
	}

	function openInfoPopup () {
		openAjaxPopupModal(InfoContent, '/info/' + props.item['i'] + '/')
	}
</script>