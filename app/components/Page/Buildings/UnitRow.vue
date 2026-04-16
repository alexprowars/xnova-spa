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
					<span :class="{ positive: level > 0, negative: level === 0 }">{{ $formatNumber(level) }}</span>
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

					<template v-if="!user.vacation">
						<div v-if="item['is_max']" class="text-center negative">
							Вы можете построить только {{ item['max'] }} постройку данного типа
						</div>
						<div v-else-if="max > 0" class="buildmax">
							<a @click.prevent="setMax">
								max: <span class="positive">{{ $formatNumber(max) }}</span>
							</a>
							<input type="number" min="0" :max="max" :name="'element[' + item['id'] + ']'" :alt="item['name']" v-model="count" style="width: 80px" maxlength="5" placeholder="0">
						</div>
					</template>
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
	import { useI18n } from '#imports';
	import { computed, ref } from 'vue';
	import { storeToRefs } from 'pinia';
	import Popup from '~/components/Page/Info/Popup.vue';

	const props = defineProps({
		item: {
			type: Object
		}
	});

	const count = ref('');
	const store = useStore();
	const { user, planet } = storeToRefs(store);
	const { tm } = useI18n();

	defineExpose({
		count
	});

	const level = computed(() => planet.value['units'][props['item']['code']] || 0);

	const max = computed(() => {
		let max = -1;

		Object.keys(tm('resources')).forEach((item) => {
			if (typeof props.item['price'][item] === undefined || typeof planet.value['resources'][item] === 'undefined') {
				return;
			}

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
</script>