<template>
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
					<span :class="{positive: level > 0, negative: level === 0}">{{ $formatNumber(level) }}</span>
				</div>

				<div class="building-info-info" v-if="item['available']">
					<div class="building-info-time">
						<svg class="icon">
							<use xlink:href="/images/symbols.svg#icon-time"></use>
						</svg>
						{{ $formatTime(item['time']) }}
					</div>

					<template v-if="item['effects']">
						<template v-for="(value, resource) in item['effects']">
							<div v-if="value !== 0" class="building-effects-row">
								<span :class="'sprite skin_s_'+resource" :title="$t('resources.'+resource)"></span>
								<span :class="{ positive: value > 0, negative: value < 0 }">{{ Math.abs(value) }}</span>
							</div>
						</template>
					</template>

					<div v-if="item['is_max']" class="text-center negative">
						Вы можете построить только {{ item['max'] }} постройку данного типа
					</div>
					<div v-else-if="max > 0" class="buildmax">
						<a @click.prevent="setMax">
							max: <span class="positive">{{ $formatNumber(max) }}</span>
						</a>
						<input type="number" min="0" :max="max" :name="'element[' + item['id'] + ']'" :alt="item['name']" v-model="count" style="width: 80px" maxlength="5" value="" placeholder="0">
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
</template>

<script setup>
	import BuildRowPrice from './BuildRowPrice.vue'
	import InfoContent from '~/components/Page/Info/Content.vue'
	import useStore from '~/store';
	import { useI18n, openAjaxPopupModal } from '#imports';
	import { computed, ref } from 'vue';
	import { storeToRefs } from 'pinia';

	const props = defineProps({
		item: {
			type: Object
		}
	});

	const count = ref('');
	const store = useStore();
	const { planet } = storeToRefs(store);
	const { tm } = useI18n();

	defineExpose({
		count
	});

	const level = computed(() => planet.value['units'][props['item']['code']] || 0);

	const max = computed(() => {
		let max = -1;

		Object.keys(tm('resources')).forEach((item) => {
			let count = Math.floor(planet.value['resources'][item]['value'] / props.item['price'][item])

			if (max < 0) {
				max = count;
			} else if (max > count) {
				max = count;
			}
		})

		if (props.item['max'] > 0 && props.item['max'] < max) {
			max = props.item['max'];
		}

		return max;
	});

	function setMax () {
		if (count.value === '' || parseInt(count.value) === 0) {
			count.value = max.value;
		} else {
			count.value = '';
		}
	}

	function openInfoPopup () {
		openAjaxPopupModal(InfoContent, '/info/' + props.item['id'])
	}
</script>